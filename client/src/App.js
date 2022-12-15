import { BrowserRouter, Route, Routes } from "react-router-dom";
import "./App.css";
import Home from "./pages/home";
import Layout from "./pages/Layout";

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route element={<Layout />}>
            <Route path="/" element={<Home />} />
            {/* 해당부분에 라우터 넣으면 됩니다. */}
          </Route>
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;