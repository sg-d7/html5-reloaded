// az angular fő modul nev megadasa
var webapp = angular.module( "webapp", ['ngRoute'] );

webapp.config(['$routeProvider', '$locationProvider',
			 
	function($routeProvider, $locationProvider) {
		$routeProvider
   			.when('/index', {
    			templateUrl: 'template/content/index.html',
				controller: 'indexController'
  			})
			.when('/users', {
    			templateUrl: 'template/content/users.html'
  			})
			.when('/settings', {
    			templateUrl: 'template/content/settings.html'
  			})
  			.otherwise({
				/*
				templateUrl: 'template/content/index.html',
				controller: 'indexController'
				*/
				redirectTo: '/index'
			});

		// configure html5 to get links working on jsfiddle
		//$locationProvider.html5Mode(true);
		//console.log($locationProvider);
}]);
