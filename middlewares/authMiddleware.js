let jwt = require('jsonwebtoken');

let validateUser = (req, res, next) => {
    const jwtHeaderToken = req.headers['authorization'];
   
    if(typeof jwtHeaderToken !== 'undefined')
    {
        const token = jwtHeaderToken.split(' ');
        const rawToken = token[1];

        req.token = rawToken;

        next()
    }

    else {
        res.json({err: 'Forbidden, Auth Token Is Not Found'})
    }
}

let verifyToken = (req, res, next) => {
    console.log('token here header',req.rawHeaders[3])
    
    jwt.verify(req.rawHeaders[3], 'somerandomSecretKey', (err, data) => {
        if(err){
            res.json({err: 'Validation Is Failed'})
        }
        else{
            next()
        }
    })
}


module.exports = {
    validateUser,
    verifyToken
}