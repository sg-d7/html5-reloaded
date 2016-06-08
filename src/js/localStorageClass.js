class Ls {
	
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
}