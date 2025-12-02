import "bootstrap/dist/css/bootstrap.min.css";
import './App.css';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/home";
import Header from "./Components/Header";

function App() {
  return (
    <BrowserRouter>
    <Header/>
    <Routes>
        <Route path="/" exact={true} element= {<Home/>} />
        <Route path="/" exact={true} element= {<Header/>} />
    </Routes>
    
    </BrowserRouter>
  );
}

export default App;
