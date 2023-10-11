import { Toaster } from 'react-hot-toast';
import './App.css';
import Login from './Login';
import Signin from './Signin';
import { Todo } from './Todo';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';

function App() {
  return (
    <Router>
      <div>
        <Routes>
          <Route path="/" element={<Todo />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signin" element={<Signin />} />
        </Routes>
      </div>
          <Toaster
            position="top-center"
            reverseOrder={false}
          />
    </Router>
  )

}

export default App;
