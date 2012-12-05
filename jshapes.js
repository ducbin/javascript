function showActions(action){ 
		//$("#"+action).show("slow");
	
	var el = document.getElementById("'"+action+"'");
	el.style.display = "block";  
}

function hideActions(action){ 
	//$("#"+action).hide("slow");
	var el = document.getElementById("'"+action+"'");
	el.style.display = "none";  
}

function addCat(){
    
	var name	=	document.getElementById("name").value;
	var des		=	document.getElementById("des").value;
	name		=	Trim(name);
	des			=	Trim(des);

	if(name.length>0){
    	
    	var params = {'name':name,'des':des};
    		  
    	ajaxJqueryPost(site+"Admin/articles/add-cat",params,rcAddCat);  	
    	
	} 
}    

function addCat2Form(){
    
	var name	=	document.getElementById("name").value;
	var des		=	"";
	name		=	Trim(name);
	des			=	Trim(des);

	if(name.length>0){
    	
    	var params = {'name':name,'des':des};
    		  
    	ajaxJqueryPost(site+"Admin/articles/add-new-cat",params,rcNewCat);  	
	} 
}  

function rcNewCat(jsonRep){

	var res				=	document.getElementById('newcat').innerHTML;
	
	if(jsonRep!=null&&jsonRep!=""){
		res +=addNewCats(jsonRep);
	}
	
	document.getElementById('newcat').innerHTML	=	res;
	$("#name").val("");
}

function addNewCats(cat){
	var tempcat	=	"";
	tempcat		=	document.getElementById('templateNewCat').innerHTML;	
	tempcat		=	repS(tempcat,"CatName",cat.name);
	tempcat		=	repS(tempcat,"CatValue",cat.id);
	
	return tempcat;
}

/**
 * Add new panel 
 */
function addNewPanel(arr,j,tbncr){
	var tempcat	=	"";
	var tempThumb;
	var cj	=	0;
	tempcat		=	document.getElementById('templatePanel').innerHTML;	
	tempcat		=	repS(tempcat,"Id",arr['idpn']);
	
	if (tbncr!=1){	
		if (arr['typepn']=="start"){
			tempThumb	=	"shops/images/startThumb.png";
		}else if (arr['typepn']=="gmap"){
			tempThumb	=	"shops/images/mapThumb.png";
		}else if (arr['typepn']=="pdf"){
			tempThumb	=	"shops/images/pdfThumb.png";
		}else if (arr['typepn']=="chat"){
			tempThumb	=	"shops/images/chatThumb.png";
		}else if (arr['typepn']=="textEditor"){
			tempThumb	=	"shops/images/texteditorThumb.png";
		}else{ 
			tempThumb	=	"shops/images/wbThumb.png";
		}
	}else{
		cj	=	j+1;
		tempThumb	=	tblink+scode+"_"+cj+".jpg";
	}
	tempcat		=	repS(tempcat,"IMG",tempThumb);
	tempcat		=	repS(tempcat,"Order",(j+1));
	return tempcat;
}

function rcAddCat(jsonRep){

	var res				=	"";
	var listCat			=	jsonRep; 
	
	if(listCat!=null&&listCat!=""){
		for(var i=0;i<listCat.length;i++){
			res +=addInfoCats(listCat[i]);
		}
	}	
	document.getElementById('listCat').innerHTML	=	res;
}

function addInfoCats(cat){
	var tempcat	=	"";
	tempcat		=	document.getElementById('templateListCat').innerHTML;	
	tempcat		=	repS(tempcat,"NAME",cat.name);
	tempcat		=	repS(tempcat,"Cat",cat.id);
	
	return tempcat;
}

