export const auth = ['$http', function($http){
    const authCtrl = this
    this.loggedIn = false;
    this.changeLoggin = function(){
        this.loggedIn = !authCtrl.loggedIn

        $http({
            method: 'POST',
            url: '/users',
            data: {username: 'nate', password: 'nate'}
        })
        .then((res)=>{console.log(res)})
        .catch((err)=>{console.log(err)})
    }
}]

