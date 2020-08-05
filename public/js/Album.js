export const album =  ['$http', function($http){
    //get the this
    const ctrl = this;
    
    this.allCards = [];
    this.yourCards = [];
    this.includePath = 'partials/Home.html'
    this.changeIncludePath = path => ctrl.includePath = `partials/${path}.html`

    // ================================== //
    //         Get User's Cards           //
    // ================================== //

    this.getUsersCards = function(){
        $http({
            method: 'GET',
            url: '/cards'
        })
    }

    // ================================== //
    //        Get All the Cards           //
    // ================================== //
    
    this.getCards = function(pack){
        $http({
            method:'GET',
            url: 'https://db.ygoprodeck.com/api/v7/cardinfo.php?cardset=' + pack
        })
        .then(function(res){
            // console.log(res.data.data)
            ctrl.allCards = res.data.data
        })
        .catch((err) => {
            console.log(err)
        })
    }

    // ================================== //
    //        Add to Your Cards           //
    // ================================== //
    this.addCardToAlbum = function(card, user){
        let addCard = true;
        this.yourCards.forEach(c => {
            if(c.api_id === card.id){
                c.ammount++
                // updateAlbum(c, user)
                addCard = false
            }
        });
        if(addCard){
            const newCard = {
                atk: card.atk,
                attribute: card.attribute,
                card_images : [],
                def: card.def,
                desc: card.desc,
                api_id : card.id,
                level : card.level,
                name: card.name,
                race: card.race,
                type: card.type,
                ammount : 1
            }
            newCard.card_images[0] = card.card_images[0].image_url
            newCard.card_images[1] = card.card_images[0].image_url_small
            
            ctrl.yourCards.push(newCard);
            ctrl.sendCardToBackend(newCard, user);
        }
    }

    // ================================== //
    //        Send Card to Backend        //
    // ================================== //
    this.sendCardToBackend = function(card, user){
        $http({method: 'POST', url: '/cards', data:{card, user}})
        .then(data => console.log(data.data))
        .catch(err => console.log(err))
    }


}]
