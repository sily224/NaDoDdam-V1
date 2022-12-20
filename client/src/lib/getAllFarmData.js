import axios from "axios";

const getAllFarmData = async () => {

  const response = await axios.get('mock_data/farms.json').then(res=>{
    return res.data;
  })

  return response;
}



export default getAllFarmData;