	var panel=document.getElementById("list");
	var idMask="id_",id=0;
	var textbox=document.getElementById('txt');

loadStorageValues();

var Task= function(text,time,id){ 
	this.text=text;
	this.time=time;
	this.id=id;
}

Task.prototype={
	insertJSON: function(){
		return JSON.stringify(this);
	}
}

document.querySelector('.action_add').onclick=function(){
	var date = new Date();
	BlockValue(textbox.value,id,date);
	var task=new Task(textbox.value,date,id);
	localStorage.setItem(idMask+id,task.insertJSON());
	id++;
	textbox.value='';
}

function loadStorageValues(){
	for (var i=0; i<localStorage.length;i++){
		var taskJSON=JSON.parse(localStorage.getItem(localStorage.key(i)));
		BlockValue(taskJSON.text,taskJSON.id,taskJSON.time);
		id=localStorage.key(i).substring(3);	
	}
	if (id.length>0) id++;
}

function BlockValue(value,idItem, date){	
	var liEl=document.createElement('div');
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

	btnEdit.onclick=function(){
		if (this.classList){
 		 if (!this.classList.contains('Save')){
 		 	var idLi=this.closest('.tdItem').getAttribute('id');
 		 	var element=document.getElementById('txt_'+idLi);
 		 	element.outerHTML = "<textarea id='txt_"+idLi+"'>"+element.textContent+"</textarea>";
 		 	this.innerHTML="Save";		
  			this.classList.add('Save');		 
 		 } else
 		 {
 		 	var idLi=this.closest('.tdItem').getAttribute('id');
 		 	var element=document.getElementById('txt_'+idLi);
 		 	EditLocalStorage(idLi,element.value);
 		 	element.outerHTML = "<span id='txt_"+idLi+"'>"+element.value+"</span>";
 		 	this.innerHTML="Edit";
 		 	this.classList.remove('Save');		
 		 }		 	
		}	
	};

	btnDelete.onclick=function(){
	var liId=this.closest('.tdItem').getAttribute('id');
	this.closest('.tdItem').remove();
	localStorage.removeItem(idMask+liId);
	};

    liEl.appendChild(divMainEl);
	liEl.className='tdItem';
	liEl.id=idItem;
	liEl.setAttribute("Name","liItem");
	panel.appendChild(liEl);
};

function EditLocalStorage(idItem, value){
		var taskJSON=JSON.parse(localStorage.getItem("id_"+idItem));	
			taskJSON.text=value;
			var editValue=JSON.stringify(taskJSON);
			localStorage.removeItem("id_"+idItem);
			localStorage.setItem("id_"+idItem,editValue);
}