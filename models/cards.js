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

    if(req.session.currentUser){
        db.any('SELECT cards.*, albums.*, albums.id as album_id FROM cards JOIN albums ON cards.id = albums.card_id WHERE albums.user_id = $1', req.session.currentUser.id)
        .then(data => { res.json({cards: data, msg: "we got the cards"})})
        .catch(err => res.json({err, msg:"get req didnt pan out"}))
    }
    else{res.json({cards:[]})}
}

const receviedCard = (req, res) => {
   
    // console.log(req.body)
    db.one('SELECT * FROM cards WHERE api_id = $1', req.body.card.api_id)
    .then(data => res.json({data, ndb: ['album'], msg: newAlbumEntry(data.id, req.body.user, data.api_id)}))
    .catch(err =>{
        if(err.received === 0){
            db.one(sqlNewCard, req.body.card) 
            .then(data => res.json({data, ndb: ['album', 'card'], msg: newAlbumEntry(data.id, req.body.user, req.body.card.api_id) }))
            .catch(err => res.json({err, msg: 'didnt work on getting card call back info'}))
        }
        else res.json({err})
    } )
    
}

const newAlbumEntry = (card, user, api) => {
    let succesfullEntry;
    db.none('INSERT INTO albums (card_id, user_id, ammount, favorite, api_number) VALUES($1, $2, 1, false, $3)', [card, user, api])
    .then(()=> succesfullEntry = "successfully added to album")
    .catch(err => succesfullEntry = err)
    
    return succesfullEntry
}

const updateCardInAlbum = (req, res) => {
    db.none('UPDATE albums SET ammount = ${ammount}, favorite = ${favorite} WHERE user_id = ${user_id} AND api_number = ${api_id}', req.body)
    .then(()=>res.json({msg:"updated to album success"}))
    .catch(err=>res.json({err, msg:"failed update to album"}))
}

const deleteCardFromAlbum = (req , res) => {
    const ids = req.params.id.split('&')
    ids[0] = parseInt(ids[0])
    ids[1] = parseInt(ids[1])
    
    db.none('DELETE FROM albums WHERE user_id = $1 AND api_number = $2', ids)
    .then(()=>res.json({msg:"successfully removed card from album"}))
    .catch(err=>res.json({err, msg:"failed delete from album"}))
}





module.exports = {
    getUsersCards,
    receviedCard,
    updateCardInAlbum,
    deleteCardFromAlbum
}