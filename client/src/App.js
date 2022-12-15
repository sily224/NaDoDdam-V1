import { BrowserRouter, Route, Routes } from "react-router-dom";
import "./App.css";
import Layout from "./pages/Layout/Layout";
import Home from "./pages/Layout/Home";
import Pay from "./pages/Pay/Pay";

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route element={<Layout />}>
            <Route path="/" element={<Home />} />
            <Route path="/pay" element={<Pay />} />
            {/* 해당부분에 라우터 넣으면 됩니다. */}
          </Route>
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
