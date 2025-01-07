import {BrowserRouter as Router, Route, Routes} from "react-router-dom"
import Header from "./components/header/Header"
import Main from "./components/main/Main";
import QuestionForm from "./components/questionForm/QuestionForm";
import Login from "./components/login/Login";
import Register from "./components/register/Register";
import QuestionPage from "./components/questionPage/QuestionPage";
import ProfilePage from "./components/profile/ProfilePage";
import UserPage from "./components/userPage/UserPage";
import EditForm from "./components/questionForm/EditForm";

function App() {

  return (
    <div className="flex flex-col items-center bg-jinx-pants h-full min-h-screen"
     >
      <Router>
        <Header/>
        <Routes>
          <Route path="/" element={<Main/>}></Route>
          <Route path="/form" element={<QuestionForm/>}></Route>
          <Route path="/edit/:id" element={<EditForm/>}></Route>
          <Route path="/login" element={<Login/>}></Route>
          <Route path="/register" element={<Register/>}></Route>
          <Route path="/questions/:id" element={<QuestionPage/>}></Route>
          <Route path="/profile" element={<ProfilePage/>}></Route>
          <Route path="/user/:id" element={<UserPage/>}></Route>
        </Routes>
      </Router>
    </div>
  );
}

export default App;
