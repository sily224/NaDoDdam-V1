import FarmList from "../components/ItemList";


const Favorite = () => {
  return (
    <div>
      <h2>찜 목록</h2>
      <FarmList contents={[]}/>
    </div>
  );
}

export default Favorite;