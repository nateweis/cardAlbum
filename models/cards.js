const db = require('../db/db_connection');

const getUsersCards = (req, res) => {
    console.log(req.session.currentUser)
    // if logged in
    // grab user's db stuff and send back
}

module.exports = {
    getUsersCards
}