export const album =  ['$http', function($http){
    //get the this
    const ctrl = this;
    
    this.allCards = [];
    this.includePath = 'partials/Home.html'
    this.changeIncludePath = path => ctrl.includePath = `partials/${path}.html`

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

}]
