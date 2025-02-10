import './App.css';
import { BrowserRouter, Route, Routes, Navigate } from "react-router-dom";
import ShowTodoList from './components/showTodoList';
import LoginForm from './components/login';
import RegisterForm from './components/register';


function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>

          <Route path="/" element={<LoginForm />} />
          <Route path="/login" element={<Navigate to="/todo" />} />
          <Route path="/register" element={<RegisterForm />} />
          <Route path="/todo" element={<ShowTodoList />} />
  
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
