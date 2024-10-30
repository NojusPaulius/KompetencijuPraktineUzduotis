import {BrowserRouter as Router, Route, Routes} from "react-router-dom"
import Header from "./components/header/Header"
import Main from "./components/main/Main";
import QuestionForm from "./components/questionForm/QuestionForm";
import Login from "./components/login/Login";
import Register from "./components/register/Register";

function App() {
  return (
    <div>
      <Router>
        <Header/>
        <Routes>
          <Route path="/" element={<Main/>}></Route>
          <Route path="/form" element={<QuestionForm/>}></Route>
          <Route path="/login" element={<Login/>}></Route>
          <Route path="/register" element={<Register/>}></Route>
        </Routes>
      </Router>
    </div>
  );
}

export default App;
