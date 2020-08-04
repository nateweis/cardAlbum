const db = require('../db/db_connection');

const login = (req, res) => {
    db.one('SELECT * FROM users WHERE username = $1', req.body.username)
    .then(data => {
        if(data.password === req.body.password){
            req.session.currentUser = data;
            res.json({message: 'you are logged in', data})
        }
        else res.json({message: 'wrong password'})
    })
    .catch(err => res.json({err, message: 'wrong username'}))
}

const getUserInfo = (req, res) => {
    if(req.session.currentUser) res.json({data: req.session.currentUser})
    else res.json({data: {}})
}



module.exports = {
    login,
    getUserInfo
}
