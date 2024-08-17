const express = require('express');
const Employee = require('../models/Employee'); 
const { cloudinaryFileUploader } = require('../middleware/FileUploader');
const { addEmployee, getAllEmployee, getEmployeeById, deleteEmployee, updateEmployee } = require('../controllers/EmployeeController');


const router = express.Router();


router.get('/view', getAllEmployee);

router.post('/', cloudinaryFileUploader.single('image'), addEmployee);

router.put('/:id', cloudinaryFileUploader.single('image'), updateEmployee);

router.get('/:id', getEmployeeById);

router.delete('/:id', deleteEmployee);

module.exports = router;
