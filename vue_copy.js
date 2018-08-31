window.indexedDB = window.indexedDB || window.mozIndexedDB || window.webkitIndexedDB
|| window.msIndexedDB;

window.IDBTransaction = window.IDBTranscation || window.webkitTransaction 
|| window.msIndexedDB;

if(!window.indexedDB){
    window.alert("Browser does not support IndexedDB.");
}

var db;
var request = window.indexedDB.open("foodlog", 1);
console.log(request);

var foodlogData = [{id:"1", date:"01-01-2017", content:"Salmon galore."},
                  {id:"2", date:"02-01-2017", content:"More salmon"}];

request.onerror = function(event){
    console.log("Error: ");
}

request.onsuccess = function(event){
    db = request.result;
    //var objectStore = db.createObjectStore("entry", {keyPath: "id"});
    console.log(db);
}

request.onupgradeneeded = function(event){
    var db = event.target.result;
    console.log(db);
    var objectStore = db.createObjectStore("entry", {keyPath: "id"});
    for(i in foodlogData){
        objectStore.add(foodlogData[i]);
        console.log(foodlogData[i]);
    }
}

//var transaction = db.transaction("entry");


Vue.component('add',{
   /* props:{
        entryName: String,
        entryID: Number,
        content: String
    },*/
    methods: {
        addDisplay: function(){
            alert("Greetings");
            var formDisplay = "<div id=''><form name=''>"
            +"<input type='text' name='entryName'>"
            + "<input type='text' name='entryID'>"
            + "<input type='text' name='content'>"
            +"</form></div>";
        },
        addContent: function(){
            //open database if not already opened
            //create new object from info received from addDisplay
            //add to database
        }
    },
    template: "<button id='addBtn' v-on:click='addDisplay()'>egh</button>"
});
//there must be some way to dynamically create log instances
Vue.component('log',{
    props:{
      entryID: String,
      entryDate: Number,
      content: String
    },
    mounted(){
        this.displayContent()
    },
    methods: {
    //on click, reveal additional information about entry from DB
        //getDB: function(){}
        dislayContent: function(){
            var vm = this;
           /* var info = "<div>"+
                "<div>{{entryName}}</div>" +
                "<div>{{content}}</div>"
                + "</div>";*/
            console.log(vm.entryID);
        }
    },
 //   template: "<div class='logMember' v-on:click='displayContent()'>Testing</div>"
    template: "<div class='logMember'>t</div>"
})
var vue = new Vue({
    el: "#main",
    //data: {},
    data(){
        
        return{
            test: "Hello",
            food_entry:{
               id:null,
               date:null,
               content: null},
            food_entries: [],
           }
        //  request: window.indexedDB.open("FoodLogDB", 3)
          },
   // mounted(){
     //   this.getEntry();
    //},
  //  template: 
    methods: {
        getEntry(){
            var vm = this;
            console.log(vm.food_entries.push({id: "4", name: "02/02/2017", 
                                             content: "...."}));
        },
        getDB(){
        
      //  let request = new Promise((resolve, reject) => {
         
            
       // });
            
          var vm = this;
       //   var transaction = db.transaction(["entry"]);
        //  var request = window.indexedDB.open("foodlog", 2);
            console.log(db);
         //   db.transaction("entry");
          var objectStore = db.transaction("entry").objectStore("entry");
          objectStore.openCursor().onsuccess = function(){
          var cursor = event.target.result;
          if(cursor){
             alert("Key: " + cursor.key + " Date: " + cursor.value.date +
                  " Content: " + cursor.value.content);
             if(vm.food_entries){
              vm.food_entries.push({id: cursor.key, name: cursor.value.date, content: cursor.value.content});
                }
             }else{
                 alert("No more entries");
                    }
              cursor.continue();
                }
            }
        }
    });
//vue.connectDB();