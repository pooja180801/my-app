import './App.css';
import EmployeeForm from './EmployeeForm';
import Home from './Home';
import {BrowserRouter,Navigate,Route,Routes} from 'react-router-dom'

function App() {


  return (
    <div>
      <BrowserRouter>
      <Routes>
        <Route path='/' element={<Home/>}/>
        <Route path='/addEmployee' element={<EmployeeForm/>}/>
        <Route path="/editEmployee" element={<EmployeeForm />} />
      </Routes>
      </BrowserRouter>
    </div>
  )
}

export default App;
