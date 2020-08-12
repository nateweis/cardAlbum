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

    this.sortOption = 'rarity';
    this.changeSort = (str) => {
        ctrl.sortOption = str;
        ctrl.changeFilterMenu()
    }

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
        this.radioBtnVal = 'X';
        this.inputVal = {};
    }
    
    // ================================== //
    //         Filter Handleing           //
    // ================================== // 
    this.filter = [{"key":"return","val":"all"}]
    this.radioBtnVal = 'X'
    this.filterArr = [];

    this.switchCardType = () => ctrl.filterArr =[]
    this.filterSelected = function(){
        const ar = [];
        const radio = this.radioBtnVal
        if(radio === 'S' && this.filterArr.length === 0)ctrl.filterArr.push({key: 'type', val: [...ar, 'Spell Card']})
        if(radio === 'T' && this.filterArr.length === 0)ctrl.filterArr.push({key: 'type', val: [...ar, 'Trap Card']})
        if(radio === 'M' && this.filterArr.length === 0)ctrl.filterArr.push({key: 'atk', val: [...ar, true]})
        if(radio === 'X') ctrl.filterArr.push({"key":"return","val":"all"})
        
   
        this.filter = this.filterArr;
        this.resetFilter();
        this.filterMenu = false;
    }

    this.checkChange = function(key, val){
        const existingkey = this.filterArr.map(x=>{return x.key}).indexOf(key);

        if(existingkey !== -1){ //if this key alraey exists 
            if(ctrl.inputVal[val]) ctrl.filterArr[existingkey].val.push(val)
            else{
                let arr = ctrl.filterArr[existingkey].val
                for(let i = 0; i < arr.length; i++){
                    if(arr[i] === val) ctrl.filterArr[existingkey].val.splice(i, 1)
                }
                if(ctrl.filterArr[existingkey].val.length === 0){
                    for(let i = 0; i < ctrl.filterArr.length; i++){
                        if(ctrl.filterArr[i].key === key) ctrl.filterArr.splice(i, 1)
                    }
                }
            }
        }
        else{ // if key dosnt exist
            const nV = [];
            nV.push(val)
            this.filterArr.push({key, val: nV})
        }

    }

    this.resetFilter = function(){
        this.filterArr = [];
        this.inputVal = {};
        this.radioBtnVal = 'X'
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
            const cardRarity = card.card_sets[0].set_rarity_code === '(SP)'? '(C)': card.card_sets[0].set_rarity_code;
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
                rarity: cardRarity,
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
