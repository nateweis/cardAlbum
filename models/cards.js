const db = require('../db/db_connection');

/* *****************************************
             SQL File Retrive 
********************************************/
const path = require('path');
const QueryFile = require('pg-promise').QueryFile;

function sql(file) {
    const fullPath = path.join(__dirname, file); 
    return new QueryFile(fullPath, {minify: true});
}
const sqlNewCard = sql('../db/newCard.sql');


/* *****************************************
           Functions for Routes 
********************************************/

const getUsersCards = (req, res) => {
    console.log(req.session.currentUser)
    // if logged in
    // grab user's db stuff and send back
}

const receviedCard = (req, res) => {
   
    // console.log(req.body)
    db.one('SELECT * FROM cards WHERE api_id = $1', req.body.card.api_id)
    .then(data =>{
        res.json({data, message: "card IS in the db"})
        // we need to make a new album entry 
    } )
    .catch(err =>{
        if(err.received === 0){ //we nee to make a new album entree and card and the card id has to be in the album
            db.one(sqlNewCard, req.body.card) 
            .then(data => res.json({data, msg: "inserted a new card"}))
            .catch(err => res.json({err, msg: 'didnt work on getting card call back info'}))
        }
        else res.json({err})
    } )
    
}

const testFunc = (data) => {
    console.log("============================================")
    console.log("======== This one was called ===============")
    console.log("============================================")
    console.log(data)
    
}



module.exports = {
    getUsersCards,
    receviedCard
}