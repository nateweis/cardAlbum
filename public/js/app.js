import {auth} from './Auth.js'
import {album} from './Album.js'

const app = angular.module('CardAlbum', []);

app.filter('cardFilter', function() {
    const newArr = (arrCards, filter) => {
        if(filter[0].key === 'return') return arrCards //if a return all case

        let filterDown = arrCards;
        let temp = [];
        
        filter.forEach(f => {
            temp = []
            Array.prototype.forEach.call(f.val, v =>{
                filterDown.forEach(card=>{
                    
                    const str = v[0] + v[1] + v[2]
                    // if(f.key === 'favorite') {console.log("I work")}
                    
                    if(str === 'S#C' || str === 'T#C'){ //checking the fields that the spell and trap have the same name
                        const newVal = v.split(' ')
                        if(newVal[0] === 'S#C'){
                            if(card.type === 'Spell Card' && card.race === newVal[1]) temp.push(card)
                        }
                        else{
                            if(card.type === 'Trap Card' && card.race === newVal[1]) temp.push(card)
                            }
                    }
                    else if (f.key === 'atk' && (card[f.key] !== null && card[f.key] !== undefined)){temp.push(card)} //then cheking if its the 'all monsters' case
                    else if(card[f.key] === v) temp.push(card) //pushing eveything else to temp arr
                })
            })
            filterDown = temp //whatever meets the peramiters is now the new arr to filter through then we filter again
        });
        
       return filterDown 
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