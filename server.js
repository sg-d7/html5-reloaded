var express = require('express');
var cookieParser = require('cookie-parser')
var fs = require('fs');
var app = express();
var path = require('path');
 
app.use(cookieParser());

app.use('/build', express.static(__dirname + '/build'));
//app.use(express.static(path.join(__dirname, 'build')) );

//console.log(__dirname);

app.get('/', function (req, res) {
	var index = fs.readFileSync('build/index.html', 'utf8');
	console.log(index);
	res.send(index);
});

app.post('/dologin', function (req, res) {
	// comagokban jön meg a kérésben az adat
	var requestData = '';
	
	req.on('data', function (dataPackage) {
		requestData += dataPackage;
	});
	
	req.on('end', function () {
		var serverResponse = {
			'userId' : 0,
			'loggedIn' : false
		};
		var user = findUser(JSON.parse(requestData));
		if (user !== null) {
			serverResponse.userId = user.id;
			serverResponse.loggedIn = true;
			res.writeHead(
				200, {
				'Set-Cookie' : 'ittoken=' + user.token,
				'Content-Type' : 'application/json'
				});
		}
		res.end(JSON.stringify(serverResponse));
	});
});

// felhasználók lekérése
app.get('/users', function (req, res) {
	// comagokban jön meg a kérésben az adat
	var requestData = '';
	
	req.on('data', function (dataPackage) {
		requestData += dataPackage;
	});
	
	req.on('end', function () {
		var serverResponse = {
			'userId' : 0,
			'loggedIn' : false
		};
		var user = findUser(JSON.parse(requestData));
		if (user !== null) {
			serverResponse.userId = user.id;
			serverResponse.loggedIn = true;
			res.writeHead(
				200, {
				'Set-Cookie' : 'ittoken=' + user.token,
				'Content-Type' : 'application/json'
				});
		}
		res.end(JSON.stringify(serverResponse));
	});
});

// find users
function findUser(loginData) {
	var currentUser = null;
	var users = fs.readFileSync(__dirname + '/json/user.json', 'utf8');
	users = JSON.parse(users);
	
	for (var k in users) {
		if (users[k].email === loginData.email && users[k].pass === loginData.pass) {
			
			var d = new Date();
			var token = 'token_' + d.getTime();
			
			currentUser = users[k];
			currentUser.id = k;
			currentUser.token = token;
			
			saveSession({
				id : k,
				token : token
			});
		}
	}
	return currentUser;
}

// felhasználó ellenőrzése
function checkUser(req, res) {
	// munkamenet kiolvasása
	var sessions = getSessions();
	
	// felhasználó keresése a cookie alapján
	var cookie = req.cookie.ittoken;
	var loggedIn = false;
	for (var k in sessions) {
		if (sessions[k].token === cookie) {
			loggedIn = true;
		}
	}
}

// session betöltése
function getSessions() {
	// munkamenet kiolvasása
	var sessions = fs.readFileSync(__dirname + '/json/session.json', 'utf8');
	if (sessions === '') {
		sessions = [];
	} else {
		sessions = JSON.parse(sessions);
	}
	return sessions;
}

// save session
function saveSession(sessionData) {
	// munkamenet kiolvasása
	var sessions = getSessions();
	// új munkamenet hozzáadása
	sessions.push(sessionData);
	
	fs.writeFileSync(
		__dirname + '/json/session.json', 
		JSON.stringify(sessions)
	);
}

app.listen(3000, function () {
	console.log('App started at 3000 port!');
});