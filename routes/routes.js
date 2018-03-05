module.exports = (function() {
    'use strict';
    const router = require('express').Router();
    const jwt = require('jsonwebtoken');
    const {validateUser, verifyToken} = require('../middlewares/authMiddleware')
    const EmployeeController = require('../controllers/EmployeeController')
    const ProjectController = require('../controllers/ProjectController')
    const ClientController = require('../controllers/clientController')
    router.get('/', function(req, res) {
        res.json({'Welcome':'Welcome To API'});
    });

    router.post('/login', function(req, res) {


        var email = req.body.email;
        var password = req.body.password;
        
        var users = [
            {email: 'email@email.com',
             password: 'abc123'
            },
           
            {email: 'newemail@gmail.com',
             password: 'ytz53'
            },

            {email: 'oldnew@gmail.com',
             password: '123456'
            },
        ]

        var result =  users.filter(item => {
           
            return item.email == email && item.password == password;


        })

        console.log(result)

        if(result.length > 0)
        {  
                jwt.sign({result}, 'somerandomSecretKey', (err, token) => {
                    res.json(token)
                })    

        }
        else{
            res.json({'msg': 'Email And Password Not Found'})
            
        }
        
    });

    //=======================================================================

    router.post('/addEmployee', validateUser, verifyToken, EmployeeController.addEmployees);

    router.post('/addProject', validateUser, verifyToken, ProjectController.addProject);

    router.post('/addClient', validateUser, verifyToken, ClientController.addClient);

//-----------------------------------------------------------------------------


    router.put('/editEmployee/:id', validateUser, verifyToken, EmployeeController.UpdateEmployee);


    router.put('/editProjects/:id', validateUser, verifyToken, ProjectController.UpdateProjects);

    router.put('/editClients/:id', validateUser, verifyToken, ClientController.UpdateClient);

    //=========================================================================

    router.get('/viewEmployees', validateUser, verifyToken, EmployeeController.viewEmployee);


    router.get('/viewProjects', validateUser, verifyToken, ProjectController.viewProjects);


    router.get('/viewClients', validateUser, verifyToken, ClientController.viewClients);

    //=========================================================================

    router.put('/addProjToClient/:id', validateUser, verifyToken, ClientController.addProjToClient);

    router.delete('/removeProjects/:id', validateUser, verifyToken, ClientController.RemoveProjects);


        //=========================================================================

        router.delete('/addEmploToProj/:id', validateUser, verifyToken, ProjectController.addEMploToProj);

        router.delete('/removeEmployee/:id', validateUser, verifyToken, ProjectController.RemoveEmployee);
    
    return router;
})();