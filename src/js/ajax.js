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

// ugyanez mé rövidebben
$.getJSON('json/user.json', function (users) {
	console.log(users);
	fillTable(users);
});

// felhasználók listája
function fillTable(users) {
	var btnTemplate = '<button class="btn btn-success mod-btn" data-user-id="?">módosítás</button>'
	
	var tBody = $('.ajax-table tbody');
	
	for (var k in users) {
		var id = 'user_' + (k + 1);
		$('<tr >')
			.append($('<td />').html(id))
			.append($('<td />').html(users[k].name))
			.append($('<td />').html(users[k].age))
			.append($('<td />').html(users[k].address))
			.append($('<td />').html(users[k].job))
			.append(
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

// a módosítás gomb jQuery plugin-ja
$.fn.modBtn = function (modalId) {
	this.on('click', function() {
		var modalWindow = $('#' + modalId);
		//console.log(this);
		//console.log('userData', $(this).parents('tr').data('userData') );
		var userData = $(this).parents('tr').data('userData');
		modalWindow
			.find('input')
			.each(function (input) {
				input.value = userData[input.name];
			});
		
		modalWindow.modal('show');
	});
	return this;
}