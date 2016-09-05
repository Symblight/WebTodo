
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
//	var xmlhttp=new ActiveXObject();
	var wall_post="<div class='task_item'><span>"+date+"</span><button class='flat_button action_del' id=del_"+idItem+" title='Удалить из списка'>Delete</button><div class='wall_post_text'><span id='txt_"+idItem+"'>"+value+"</span></div><br><button class='flat_button action_edit' id=edit_"+idItem+">Edit</button></div>";
	var liEl=document.createElement('li');
	liEl.className='tdItem';
	liEl.innerHTML=wall_post;
	liEl.id=idItem;
	$(liEl).attr("Name","liItem");
	document.body.appendChild(liEl);
	$(liEl).show("slow");
	console.log(liEl.id);
};

$('.action_del').click(function(){
	var liId=$(this).closest('li').attr('id');
	$(this).closest('li').remove();
	localStorage.removeItem(idMask+liId);
})

$('.action_edit').click(function(){
	var id=$(this).closest('li').attr('id');
		if (!$(this).hasClass('Save')){
			$('span#txt_'+id).replaceWith(function(){
				return $('<textarea id="txt_'+id+'">'+$('span#txt_'+id).html()+'</textarea>')
			});
			$(this).html("Save");
			$(this).addClass('Save');	
		} else if ($(this).hasClass('Save')){
					EditLocalStorage(id,$('textarea#txt_'+id).val());
					$('textarea#txt_'+id).replaceWith(function(){
						return $('<span id="txt_'+id+'">'+$('textarea#txt_'+id).val()+'</span>')
					});
				$(this).html("Edit");
				$(this).removeClass('Save');
		};
});


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