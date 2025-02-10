import './App.css';
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { CreateTodo } from "./components/createTodo";
import ShowTodoList from './components/showTodoList';
import LoginForm from './components/login';


import RegisterForm from './components/register';


function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>

          <Route path="/" element={<ShowTodoList />} />
          <Route path="/login" element={<LoginForm />} />
         

          <Route path="/login" element={<LoginForm />} />
          <Route path="/register" element={<RegisterForm />} />
          <Route path="/" element={<ShowTodoList />} />
          

        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
