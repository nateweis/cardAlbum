import {auth} from './Auth.js'
import {album} from './Album.js'

const app = angular.module('CardAlbum', []);

app.filter('cardFilter', function() {
    const newArr = (arrCards, filter) => {
        let temp = []
 
        arrCards.forEach(card => {
            filter.forEach(f=>{
                const existingCard = temp.map(x=>{return x.api_id}).indexOf(card.api_id);

                if(existingCard === -1){
                    
                    const str = f.val[0] + f.val[1] + f.val[2];

                    if(str === 'S#C' || str === 'T#C'){ //checking the fields that the spell and trap have the same name
                        const newVal = f.val.split(' ')
                        if(newVal[0] === 'S#C'){
                            if(card.type === 'Spell Card' && card.race === newVal[1]) temp.push(card)
                        }
                        else{
                            if(card.type === 'Trap Card' && card.race === newVal[1]) temp.push(card)
                        }
                    }
                    else if (f.key === 'atk' && card[f.key] !== null){temp.push(card)} //then cheking if its the 'all monsters' case
                    else if(card[f.key] === f.val){temp.push(card)} //now checking the rest of the fiels cases
                }
                 
            })
        });
       return temp 
    }
    return newArr
})

app.controller('AuthController', auth );
app.controller('AlbumController', album);

app.service('cardScopeService', function($rootScope){

    this.activateGetCards = () => {
        $rootScope.$emit('fireFunc')
    }
    
})