/*
Vue instance calls indexedDB
Sends information to log components
log instances display the information

*/

window.indexedDB = window.indexedDB || window.mozIndexedDB || window.webkitIndexedDB || window.msIndexedDB;

window.IDBTransacton = window.IDBTransaction || window.webkitIndexed || window.msIndexedDB;

if(!window.indexedDB){
	window.alert("Browser does not support IndexedDB");
}

var db;
var request = window.indexedDB.open("foodlog", 1);
var practice_data = [{id: "01", date: "01-01-2018", content: "Salmon galore."},
					 {id: "02", date: "01-02-2018", content: "More salmon"}];

request.onerror = function(event){
	console.log("Error: ");
}
request.onsuccess = function(event){
	db = request.result;
}
request.onupgradeneeded = function(event){
	var db = event.target.result;
	var objectStore = db.createObjectStore("entry", {keyPath: "id"});
	
	for(i in practice_data){
		objectStore.add(practice_data[i]);
		console.log(practice_data[i]);
	}
}
/*
Vue.component('add', {
	data: function(){
		return {
			id: String,
			date: String,
			content: String,
			mainDiv: document.getElementById('main')
		}
	},
	methods: {
		displayForm: function(){
			var form = "<div>"
				+ "<form action='' method=''>"
				+ "<input type='text'>"
				+ "</form>"
				+ "</div>";
			mainDiv.innerHTML = form;
			
		},
		addEntry: function(){
			
		}
	},
	template: "<div></div>"
})
*/
Vue.component('log',{
	props:{
		id: String,
		date: String,
		content: String
	},
	methods: {
		displayEntry: function(){
			//createObjectStore here
			console.log("Surprise");
		},
		editEntry: function(){
		},
		deleteEntry: function(){
			var vm = this;
			var id = vm.id;
			var transaction = db.transaction(["entry"], "readwrite");
			var request = transaction.objectStore("entry").delete(id);
			console.log("complete");
		}
	},
	template: "<div><div v-on:click='deleteEntry()'>X</div><div v-on:click='displayEntry()'>{{date}}</div></div>"
})
new Vue({
	el: "#main",
	data:function(){
		return {
			food_entry:{
				id:null,
				date:null,
				content:null
			},
			food_entries:[]
		}
	},
	methods:{
		getFullDB: function(){
			var vm = this;
			
			var objectStore = db.transaction("entry").objectStore("entry");
			objectStore.openCursor().onsuccess = function(){
				var cursor = event.target.result;
				if(cursor){
					//alert()
					console.log("Key: " + cursor.key + " Date: " + cursor.value.date
							   + " Content: " + cursor.value.content);
					if(vm.food_entries){
						vm.food_entries.push({
							id: cursor.key, date: cursor.value.date, 
							content: cursor.value.content
						});
						//cursor.continue();
					}
					else{
						alert("No more entries");
					}
				cursor.continue();
				}
			};
		}
	}
})
