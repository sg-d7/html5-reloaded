// bodyController
webapp.controller( "bodyController", ['$scope', '$http', 'userFactory', // függvény paramétereinek neve
    function($scope, $http, userFactory){
		
		$scope.isLoggedIn = false;
		
    	$scope.name = "Jeffrey";
        
    	$scope.users = [];
				  
		// bejelentkezés
		$scope.doLogin = function () {
			
			if (!$scope.loginData) {
				alert("kérjük töltse ki a mezőket");
				return;
			}
			if (!$scope.loginData.email || !$scope.loginData.pass) {
				alert("kérjük töltse ki a mezőket");
				return;
			}
			userFactory.checkLogin($scope.loginData)
				.then(function (loggedIn) {
					$scope.isLoggedIn = loggedIn;
				});
		}
    	    
	}
]);