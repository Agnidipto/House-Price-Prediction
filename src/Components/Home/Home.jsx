import React, { useEffect, useState } from "react";
import "./Home.css";
import {
  Button,
  Form,
  Row,
  Col,
  Container,
  Modal,
  Alert
} from "react-bootstrap";
import getPredictions, { loadModel, getLocations } from "./HomeService";

function Home(props) {
  const [loaded, setLoaded] = useState(false);
  const [error, setError] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [locations, setLocations]=useState([]);

  const initiate = () => {
    loadModel()
      .then((res) => {
        if (res.data.msg === "Load Successful") setLoaded(true);
      })
      .catch((err) => {
        console.log(err.message);
        setError(true);
        setErrorMessage("Server Error!");
      });

    getLocations().then (res => {
      setLocations(res.data["locations"]);
    }).catch(err => {
      console.log(err.message)
      setError(true);
      setErrorMessage("Failed to get Locations! Server Error!");
    })
  };

  const [details, setDetails] = useState({
    location: "Whitefield",
    sqft: 1000,
    bath: 2,
    bhk: 3,
  });

  const changeDetails = (event) => {
    setDetails({ ...details, [event.target.name]: event.target.value });
  };

  const [result, setResult] = useState("");

  const submit = (event) => {
    event.preventDefault();

    Object.keys(details).forEach(function(key) {
      if(details[key]==="" || !details[key]) {
        setError(true);
        setErrorMessage("Fields cannot be empty!")
      }
    })



    getPredictions(details).then((res) => {
      // console.log(res.data);
      setResult(res.data.estimated_price);
      setShow(true);
    }).catch( err => {
      console.log(err.message)
      setError(true);
      setErrorMessage(""+err.message)}
    );
  };

  useEffect(() => {
    initiate();
  }, []);

  const [show, setShow] = useState(false);

  function capitalize(input) {  
    var words="a b c d e";
    words = input.split(" ");
    if (typeof(words[0]) != "undefined") {
    for (let i = 0; i < words.length; i++) {
      if (typeof(words[i]) != "undefined")
      words[i] = (typeof(words[i][0]) !=="undefined"?  words[i][0].toUpperCase() : "") + words[i].substr(1);
    }
    return words.join(" "); 
    }
    return "Error";
  }   

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
              <br/>
              <p>
                This is a website giving you predictions about house prices in
                Bangalore. The model is built using python and sklearn machine
                learning library.
              </p>
              <p>
                You just select a location in Bangalore, and provide valid
                square footage and numbers of bedrooms and bathrooms, and voila!
                You've got your prediction!{" "}
              </p>

              <a href="https://apartment-backend-flask.herokuapp.com/get_location_names"><p>This is a link to the API returning the location names in Bangalore.</p></a>
              
              <p>Here's to the links to the Github repos if you want to have a look:</p>
              <br/>
              <div style={{width:"30%", margin:"auto"}}>
              <a href="https://github.com/agsin/House-Price-Prediction"><p style={{textAlign:"center"}}><i class="fab fa-github fa-lg" ></i> Frontend React Link</p></a>
              <a href="https://github.com/chakiAunkit/House-Price-Prediction"><p style={{textAlign:"center"}}><i class="fab fa-github fa-lg"></i> Backend Flask Link</p></a>
              </div>
              <br/>
              <p style={{fontSize:"0.7rem"}}>(Note : The app takes the float of any decimal value entered)</p>
              
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
                    <Form.Label style={{ float: "left" }}>
                          Location
                        </Form.Label>
                    <Form.Select aria-label="Default select example"
                      name="location"
                      placeholder="Whitefield"
                      value={details.location}
                      onChange={changeDetails}>
                      <option disabled>Select the location</option>
                      {locations.map(l => <option value={l} >{capitalize(l)}</option>)}
                    </Form.Select>
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
                          value={details.sqft}
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
                        <Form.Label style={{ float: "left" }}>No. of Bedrooms</Form.Label>
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
        <div className="footer"> 
          <div style={{ width: "80%", margin: "auto" }}>
            This App and Website was built by 
            <a href="https://www.linkedin.com/in/aunkit-chaki-38807b174/"> Aunkit Chaki</a> and <a href="https://www.linkedin.com/in/agnidipto-sinha/">Agnidipto Sinha</a>.
            <br/> 
            Contact us if you need anymore info on the same.
          </div>
        </div>

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
            <Modal.Title>Error!</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <h3>{errorMessage}</h3>
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
