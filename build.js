'use strict';

// az angular fő modul nev megadasa
var webapp = angular.module("webapp", []);

; // login kezelése
webapp.factory('userFactory', ['$q', '$http', function ($q, $http) {
	return {
		checkLogin: function checkLogin(loginData) {
			var deferred = $q.defer();

			// lekérjük a felhasználókat
			this.getUsers().then(function (users) {
				console.log(users);
				// megkeressük az adott felhasználót
				var loggedIn = false;
				for (var k in users) {
					if (users[k].email === loginData.email && users[k].pass === loginData.pass) {
						loggedIn = true;
					}
				}
				deferred.resolve(loggedIn);
			}, function (err) {
				console.error('hiba a szerver kapcsolatban');
				deferred.resolve(loggedIn);
			});

			return deferred.promise;
		},
		getUsers: function getUsers() {
			var deferred = $q.defer();

			$http.get('json/user.json').then(function (serverData) {
				var users = serverData.data;
				deferred.resolve(serverData.data);
			}, function (err) {
				deferred.reject(err);
			});
			return deferred.promise;
		}
	};
}]);; // bodyController
webapp.controller("bodyController", ['$scope', '$http', 'userFactory', // függvény paramétereinek neve
function ($scope, $http, userFactory) {

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
		userFactory.checkLogin($scope.loginData).then(function (loggedIn) {
			$scope.isLoggedIn = loggedIn;
		});
	};
}]);
