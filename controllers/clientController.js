let mongoose = require('mongoose');
let Client = require('../models/client')


let addClient = (req, res) => {

    var addClients = new Client(req.body);
    addClients.save().then(result => {
        res.json({'msg': 'New Client Created'})
    }).catch(err => {
        console.log(err)
    })
}

let viewClients = (req, res) => {
    var clientData = Client.find().then(data => {
        if(data) {
            res.json({'proData': data})
        }
        else{
            res.json({'msg': 'No Projuct Found'})
        }
    });

}

let UpdateClient = (req, res) => {
    var ClientToUpdate = req.params.id;
    
    Client.findById(ClientToUpdate).then((model) => {
        return Object.assign(model, req.body);
    }).then((model) => {
        return model.save();
    }).then((updatedModel) => {
        res.json({
            msg: 'Client Updated',
            updatedModel
        });
    }).catch((err) => {
        res.send(err);
    });

}


let addProjToClient = (req, res) => {
    var id = req.params.id;

    Client.findOneAndUpdate({_id: id}, {$push:{projectNames: req.body.projectNames}}, {new: true}, function(err, doc){
        if(err){
            console.log("Something wrong when updating data!");
        }
    
        res.json({'msg': 'New Project Is Adedd'})
    });
}

let RemoveProjects = (req, res) => {
    var name = req.body.name;
    var id = req.params.id;

    Client.update({
        _id: id
    }, {
        $pull: {
            projectNames: name
        }
    }).then(res => {
        res.json({'msg': 'Project Is Removed'})
    })   
   
}


module.exports = {
    addClient,
    viewClients,
    UpdateClient,
    addProjToClient,
    RemoveProjects

}