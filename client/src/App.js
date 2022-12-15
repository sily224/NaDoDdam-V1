import { BrowserRouter, Route, Routes } from "react-router-dom";
import "./App.css";
import Layout from "./pages/Layout";
import MyPage from './pages/MyPage';

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route element={<Layout />}>
            <Route path="/" element={<MyPage />} />
            {/* 해당부분에 라우터 넣으면 됩니다. */}
          </Route>
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;