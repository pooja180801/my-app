const mongoose = require('mongoose');

const employeeSchema = new mongoose.Schema({
    name: { type: String, required: true },
    tel: { type: String, required: true },
    jobRole: { type: String, required: true },
    dob: { type: Date, required: true },
    bankNo: { type: String, required: true },
    address: { type: String, required: true },
    nic: { type: String, required: true },
    startDate: { type: Date, required: true },
    endDate: { type: Date },
    image: { type: String }

});

module.exports = mongoose.model('Employee', employeeSchema);
