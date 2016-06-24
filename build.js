"use strict";

/*
 AngularJS v1.5.7
 (c) 2010-2016 Google, Inc. http://angularjs.org
 License: MIT
*/
(function (F, d) {
	'use strict';
	function x(t, l, g) {
		return { restrict: "ECA", terminal: !0, priority: 400, transclude: "element", link: function link(b, e, a, c, k) {
				function p() {
					m && (g.cancel(m), m = null);h && (h.$destroy(), h = null);n && (m = g.leave(n), m.then(function () {
						m = null;
					}), n = null);
				}function A() {
					var a = t.current && t.current.locals;if (d.isDefined(a && a.$template)) {
						var a = b.$new(),
						    c = t.current;n = k(a, function (a) {
							g.enter(a, null, n || e).then(function () {
								!d.isDefined(z) || z && !b.$eval(z) || l();
							});p();
						});h = c.scope = a;h.$emit("$viewContentLoaded");
						h.$eval(s);
					} else p();
				}var h,
				    n,
				    m,
				    z = a.autoscroll,
				    s = a.onload || "";b.$on("$routeChangeSuccess", A);A();
			} };
	}function w(d, l, g) {
		return { restrict: "ECA", priority: -400, link: function link(b, e) {
				var a = g.current,
				    c = a.locals;e.html(c.$template);var k = d(e.contents());if (a.controller) {
					c.$scope = b;var p = l(a.controller, c);a.controllerAs && (b[a.controllerAs] = p);e.data("$ngControllerController", p);e.children().data("$ngControllerController", p);
				}b[a.resolveAs || "$resolve"] = c;k(b);
			} };
	}var C = d.isArray,
	    D = d.isObject,
	    s = d.module("ngRoute", ["ng"]).provider("$route", function () {
		function t(b, e) {
			return d.extend(Object.create(b), e);
		}function l(b, d) {
			var a = d.caseInsensitiveMatch,
			    c = { originalPath: b, regexp: b },
			    g = c.keys = [];b = b.replace(/([().])/g, "\\$1").replace(/(\/)?:(\w+)(\*\?|[\?\*])?/g, function (b, a, d, c) {
				b = "?" === c || "*?" === c ? "?" : null;c = "*" === c || "*?" === c ? "*" : null;g.push({ name: d, optional: !!b });a = a || "";return "" + (b ? "" : a) + "(?:" + (b ? a : "") + (c && "(.+?)" || "([^/]+)") + (b || "") + ")" + (b || "");
			}).replace(/([\/$\*])/g, "\\$1");c.regexp = new RegExp("^" + b + "$", a ? "i" : "");return c;
		}var g = {};this.when = function (b, e) {
			var a;a = void 0;if (C(e)) {
				a = a || [];for (var c = 0, k = e.length; c < k; c++) {
					a[c] = e[c];
				}
			} else if (D(e)) for (c in a = a || {}, e) {
				if ("$" !== c.charAt(0) || "$" !== c.charAt(1)) a[c] = e[c];
			}a = a || e;d.isUndefined(a.reloadOnSearch) && (a.reloadOnSearch = !0);d.isUndefined(a.caseInsensitiveMatch) && (a.caseInsensitiveMatch = this.caseInsensitiveMatch);g[b] = d.extend(a, b && l(b, a));b && (c = "/" == b[b.length - 1] ? b.substr(0, b.length - 1) : b + "/", g[c] = d.extend({ redirectTo: b }, l(c, a)));return this;
		};this.caseInsensitiveMatch = !1;this.otherwise = function (b) {
			"string" === typeof b && (b = { redirectTo: b });this.when(null, b);return this;
		};this.$get = ["$rootScope", "$location", "$routeParams", "$q", "$injector", "$templateRequest", "$sce", function (b, e, a, c, k, p, l) {
			function h(a) {
				var f = v.current;(B = (r = x()) && f && r.$$route === f.$$route && d.equals(r.pathParams, f.pathParams) && !r.reloadOnSearch && !y) || !f && !r || b.$broadcast("$routeChangeStart", r, f).defaultPrevented && a && a.preventDefault();
			}function n() {
				var u = v.current,
				    f = r;if (B) u.params = f.params, d.copy(u.params, a), b.$broadcast("$routeUpdate", u);else if (f || u) y = !1, (v.current = f) && f.redirectTo && (d.isString(f.redirectTo) ? e.path(w(f.redirectTo, f.params)).search(f.params).replace() : e.url(f.redirectTo(f.pathParams, e.path(), e.search())).replace()), c.when(f).then(m).then(function (c) {
					f == v.current && (f && (f.locals = c, d.copy(f.params, a)), b.$broadcast("$routeChangeSuccess", f, u));
				}, function (a) {
					f == v.current && b.$broadcast("$routeChangeError", f, u, a);
				});
			}function m(a) {
				if (a) {
					var b = d.extend({}, a.resolve);d.forEach(b, function (a, c) {
						b[c] = d.isString(a) ? k.get(a) : k.invoke(a, null, null, c);
					});a = s(a);d.isDefined(a) && (b.$template = a);return c.all(b);
				}
			}function s(a) {
				var b, c;d.isDefined(b = a.template) ? d.isFunction(b) && (b = b(a.params)) : d.isDefined(c = a.templateUrl) && (d.isFunction(c) && (c = c(a.params)), d.isDefined(c) && (a.loadedTemplateUrl = l.valueOf(c), b = p(c)));return b;
			}function x() {
				var a, b;d.forEach(g, function (c, g) {
					var q;if (q = !b) {
						var h = e.path();q = c.keys;var l = {};if (c.regexp) {
							if (h = c.regexp.exec(h)) {
								for (var k = 1, p = h.length; k < p; ++k) {
									var m = q[k - 1],
									    n = h[k];m && n && (l[m.name] = n);
								}q = l;
							} else q = null;
						} else q = null;q = a = q;
					}q && (b = t(c, { params: d.extend({}, e.search(), a), pathParams: a }), b.$$route = c);
				});return b || g[null] && t(g[null], { params: {}, pathParams: {} });
			}function w(a, b) {
				var c = [];d.forEach((a || "").split(":"), function (a, d) {
					if (0 === d) c.push(a);else {
						var e = a.match(/(\w+)(?:[?*])?(.*)/),
						    g = e[1];c.push(b[g]);c.push(e[2] || "");delete b[g];
					}
				});return c.join("");
			}var y = !1,
			    r,
			    B,
			    v = { routes: g, reload: function reload() {
					y = !0;var a = { defaultPrevented: !1, preventDefault: function preventDefault() {
							this.defaultPrevented = !0;y = !1;
						} };b.$evalAsync(function () {
						h(a);
						a.defaultPrevented || n();
					});
				}, updateParams: function updateParams(a) {
					if (this.current && this.current.$$route) a = d.extend({}, this.current.params, a), e.path(w(this.current.$$route.originalPath, a)), e.search(a);else throw E("norout");
				} };b.$on("$locationChangeStart", h);b.$on("$locationChangeSuccess", n);return v;
		}];
	}),
	    E = d.$$minErr("ngRoute");s.provider("$routeParams", function () {
		this.$get = function () {
			return {};
		};
	});s.directive("ngView", x);s.directive("ngView", w);x.$inject = ["$route", "$anchorScroll", "$animate"];w.$inject = ["$compile", "$controller", "$route"];
})(window, window.angular);
//# sourceMappingURL=angular-route.min.js.map
; // az angular fő modul nev megadasa
var webapp = angular.module("webapp", ['ngRoute']);

