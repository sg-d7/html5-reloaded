// login kezelése
webapp.factory('userFactory', ['$q', '$http', function ($q, $http) {
	return {
		checkLogin : function (loginData) {
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
		getUsers : function () {
			var deferred = $q.defer();
			
			$http.get( 'json/user.json' )
        		.then( function(serverData) {
            		var users = serverData.data;
					deferred.resolve(serverData.data);	
        		}, function (err) {
					deferred.reject(err);
				});
			return deferred.promise;
		}
	};
}]);