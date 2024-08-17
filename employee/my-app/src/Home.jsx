import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './Home.css';
import { FaRegEdit } from "react-icons/fa";
import { MdDelete } from "react-icons/md";
import { Link, useNavigate } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';

const EmployeeList = () => {
    const [employees, setEmployees] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {
        axios.get('http://localhost:4000/api/employees/view')
            .then(response => setEmployees(response.data.data))
            .catch(error => console.error(error));
    }, [employees]);

    const handleDelete = (id) => {
        axios.delete(`http://localhost:4000/api/employees/${id}`)
            .then(() => setEmployees(employees.filter(employee => employee._id !== id)))
            .catch(error => console.error(error));
    };

    const onEdit = (employee) => {
        navigate('/editEmployee', { state: { employee } });
    };

    return (
        <div>
            <div>
                Employee
            </div>
            <Link to="/addEmployee" className="add-employee-btn">Add Employee</Link>
            <div className="form"></div>
            <table>
                <thead>
                    <tr>
                        <th>Employee ID</th>
                        <th>Photo</th>
                        <th>Full Name</th>
                        <th>Job Title</th>
                        <th>Date of Birth</th>
                        <th>Telephone</th>
                        <th>Address</th>
                        <th>NIC</th>
                        <th>Bank Number</th>
                        <th>Start Date</th>
                        <th>End Date</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {employees?.map(employee => (
                        <tr key={employee._id}>
                            <td>{employee._id}</td>
                            <td><img src={`http://localhost:4000/uploads/${employee.image}`} alt="Employee" style={{ width: '50px', height: '50px' }} /></td>
                            <td>{employee.name}</td>
                            <td>{employee.jobRole}</td>
                            <td>{new Date(employee.dob).toLocaleDateString()}</td>
                            <td>{employee.tel}</td>
                            <td>{employee.address}</td>
                            <td>{employee.nic}</td>
                            <td>{employee.bankNo}</td>
                            <td>{new Date(employee.startDate).toLocaleDateString()}</td>
                            <td>{employee.endDate ? new Date(employee.endDate).toLocaleDateString() : 'N/A'}</td>
                            <td className='buttons'>
                                <button className="edit-btn" onClick={() => onEdit(employee)}><FaRegEdit /></button>
                                <button className="delete-btn" onClick={() => handleDelete(employee._id)}><MdDelete /></button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default EmployeeList;
