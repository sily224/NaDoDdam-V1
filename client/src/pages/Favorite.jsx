import axios from "axios";
import FarmList from "../components/ItemList";

const likes = async () => {
  const token = localStorage.getItem('token');
  const header = {
    headers: {
      authorization: `Bearer ${token}`,
      "Content-Type": "application/json"
    }
  }
  // 찜 목록 데이터 조회
  const likes = await axios.get('http://localhost:3500/api/like', header)
  .then(res=>console.log(res.data));

}

const Favorite = () => {

  likes();
  
  return (
    <div>
      <h2>찜 목록</h2>
      <FarmList contents={[]}/>
    </div>
  );
}

export default Favorite;