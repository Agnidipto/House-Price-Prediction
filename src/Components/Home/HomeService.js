import axios from "axios";
import url from "../../Utility/ApiURL";

function loadModel() {
  
  return axios.get(url);
}

function getPredictions(data) {
  // console.log(data);
  var fd = new FormData();
  fd.append('location',data.location);
  fd.append('bhk',data.bhk);
  fd.append('bath',data.bath);
  fd.append('sqft',data.sqft);
  return axios({
    method: "post",
    url: url + "predict_home_price",
    data: fd,
    headers: { "Content-Type": "multipart/form-data" },
  });
}

export default getPredictions;
export { loadModel };
