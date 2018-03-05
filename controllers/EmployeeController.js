let mongoose = require('mongoose');
let Employee = require('../models/employee')


let addEmployees = (req, res) => {

    var addEmployee = new Employee(req.body);
    addEmployee.save().then(result => {
        res.json({'msg': 'New Employee Created'})
    }).catch(err => {
        console.log(err)
    })
}

let viewEmployee = (req, res) => {
    var employeeData = Employee.find().then(data => {
        if(data) {
            res.json({'empData': data})
        }
        else{
            res.json({'msg': 'No Employee Found'})
        }
    });

}

let UpdateEmployee = (req, res) => {
    var employeeToUpdate = req.params.id;
    
    Employee.findById(employeeToUpdate).then((model) => {
        return Object.assign(model, req.body);
    }).then((model) => {
        return model.save();
    }).then((updatedModel) => {
        res.json({
            msg: 'model updated',
            updatedModel
        });
    }).catch((err) => {
        res.send(err);
    });

}

module.exports = {
    addEmployees,
    viewEmployee,
    UpdateEmployee

}