const express = require('express');
const employeeRouter = require('./routes/EmployeeRoute'); 
const mongoose = require('mongoose');
const cors = require('cors');
const bodyParser=require('body-parser')

const app = express();

app.use(bodyParser.json())
app.use(cors());

async function connectDB() {
    try {
      await mongoose.connect('mongodb+srv://kulampooja:Password123@cluster0.u4mtq.mongodb.net/employee', {
        useNewUrlParser: true,
        useUnifiedTopology: true,
      });
      console.log('DB connected');
    } catch (error) {
      console.error('DB connection error:', error);
    }
  }
  
  connectDB();


app.use('/uploads', express.static('uploads')); 

app.use('/api/employees', employeeRouter); 

const PORT = process.env.PORT || 4000;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
