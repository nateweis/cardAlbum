const app = angular.module('CardAlbum', [])

// //////////////////////////////////////////////////////////
//  The Actual Card Controller 
// /////////////////////////////////////////////////////////

app.controller('AlbumController', ['$http', function($http){
    //get the this
    const ctrl = this;
    // ================================== //
    //       Current List of Cards        //
    // ================================== //
    this.allCards = [];

    // ================================== //
    //        Get All the Cards           //
    // ================================== //

    this.getCards = function(pack){
        $http({
            method:'GET',
            url: 'https://db.ygoprodeck.com/api/v7/cardinfo.php?cardset=' + pack
        })
        .then(function(res){
            console.log(res.data.data)
            ctrl.allCards = res.data.data
        })
        .catch((err) => {
            console.log(err)
        })
    }

}]);// colosing the Album Controller 











// //////////////////////////////////////////////////////////
//  The Auth Controller  
// /////////////////////////////////////////////////////////

app.controller('AuthController', ['$http', function($http){
    this.loggedIn = false;
    this.changeLoggin = function(){
        this.loggedIn = true;
    }
}] )