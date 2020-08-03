export const auth = ['$http', function($http){
    this.loggedIn = false;
    this.changeLoggin = function(){
        this.loggedIn = true;
    }
}]