webapp.config(['$routeProvider', '$locationProvider', function ($routeProvider, $locationProvider) {
	$routeProvider.when('/index', {
		templateUrl: 'template/content/index.html',
		controller: 'indexController'
	}).when('/users', {
		templateUrl: 'template/content/users.html'
	}).when('/settings', {
		templateUrl: 'template/content/settings.html'
	}).otherwise({
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
; // login kezelése
webapp.factory('userFactory', ['$q', '$http', function ($q, $http) {
	return {
		checkLogin: function checkLogin(loginData) {
			var deferred = $q.defer();

			$http.post('/dologin', loginData).then(function (loginResponse) {
				console.log('loginResponse', loginResponse);
			});

			/*
   // lekérjük a felhasználókat
   this.getUsers().then(function (users) {
   	console.log('users', users);
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
   */
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
webapp.controller("bodyController", ['$scope', '$http', 'userFactory', '$rootScope', // függvény paramétereinek neve
function ($scope, $http, userFactory, $rootScope) {

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
		userFactory.checkLogin(loginData).then(function (loggedIn) {
			$scope.isLoggedIn = loggedIn;
		});
	};

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
}]);; // bodyController
webapp.controller("indexController", ['$scope', '$http', 'userFactory', // függvény paramétereinek neve
function ($scope, $http, userFactory) {

	$scope.pageTitle = 'Alkalmazás kezelése';
}]);
