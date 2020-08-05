export const auth = ['$http', '$window', 'cardScopeService', function($http, $window, cardScopeService){
    const authCtrl = this
    this.currentUser = {};

    // Check if logged in
    $window.onload = () => {
        authCtrl.getUser();
        cardScopeService.activateGetCards();
    }

     // ================================== //
    //              Log in                //
    // ================================== //
    this.changeLoggin = function(){
        $http({
            method: 'POST',
            url: '/users',
            data: {username: 'nate', password: 'nate'}
        })
        .then((res)=>{ 
            // console.log(res.data)
            authCtrl.currentUser = res.data.data
            cardScopeService.activateGetCards();
         })
        .catch((err)=>{console.log(err)})
    }

     // ================================== //
     //          Get User's Info           //
     // ================================== //
    this.getUser = function(){
        $http({
            method: 'GET',
            url: '/users'
        })
        .then(res => authCtrl.currentUser = res.data.data)
        .catch(err => console.log(err))
    }

    // ================================== //
    //               Log Out              //
    // ================================== //
    this.logOut = function(){
        $http({
            method: 'DELETE',
            url: '/users'
        })
        .then(data => { authCtrl.currentUser = {} })
        .catch(err => console.log(err))
    }

}]

