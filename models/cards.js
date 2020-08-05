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
    .then(data => res.json({data, ndb: ['album'], msg: newAlbumEntry(data.id, req.body.user)}))
    .catch(err =>{
        if(err.received === 0){ //we nee to make a new album entry
            db.one(sqlNewCard, req.body.card) 
            .then(data => res.json({data, ndb: ['album', 'card'], msg: newAlbumEntry(data.id, req.body.user) }))
            .catch(err => res.json({err, msg: 'didnt work on getting card call back info'}))
        }
        else res.json({err})
    } )
    
}

const newAlbumEntry = (card, user) => {
    
    console.log(`card id => ${card} / user id => ${user}`)
    return "Made it to the new Album Entry maker"
    
}



module.exports = {
    getUsersCards,
    receviedCard
}