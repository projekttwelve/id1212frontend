import logo from './logo.svg';
import './App.css';
import Login from './pages/Login';
import Home from "./pages/Home";
import Quiz from "./pages/Quiz";
import Results from "./pages/Results";
import Quizpage from "./pages/Quizpage";
import Register from "./pages/Register";
import { Route, Routes } from "react-router-dom";

function App() {
  return (
    <div className="App">
            <Routes>
                <Route exact path="/" element={<Login/>} />
                <Route path="/home" element={<Home/>} />
                <Route path="/quiz" element={<Quiz/>} />
                <Route path="/results" element={<Results/>} />
                <Route path="/quizpage" element={<Quizpage/>} />
                <Route path="/register" element={<Register/>} />
            </Routes>
    </div>
  );
}

export default App;
