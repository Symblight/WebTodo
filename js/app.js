
	var btnAdd=document.getElementById("btn");
	var textbox=document.getElementById("txt");
	var panel=document.getElementById("page");
	var idMask="id_",id=0;

var Task= {
	constructor: function(text, time, id){
	this.text=text;
	this.time=time;
	this.id=id;
	return this;
	}
}

btnAdd.onclick=function(){
	var date = new Date();
	addBlockValue(textbox.value,id,date.toLocaleString("en-US", options));
	var taskJSON=Object.create(Task).constructor(textbox.value,date,id);
	var value =JSON.stringify(taskJSON);
	localStorage.setItem(idMask+id,value);
	textbox.value=null;
	id++;
}

loadStorageValues();


var options = {
  era: 'long',
  year: 'numeric',
  month: 'long',
  day: 'numeric',
  weekday: 'long',
  timezone: 'UTC',
  hour: 'numeric',
  minute: 'numeric',
  second: 'numeric'
};

function loadStorageValues(){
	for (var i=0; i<localStorage.length;i++){
		var taskJSON=JSON.parse(localStorage.getItem(localStorage.key(i)));
		addBlockValue(taskJSON.text,taskJSON.id,taskJSON.time);
		if (id<=localStorage.key(i).substring(3)&&localStorage.length>0) id++;		
	}
}

function addBlockValue(value,idItem, date){	
	var wall_post="<div class='task_item'><span>"+date+"</span><button class='flat_button' id=del_"+idItem+" title='Удалить из списка'>Delete</button><div class='wall_post_text'><span id='txt_"+idItem+"'>"+value+"</span></div><br><button class='flat_button' id=edit_"+idItem+">Edit</button></div>";
	var liEl=document.createElement('li');
	liEl.className='tdItem';
	liEl.innerHTML=wall_post;
	document.body.appendChild(liEl);
};

document.querySelectorAll('button').forEach(function(elem) {
	if (elem.getAttribute('id').substring(0,4)==="del_")
		elem.onclick = function(event) {
			var idBtn=elem.getAttribute('id').substring(4);
			var parentElem=elem.parentElement.parentElement;
			localStorage.removeItem(idMask+idBtn);
			console.log(idMask+idBtn);
			parentElem.remove();
		};
	if (elem.getAttribute('id').substring(0,5)==="edit_") editValueTask(elem);
});

//JQuery
function editValueTask(e){
	e.onclick = function(){
		var idBtn=e.getAttribute('id').substring(5);
		var span=document.getElementById('txt_'+idBtn);	
		if (e.innerHTML==='Edit'){

			$('span#txt_'+idBtn).replaceWith(function(){
				return $('<textarea id="txt_'+idBtn+'">'+$(span).html()+'</textarea>')
			});
			e.innerHTML="Save";
		} else if (e.innerHTML==='Save'){
			span=document.getElementById('txt_'+idBtn).value;
		$('textarea#txt_'+idBtn).replaceWith(function(){
				return $('<span id="txt_'+idBtn+'">'+span+'</span>')
			});
			e.innerHTML="Edit";
			EditLocalStorage(idBtn,span);
		}
	};
}

function EditLocalStorage(id, value){
	for (key in localStorage){
		var taskJSON=JSON.parse(localStorage.getItem(localStorage.key(key)));
		if (taskJSON.id==key.substring(3)){
			taskJSON.text=value;
			var editValue=JSON.stringify(taskJSON);
			localStorage.removeItem(key);
			localStorage.setItem(key,editValue);
		}
	}
}