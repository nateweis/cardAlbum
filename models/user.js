const db = require('../db/db_connection');
/*
// ***** If want to do encryption........
const bcrypt = require('bcrypt')

//  ******* Add this before the db query in the newUser function ********
req.body.password = bcrypt.hashSync(req.body.password, bcrypt.genSaltSync(10));

// ******* Replace this if instead of (data.password === req.body.password) in the login func ******
(bcrypt.compareSync(req.body.password, data.password))
*/

const newUser = (req, res) => {
    db.none('INSERT INTO users (username, password) VALUES (${username}, ${password})', req.body)
    .then(()=>res.json({msg:'new user added'}))
    .catch(err => res.json({err, msg: 'there was an err making a new user'}))
}


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

const deleteSession = (req, res) => {
    req.session.destroy(() => res.json({message:"logout success"}))
}




module.exports = {
    login,
    getUserInfo,
    deleteSession,
    newUser
}
