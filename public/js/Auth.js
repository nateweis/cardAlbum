export const auth = ['$http', '$window', function($http, $window){
    const authCtrl = this
    this.currentUser = {};

    // Check if logged in
    $window.onload = () => {authCtrl.getUser()}

    // Log In to Site
    this.changeLoggin = function(){
        $http({
            method: 'POST',
            url: '/users',
            data: {username: 'nate', password: 'nate'}
        })
        .then((res)=>{ 
            console.log(res.data)
            authCtrl.currentUser = res.data.data
         })
        .catch((err)=>{console.log(err)})
    }

    // Get User information
    this.getUser = function(){
        $http({
            method: 'GET',
            url: '/users'
        })
        .then(res => authCtrl.currentUser = res.data.data)
        .catch(err => console.log(err))
    }

}]

