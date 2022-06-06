import axios from "axios";
import url from "../../Utility/ApiURL";

function loadModel() {
  
  return axios.get(url);
}

function getPredictions(data) {
  // console.log(data);
  var fd = new FormData();
  fd.append('location',data.location);
  fd.append('bhk',Math.floor(data.bhk));
  fd.append('bath',Math.floor(data.bath));
  fd.append('sqft',Math.floor(data.sqft));
  return axios({
    method: "post",
    url: url + "predict_home_price",
    data: fd,
    headers: { "Content-Type": "multipart/form-data" },
  });
}

function getLocations() {
  return axios.get(url+"get_location_names")
}

export default getPredictions;
export { loadModel, getLocations };
