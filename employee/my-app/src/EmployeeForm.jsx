import React, { useState, useEffect } from 'react';
import './EmployeeForm.css'; 
import axios from 'axios';
import uploadImg from '../src/assets/uploadImg.jpg';
import { useNavigate, useLocation } from 'react-router-dom';
import { toast } from 'react-toastify';

const EmployeeForm = () => {
    const [employee, setEmployee] = useState({
        name: '',
        tel: '',
        jobRole: '',
        dob: '',
        bankNo: '',
        address: '',
        nic: '',
        startDate: '',
        endDate: '',
        image: ''
    });
    const [imagePreview, setImagePreview] = useState(uploadImg);
    const navigate = useNavigate();
    const location = useLocation();
    const selectedEmployee = location.state?.employee;

    useEffect(() => {
        if (selectedEmployee) {
            const formattedEmployee = {
                ...selectedEmployee,
                dob: selectedEmployee.dob ? new Date(selectedEmployee.dob).toISOString().split('T')[0] : '',
                startDate: selectedEmployee.startDate ? new Date(selectedEmployee.startDate).toISOString().split('T')[0] : '',
                endDate: selectedEmployee.endDate ? new Date(selectedEmployee.endDate).toISOString().split('T')[0] : '',
            };
            setEmployee(formattedEmployee);
            setImagePreview(`http://localhost:4000/uploads/${selectedEmployee.image}` || uploadImg);
        }
    }, [selectedEmployee]);
    

    const handleClick = () => {
        navigate('/');
    };

    const handleChange = (e) => {
        const name = e.target.name;
        const value = e.target.value;
        setEmployee(prevState => ({ ...prevState, [name]: value }));
    };

    const handleImageChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            const url = URL.createObjectURL(file);
            setImagePreview(url);
            setEmployee(prevState => ({ ...prevState, image: file }));
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!employee.image) {
            alert('Please upload an image.');
            return;
        }

        const formData = new FormData();
        for (const key in employee) {
            formData.append(key, employee[key]);
        }

        let response;
    if (selectedEmployee) {
        // Update existing employee
        response = await axios.put(`http://localhost:4000/api/employees/${selectedEmployee._id}`, formData);
    } else {
        // Add new employee
        response = await axios.post('http://localhost:4000/api/employees/', formData);
    }

    if (response.data.success) {
        setEmployee({
            name: '',
            tel: '',
            jobRole: '',
            dob: '',
            bankNo: '',
            address: '',
            nic: '',
            startDate: '',
            endDate: '',
            image: ''
        });
        setImagePreview(uploadImg);
        toast.success(response.data.message);
        navigate('/');
    } else {
        toast.error(response.data.message);
    }
};

    return (
        <div className="employee-form-popup">
            <div className="employee-form-container">
                <div className="employee-form-header">
                    <h2>{selectedEmployee ? 'Edit Employee' : 'Add Employee'}</h2>
                    <span className="cross-icon" onClick={handleClick}>×</span>
                </div>
                <form onSubmit={(e) => handleSubmit(e)}>
                    <div className="employee-form-inputs">
                        <div className="add-img flex-col">
                            <p>Upload Image</p>
                            <label htmlFor="image">
                                <img src={imagePreview} alt="Preview" />
                            </label>
                            <input onChange={handleImageChange} type="file" id='image' name='image' hidden />
                        </div>
                        <div className="employee-form-input-container">
                            <label htmlFor="name">Name:</label>
                            <input type="text" id="name" name="name" placeholder="Name" value={employee.name} onChange={handleChange} required />
                        </div>
                        <div className="employee-form-input-container">
                            <label htmlFor="address">Address:</label>
                            <input type="text" id="address" name="address" placeholder="Address" value={employee.address} onChange={handleChange} required />
                        </div>
                        <div className="employee-form-input-container">
                            <label htmlFor="tel">Tel No:</label>
                            <input type="text" id="tel" name="tel" placeholder="Tel No" value={employee.tel} onChange={handleChange} required />
                        </div>
                        <div className="employee-form-input-container">
                            <label htmlFor="dob">Date of Birth:</label>
                            <input type="date" id="dob" name="dob" placeholder="Date of Birth" value={employee.dob} onChange={handleChange} required />
                        </div>
                        <div className="employee-form-input-container">
                            <label htmlFor="nic">NIC:</label>
                            <input type="text" id="nic" name="nic" placeholder="NIC" value={employee.nic} onChange={handleChange} required />
                        </div>
                        <div className="employee-form-input-container">
                            <label htmlFor="bankNo">Bank No:</label>
                            <input type="text" id="bankNo" name="bankNo" placeholder="Bank No" value={employee.bankNo} onChange={handleChange} required />
                        </div>
                        <div className="employee-form-input-container">
                            <label htmlFor="jobRole">Job Role:</label>
                            <select id="jobRole" name="jobRole" value={employee.jobRole} onChange={handleChange} required>
                                <option value="">Select Job Role</option>
                                <option value="Developer">Developer</option>
                                <option value="Designer">Designer</option>
                                <option value="Project Manager">Project Manager</option>
                                <option value="Tester">Tester</option>
                            </select>
                        </div>                       
                        <div className="employee-form-input-container">
                            <label htmlFor="startDate">Start Date:</label>
                            <input type="date" id="startDate" name="startDate" placeholder="Start Date" value={employee.startDate} onChange={handleChange} required />
                        </div>
                        <div className="employee-form-input-container">
                            <label htmlFor="endDate">End Date:</label>
                            <input type="date" id="endDate" name="endDate" placeholder="End Date" value={employee.endDate} onChange={handleChange} />
                        </div>
                    </div>
                    <button type="submit" className="employee-form-btn">{selectedEmployee ? 'Update' : 'Add'}</button>
                </form>
            </div>
        </div>
    );
};

export default EmployeeForm;
