const db = require('../db/db_connection');

const login = (req, res) => {
    console.log("Say Hi")
    console.log(req.body)
}

module.exports = {
    login
}
