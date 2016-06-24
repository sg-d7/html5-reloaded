// bodyController
webapp.controller( "bodyController", ['$scope', '$http', 'userFactory', '$rootScope',  // függvény paramétereinek neve
    function($scope, $http, userFactory, $rootScope){
		
		$scope.isLoggedIn = false;
		$scope.defaultContent = 'index';
		$scope.currentContentName = "";
    	$scope.name = "Jeffrey";
        
    	$scope.users = [];
				  
		// bejelentkezés
		$scope.doLogin = function (loginData) {
			console.log('$scope.loginData', loginData);
			if (!loginData) {
				alert("kérjük töltse ki a mezőket1");
				return;
			}
			if (!loginData.email || !loginData.pass) {
				alert("kérjük töltse ki a mezőket2");
				return;
			}
			userFactory.checkLogin(loginData)
				.then(function (loggedIn) {
					$scope.isLoggedIn = loggedIn;
				});
		}  
		
		// fájlok beszúrása
		$scope.getTemplate = function (name) {
			return 'template/' + name + '.html';
		};
		
		// tartalom váltó
		$scope.getContent = function (name) {
			if (angular.isUndefined(name)) {
				name = $scope.defaultContent;
			}
			$scope.currentContentName = name;
			$scope.currentContent = $scope.getTemplate('content/' + name);
		};
		
		//$scope.getContent();
		
		// oldal vátlás figyelése
		$rootScope.$on('$routeChangeSuccess', function (oldRoute, newRoute) {
			// paraméterek kilistázása
			//console.log(arguments);
			if (angular.isUndefined(newRoute.$$route)) {
				$scope.currentContentName = $scope.defaultContent;
			} else {
				$scope.currentContentName = newRoute.$$route.originalPath.replace('/', '');
			}
			console.log(newRoute.$$route.originalPath, $scope.currentContentName);
			
		});
}]);