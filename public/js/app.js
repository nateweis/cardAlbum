import {auth} from './Auth.js'
import {album} from './Album.js'

const app = angular.module('CardAlbum', []);

app.filter('cardFilter', function() {
    const newArr = (arrCards, filter) => {
        let temp = []
    //     arrCards.forEach(card => {
    //        if(card[key] === val){temp.push(card)}
    //        else if (key === 'atk' && card[key] !== null){temp.push(card)}
    //    });
        arrCards.forEach(card => {
            filter.forEach(f=>{
                if(card[f.key] === f.val){temp.push(card)}
                else if (f.key === 'atk' && card[f.key] !== null){temp.push(card)}
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