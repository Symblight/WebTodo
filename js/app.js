	var btnAdd=document.getElementById("btn");
	var textbox=document.getElementById("txt");
	var panel=document.getElementById("page");
	var idMask="id_",id=0;

loadStorageValues();

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
	addBlockValue(textbox.value,id,date);
	var taskJSON=Object.create(Task).constructor(textbox.value,date,id);
	var value =JSON.stringify(taskJSON);
	localStorage.setItem(idMask+id,value);
	textbox.value=null;
	id++;
}

function loadStorageValues(){
	for (var i=0; i<localStorage.length;i++){
		var taskJSON=JSON.parse(localStorage.getItem(localStorage.key(i)));
		addBlockValue(taskJSON.text,taskJSON.id,taskJSON.time);
		if (id<=localStorage.key(i).substring(3)&&localStorage.length>0) id++;		
	}
}

function addBlockValue(value,idItem, date){	
	var liEl=document.createElement('li');
	var divMainEl=document.createElement('div');
	divMainEl.className='task_item';

	var spanEL=document.createElement('span');
	spanEL.innerHTML=date;
	var btnDelete=document.createElement('button');
	btnDelete.classList.add('flat_button');
	btnDelete.classList.add('action_del');
	btnDelete.title='Удалить из списка';
	btnDelete.innerHTML='Delete';
	divMainEl.appendChild(spanEL);
	divMainEl.appendChild(btnDelete);
	var divSpan=document.createElement('div');
	divSpan.className='wall_post_text';
	var spanValue=document.createElement('span');
	spanValue.id='txt_'+idItem;
	spanValue.innerHTML=value;
	divSpan.appendChild(spanValue);
	divMainEl.appendChild(divSpan);
	var divNav=document.createElement('div');
	var btnEdit=document.createElement('button');
	btnEdit.classList.add('flat_button');
	btnEdit.classList.add('action_edit');
	btnEdit.innerHTML='Edit';
	divNav.appendChild(btnEdit);
	divMainEl.appendChild(divNav);

    liEl.appendChild(divMainEl);
	liEl.className='tdItem';
	liEl.id=idItem;
	liEl.setAttribute("Name","liItem");
	document.body.appendChild(liEl);
};

document.querySelectorAll('.action_del').forEach(function(e){
	e.onclick=function(){
	var liId=e.closest('li').getAttribute('id');
	e.closest('li').remove();
	localStorage.removeItem(idMask+liId);
	};
});

document.querySelectorAll('.action_edit').forEach(function(el){
	el.onclick=function(){
		if (el.classList){
 		 if (!el.classList.contains('Save')){
 		 	var id=el.closest('li').getAttribute('id');
 		 	console.log(id);
 		 	var element=document.getElementById('txt_'+id);
 		 	element.outerHTML = "<textarea id='txt_"+id+"'>"+element.textContent+"</textarea>";
 		 	el.innerHTML="Save";		
  			el.classList.add('Save');		 
 		 } else
 		 {
 		 	var id=el.closest('li').getAttribute('id');
 		 	var element=document.getElementById('txt_'+id);
 		 	console.log(id);
 		 	EditLocalStorage(id,element.value);
 		 	element.outerHTML = "<span id='txt_"+id+"'>"+element.value+"</span>";
 		 	el.innerHTML="Edit";
 		 	el.classList.remove('Save');		
 		 }		 	
		}
  	 	
	};
});

function EditLocalStorage(id, value){
		var taskJSON=JSON.parse(localStorage.getItem(localStorage.key("id_"+id)));	
			taskJSON.text=value;
			var editValue=JSON.stringify(taskJSON);
			localStorage.removeItem("id_"+id);
			localStorage.setItem("id_"+id,editValue);
}