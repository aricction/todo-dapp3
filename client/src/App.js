import './App.css';
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { CreateTodo } from "./components/createTodo";
import ShowTodoList from './components/showTodoList';
import LoginForm from './components/login';
<<<<<<< HEAD
=======
import RegisterForm from './components/register';

>>>>>>> 84f2da2 (added ai and blockchain)
function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
<<<<<<< HEAD
          <Route path="/" element={<ShowTodoList />} />
          <Route path="/login" element={<LoginForm />} />
         
=======
          <Route path="/login" element={<LoginForm />} />
          <Route path="/register" element={<RegisterForm />} />
          <Route path="/" element={<ShowTodoList />} />
          
>>>>>>> 84f2da2 (added ai and blockchain)
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
