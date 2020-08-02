const app = angular.module('CardAlbum', [])

app.controller('AlbumController', ['$http', function($http){
    //get the this
    const authCtrl = this;
    // ================================== //
    //        Get All the Cards           //
    // ================================== //
    this.number = 6
    this.getCard = function(){
        $http({
            method:'GET',
            url: 'https://db.ygoprodeck.com/api/v7/cardinfo.php'
        })
        .then(function(res){
            console.log(res.data)
        })
        .catch((err) => {
            console.log(err)
        })
    }
}]);// colosing the Album Controller 