const Employee = require("../models/Employee");

const addEmployee=async(req,res)=>{

    try {
        const body=req.body;
        body.image=req.file?req.file?.path : null;
        const emp=new Employee(body);
        await emp.save()
        res.status(201).json({
            message:'employee added',
            success:true
        })
        
    } catch (error) {
       res.status(500).json({
        message:"Intrenal server error",
        success:false,
        error:error
       }) 
    }
}

const getAllEmployee=async(req,res)=>{

    try {
        const emps=await Employee.find({});
        res.status(200).json({
            message:'employees retrieved',
            success:true,
            data:emps
        })
        
    } catch (error) {
       res.status(500).json({
        message:"Intrenal server error",
        success:false,
        error:error
       }) 
    }
}

const updateEmployee=async(req,res)=>{

    try {
        const {name,jobRole,dob,tel,bankNo,address,nic,startDate,endDate} =req.body;
        const {id}=req.params;
        
        let updateData={
            name,jobRole,dob,tel,bankNo,address,nic,startDate,endDate
        }

        if(req.file){
            updateData.image=req.file.path;
        }
        const  updatedEmployee=await Employee.findByIdAndUpdate(id,updateData,{new:true})

        if(!updatedEmployee){
            return res.status(404).json({
                message:"Employee not found"
            })
        }
        res.status(200).json({
            message:'employee added',
            success:true,
            data:updatedEmployee
        })
        
    } catch (error) {
       res.status(500).json({
        message:"Intrenal server error",
        success:false,
        error:error
       }) 
    }
}

const getEmployeeById=async(req,res)=>{

    try {
        const {id}=req.params;
        const emp=await Employee.findOne({_id:id});
        res.status(200).json({
            message:'employee retrieved',
            success:true,
            data:emp
        })
        
    } catch (error) {
       res.status(500).json({
        message:"Intrenal server error",
        success:false,
        error:error
       }) 
    }
}

const deleteEmployee=async(req,res)=>{

    try {
        const {id}=req.params;
        const emp=await Employee.findByIdAndDelete({_id:id});
        res.status(200).json({
            message:'employee deleted',
            success:true,

        })
        
    } catch (error) {
       res.status(500).json({
        message:"Intrenal server error",
        success:false,
        error:error
       }) 
    }
}

module.exports={
    addEmployee,
    getAllEmployee,
    getEmployeeById,
    deleteEmployee,
    updateEmployee
}