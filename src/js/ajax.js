// natív ajax kérés
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

// ugyanez még rövidebben
$.getJSON('json/user.json', function (users) {
	//console.log(users);
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
}

// repülő animálása
$('.glyphicon-plane')
	.css({
		'font-size' : '48px',
		'transform' : 'rotate(90deg)',
		'opacity' : '0.5',
		'right' : '1000px',
		'position' : 'absolute'
	})
	.animate({
		'opacity' : '1',
		'right' : ['50%', 'swing'],
		'font-size' : '72px'
	}, 1000);