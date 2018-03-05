let mongoose = require('mongoose');
let Project = require('../models/project')


let addProject = (req, res) => {

    var addProjects = new Project(req.body);
    addProjects.save().then(result => {
        res.json({'msg': 'New Project Created'})
    }).catch(err => {
        console.log(err)
    })
}

let viewProjects = (req, res) => {
    var projectData = Project.find().then(data => {
        if(data) {
            res.json({'proData': data})
        }
        else{
            res.json({'msg': 'No Projuct Found'})
        }
    });

}

let UpdateProjects = (req, res) => {
    var projectToUpdate = req.params.id;
    
    Project.findById(projectToUpdate).then((model) => {
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


let addEMploToProj = (req, res) => {
    var id = req.params.id;

    Project.findOneAndUpdate({_id: id}, {$push:{developers: req.body.developer}}, {new: true}, function(err, doc){
        if(err){
            console.log("Something wrong when updating data!");
        }
    
        res.json({'msg': 'New Employee Is Adedd'})
    });
}

let RemoveEmployee = (req, res) => {
    var name = req.body.name;
    var id = req.params.id;

    Project.update({
        _id: id
    }, {
        $pull: {
            developers: name
        }
    }).then(result => {
        res.json({'msg': 'Employee Is Removed'})
    }).catch(err => console.log(err)) 
   
}


module.exports = {
    addProject,
    viewProjects,
    UpdateProjects,
    addEMploToProj,
    RemoveEmployee

}