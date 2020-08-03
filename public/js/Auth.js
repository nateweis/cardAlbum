export const auth = ['$http', function($http){
    const authCtrl = this
    this.loggedIn = false;
    this.changeLoggin = function(){
        this.loggedIn = !authCtrl.loggedIn
    }
}]

