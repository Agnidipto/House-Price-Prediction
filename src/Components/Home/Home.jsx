import React, { useEffect, useState } from "react";
import "./Home.css";
import {
  Button,
  Form,
  Row,
  Col,
  Container,
  Modal,
  Alert,
} from "react-bootstrap";
import getPredictions, { loadModel } from "./HomeService";

function Home(props) {
  const [loaded, setLoaded] = useState(false);
  const [error, setError] = useState(false);

  const initiate = () => {
    loadModel()
      .then((res) => {
        if (res.data.msg === "Load Successful") setLoaded(true);
      })
      .catch((err) => {
        console.log(err.message);
        setError(true);
      });
  };

  const [details, setDetails] = useState({
    location: "whitefield",
    sqft: 1234,
    bath: 2,
    bhk: 3,
  });

  const changeDetails = (event) => {
    setDetails({ ...details, [event.target.name]: event.target.value });
  };

  const [result, setResult] = useState("");

  const submit = (event) => {
    event.preventDefault();
    getPredictions(details).then((res) => {
      // console.log(res.data);
      setResult(res.data.estimated_price);
      setShow(true);
    }).catch( err => console.log(err.message));
  };

  useEffect(() => {
    initiate();
  }, []);

  const [show, setShow] = useState(false);

  return (
    <>
      <div className='heading'>
        <div>
          <i
            class='fas fa-house-user fa-lg'
            style={{ margin: "auto 10px" }}
          ></i>
          <h1
            style={{
              margin: "auto",
              display: "inline-block",
              verticalAlign: "sub",
            }}
          >
            House Price Prediction
          </h1>
        </div>
      </div>
      <Container style={{ padding: 0, margin: 0, maxWidth: "100%" }}>
        <Row style={{ maxWidth: "100%", margin: 0 }}>
          <Col md={12} lg={6} className='left-panel'>
            <div style={{ width: "80%", margin: "auto" }}>
              <h3>How does it work?</h3>
              <p>
                This a website giving you predictions about house prices in
                Bangalore. The model is built using python and sklearn machine
                learning library.
              </p>
              <p>
                You just type in a location from Bangalore, and provide valid
                square footage and numbers of bedrooms and bathrooms, and voila!
                You've got your prediction!{" "}
              </p>
            </div>
          </Col>
          <Col className='right-panel'>
            <div>
              <div style={{ width: "80%", margin: "auto", minWidth: 350 }}>
                {loaded ? (
                  <Alert variant='success'>Model Loaded Successfully!</Alert>
                ) : (
                  <Alert variant='danger'>
                    Model is loading! Please wait..
                  </Alert>
                )}
                <Form>
                  <Row>
                    <Col sm={12} md={6}>
                      <Form.Group className='mb-3'>
                        <Form.Label style={{ float: "left" }}>
                          Location
                        </Form.Label>
                        {/* <Form.Select aria-label='Default select example'>
                          <option>Open this select menu</option>
                          <option value='Whitefield'>Whitefield</option>
                          <option value='Anekal'>Anekal</option>
                          <option value='Akshaya Nagar'>Akshaya Nagar</option>
                        </Form.Select> */}
                        <Form.Control
                          type='text'
                          name='location'
                          placeholder='Whitefield'
                          value={details.location}
                          onChange={changeDetails}
                        />
                      </Form.Group>
                    </Col>
                    <Col sm={12} md={6}>
                      <Form.Group className='mb-3'>
                        <Form.Label style={{ float: "left" }}>
                          Square Foot
                        </Form.Label>
                        <Form.Control
                          type='number'
                          name='sqft'
                          placeholder='1500'
                          value={details.sqfoot}
                          onChange={changeDetails}
                        />
                      </Form.Group>
                    </Col>
                  </Row>

                  <Row>
                    <Col sm={12} md={6}>
                      <Form.Group className='mb-3'>
                        <Form.Label style={{ float: "left" }}>
                          No. of Bathrooms
                        </Form.Label>
                        <Form.Control
                          type='number'
                          name='bath'
                          placeholder='2'
                          value={details.bath}
                          onChange={changeDetails}
                        />
                      </Form.Group>
                    </Col>
                    <Col sm={12} md={6}>
                      <Form.Group className='mb-3'>
                        <Form.Label style={{ float: "left" }}>BHK</Form.Label>
                        <Form.Control
                          type='number'
                          name='bhk'
                          placeholder='2'
                          value={details.bhk}
                          onChange={changeDetails}
                        />
                      </Form.Group>
                    </Col>
                  </Row>
                </Form>
              </div>
              <Button variant='success' onClick={submit}>
                Get Prediction
              </Button>{" "}
            </div>
          </Col>
        </Row>

        <Modal show={show} onHide={() => setShow(false)} centered>
          <Modal.Header closeButton>
            <Modal.Title>Prediction</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <p>The predicted price is:</p>
            <h3>{result} lacs!</h3>
          </Modal.Body>
          <Modal.Footer>
            <Button variant='success' onClick={() => setShow(false)}>
              Close
            </Button>
          </Modal.Footer>
        </Modal>

        <Modal show={error} onHide={() => setError(false)} centered>
          <Modal.Header closeButton>
            <Modal.Title>Error</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <h3>Server Error!</h3>
          </Modal.Body>
          <Modal.Footer>
            <Button variant='success' onClick={() => setError(false)}>
              Close
            </Button>
          </Modal.Footer>
        </Modal>
      </Container>
    </>
  );
}

export default Home;
