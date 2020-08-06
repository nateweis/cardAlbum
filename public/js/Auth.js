export const auth = ['$http', '$window', 'cardScopeService', function($http, $window, cardScopeService){
    const authCtrl = this;

    this.logInScreen = true;
    this.changeLoginType = bool => authCtrl.logInScreen = bool
    this.currentUser = {};
    this.username = '';
    this.password = '';

    // Check if logged in
    $window.onload = () => {
        authCtrl.getUser();
        cardScopeService.activateGetCards();
    }

    // ================================== //
    //             Sign Up                //
    // ================================== //
    this.createAccount = function(){
        $http({method: 'POST', url: '/users/new', data: {username: this.username, password: this.password}})
        .then(data => {
            console.log(data);
            authCtrl.username = '';
            authCtrl.password = '';
            authCtrl.changeLoginType(true);
        })
        .catch(err => console.log(err))
    }

     // ================================== //
    //              Log in                //
    // ================================== //
    this.changeLoggin = function(){
        $http({
            method: 'POST',
            url: '/users',
            data: {username: this.username, password: this.password}
        })
        .then((res)=>{ 
            authCtrl.currentUser = res.data.data
            cardScopeService.activateGetCards();
            if(res.data.message !== "you are logged in") alert('Wrong Username or Password');
            else{
                authCtrl.username = '';
                authCtrl.password = '';
            }
         })
        .catch((err)=>{
            if(err.data.message) alert('Wrong Username or Password');
        })
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

