// Osztály alapjául szolgáló függvény létrehozása.
class dateClass {
    
    constructor(defaultDate) {
        this.cDate = defaultDate ? defaultDate : new Date();
    };
    
    static toDoubleChars(num) {
        if ( num < 10 && num > -10 ) {
            return '0'+num;
        }
        return ''+num; 
    };
    
    goodMorning() {
        var d = this.toMysql();
        var template = String.raw`Sziasztok, szép napunk van. 
                        Ma ${d} van.`;
        console.log( template );
    }
    
    toMysql(){
        var parts = [];
        parts.push( this.cDate.getFullYear() );
        parts.push( 
            dateClass.toDoubleChars(this.cDate.getMonth()+1)
        );
        parts.push( 
            dateClass.toDoubleChars(this.cDate.getDate())
        );

        return parts.join('-');    
    };
};
;var test = 1;;// natív ajax kérés
// példányosítani kell egy új XMLHttpRequest-et
//var xhr = new XMLHttpRequest;
//
//// meg kell adni a kérés típusát és a végpontot
//xhr.open('get', 'json/user.json');
//
//// lekezeljük a választ
//xhr.onload = function (ev) {
//	console.log(ev.target.response);
//	var users = JSON.parse(ev.target.response);
//	console.log(users);
//}
//
//// kérés elküldése
//xhr.send();
//
//// ugyanez jquery használatával
//$.ajax({
//	url : 'json/user.json',
//	dataType: 'json',
//	success : function (response) {
//		console.log(response);
//	}
//});

// ugyanez mé rövidebben
$.getJSON('json/user.json', function (users) {
	console.log(users);
	fillTable(users);
});

// felhasználók listája
function fillTable(users) {
	var btnTemplate = '<button class="btn btn-success mod-btn" data-user-id="?">módosítás</button>'
	var keys = ['name', 'age', 'address', 'job'];
	var tBody = $('.ajax-table tbody');
	
	for (var k in users) {
		var id = 'user_' + (k + 1);
		var tr = $('<tr >');
		tr.append($('<td />').html(id));
		for (var kk in keys) {
			tr.append($('<td data-name="' + keys[kk] + '" />').html(users[k][keys[kk]]));
		}
	
		tr.append(
			$('<td />')
				.append(btnTemplate.replace('?', id)) 
		)
		.appendTo(tBody)
		//[0].userData = users[k]; // ez így nem szép
		.data('userData', users[k]);
	}
	
	// modális ablak megnyitása a felhasználó szerkesztéshez
	// kikeresi a tbody elemen belül az összes mod-btn osztályú elemet
//	tBody.find('.mod-btn').on('click', function() {
//		console.log(this);
//	});
	// saját jquery plugin meghívása
	tBody.find('.mod-btn').modBtn('ajaxModal');
	//$("#ajaxModal").modal('show');
}

function updateTable(tr, userData) {
	console.log('userData', userData);
	tr.find('td').each( function (key, td) {
		var k = $(td).data('name');
		$(td).html(userData[k]);
	});
}

// a módosítás gomb jQuery plugin-ja
$.fn.modBtn = function (modalId) {
	this.on('click', function() {
		var modalWindow = $('#' + modalId);
		//console.log(this);
		//console.log('userData', $(this).parents('tr').data('userData') );
		var tr = $(this).parents('tr');
		var userData = tr.data('userData');
		//console.log('userData', userData);
		modalWindow
			.find('input')
			.each(function (key, input) {
				//console.log('input', input);
				$(input)
					.val(userData[input.name])
					.off('change')
					.on('change', function () {
						userData[this.name] = this.value;
					});
			});
		modalWindow.data('userData', userData);
		modalWindow
			.find('.mod-save-btn')
			.off('click')	// gomb kattintási esemény kezelő lekapcsolása
			.on('click', function () {
				updateTable(tr, userData);
				modalWindow.modal('hide');
			});
		modalWindow.modal('show');
	});
	return this;
};//window.addEventListener('resize', function( ev ) {
//    console.debug( 'width', ev.target.innerWidth );
//});
//window.addEventListener('resize', function( ev ) {
//    console.debug( 'height', ev.target.innerHeight );
//});

//var inputList = document.querySelectorAll( 'input[type=file]' );
//console.log( 'inputList', inputList );
//for ( var i = 0; i < inputList.length; i++ ) {
//    inputList[i].addEventListener( 'change', function(ev) {
//        console.log( ev.target.value );
//    });
//};// HTML5 szelektorok.
// Egy elem kiválasztása.
document.querySelector( 'form' );
document.querySelector( 'input[type=date]' );

// Gyorsabb megoldás.
var regForm = document.querySelector( '#testform' );
var dateInput = regForm.querySelector( 'input[type=date]' );
dateInput.value = '1988-10-22';

// Elemek csoportjának kiválasztása.
var inputs = regForm.querySelectorAll( 'input' );
//console.log( 'inputs', inputs );

// Egyedi fájl input létrehozása.
var fileInputs = document.querySelectorAll( '.file-input-group' );
for ( var i = 0; i < fileInputs.length; i++ ) {
    // Beolvassuk a változó értékeket.
    var name = fileInputs[i].getAttribute( 'data-name' );
    var label = document.createElement( 'label' );
    
    
    // Létrehozzuk a címkét.
    label.setAttribute( 'for', name );
    label.className = 'col-xs-6 col-xs-offset-2 control-label btn btn-primary file-input-label'; 
    label.innerHTML = name;
    
    // Létrehozzuk az input elemet.
    var input = document.createElement( 'input' );
    input.setAttribute( 'id', name );
    input.type = 'file';
    input.className = 'hidden-file-input';
    
    // Figyeljük az input értékének a változását.
    input.addEventListener( 'change', (ev) => { 
        var currentLabel = 
            document.querySelector('label[for='+ ev.target.id +']');
        var name = ev.target.value;
        name = name.replace(/\\/g, '/').split('/').pop();
        currentLabel.innerHTML = name;
    });
    
    // Hozzáadjuk az elemeket a divhez.
    fileInputs[i].appendChild( input );
    fileInputs[i].appendChild( label );
}

var evens = [1,2,3];
var odds = evens.map(v => v + 1);
console.log( odds );


















;alert('itt vagyok');;class Ls {
	
	constructor (name) {
		if (!name) {
			console.error('No name given');
			return;
		}
		
		this.name = name;
		//this.debug = false;	
		this.data = localStorage[name];
		
		if (!this.data) {
			this.data = {};
		} else {
			this.data = JSON.parse(localStorage[name]);
		}
	}
	
	// update localstorage object
	updateStorage() {
		localStorage[this.name] = JSON.stringify(this.data);
	}
	
	// adatok mentése a localStorage-basename
	setItem(key, value) {
		this.data[key] = value;
		this.updateStorage();
	}
	
	getItem(key) {
		return this.data[key];
	}
	
	// a localStorage összes elemének listázása
	dump () {
		var keys = Object.keys(this.data);
		//console.log(keys);
		var dumpContent = [];
		for (var k in keys) {
			var temp = `${keys[k]}: ${this.data[keys[k]]}`;
			dumpContent.push(temp);
		}
		return dumpContent.join(';\n');
	}
};var reloaded = angular.module( "reloaded", [] );
reloaded.controller( "hello", ['$scope', '$http',
    function($scope, $http){
    $scope.name = "Jeffrey";
        
    $scope.users = [];
    $http.get( 'json/user.json' )
        .then( function(serverData) {
            $scope.users = serverData.data;
        });
        
}]);