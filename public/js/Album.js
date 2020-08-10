export const album =  ['$http', '$rootScope', function($http, $rootScope){
    //get the this
    const ctrl = this;
    
    this.packName = '';
    this.allCards = [];
    this.yourCards = [];

    // ================================== //
    //    Little Qulity of app Stuff      //
    // ================================== // 
    
    // the dropdown sort menu
    this.filterMenu = false;
    this.doTheSlide = false;
    this.mainMenuClass = 'slide_out_left';
    this.secondMenuClass = 'slide_in_left';
    this.whichMenu = 'filter'; 

    this.changeFilterMenu = () => {
        ctrl.filterMenu = !ctrl.filterMenu
        if(ctrl.filterMenu === false) this.resetFilter()
    }
    this.slideTo = function(menu){
        this.doTheSlide = true;
        this.mainMenuClass = 'slide_out_left';
        this.secondMenuClass = 'slide_in_left';
        this.whichMenu = menu;
    }
    this.secondSlider = function(){
        this.mainMenuClass = 'slide_in_right';
        this.secondMenuClass = 'slide_out_right';
        this.radioBtnVal = {S: 'all', T : 'all', M : 'all'};
        this.inputVal = {};
    }
    
    // the filter and sort options 
    this.filter = [{"key":"type","val":"Spell Card"},{"key":"type","val":"Trap Card"},{"key":"atk","val":true}]
    this.radioBtnVal = {S: 'all', T : 'all', M : 'all'}
    this.filterArr = [];

    this.filterSelected = function(){
        const radio = this.radioBtnVal
        if(radio['S'] === 'all')ctrl.filterArr.push({key: 'type', val: 'Spell Card'})
        if(radio['T'] === 'all')ctrl.filterArr.push({key: 'type', val: 'Trap Card'})
        if(radio['M'] === 'all')ctrl.filterArr.push({key: 'atk', val: true})

        this.filter = this.filterArr;
        this.resetFilter();
        this.filterMenu = false;
    }
    this.checkChange = function(key, val){
        const obj = {key, val}
        if(this.inputVal[val]) this.filterArr.push(obj)
        else {
            for(let i = 0; i < ctrl.filterArr.length; i++){
                if(ctrl.filterArr[i].val === val) ctrl.filterArr.splice(i, 1)
            }
        }
    }
    this.resetFilter = function(){
        this.filterArr = [];
        this.inputVal = {};
        this.radioBtnVal = {S: 'all', T : 'all', M : 'all'}
        this.whichMenu = 'filter'; 
        this.doTheSlide = false;
    }

    // card details when hover over card
    this.mouseOverCard = {};
    this.getCardDetails = card => {if(!ctrl.cardLock) ctrl.mouseOverCard = card}

    // lock card when clicked
    this.cardLock = false;
    this.changeCardlock = () => ctrl.cardLock = !ctrl.cardLock
    

    // nav bar click
    this.includePath = 'partials/Home.html'
    this.changeIncludePath = path => {
        ctrl.includePath = `partials/${path}.html`;
        ctrl.mouseOverCard = {};
        ctrl.cardLock = false;
    }

    // ================================== //
    //         Get User's Cards           //
    // ================================== //

    $rootScope.$on('fireFunc', ()=>ctrl.getUsersCards())

    this.getUsersCards = function(){

        $http({method: 'GET', url: '/cards'})
        .then(data => {ctrl.yourCards = data.data.cards; console.log(data.data.cards)})
        .catch(err => console.log(err))

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
            ctrl.changeIncludePath('Cards')
            ctrl.packName = pack
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
                ctrl.updateAlbum(c)
                addCard = false
            }
        });
        if(addCard){
            const newCard = {
                atk: card.atk || null,
                attribute: card.attribute || null,
                card_images : [],
                def: card.def || null,
                desc: card.desc,
                api_id : card.id,
                level : card.level || null,
                name: card.name,
                race: card.race,
                type: card.type,
                rarity: card.card_sets[0].set_rarity_code,
                user_id: user,
                favorite: false,
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

    // ================================== //
    //           Update Album             //
    // ================================== //
    this.updateAlbum = function(card){
        $http({method: 'PUT', url: '/cards', data: card})
        .then(data => console.log(data))
        .catch(err => console.log(err))
    }


}]
