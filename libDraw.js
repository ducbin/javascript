// JavaScript Document

var paper;
var pdfShape;

var oCt;						//onject control
var arrPn	=	new Array();	//array panels
var arrListPn2	=	new Array();	//array panels
var arrPnDt	=	new Array();	//array panels details
var arrPnSh	=	new Array();	//array shape of panel  
var arrPnDm	=	new Array();	//array panels dimension  
var arrS	=	new Array();	//array shapes (not sort)
var arrChattm	=	new	Array();	//array chat
var arrChat	=	new	Array();	//array chat
var shapes	=	new Array();	//array shapes asso with panels (only shape, not proper of comp)
var items	=	new Array();	//array all objects on WB, with properties of comp too
var pnActive	=	1;			//panel active
var arrPadTxt	=	new Array();//array save padding text
var arrComments	=	new Array();//array of comments
var arrCommentsSorted = new Array(); // array of comments sorted by panel and order in the page
var alldivpp	=	new Array();//all div of paper
var arrcmtmp	=	new Array();
var imgMng		=	new	Array();	//array image management
var txtedtMng		=	new	Array();	//array texteditor management

var arrPnRm		=	new	Array();	//panels removed

var widthscr;	
var widthwb;	
var heightwb;
var maxX;
var maxY;
var marge		=	30;
var leftMarge	=	30;
var rightMarge	=	30;
var tmimg,tmFill;

var timeOutPdf	=	60;
var totalImages	=	0;
var crNumberImages	=	0;

var ismobile;

//draw
function drawData(dataJS){
	var pn		=	"";
	var str 	= "";
	//var newec	=	true;		//new eclass - json panel
	setParamsPad();
	arrS	=	dataJS;			//array shapes	
	arrPn.push(-1);
	
	$.each(dataJS, function(key, val) {
	    items.push(key);	    
	    //new
	    if (key.substr(0,6)=="panel_"){
	    	
	    	var tempPanel 	= $.parseJSON(val);
	    	
	    	if ((tempPanel['deleted']==undefined)||(tempPanel['deleted'].toString()!="true")){
	    		if (tempPanel['type']=="HOME"){
	    			pnhome	=	parseFloat(tempPanel['id']);
	    		}
	    		
	    		arrPn.push(parseFloat(tempPanel['id']));
		    	arrListPn2.push(parseFloat(tempPanel['order']));
	    	}
	    		
	    }
	    
	    //arrange chat
	    if (key.substr(0,5)=="chat_"){
			arrChattm.push(parseInt(key.substring(6)));
			arrChat.push(val);
		}
	    
	    
	    if (newec=="false"){
	    	arrPn.push(getPanel(val));
	    }
	    
	 });
	
	if (newec!="false"){
		//arrListPn2	=	arrunique(arrListPn2);
		//arrPn		=	arrunique(arrPn);
		
		var tmppn,tmppn2=0;
		for (var j=0;j<(arrListPn2.length-1);j++){
			for (var k=j+1;k<arrListPn2.length;k++){
				if (arrListPn2[j]>arrListPn2[k]){
					tmppn		=	arrListPn2[k];
					arrListPn2[k]	=	arrListPn2[j];
					arrListPn2[j]	=	tmppn;
					
					tmppn2		=	arrPn[k+1];
					arrPn[k+1]	=	arrPn[j+1];
					arrPn[j+1]	=	tmppn2;	
				}
			}
		}
	}else{
		
		arrPn	=	arrunique(arrPn); 
		arrPn	=	arrPn.sort();
		
		var mrr,tsort	=	0;	
		
		if (pnhome!=arrPn[1]){							//bug panel home		
			for (var i=0;i<arrPn.length;i++){
				if (arrPn[i]==pnhome){
					mrr	=	i;
					arrPn[i]	=	arrPn[1];
					arrPn[1]	=	pnhome;
					break;
				}
			}
			for (var j=2;j<(arrPn.length-1);j++){
				for (var k=j+1;k<arrPn.length;k++){
					if (arrPn[j]>arrPn[k]){
						tsort		=	arrPn[k];
						arrPn[k]	=	arrPn[j];
						arrPn[j]	=	tsort;	
					}
				}
			}
		}
	}
	
	var tg;
	//sort chat
	for (var i=0;i<(arrChattm.length-1);i++){
		for (var j=(i+1);j<arrChattm.length;j++){
			if (arrChattm[i]>arrChattm[j]){
				tg			=	arrChat[i];
				arrChat[i]	=	arrChat[j];
				arrChat[j]	=	tg;
			}
		}
	}
	
	//alert(arrPn.length);
	
	sortShapes();				//sort shapes on panel		
	removeEmptyPanels();
	sortShapesByDepth();		//sort shapes by depth
		
	//get chats
	//show msg chat
	/*
	var arrch	=	new	Array();	
	$.each(arrS, function(keyc, valc) {			//every shape: key: sid, val: value
		if (keyc.substr(0,5)=="chat_"){
			arrChattm.push(parseInt(keyc.substring(6)));
			arrChat.push(valc);
		}
	}	
	
	var tg;
	//sort chat
	for (var i=0;i<(arrChattm.length-1);i++){
		for (var j=(i+1);j<arrChattm.length;j++){
			if (arrChattm[i]>arrChattm[j]){
				tg			=	arrChat[i];
				arrChat[i]	=	arrChat[j];
				arrChat[j]	=	tg;
			}
		}
	}
	*/
	//Object control
	oCt	=	new CtDis();  	
	oCt.display();		
}

function removeEmptyPanels(){
	if (arrPnRm.length>0){
		var temparrPnRm		=	new	Array();	//panels removed
		//alert(arrPn.length);
		for (var p=0;p<arrPn.length;p++){
			if (checkinarr(p)==false){
				temparrPnRm.push(arrPn[p]);
			}
		}
		arrPn	=	new	Array();
		arrPn	=	temparrPnRm;
	}
}

function checkinarr(ipp){
	var rt	=	false;
	
	if (arrPnRm.length>0){
		
		for (var q=0;q<arrPnRm.length;q++){
			if (arrPnRm[q]==ipp){
				rt	=	true;
				break;
			}
		}
	}else{
		return false;
	}
	return rt;
}

function setParamsPad(){
	var tv	=	new Array();
	tv['tsz']	=	16;
	tv['topp']	=	9;
	tv['lefp']	=	0;	
	arrPadTxt.push(tv);
	var tv	=	new Array();	
	tv['tsz']	=	20;
	tv['topp']	=	11;
	tv['lefp']	=	0;
	arrPadTxt.push(tv);
	var tv	=	new Array();
	tv['tsz']	=	24;
	tv['topp']	=	13;
	tv['lefp']	=	0;
	arrPadTxt.push(tv);
	var tv	=	new Array();
	tv['tsz']	=	28;
	tv['topp']	=	16;
	tv['lefp']	=	0;
	arrPadTxt.push(tv);
	var tv	=	new Array();
	tv['tsz']	=	36;
	tv['topp']	=	20;
	tv['lefp']	=	0;
	arrPadTxt.push(tv);
	var tv	=	new Array();
	tv['tsz']	=	50;
	tv['topp']	=	28;
	tv['lefp']	=	0;
	arrPadTxt.push(tv);
	var tv	=	new Array();
	tv['tsz']	=	80;
	tv['topp']	=	46;
	tv['lefp']	=	0;
	arrPadTxt.push(tv);
	var tv	=	new Array();
	tv['tsz']	=	120;
	tv['topp']	=	69;
	tv['lefp']	=	0;
	arrPadTxt.push(tv);
}

/**
 * Filter data
 */
function filterData(ipJS){	
	//loop shapes
	$.each(ipJS, function(key, val) {		
		
		var tempVar	=	val;
		$.each(tempVar, function(key1, val1) {
			// push to array panel
			if (key1=="panel"){
				arrPn.push(val1);
			}			
		});
	 });
	//sort array
	arrPn	=	arrPn.sort();	
}

var totalPages	=	2;
/**
 * Sort shapes on panels
 */
function sortShapes(){
	var oropn	=	1;	
	
	for (var i=0;i<arrPn.length;i++){
		
		var varpage;
		var typepn			=	"normal";
		//var nbpages		=	1;
		var nbpages			=	0;
		
		var nbshapesOnPn	=	0;		//number of shapes on panel
		
		$.each(arrS, function(key, val) {			//every shape: key: sid, val: value
							
			var tempVar 	= 	$.parseJSON(val);
			var depth		=	-1;
			var shapeType	=	"noType";
			var codeSh		=	"create";
			
			$.each(tempVar, function(key1, val1) {
				//nbshapesOnPn	=	0;
				codeSh			=	"create";
				
				// push to array panel
				if (key1=="panel"){
					
					if (val1==arrPn[i]){
												
						if ((tempVar['depth']!=undefined)&&(tempVar['depth']!=null)){
							depth	=	tempVar['depth'];
						}	
						
						if ((tempVar['shapeType']!=undefined)&&(tempVar['shapeType']!=null)){
							shapeType	=	tempVar['shapeType'];
							if (shapeType=="comp"){
								
								if (tempVar['urlContent']=='com/eclass/modules/PreviewPDF.swf'){
									shapeType	=	"pdf";	
									if ((arrS['comp_'+tempVar['id']+'_npages']!=undefined)&&(arrS['comp_'+tempVar['id']+'_npages']!=null)){
										varpage = $.parseJSON(arrS['comp_'+tempVar['id']+'_npages']);
										if (varpage['v']>0){
											nbpages	=	varpage['v'];
											totalPages	+=	nbpages;
										}
									}
																		
									typepn	=	"pdf";
								}
								if (tempVar['urlContent']=='com/eclass/modules/youtube.swf'){
									shapeType	=	"youtube";
									typepn		=	"youtube";
								}
								if (tempVar['urlContent']=='com/eclass/modules/gmap.swf'){
									shapeType	=	"gmap";
									typepn		=	"gmap";
								}
								if (tempVar['urlContent']=='com/eclass/modules/home.swf'){
									
									shapeType	=	"start";
									typepn		=	"start";									
								}
								if (tempVar['urlContent']=='com/eclass/modules/texteditor.swf'){									
									shapeType	=	"textEditor";
									typepn		=	"textEditor";
								}
							}
						}
						if ((tempVar['code']!=undefined)&&(tempVar['code']!=null)){
							codeSh	=	tempVar['code'];
						}
						
						if (codeSh!="delete"){
							nbshapesOnPn++;			//number of shapes on panel
						}
													
						shapes.push({'panel':arrPn[i],'sid':key,'depth':depth,'shapeType':shapeType,'code':codeSh});
												
					}
				}			
			});
			
		});	
		
		if (arrPn[i]>0){
			
			if (nbshapesOnPn>0){			
				//var nb		=	oropn;
				var nb		=	oropn;
				//nb		=	i;
				if (typepn=="pdf"){
					if (nbpages>0){	//sure have document
						var strpn	=	"";				
						for (var l=1;l<=nbpages;l++){
							strpn	=	nb+"_"+l;
							arrPnDt.push({'idpn':strpn,'typepn':typepn});
						}
						oropn++;
					}else{
						arrPnRm.push(i);		//empty pdf
					}
					
				}else{
					arrPnDt.push({'idpn':nb,'typepn':typepn});
					oropn++;
				}	
			}else{
				arrPnRm.push(i);		//empty whiteborad 
			}
		}
	
	}
	shapes	=	$.unique(shapes);
}


/**
 * Sort comments by depth
 */
function sortComment(){
	//sort comments by
	if (arrComments.length>0){
		var temp;
		for (var m=0;m<(arrComments.length-1);m++){
			for (var n=(m+1);n<(arrComments.length);n++){
				if (parseFloat(arrComments[m]['depth'])>parseFloat(arrComments[n]['depth'])){
					temp			=	arrComments[m];
					arrComments[m]	=	arrComments[n];
					arrComments[n]	=	temp;
				}
			}
		}
	}
	
	arrCommentsSorted = arrComments;
}

/**
 * Callback
 */
function onLoadDocument(){
	/* BOF MPS EDIT */
	var can_changePn = true;
	var sudipta_ipad = false;
	if((navigator.userAgent.match(/iPhone/i)) || (navigator.userAgent.match(/iPod/i)) || (navigator.userAgent.match(/iPad/i)))
	{
		sudipta_ipad = true;
	}
	else
	{
		sudipta_ipad = false;
	}	
	
	//Intialisation
	if(sudipta_ipad)
	{
		can_display_scroll = true;
	}
	$("#contentPanel").wrapInner("<div id='contentPanel_innerwrap'/>");			
	//Set default
	$('#contentPanel').scrollTop(0);
	$('#thumbPanel').scrollTop(0);
	$("#currentImage1").addClass("selectedImg");
	$("#currentNum1").addClass("selectedNum");
	if(!sudipta_ipad)
	{
		$("#thumbPanel").jScrollTouch();
		$("#contentPanel").jScrollTouch();
	}
	else
	{
		var thumb_iscroll = new iScroll("thumbPanel");
		var content_iscroll = new iScroll("contentPanel");
	}	
	resize();
	
	//Handle Scrolling
	
	$("#listPanels a").live("click",function(e){
		e.preventDefault();
		can_changePn = false;
		var tt = $(this).attr("href");
		tt = tt.substring(tt.indexOf('#'));
		var pos = $(tt).offset().top;
		var ctop = $('#contentPanel').scrollTop();
		if(!sudipta_ipad)
		{
			$('#contentPanel').stop(true).animate({
				scrollTop: (ctop+pos-50)},
				500,function(){
				can_changePn = true;
			});
		}
		else
		{
			content_iscroll.scrollToElement(tt,500);
			can_changePn = true;
		}
		return false;
	});
	
	
	$(".docContainer").addClass("sudipta_scrollPage");
	$(".pdfContainer").addClass("sudipta_scrollPage");
	$(".chatContainer").addClass("sudipta_scrollPage");		//add chat
	$(".textContainer").addClass("sudipta_scrollPage");		//add chat	
	
	$('#contentPanel').bind("scroll touchmove",function(e){
		$(".sudipta_scrollPage").each(function(e){
			
			if(can_changePn)
			{
				var temp = $(this);
				var pnId = temp.attr('id').substr(5);				
								
				var docTop = temp.offset().top;				
				var docBottom = temp.offset().top + temp.height();				
				var contTop = $("#contentPanel").scrollTop();				
				var contBottom = $("#contentPanel").scrollTop()+$("#contentPanel").height();				
				
				if((docTop>0 && docTop<($("#contentPanel").height()/2)) || (docBottom<$("#contentPanel").height() && docBottom>($("#contentPanel").height()/2)))
				{
					/*
					console.log(temp.attr('id'));
					console.log( "docTop: " + docTop );
					console.log( "docBottom: " + docBottom );
					console.log( "contTop: " + contTop );
					console.log( "contBottom: " + contBottom );
					*/
					
					$(".selectedImg").removeClass("selectedImg");
					$(".selectedNum").removeClass("selectedNum");
					$("#currentImage"+pnId).addClass("selectedImg");
					$("#currentNum"+pnId).addClass("selectedNum");
										
					if(!sudipta_ipad)		//not ipad
					{						
						var li_temp = $("#currentNum"+pnId).closest('li');
						var liTop = li_temp.offset().top;
						var liBottom = liTop+li_temp.height();
						var liCont = $("#thumbPanel");
						
						var liContTop = liCont.scrollTop();
						var liContBottom = liContTop+liCont.height();
						
						console.log(temp.attr('id'));
						
						if(liBottom<liContTop)
						{
							console.log("Up "+temp.attr('id'));
							liCont.scrollTop(liContTop+liTop - 50);
						}
						else if(liBottom>=liContBottom)
						{
							console.log("Down "+temp.attr('id'));
							liCont.scrollTop(liContTop+liBottom - liCont.height());
						}
					}
					else
					{
						thumb_iscroll.scrollToElement("#currentImage"+pnId,500);
					}
					
				}
				
			}
			
			
		})
	});
	
	//Functions
	function resize(){
			
			document.getElementById("navigation").style.left = ( ($('#controlBar').width()/2) - ($('#navigation').width()/2) )+"px";
			document.getElementById("content").style.left = ( ($('#headerContainer').width()/2) - ($('#content').width()/2) )+"px";
			
			$('#contentPanel').height($(window).height() - 82);
			$('#thumbPanel').height($(window).height() - 35);
			
			if(can_display_scroll  && sudipta_ipad)
			{				
				thumb_iscroll.refresh();
				content_iscroll.refresh();
			}
		};
		
		$(window).resize(function() {
			resize();
		});
	
/* EOF MPS EDIT */
}

var woip	=	33;
var hoip	=	28;
var currFontSizeTitle	=	5;
var currFontSizeParticipantsTitle	=	2.5;
var currFontSizeParticipants	=	1.8;
var currFontSizeFooterFirstpage	=	1.5;

/**
 * Change font size of first page
 */
function changeFontSize(multi){
	
	//for title
	currFontSizeTitle	=	currFontSizeTitle*multi;
	$(".title").css('fontSize',currFontSizeTitle+"em");
	
	currFontSizeParticipantsTitle	*=	multi;
	$(".participantsTitle").css('fontSize', currFontSizeParticipantsTitle+"em");
	
	currFontSizeParticipants	*=	multi;
	$(".participants").css('fontSize', currFontSizeParticipants+"em");
	
	currFontSizeFooterFirstpage	*=	multi;
	$(".footerFirstpage").css('fontSize', currFontSizeFooterFirstpage+"em");
	
	woip	=	woip*multi;
	hoip	=	hoip*multi;	
	$('.imgpis').attr('width', woip);
	$('.imgpis').attr('height', hoip);
}

/**
 * Sort comments by depth
 */
function sortComment2(arrCms){
	//sort comments by
	if (arrCms.length>0){
		var temp;
		for (var m=0;m<(arrCms.length-1);m++){
			for (var n=(m+1);n<(arrCms.length);n++){
				if (parseFloat(arrCms[m]['sy'])>parseFloat(arrCms[n]['sy'])){
					temp			=	arrCms[m];
					arrCms[m]	=	arrCms[n];
					arrCms[n]	=	temp;
				}
			}
		}
	}
	
	return arrCms;
}

/**
 * Sort shapes on panel by depth
 */
function sortShapesByDepth(){	
	if (shapes.length>1){
		var temp;
		for (var m=0;m<(shapes.length-1);m++){
			for (var n=(m+1);n<(shapes.length);n++){
				if (parseFloat(shapes[m]['depth'])>parseFloat(shapes[n]['depth'])){
					temp		=	shapes[m];
					shapes[m]	=	shapes[n];
					shapes[n]	=	temp;
				}
			}
		}
	}
}

var pnhome	=	-10;

/**
 * Get panel of shape
 */
function getPanel(shape){	
	var panel	=	"-1";	
	var objjs = $.parseJSON(shape);	
	for (x in objjs){
			if (x=="panel"){
				if ((objjs['code']==undefined)||(objjs['code']==null)||(objjs['code']!="delete")){
					panel	=	objjs[x];
					if ((objjs['urlContent']!=undefined)&&(objjs['urlContent']=="com/eclass/modules/home.swf")){
						pnhome	=	panel;						
					}
				}	
			}
	}
	return panel;
}

function addInfoPanel(){
	$("#contentPanel").html("");
	$("#listPanels").html("");
	var str="<div id='panel1' class='docContainer' style='position:relative;width:850px;height:850px;'></div>";
	$("#contentPanel").append(str);
	$("#panel1").html($("#firstpage").html());
	
	var tempcat = "";
	var tempThumb; 
	
	tempcat = document.getElementById('templatePanel').innerHTML;
	tempcat = repS(tempcat,"Id",1);
	tempThumb = "shops/images/startThumb.png";
	tempcat = repS(tempcat,"IMG",tempThumb);
	tempcat = repS(tempcat,"Order",1); 
		
	$("#listPanels").append(tempcat);
}


/**
 * Class display
 */
function CtDis(){
	
	this.pn		=	arrPn;		//panels
	this.pndt	=	arrPnDt;	//panels
	this.sh		=	arrS;		//shapes
	this.sp		=	shapes;		//shapes asso with panel
	this.its	=	items;		//all items
	var catb	=	0;
	if (tbncrt>0){
		catb	=	1;
	}
	
	var widthactive		=	$(window).width() - 250;	
	var heightactive	=	$(window).height()-155;
	
	this.display	=	function(){	
		
		$("#listPanels").html("");
		$("#contentPanel").html("");
		
		for (var j=0;j<this.pndt.length;j++)				//show all thumbnails
		{	
			
			var str	=	addNewPanel(this.pndt[j],j,catb);
			$("#listPanels").append(str);	
		}
		
		var stt				=	0;			// number of panel
		var zoomPn			=	1;
		var currentPnL		=	"";
		var onCurrentZoom	=	"";
		var minXYPn	=	new Array(2);
		var maxXYPn	=	new Array(2);
								
		//show shapes
		for (var j=0;j<this.pn.length;j++){					//Draw for every panel	
			
			if (this.pn[j]>0){
				
				zoomPn	=	1;
				currentPnL	=	"normal";
				stt++;
				
				for (var i=0;i<this.sp.length;i++)			//Draw all shapes on panel
				{	
					if (ismobile == "1") {
						widthwb		=	850;
						maxX		=	widthwb;
						heightwb	=	850;
						maxY		=	heightwb;
					} else {
						widthwb		=	850;
						maxX		=	widthwb;
						heightwb	=	850;
						maxY		=	heightwb;
					}
					
					if (this.pn[j]==this.sp[i]['panel']){	//if true panel, get sid (remember depth sorted)
						if ((this.sp[i]['shapeType']!="gmap")&&(this.sp[i]['shapeType']!="youtube")&&(this.sp[i]['shapeType']!="pdf")&&(this.sp[i]['shapeType']!="textEditor")&&(this.sp[i]['shapeType']!="start")){
							if (this.sp[i]['code']!="delete"){
								var str="<div id='panel"+j+"' class='docContainer' style='position:relative;width:"+widthwb+"px;height:"+heightwb+"px;'></div>";
								$("#contentPanel").append(str);
								var pn	=	"panel"+j;	
								
								//window["paper"+j] 	= new Raphael(document.getElementById(pn),"100%","100%").initZoom();
								window["paper"+j] 	= new Raphael(document.getElementById(pn),"100%","100%");
								paper	=	window["paper"+j];
								
								/*if ((special=="ok")&&(j==2)){
									var cool	=	paper.image("http://devminutes.com/en/shops/images/textEditor.jpg", 0, 0, 850,771);		
								}*/
								
								currentPnL	=	"normal";								
								alldivpp.push({"idpn":"panel"+j,'type':'normal'});		//add div 
								
								str			=	"<input id='zoomPaper"+j+"' type='hidden'  value='1' />";
								$('#panel'+j).append(str);
								onCurrentZoom	=	j;
								
								break;
							}
						}else if ((this.sp[i]['shapeType']=="gmap")||(this.sp[i]['shapeType']=="youtube")){
							if (this.sp[i]['code']!="delete"){
								var str="<div id='panel"+j+"' class='docContainer' style='position:relative;width:"+widthwb+"px;height:"+heightactive+"px;'></div>";
								alldivpp.push({"idpn":"panel"+j,'type':'gmap'});		//add div 
								$("#contentPanel").append(str);
								currentPnL	=	"gmyt";
								str			=	"<input id='zoomPaper"+j+"' type='hidden'  value='1' />";
								$('#panel'+j).append(str);
								onCurrentZoom	=	j;
								break;
							}
						}else if ((this.sp[i]['shapeType']=="start")){
							
							var str="<div id='panel"+j+"' class='docContainer' style='position:relative;width:"+widthwb+"px;height:"+heightwb+"px;'></div>";
							$("#contentPanel").append(str);
							currentPnL	=	"start";
							str			=	"<input id='zoomPaper"+j+"' type='hidden'  value='1' />";
							$('#panel'+j).append(str);
							onCurrentZoom	=	j;							
							alldivpp.push({"idpn":"panel"+j,'type':'normal'});		//add div
							/*var str="<div id='panel"+(j+1)+"' class='docContainer' style='position:relative;width:"+widthwb+"px;height:"+heightactive+"px;'></div>";
							$("#contentPanel").append(str);
							currentPnL	=	"start";
							str			=	"<input id='zoomPaper"+j+"' type='hidden'  value='1' />";
							$('#panel'+(j+1)).append(str);
							onCurrentZoom	=	j;*/
							break;
						}else if (this.sp[i]['shapeType']=="pdf"){
							currentPnL	=	"pdf";
							var nbpages	=	1;
							if ((this.sh['comp_'+this.sp[i]['sid']+'_npages']!=undefined)&&(this.sh['comp_'+this.sp[i]['sid']+'_npages']!=null)){
								var tempVar = $.parseJSON(this.sh['comp_'+this.sp[i]['sid']+'_npages']);
								if (tempVar['v']>0){
									nbpages	=	tempVar['v'];
									for (var k=1;k<=nbpages;k++){
										//var str="<div id='panel"+j+"_"+k+"' class='docContainer' style='position:relative;width:"+widthwb+"px;height:"+heightwb+"px;'></div>";
										var str="<div id='panel"+j+"_"+k+"' class='pdfContainer' style='position:relative;width:"+widthwb+"px;box-shadow:0 0 2px #444444;'></div>";
																				
										$("#contentPanel").append(str);
									}	
								}
							}/*else{		//if panel pdf is empty
								for (var k=1;k<=nbpages;k++){
									var str="<div id='panel"+j+"_"+k+"' class='docContainer' style='position:relative;width:"+widthwb+"px;height:"+heightwb+"px;'></div>";
									$("#contentPanel").append(str);
								}
							}*/					
							break;
						}else if ((this.sp[i]['shapeType']=="textEditor")){
							var txteditor	=	$("#temptexteditor").html();
							txteditor		=	repTemp(txteditor,"texteditor",this.sp[i]['sid']);
							var temph		=	1229;
							var str="<div id='panel"+j+"' class='textContainer' style='position:relative;width:"+widthwb+"px;height:"+temph+"px;'>"+txteditor+"</div>";
							$("#contentPanel").append(str);							
							
							currentPnL	=	"textEditor";
							alldivpp.push({"idpn":"panel"+j,'type':'textEditor'});		//add div 
							str			=	"<input id='zoomPaper"+j+"' type='hidden'  value='1' />";
							$('#panel'+j).append(str);
							onCurrentZoom	=	j;							
							break;
						}
					}
				}								
				
				if (stt==1){																//For homepage	
					
					$("#panel1").html($("#firstpage").html());
					str			=	"<input id='zoomPaper"+stt+"' type='hidden'  value='1' />";	//Zoom firstpage
					$('#panel'+stt).append(str);
				}else{
					for (var i=0;i<this.sp.length;i++)			//Draw all shapes on panel
					{
						if ((this.pn[j]==this.sp[i]['panel'])&&(this.sp[i]['code']!="delete")){	//if true panel, get sid (remember depth sorted)
							
							var tempVar = $.parseJSON(this.sh[this.sp[i]['sid']]);
							 
							switch (tempVar.shapeType)
							{
								case 'text':	
								{
									var txt	=	new Text(tempVar,j);
									txt.setCor(tempVar);
									txt.draw();
									break;
								}
								case 'rect':	
								{	
									var rec	=	new Rect(tempVar,j);
									rec.setCor(tempVar);
									rec.draw();
									break;
								}
								case 'line':
								{
									if (tempVar['a2']==true){
										var ar	=	new Arrow(tempVar,j);
										ar.setCor(tempVar);
									}else{
										var lin	=	new Line(tempVar,j);
										lin.setCor(tempVar);									
										lin.draw();
									}
									break;
								}
								case 'oval':
								{
									var ov=new Oval(tempVar,j);
									ov.setCor(tempVar);
									ov.draw();
									break;
								}
								case 'lineSimpleArrow':
								{
									var ar=new Arrow(tempVar,j);
									ar.setCor(tempVar);
									break;
								}
								case 'image':
								{
									var ima	=	new Img(tempVar,j);
									ima.setCor(tempVar);
									ima.draw();
									break;
								}
								case 'freeHand':
								{
									window["freeHand"+tempVar['id']]	=	new Freehand(tempVar,j);							
									window["freeHand"+tempVar['id']].draw();
									break;
								}
								case 'comp':
								{
									if (tempVar['urlContent']=='com/eclass/modules/PreviewPDF.swf')
									{
										try{										
										if (tempVar['code']!="delete"){											
											if ((arrS["comp_"+tempVar['id']+"_npages"]!=undefined)&&(arrS["comp_"+tempVar['id']+"_npages"]!="")&&(arrS["comp_"+tempVar['id']+"_npages"]!=null)){
												var tempVarVrfPdf = $.parseJSON(this.sh['comp_'+tempVar['id']+'_npages']);												
												if (tempVarVrfPdf['v']>0){													
													if ((arrS['comp_'+tempVar['id']+'_urlpdf']!=undefined)&&(arrS['comp_'+tempVar['id']+'_urlpdf']!=null)){
														
														varpage = $.parseJSON(arrS['comp_'+tempVar['id']+'_urlpdf']);
														
														var linkImgCommon	=	varpage['v'].replace("swf", "jpg");	
														var linkImg	=	varpage['v'].replace("xxx", "1");
														linkImg	=	linkImg.replace("swf", "jpg");
														window["img_"+tempVar['id']]	=	"ok";
														//	j: panel
														//	this.sh: all shapes
														//	this.its: all items
														//  tempVar: current pdf
														//	linkImg: link image
														//  tempVarVrfPdf['v']: number pages
														//checkImgExist(urlImg,j,np,idComp)
														
														//add to image management
														for (var x=1;x<=tempVarVrfPdf['v'];x++){
															imgMng.push({"objs":this.sp[i]['sid']+"_"+x,"srcImg":linkImgCommon.replace("xxx",x),"order":x,"existed":2,"loaded":"nok"});
															alldivpp.push({'idpn':'panel'+j+'_'+x,'type':'pdf'});		//add div
														}
														
														//checkImgExist(urlImg,j,np,idComp)
														
														checkImgExist(linkImgCommon,j,tempVarVrfPdf['v'],this.sp[i]['sid']);		//check image exist and show
													}else{
														//alert("bug");
													}
													/*window["pdf"+tempVar['id']]	=	new Pdf(tempVar,this.sh,this.its,j);												
													//numberpage												
													window["pdf"+tempVar['id']].draw();
													window["pdf"+tempVar['id']].showShapes();*/
												}
											}
										}}catch(err ){}
									}
									
									/*if (tempVar['urlContent']=='com/eclass/modules/youtube.swf')
									{	
										window["youtube"+tempVar['id']]	=	new Youtube(tempVar,this.sh,this.its,j);
										window["youtube"+tempVar['id']].draw();	
										$('#zoomPaper'+onCurrentZoom).val(1);
									}*/
									
									if (tempVar['urlContent']=='com/eclass/modules/gmap.swf')
									{
										window["gmap"+tempVar['id']]	=	new Gmap(tempVar,this.sh,this.its,j);
										window["gmap"+tempVar['id']].draw();
										window["gmap"+tempVar['id']].showFreeHand();
										$('#zoomPaper'+onCurrentZoom).val(1);
									}	
									
									//text editor
									if (tempVar['urlContent']=='com/eclass/modules/texteditor.swf')
									{
										if (tempVar['code']!="delete"){
											//txtedtMng
											txtedtMng.push({"objs":tempVar['id'],"shown":"nok"});
											window["texteditor"+tempVar['id']]	=	new Texteditor(tempVar,j);
											window["texteditor"+tempVar['id']].draw();
										}
									}
									break;
								}							
								default:
								{}
							}
						}
					}	
					//here set zoom and bound
					//if (((currentPnL=="normal")&&((j!=2)))||((currentPnL=="normal")))
					//if (((currentPnL=="normal")&&(special=="ok")&&(j!=2))||((special!="ok")&&(currentPnL=="normal"))){	
					if (currentPnL=="normal"){
						
						//paper.setZoom(zoomPn);
						paper.initZoom(1);
						var bopn		=	paper.getBound();
						var widthPn		=	bopn.maxX	-	bopn.minX;
						var minX		=	bopn.minX;
						
						if (bopn.minX<marge){
							paper.translatepp(-minX,0);
							if (widthPn>730){
								paper.setZoom(730/widthPn);
								$('#zoomPaper'+onCurrentZoom).val(730/widthPn);
							}
							bopn		=	paper.getBound();
							minX		=	Math.abs(60-bopn.minX);
							paper.translatepp(parseInt(minX),0);
						}else{					
							if (bopn.maxX>730){
								paper.setZoom(730/bopn.maxX);
								$('#zoomPaper'+onCurrentZoom).val(730/bopn.maxX);
								paper.translatepp(60,0);
							}							
						}
						
						bopn			=	paper.getBound();
						var pnheight	=	$('#panel'+onCurrentZoom).height();
						if (bopn.minY<75){
							if ((bopn.maxY+(75-bopn.minY))<pnheight){
								paper.translatepp(0,75-bopn.minY);
							}
						}
					}
				}
			}
		}
		
		if (nameImgs.length>0){
			//setTimeOutForImg();		//set time out images
		}
		
		//activePn(1);			//show only first panel
		showNavigation();		//show navigation
		
		/*timeOutPdf	=	namepdf.length;		//time out of converion to pdf
		if (namepdf.length==0){
			timeOutPdf	=	2;
		}*/
		
		timeOutPdf	=	totalPages;
		
		//save2svgByDiv();				//save to svg
		//setTimeout("save2svgByDiv()", 10000);
		//arrPnDt.push({'idpn':nb,'typepn':typepn});
		
		//start chat		
		var ordChat	=	0;
		var nbpc	=	1;
		//show msg chat
		//arrChat
		//$.each(arrS, function(keyc, valc) {			//every shape: key: sid, val: value
			
			//if (keyc.substr(0,5)=="chat_"){
			for (var bc=0;bc<arrChat.length;bc++){
				ordChat++;
				//var tempChat 	= $.parseJSON(valc);
				var tempChat 	= $.parseJSON(arrChat[bc]);
				
				if (ordChat==1){
					arrPnDt.push({'idpn':arrPnDt.length+1,'typepn':'chat'});
					var strChatTb	=	addNewPanel(arrPnDt[arrPnDt.length-1],arrPnDt.length-1,catb);
					$("#listPanels").append(strChatTb);
					alldivpp.push({"idpn":"panel"+arrPnDt.length,'type':'chat'});					//add div
					var str="<div id='panel"+arrPnDt.length+"' class='chatContainer' style='position:relative;width:850px;'><div class='chat'><h1>Meeting Chat</h1><ul id='listChats"+nbpc+"'></ul></div></div>";
					$("#contentPanel").append(str);
				}
				
				var ctchat	=	"";
				ctchat		=	$("#contentChat").html();
				ctchat		=	repTemp(ctchat,"color",tempChat.color);
				ctchat		=	repTemp(ctchat,"name",tempChat.name);
				
				//analyse long message
				var anamess	=	"";
				var lomes	=	tempChat.message.length;
				var nbchl	=	90;
				//alert(tempChat.message+" "+lomes);
				
				//for long chat
				if (lomes>nbchl){					
					var nbbr	=	Math.ceil(lomes/nbchl);
					
					for (var k=0;k<nbbr;k++){
						anamess	=	anamess+tempChat.message.substring(k*nbchl,(k+1)*nbchl)+"<br>";
					}
					ctchat		=	repTemp(ctchat,"message",anamess);
				}else{
					ctchat		=	repTemp(ctchat,"message",tempChat.message);
				}				
				
				$("#listChats"+nbpc).append(ctchat);
				
				/*
				if ($("#listChats"+nbpc).length > 0){
					var heightChat	=	$("#listChats"+nbpc).height();
					if (heightChat>665){
						//$("#panel"+arrPnDt.length).height($("#panel"+arrPnDt.length).height()+heightChat-665);
						$("#panel"+arrPnDt.length).height($("#panel"+arrPnDt.length).height()+heightChat-665);
					}
				}
				*/
								
				if (nbpc==1){
					$("#panel"+arrPnDt.length).height($("#listChats"+nbpc).height()+130);
				}else{
					$("#panel"+arrPnDt.length).height($("#listChats"+nbpc).height()+100);
				}
				
				
				//new: check height to create new page chat here
				if ($("#listChats"+nbpc).height()>1000){				
					//create new page chat
					nbpc++;
					arrPnDt.push({'idpn':arrPnDt.length+1,'typepn':'chat'});
					var strChatTb	=	addNewPanel(arrPnDt[arrPnDt.length-1],arrPnDt.length-1,catb);
					$("#listPanels").append(strChatTb);
					alldivpp.push({"idpn":"panel"+arrPnDt.length,'type':'chat'});					//add div
					//var strh1	=	"";
					var str="<div id='panel"+arrPnDt.length+"' class='chatContainer' style='position:relative;width:850px;'><div class='chat'><ul id='listChats"+nbpc+"'></ul></div></div>";
					$("#contentPanel").append(str);
				}
			}
		//});
		
		if ($("#panel"+arrPnDt.length).height()<850){
			$("#panel"+arrPnDt.length).height(850);
		}
				
		//end chat		
		if (activemp3=="true"){
			if ((linkmp3!=null)&&(linkmp3!="")){
				$("#recmp3").attr("href", linkmp3);
				$("#recmp3").show();
			}else{
				//$("#recnot").show();
				if (clmton=="ye"){
					$("#rengen").show();
					genmp3();
				}else{
					$("#recnot").show();
				}
			}
		}
		
		if ((linkpdf!=null)&&(linkpdf!="")){					
			$("#download").append("<a class='downloadBtn' href='"+linkpdf+"'><span>DOWNLOAD PDF</span></a>");
			//setTimeout("onLoadDocument()", timeOutPdf*600);
		}else{
			//setTimeout("save2svgByDiv()", timeOutPdf*750);				
			//tmimg	=	setInterval("runAutoSource()", 600);
			//tmFill	=	setInterval("fillImgsAuto()", 1000);
			if (clmton=="no"){
				$("#generatePdfOpen").show();
			}else{
				$("#generatePdfClose").show();
			}
			//$("#download").append("<a id='generatePdf' class='generatingBtn'><img src='shops/images/loadgenerate.gif' /><span>GENERATING PDF</span></a>");
		}	
		tmFill	=	setInterval("fillImgsAuto()", 1000);
		onLoadDocument();
	};
}

function showPdf(tempVar,sh,its,j){
	window["pdf"+tempVar['id']]	=	new Pdf(tempVar,sh,its,j);												
	//numberpage												
	window["pdf"+tempVar['id']].draw();
	window["pdf"+tempVar['id']].showShapes();
}

function cbsave(repJson){
	var result 	= repJson;
	if(parseInt(result.result) == 1){
		$("#linkdownload").html("<a target='_blank' href='"+result.namefile+"'>Download</a>");
	}
}

function Shape(id,idPn){  
	
	this.id	=	id;
	this.idPn = idPn;
	var shapeType;  
	var divSelf;
	var divParent;
	var depth;
	
	this.getDivSelf=function()
	{
		return divSelf;
	}
}

function Compdata()
{
	var propId;
	var creationCode;
	var v;	
}

/**
 * Class homepage
 */
function HomePage(){
	this.draw	=	function(cx,cy,txt){
		var text	=	window["paper1"].text(cx, cx,txt);
		text.attr('text-anchor','start');
		text.attr('font-size',30);
	}		
}

/**
 * Class Text
 */
function Text(ip,idPn)
{	
	this.txtSize	=	ip['txtSize'];
	this.txtColor	=	ip['txtColor'];
	this.txtContent	=	ip['txtContent'];
	this.zoom		=	1;
		
	Shape.call(this,ip['id'],idPn);					//call contructor of parent
	
	this.setCor=function(ip)
	{	
		this.co 		= new Array(1);
		this.co [0] 	= new Array(2);		
		this.co[0][0]	=	parseInt(ip['sx']);
		this.co[0][1]	=	parseInt(ip['sy']);
		this.w			=	ip['w'];
		this.h			=	ip['h'];
	};
	
	this.setId	=	function(id)
	{
		this.id=id;	
	};

	this.draw	=	function()
	{			
		var oldwidth	=	$("#panel"+this.idPn).width();
		var oldheight	=	$("#panel"+this.idPn).height();
		var maxRX		=	850;
		//var maxRX		=	790;
		
		var text	=	paper.text(this.co[0][0],this.co[0][1]).attr('text-anchor', 'start');
		text.attr('font-size',this.txtSize-1);
		text.attr('font-family',"Times New Roman,serif");
		var words = unescape(this.txtContent).split(" ");
		var heighttext	=	0;
		
		var tempText = "";
		for (var i=0; i<words.length; i++) {
			text.attr("text", tempText + " " + words[i]);
			if (i==0){
				heighttext	=	text.getBBox().height;
			}
			
		  if (text.getBBox().width > this.w) {
		    tempText += "\n" + words[i];
		  } else {
		    tempText += " " + words[i];
		  }
		}

		text.attr("text", tempText.substring(1));
		this.txtContent	= tempText;	
		var nbLines		=	lineBreakCount(this.txtContent)+1;
		var maxRY		=	this.co[0][1]+this.txtSize*nbLines;
		//alert(nbLines);
		
		if (maxRX>oldwidth){
			var newwidth	=	maxRX;
			$("#panel"+this.idPn).width(newwidth);
		}
		
		if (maxRY>oldheight){
			var newheight	=	maxRY+50;
			$("#panel"+this.idPn).height(newheight);
		}
		
		//var text	=	paper.text(this.co[0][0],this.co[0][1],unescape(this.txtContent));		
		//var text	=	paper.text(this.co[0][0],this.co[0][1],(this.txtContent));
		//text.attr('text-anchor','start');
		
		//text.attr('font-family',"Arial,serif");
		var textColor	=	decimalToHexStringLineColor(this.txtColor);	
		text.attr('fill','#'+textColor);
		if (nbLines>=1){
			//alert(nbLines);
			text.translate(0,nbLines*(this.txtSize-8));		//for text multilines			
			//text.translate(0, (nbLines)*heighttext);			//for text multilines
		}
		
		var topp	=	0,leftp	=	0;
		
		if (this.txtSize==16){
			text.translate(0,8);		//for text multilines
		}else if (this.txtSize==20){
			text.translate(0,-3);		//for text multilines
		}else if (this.txtSize==24){
			text.translate(0,-6);		//for text multilines
		}else if (this.txtSize==28){
			text.translate(0,-9);		//for text multilines
		}else if (this.txtSize==36){
			text.translate(0,-25);		//for text multilines
		}else if (this.txtSize==50){
			text.translate(0,-42);		//for text multilines
		}else if (this.txtSize==80){
			text.translate(0,-80);		//for text multilines
		}else if (this.txtSize==120){
			text.translate(0,-125);		//for text multilines
		}
		
		/*
		if (nbLines<2){
			for(var i=0;i<arrPadTxt.length;i++){			
				if (parseInt(this.txtSize)==parseInt(arrPadTxt[i]['tsz'])){				
					topp	=	parseInt(arrPadTxt[i]['topp']);
					leftp	=	parseInt(arrPadTxt[i]['lefp']);
					break;
				}
			}
			text.translate(leftp,topp);				//padding of text
		}
		*/
	}
}

Text.prototype	=	new Shape;
Text.prototype.constructor	=	Text;

//Class Line
function Line(ip,idPn)
{	
	this.lineThickness	=	ip['lineThickness'];
	this.fillColor		=	ip['fillColor'];
	this.lineDash		=	ip['lineDash'];	
	this.lineColor		=	ip['lineColor'];
	this.zoom			=	1;
	this.minX			=	0;
	this.minY			=	0;
	this.maxX			=	0;
	this.maxY			=	0;
				
	Shape.call(this,ip['id'],idPn);
	
	var scaleX=0,scaleY=0;

	//Can define method here or out of class	
	//Define method
	this.setCor	=	function(ip){
		
		x1=	parseInt(ip['x1']);
		y1=	parseInt(ip['y1']);
		x2=	parseInt(ip['x2']);
		y2=	parseInt(ip['y2']);
		
		this.co = new Array(2);
		
		this.co [0] = new Array(2);		
		this.co[0][0]=x1;
		this.co[0][1]=y1;
		
		this.co [1] = new Array(2);		
		this.co[1][0]=x2;
		this.co[1][1]=y2;
		
		scaleX	=	Math.min(x1,x2);
		scaleY	=	Math.min(y1,y2);
		this.minX	=	scaleX;
		this.maxX	=	Math.max(x1,x2);
	
		maxRX	=	850;
		maxRY	=	Math.max(y1,y2);
	};

	this.draw	=	function()
	{	
		var oldwidth	=	$("#panel"+this.idPn).width();
		var oldheight	=	$("#panel"+this.idPn).height();
		
		if (maxRX>oldwidth){
			var newwidth	=	maxRX;
			$("#panel"+this.idPn).width(newwidth);
		}
		
		if (maxRY>oldheight){
			var newheight	=	maxRY+50;
			$("#panel"+this.idPn).height(newheight);
		}		
		
		var newX1	=	parseInt(this.co[0][0]);		
		var newY1	=	parseInt(this.co[0][1]);		
		var newX2	=	parseInt(this.co[1][0]);		
		var newY2	=	(parseInt(this.co[1][1]));
		
		var line	=	paper.path("M"+newX1+","+newY1+" "+newX2+","+newY2);		
		line.attr('stroke-width',this.lineThickness);		
		var lineColor	=	decimalToHexStringLineColor(this.lineColor);		
		line.attr('stroke','#'+lineColor);
		
		if (Math.max(x1,x2)>790){
			//this.zoom	=	850/(Math.max(x1,x2)+10);
			this.zoom	=	790/(line.getBBox().width);
		}
	};
}

//inherit Person  
Line.prototype = new Shape;  
Line.prototype.constructor	=	Line;		// correct the constructor pointer because it points to Line  

var crtedt	=	"";
//Class Line
function Texteditor(ip,idPn)
{	
	/*this.txtSize	=	ip['txtSize'];
	this.txtColor	=	ip['txtColor'];
	this.txtContent	=	ip['txtContent'];*/
	this.zoom		=	1;
	
		
	Shape.call(this,ip['id'],idPn);					//call contructor of parent
		
	var scaleX=0,scaleY=0;

	//Can define method here or out of class	
	//Define method
	this.setCor	=	function(ip){
		
	};

	this.draw	=	function()
	{
		crtedt			=	this.id;
		$.get(lkgetext,{"room":scode,"compid":this.id,"pn":this.idPn},function(d){
			var result 		= $.parseJSON(d);
			$("#"+result.compid).html(result.txt);
			
			//customize the height of panel if has many text
			var htxt	=	$("#"+result.compid).height();
			//alert(htxt);
			if (htxt>1163){					
				$("#panel"+result.pn).height($("#panel"+result.pn).height()+htxt-1123);
				//$("#body"+result.compid).height($("#body"+result.compidn).height()+100);
			}
			
			for (var u=0;u<txtedtMng.length;u++){
				if ((txtedtMng[u]['objs']==result.compid))
				{	
					txtedtMng[u]['shown']	=	"ok";
					break;
				}
			}
		},'JSON');
	};
}

//inherit Person  
Texteditor.prototype = new Shape;  
Texteditor.prototype.constructor	=	Texteditor;		// correct the constructor pointer because it points to Line  

/**
 * Class Rect
 */
function Rect(ip,idPn)
{	
	this.lineThickness	=	ip['lineThickness'];
	this.fillColor		=	ip['fillColor'];
	this.lineDash		=	ip['lineDash'];	
	this.lineColor		=	ip['lineColor'];
	this.opacity		=	ip['al'];	
	this.zoom			=	1;
	
	Shape.call(this, ip['id'],idPn);
	
	var scaleX=0,scaleY=0;
		
	this.setCor=function(ip)
	{
		x1	=	ip['x1'];
		y1	=	ip['y1'];
		x2	=	ip['x2'];
		y2	=	ip['y2'];
		
		this.co = new Array(2);
		
		this.co [0] = new Array(2);		
		this.co[0][0]=x1;
		this.co[0][1]=y1;
		
		this.co [1] = new Array(2);		
		this.co[1][0]	=	x2;
		this.co[1][1]	=	y2;
		
		scaleX	=	Math.min(x1,x2);
		scaleY	=	Math.min(y1,y2);
		maxRX	=	850;
		maxRY	=	Math.max(y1,y2);
		
	};

	this.draw	=	function()
	{	
		var oldwidth	=	$("#panel"+this.idPn).width();
		var oldheight	=	$("#panel"+this.idPn).height();
		
		if (maxRX>oldwidth){
			var newwidth	=	maxRX;
			$("#panel"+this.idPn).width(newwidth);
		}
		
		if (maxRY>oldheight){
			var newheight	=	maxRY+50;
			$("#panel"+this.idPn).height(newheight);
		}
		
		var rectangle	=	paper.rect(scaleX,scaleY,Math.abs(this.co[1][0]-this.co[0][0]),Math.abs(this.co[1][1]-this.co[0][1]));
		
		if (Number(this.fillColor)>=0)
		{
			var fillcolor=decimalToHexStringFillColor(this.fillColor);		
			rectangle.attr('fill','#'+fillcolor);
		}			
		
		var lineColor=decimalToHexStringLineColor(this.lineColor);
		rectangle.attr('stroke','#'+lineColor);
		rectangle.attr('stroke-width',this.lineThickness);		
		//rectangle.attr('opacity',this.opacity);
		rectangle.attr('fill-opacity',this.opacity);
			
		if (Math.max(x1,x2)>850){
			//this.zoom	=	850/(Math.max(x1,x2)+10);
			this.zoom	=	850/(Math.max(x1,x2)+30);
		}		
	};	
		
}

//inherit Person  
Rect.prototype = new Shape;  
Rect.prototype.constructor	=	Rect;		// correct the constructor pointer because it points to Rect

/**
 * Class oval
 */
function Oval(ip,idPn)
{	
	this.lineThickness=ip['lineThickness'];
	this.fillColor	=	ip['fillColor'];
	this.lineDash	=	ip['lineDash'];	
	this.lineColor	=	ip['lineColor'];	
	this.opacity	=	ip['al'];
	this.zoom	=	1;
	var cx,cy,rx,ry,x1,x2,y1,y2;
	
	Shape.call(this, ip['id'],idPn);
	
	var scaleX=0,scaleY=0;
		
	this.setCor=function(ip)
	{
		x1=	parseInt(ip['x1']);
		y1=	parseInt(ip['y1']);
		x2=	parseInt(ip['x2']);
		y2=	parseInt(ip['y2']);
		scaleX	=	Math.min(x1,x2);
		scaleY	=	Math.min(y1,y2);
		
		maxRX	=	850;
		maxRY	=	Math.max(y1,y2);
		
		this.cx	=	(x1+x2)/2;
		this.cy	=	(y1+y2)/2;
		this.rx	=	Math.abs(x2-x1)/2;
		this.ry	=	Math.abs(y2-y1)/2;		
	};

	this.draw=function()
	{	
		var oldwidth	=	$("#panel"+this.idPn).width();
		var oldheight	=	$("#panel"+this.idPn).height();
		
		if (maxRX>oldwidth){
			var newwidth	=	maxRX;
			$("#panel"+this.idPn).width(newwidth);
		}
		
		if (maxRY>oldheight){
			var newheight	=	maxRY+50;
			$("#panel"+this.idPn).height(newheight);
		}
		
		var newCx	=	Math.abs(this.cx);
		var newCy	=	Math.abs(this.cy);
		
		var ellip	=	paper.ellipse(newCx, newCy, this.rx, this.ry);
		
		if (Number(this.fillColor)>=0)
		{
			var fillColor=decimalToHexStringFillColor(this.fillColor);	
			ellip.attr('fill','#'+fillColor);
		}	
		var lineColor=decimalToHexStringLineColor(this.lineColor);
		ellip.attr('stroke','#'+lineColor);
		ellip.attr('stroke-width',this.lineThickness);
		ellip.attr('fill-opacity',this.opacity);
		//this.myRect.attr( 'opacity', 0);

		
		if (ellip.getBBox().width>790){
			this.zoom	=	790/(ellip.getBBox().width);
		}
	};
	
}

//inherit   
Oval.prototype = new Shape;  
Oval.prototype.constructor	=	Oval;		// correct the constructor pointer because it points to Oval

function Arrow(ip,idPn)
{	
	this.lineThickness	=	ip['lineThickness'];
	this.fillColor		=	ip['fillColor'];
	this.lineDash		=	ip['lineDash'];	
	this.lineColor		=	ip['lineColor'];
	this.zoom			=	1;
	
	Shape.call(this, ip['id'],idPn);
	
	var scaleX=0,scaleY=0;
	
	this.setCor	=	function(ip)
	{
		x1	=	parseInt(ip['x1']);	
		y1	=	parseInt(ip['y1']);
		x2	=	parseInt(ip['x2']);
		y2	=	parseInt(ip['y2']);
		
		maxRX	=	850;
		maxRY	=	Math.max(y1,y2);
		
		scaleX	=	0;
		scaleY	=	0;
		
		this.co = new Array(2);
		
		this.co [0] 	= 	new Array(2);		
		this.co[0][0]	=	x1;
		this.co[0][1]	=	y1;
		
		this.co [1] 	= 	new Array(2);		
		this.co[1][0]	=	x2;
		this.co[1][1]	=	y2;
		
		this.lineColor	=	decimalToHexStringLineColor(this.lineColor);
		
		var oldwidth	=	$("#panel"+this.idPn).width();
		var oldheight	=	$("#panel"+this.idPn).height();
		
		if (maxRX>oldwidth){
			var newwidth	=	maxRX;
			$("#panel"+this.idPn).width(newwidth);
		}
		
		if (maxRY>oldheight){
			var newheight	=	maxRY+50;
			$("#panel"+this.idPn).height(newheight);
		}
					
		var size	=	40;
		var hv		=	0;
		if (this.lineThickness==50){
			size	=	10;
			hv		=	25;
		}else if (this.lineThickness==20){
			size	=	10;
			hv		=	10;
		}else if (this.lineThickness==15){
			size	=	7;
			hv		=	7;
		}else if (this.lineThickness==10){
			size	=	6;
			hv		=	6;
		}else if (this.lineThickness==8){
			size	=	5;
			hv		=	5;
		}else if (this.lineThickness==5){
			size	=	3;
			hv		=	3;
		}else if (this.lineThickness==4){
			size	=	3;
			hv		=	3;
		}else if (this.lineThickness==3){
			size	=	3;
			hv		=	3;
		}else if (this.lineThickness==2){
			size	=	2;
			hv		=	2;
		}else if (this.lineThickness==1){
			size	=	2;
			hv		=	2;
		}
		
		var angle = Math.atan2(x1-x2,y2-y1);
		angle = (angle / (2 * Math.PI)) * 360;
				
		if (parseInt(angle)<0){
			x2	=	x2	-	hv;
		}else if ((parseInt(angle)>0)&&(parseInt(angle)<180)){
			x2	=	x2	+	hv;
		}
		
		if ((parseInt(angle)<90)&&(parseInt(angle)>-90))
		{
			y2	=	y2	-	hv;
		}else if ((parseInt(angle)>90)||(parseInt(angle)<-90)){
			y2	=	y2	+	hv;
		}
				
		var arrow2  = paper.path("M"+x1+" "+y1+"L"+x2+" "+y2);
		arrow2.attr({ "stroke-width" : this.lineThickness });
		arrow2.attr('stroke','#'+this.lineColor);
		
		var arrow1	=	paper.path(triangle(x2, y2 - (size / 2), size));
		arrow1.attr({ "fill" : "#000000", "stroke-width" : this.lineThickness });	
		arrow1.attr({ "fill" : '#'+this.lineColor});
		arrow1.attr('stroke','#'+this.lineColor);
				
		arrow1.rotate(((Math.atan2(x1 - x2, y2 - y1) / (2 * Math.PI)) * 360) + 180);		
		var bbarr	=	arrow1.getBound();
		var leth	=	arrow2.getTotalLength();
		var pointogo	=	arrow2.getPointAtLength(leth-2*size);
		arrow1.translate(pointogo.x-(bbarr.x+(bbarr.width)/2),pointogo.y-(bbarr.y+(bbarr.height)/2));
	};
}

//inherit   
Arrow.prototype = new Shape;  
Arrow.prototype.constructor	=	Arrow;		// correct the constructor pointer because it points to Arrow

function triangle (cx, cy, r) {
    r *= 1.75;
    var rt	=	"M".concat(cx, ",", cy, "m0-", r * 2.58, "l", r * .5, ",", r * .87, "-", r, ",0z");
    return rt;
}

var namevr;
var nameImgs	=	new Array();
var startRunTimeImg	=	false;

function Img(ip,idPn)
{	
	this.urlContent	=	ip['urlContent'];
	var anh = new Image();
	anh.src	= this.urlContent;	
	this.zoom	=	1;
	
	var newDemension	=	false;
	var srImg	=	this.urlContent;	
	var wid=100,hei=100;
	
	Shape.call(this, ip['id'],idPn);
	
	this.setCor=function(ip)
	{	
		x1	=	parseInt(ip['x1']);
		y1	=	parseInt(ip['y1']);		
		x2	=	parseInt(ip['x2']);		
		y2	=	parseInt(ip['y2']);
	
		maxRX	=	850;
		maxRY	=	Math.max(y1,y2);
		
		this.co = new Array(2);
		this.co [0] = new Array(2);		
		this.co[0][0]=x1;
		this.co[0][1]=y1;
										
		if (!((x1==x2)&&(y1==y2)))
		{
			wid=	Math.abs(parseInt(x2-x1));
			hei=	Math.abs(parseInt(y2-y1));
			newDemension	=	true;
		}else{
			if (chdmImg==true){
				var dms	=	getImgSize(this.urlContent);
				wid	=	dms[0];
				hei	=	dms[1];
			}else{
				wid	=	ip['ow'];
				hei	=	ip['oh'];
			}			
		}
		if (wid==0){
			wid=200;
			hei=200;
		}
	};
		
	this.draw=function()
	{	
		var x	=	this.co[0][0];
		var y	=	this.co[0][1];
		var img;
		
		var oldwidth	=	$("#panel"+this.idPn).width();
		var oldheight	=	$("#panel"+this.idPn).height();
		
		if (maxRX>oldwidth){
			var newwidth	=	maxRX;
			$("#panel"+this.idPn).width(newwidth);
		}
		
		if (maxRY>oldheight){
			var newheight	=	maxRY+50;
			$("#panel"+this.idPn).height(newheight);
		}
		
		//img	=	paper.image(this.urlContent, x, y, wid,hei);
		namevr	=	"shape"+this.id;
		//window[namevr]	=	paper.image(this.urlContent, x, y, wid,hei);
				
		
		//window[this.id+"_"+"rect"] 		= paper.rect(x-1,y-1,wid+1,hei+1);
		//window[this.id+"_"+"rect"].attr('stroke','#000000');		
		//window["shape"+this.id+"temp"]	=	paper.image(imgLoading, x+(wid-24)/2, y+(hei-24)/2, 24,24);
		//window["shape"+this.id]	=	paper.image("", x, y, wid,hei);		
		
		window[namevr]	=	paper.image(this.urlContent, x, y, wid,hei);
		
		//nameImgs.push({"tempvar":this.id+"temp","objs":"shape"+this.id,"srcImg":this.urlContent,"x":x,"y":y,"wid":wid,"hei":hei});
		
		//img		=	window["shape"+this.id];
		
		//setTimeout("window[namevr].node.href.baseVal = '"+this.urlContent+"'",1000);		//change soure of image
		//setTimeout("setImgsource(window[namevr],'"+this.urlContent+"')",1000);				//change soure of image
		/*
		if (img.getBBox().width>850){
			//this.zoom	=	850/(Math.max(x1,x2)+10);
			this.zoom	=	790/(img.getBBox().width);
		}
		*/
		/*
		if (startRunTimeImg==false){			
			startRunTimeImg	=	true;
			if (markStartTimeOutImg>0)	markStartTimeOutImg	=	markStartTimeOutImg-1;
			setImgSourceImgFibo(nameImgs[markStartTimeOutImg]['objs'],nameImgs[markStartTimeOutImg]['srcImg'],markStartTimeOutImg);
		}
		*/
	};
}

//inherit   
Img.prototype = new Shape;  
Img.prototype.constructor	=	Img;		// correct the constructor pointer because it points to Img

function midPoint(Ax, Ay, Bx, By)
{
    var Zx = (Ax-Bx)/2 + Bx;
    var Zy = (Ay-By)/2 + By;
    return new Array(Zx, Zy);
}

/**
 * Freehand
 */
function Freehand(ip,idPn)
{	
	this.lineThickness	=	ip['lineThickness'];
	this.fillColor		=	ip['fillColor'];
	this.lineDash		=	ip['lineDash'];	
	this.lineColor		=	ip['lineColor'];
	this.zoom			=	1;
		
	var points="'M";
	//var points="'";
	Shape.call(this,ip['id'],idPn);
	var pots = ip['p'];
	
	var maxCX		=	850;
	var maxRX		=	0;
	var maxRY		=	0;
	var X=0,Y=1;
		
	for (var t=0;t<pots.length;t++){
		
		if (maxRX<pots[t]['x']){
			maxRX	=	pots[t]['x'];
		}
		
		if (maxRY<pots[t]['y']){
			maxRY	=	pots[t]['y'];
		}
	}
	
	var scaleX	=	0;
	var scaleY	=	0;
	var next,Z;
	var point =  pots[0];
	
	points += Math.abs(parseFloat(pots[0]['x'])-scaleX)+","+Math.abs(parseFloat(pots[0]['y'])-scaleY)+"M";	
	
	for (var t=1;t<pots.length;t++)
	{
		next = pots[t];
	    
	    Z = midPoint(point['x'], point['y'], next['x'], next['y']);
	    
	    points += " "+Z[0]+","+Z[1];
	    points += "Q"+next['x']+","+next['y'];
	    point = next;
		
		
		//points +=Math.abs(parseFloat(pots[t]['x'])-scaleX)+","+Math.abs(parseFloat(pots[t]['y'])-scaleY)+" ";
		
	    /*
	    if ((t%2==1)){
			points +="Q"+Math.abs(parseFloat(pots[t]['x'])-scaleX)+","+Math.abs(parseFloat(pots[t]['y'])-scaleY)+" ";
		}else{
			points +=Math.abs(parseFloat(pots[t]['x'])-scaleX)+","+Math.abs(parseFloat(pots[t]['y'])-scaleY)+" ";
		}
		*/
		
		/*if (t==0){
			points +=Math.abs(parseFloat(pots[t]['x'])-scaleX)+","+Math.abs(parseFloat(pots[t]['y'])-scaleY)+" ";
		}else{
			points +=Math.abs("T"+parseFloat(pots[t]['x'])-scaleX)+","+Math.abs(parseFloat(pots[t]['y'])-scaleY)+" ";
		}*/
	}	
	points +=" '";
	this.points	=	points;	
		
	this.draw=function()
	{	
		var oldwidth	=	$("#panel"+this.idPn).width();
		var oldheight	=	$("#panel"+this.idPn).height();
		
		if (maxCX>oldwidth){
			var newwidth	=	maxCX;
			$("#panel"+this.idPn).width(newwidth);
		}
		
		if (maxRY>oldheight){
			var newheight	=	maxRY+50;
			$("#panel"+this.idPn).height(newheight);
		}
		
		var re,fillcolor;
			
		if (Number(this.fillColor) > 0)
		{
			re=	Number(this.fillColor).toString(16).toUpperCase();	
			var lengthFill=6-re.length;		
			var tp="";
			for(var u=0;u<lengthFill;u++)
			{
				tp=tp.concat("0");
			}
			tp	=	tp.concat(re);
			fillcolor	=	tp;
			
			this.points	=	this.points+" z ";
		}
		else if(Number(this.fillColor) == 0)
		{
			fillcolor="000000";
			this.points	=	this.points+" z ";
		}			
		
		var freehand	=	paper.path(this.points);
		
		freehand.attr('stroke-width',this.lineThickness);		
		var lineColor	=	decimalToHexStringLineColor(this.lineColor);
		freehand.attr('stroke','#'+lineColor);
		freehand.attr('fill','#'+fillcolor);
		
		if (maxRX>850){			
			this.zoom	=	850/(maxRX+30);
		}
	};
}

//inherit   
Freehand.prototype = new Shape;  
Freehand.prototype.constructor	=	Freehand;		// correct the constructor pointer because it points to Freehand

/**
 * Freehand for pdf 
 * currentPagePdf: current Page showing
 * currentPagePdf: number of page that FH's on
 */
//var newFH	=	new Freehand2(vl,pdf['id'],nbPage,this.newzoom,window["paper"+this.idPn+"_"+nbPage],window[this.id+"_"+pageFHOn],"panel"+this.idPn+"_"+pageFHOn);
function Freehand2(ip,pdfId,pageActive,zumm,pPDF,pImage,pnPP)
{	
	this.lineThickness	=	ip['lineThickness'];
	this.fillColor		=	ip['fillColor'];
	this.lineDash		=	ip['lineDash'];	
	this.lineColor		=	ip['lineColor'];	
	
	var points	=	"'M";	
	this.id		=	ip['id'].replace(".","");
	
	var scaleX	=	(minPoint(ip['p']))[0];
	var scaleY	=	(minPoint(ip['p']))[1];
	
	var bopn1	=	pPDF.getBound();
	scaleX		=	Math.min(scaleX,bopn1.minX);
	scaleY		=	Math.min(scaleY,bopn1.minY);
	
	var scaleY	=	0;
	var scaleX	=	0;
		
	for (var t=0;t<ip['p'].length;t++)
	{
		points +=	Math.abs(parseInt(ip['p'][t]['x'])-scaleX)+","+Math.abs(parseInt(ip['p'][t]['y'])-scaleY)+" ";
	}	
	
	points +=" '";
	this.points	=	points;	
		
	this.draw	=	function()
	{	
		var re,fillcolor;
			
		if (Number(this.fillColor) > 0)
		{
			re=	Number(this.fillColor).toString(16).toUpperCase();				
			var lengthFill	=	6-re.length;					
			var tp			=	"";
			
			for(var u=0;u<lengthFill;u++)
			{
				tp=tp.concat("0");
			}
			tp			=	tp.concat(re);
			fillcolor	=	tp;
			
			this.points	=	this.points+" z ";
		}
		else if(Number(this.fillColor) == 0)
		{
			fillcolor	=	"000000";
			this.points	=	this.points+" z ";
		}
		
		window["freeHand"+pdfId].push("freeHand"+this.id);
		window["freeHand"+this.id]		=	pPDF.path(this.points);
		var lineThickness	=	parseInt(zumm*this.lineThickness);
		
		if ((lineThickness>0)&&(lineThickness<1)){
			lineThickness	=	1;
		}
		
		window["freeHand"+this.id].attr('stroke-width',lineThickness);
		
		var lineColor	=	decimalToHexStringLineColor(this.lineColor);
		window["freeHand"+this.id].attr('stroke','#'+lineColor);
		window["freeHand"+this.id].attr('fill','#'+fillcolor);
		
		var bbFH	=	window["freeHand"+this.id].getBBox();
						
		var bopn1		=	pPDF.getBound();
		var widthPn1	=	bopn1.maxX	-	bopn1.minX;
		var heightPn1	=	bopn1.maxY	-	bopn1.minY;
		
		$("#"+pnPP).width(bopn1.maxX);
		$("#"+pnPP).height(bopn1.maxY);
	};
	
}

//inherit   
Freehand2.prototype = new Shape;  
Freehand2.prototype.constructor	=	Freehand2;		// correct the constructor pointer because it points to Freehand

/**
 * Comp PDF
 * @param  pdf: pros of pdf
 * 		   bigArr: all items with value
 * 		   its: names of all items
 * 		   idPn: id of Panel			
 */

var namepdf	=	new Array();
var startRunTime	=	false;
var nbComPdf	=	0;		//number conf pdf

function Pdf(pdf,bigArr,its,idPn)
{	
	var urlContent;	
	var sr			=	"";
	this.strRep		=	1;			//page active
	var numberpage	=	0;
	this.zoom		=	1;
	this.newzoom	=	1;
	var paperB;						//paper Raphel
	this.ites		=	its;		//All items
	
	this.pdf		=	pdf;
	this.bigArr		=	bigArr;
	this.its		=	its;
	
	this.div		= $('#panel'+idPn);
	
	var width	=	850,	height	=	850;	
	var dwpdf	=	width,dhpdf		=	height;
	var hasFreehand	=	false;
	window["freeHand"+pdf['id']]	=	new Array();
	var realWidth	=	1;
	var verifySize	=	0;
	var imgCreated	=	"ok";
		
	Shape.call(this, pdf['id'],idPn);		//call contructor of parent
	
	for (var i=0;i<its.length;i++)			// loop all items
	{
		var b	=	its[i];
		
		var lengthIdPdf	=	pdf['id'].length;
		
		if (b.substring(0,4)=="comp"){
			if (b.substr(5,lengthIdPdf)==pdf['id']){						//properties of comp pdf				
				var protie	=	b.substr(5+lengthIdPdf+1);					//name of protie
				var vl		=	$.parseJSON(bigArr[b]);						//array value
												
				if (protie=="urlpdf"){										//pro urlpdf					
					sr		=	vl['v'];									//examples					
					if (sr.lastIndexOf(".swf")!=-1){						//if pdf type swf						
					} 
				}
				
				if (protie=="page"){								//pro page is viewing					
					this.strRep	=	parseInt(vl['v']);
					if (this.strRep==0){
						this.strRep	=	1;
					}
				}
				
				if (protie=='npages')
				{	
					numberpage	=(parseInt)(vl['v']);	
					totalImages	+=	numberpage;
				}
				
				if (protie=='ow')
				{
					width		=	850;					
					realWidth	=	(parseInt)(vl['v']);
					
					if (verifySize==1){
						height	=	parseInt(width*height/realWidth);
						dhpdf	=	height;
					}						
					dwpdf	=	width;
				}
				
				/*
				if (protie=='imgCreated'){
					imgCreated	=	vl['v'];
				}
				*/
				
				if (protie=='oh')
				{	
					if (realWidth!=1){
						height	=	parseInt(width*parseInt(vl['v'])/realWidth);
						dhpdf	=	height;
					}else{
						verifySize	=	1;		//need to re-calculate height
						height		=	parseInt(vl['v']);
					}				
				}
				
				if (protie=='zoom')
				{	
					this.zoom	=(vl['v']);
				}
			}
		}
	}
	
	//for oh2,ow2	
	if ((arrS["comp_"+pdf['id']+"_ow2"]!=undefined)&&(arrS["comp_"+pdf['id']+"_ow2"]!="")&&(arrS["comp_"+pdf['id']+"_ow2"]!=null)){
		var vl1		=	$.parseJSON(bigArr["comp_"+pdf['id']+"_ow2"]);
		var vl2		=	$.parseJSON(bigArr["comp_"+pdf['id']+"_oh2"]);
		width		=	850;		
		dwpdf		=	width;
		realWidth	=	(parseInt)(vl1['v']);
		height	=	parseInt(width*parseInt(vl2['v'])/realWidth);
		dhpdf	=	height;
	}
		
	sr	=	String(sr);
	
	var sourcePdf	=	sr.substring(0,sr.length-7);
	var strm		=	sr;
	strm			=	strm.replace(".swf",".jpg");
	
	var x	=	parseInt(pdf['x1']);
	var y	=	parseInt(pdf['y1']);
	
	var x2	=	parseInt(pdf['x2']);
	var y2	=	parseInt(pdf['y2']);
	
	var newwidth;
	var newheight;
	
	var markStartTimeOut	=	0;
	
	this.draw	=	function()
	{			
		maxRX	=	1200;
		maxRY	=	(height/width)*1200;
		
		var oldwidth	=	$("#panel"+this.idPn+"_1").width();
		var oldheight	=	$("#panel"+this.idPn+"_1").height();
		
		var str;
				
		for (var u=1;u<=numberpage;u++){
			
			nbComPdf++;
			
			if (maxRX>oldwidth){
				newwidth	=	maxRX;
				$("#panel"+this.idPn+"_"+u).width(newwidth);
			}
			
			if (maxRY>oldheight){
				newheight	=	maxRY;
				$("#panel"+this.idPn+"_"+u).height(newheight);
			}
			
			var sourceImg		=	strm.replace("xxx",u);
			
			window["paper"+this.idPn+"_"+u]	= new Raphael(document.getElementById('panel'+this.idPn+'_'+u),"100%","100%").initZoom();			
			paper						= window["paper"+this.idPn+"_"+u];		//paper
			
							
			if (u==1){
				markStartTimeOut	=	namepdf.length;
			}
			
			namepdf.push({"objs":this.id+"_"+u,"srcImg":sourceImg});
			//window[this.id+"_"+u+"temp"]	=	paper.image(imgLoading,(width-24)/2, (height-24)/2, 24,24);
						
			//for first 5 pages
			//imgMng.push({"objs":repJson.id+"_"+repImg[i]['order'],"srcImg":repImg[i]['url'],"order":repImg[i]['order'],"existed":repImg[i]['existed'],"loaded":"nok"});
			
			if ((nbComPdf<6)&&(startRunTime==false)){
				
				for (var o=0;o<imgMng.length;o++){
					
					if ((imgMng[o]['objs']==(this.id+"_"+u)))
					{
						if (imgMng[o]['existed']==1){
							window[this.id+"_"+u] 			= 	window["paper"+this.idPn+"_"+u].image(sourceImg, 0,0,width,height);			//image
							//window[this.id+"_"+u+"temp"].remove();
							imgMng[o]['loaded']	=	"ok";
						}else{
							window[this.id+"_"+u] 			= 	window["paper"+this.idPn+"_"+u].image(whiteWait, 0,0,width,height);			//image
							//window[this.id+"_"+u+"temp"].remove();
							window[this.id+"_"+u+"temp"]	=	paper.image(imgLoading,(width-24)/2, (height-24)/2, 24,24);
						}
						break;
					}
				}
			}else{
				window[this.id+"_"+u] 			= 	window["paper"+this.idPn+"_"+u].image(whiteWait, 0,0,width,height);			//image
				window[this.id+"_"+u+"temp"]	=	paper.image(imgLoading,(width-24)/2, (height-24)/2, 24,24);
			}
									
			//setTimeout("setImgsource(window[namepdf[u-1]],'"+sourceImg+"')",1000+u*300);			//change soure of image
			//alldivpp.push('panel'+this.idPn+'_'+u);			//add div			
						
			//alldivpp.push({'idpn':'panel'+this.idPn+'_'+u,'type':'pdf'});		//add div 
			
			$("#paper"+this.idPn+"_"+u).height(height);
			
			if ((startRunTime==false)&&(nbComPdf==6)){
				
				startRunTime	=	true;
				setImgSourceFibo(imgMng[nbComPdf-1]['objs'],imgMng[nbComPdf-1]['srcImg'],nbComPdf-1);
			}
					
		}
		
		if (markStartTimeOut>0) markStartTimeOut	=	markStartTimeOut-1;
		
		/*
		if ((startRunTime==false)&&(nbComPdf==5)){
			
			alert("start");
			
			startRunTime	=	true;
			
			//setImgSourceFibo(namepdf[markStartTimeOut]['objs'],namepdf[markStartTimeOut]['srcImg'],markStartTimeOut);
			
			//setImgSourceFibo(imgMng[markStartTimeOut]['objs'],imgMng[markStartTimeOut]['srcImg'],markStartTimeOut);
			
			setImgSourceFibo(imgMng[nbComPdf-1]['objs'],imgMng[nbComPdf-1]['srcImg'],nbComPdf-1);
			
			//setTimeout("setImgSourceFibo(newobjSource,newnewUrl,newnext);", 600);
			//setTimeout(setImgSourceFibo(namepdf[markStartTimeOut]['objs'],namepdf[markStartTimeOut]['srcImg'],markStartTimeOut), 1000);
		}
		*/
		
		this.newzoom	=	1;
	};
	
	//Show button Next - Previous for Pdfs
	this.drawButton	=	function()
	{	
		var str		=	"<button class='previousBtn' onClick=\"showImagePdf('"+this.id+"','"+sourcePdf+"',-1,"+numberpage+")\"></button>";
		$('#navigation').html(str);
		var str2	=	"<button class='nextBtn' onClick=\" showImagePdf('"+this.id+"','"+sourcePdf+"',1,"+numberpage+")\"></button>";
		$('#navigation').append(str2);
		str			=	"<input id='"+this.id+"' type='hidden'  value='"+this.strRep+"' />";
		$('#navigation').append(str);
	};	
	
	/**
	 * Draw button zoom
	 */
	this.drawZoom	=	function(pnActive)
	{	
		addZoomPaper(pnActive, this.newzoom);
	};
	
	/**
	 * Draw all shapes on page
	 */
	this.showShapes	=	function()
	{	
		var pdf		=	this.pdf;
		var bigArr	=	this.bigArr;
		var idPn	=	this.idPn;
		var	hasFh	=	"";
		var sttCm	=	0;
		var hasComment	=	"no";
		
		for (var nbPage=1;nbPage<=numberpage;nbPage++){
						
			hasFh	=	"no";
			hasComment	=	"no";
			sttCm	=	0;
			for (var i=0;i<this.ites.length;i++)
			{				
				var b	=	this.ites[i];
				var lengthIdPdf	=	pdf['id'].length;
				if (b.substring(0,4)=="comp"){
					if (b.substr(5,lengthIdPdf)==pdf['id']){				//properties of comp pdf
						var protie	=	b.substr(5+lengthIdPdf+1);			//name of protie
						var vl		=	$.parseJSON(bigArr[b]);				//array value
						//if (inarray(protie)==false){						//maybe freeHand							
						if ((inarray(protie)==false)&&(vl.code!="delete")){	//maybe freeHand
							if (vl.shapeType=="comment"){					//comments
								sttCm++;
								if (parseInt(vl.sx)>0){
									
									//sttCm++;
									var pageFHOn	=	parseInt((vl.sx+5)/10);	//page where Comments is on
									
									if (pageFHOn==nbPage){										
										hasComment	=	"yes";
										arrcmtmp.push({"page":pageFHOn,"id":b,"depth":vl.depth,'sy':vl.sy,"properties":vl});										
									}
								}
							}
							else if (vl.shapeType=="line"){
								//sttCm++;
								var pageFHOn	=	parseInt((vl.x1+5)/10);	//page where Comments is on
								
								if (pageFHOn==nbPage){				
									var bopnOn		=	window[this.id+"_"+pageFHOn].getBBox();
									
									vl.x1	=	bopnOn.x	+((parseFloat(vl.x1)-pageFHOn*10)*dwpdf);		//coords are % on width of image
									vl.y1	=	bopnOn.y	+((parseFloat(vl.y1)-pageFHOn*10)*dhpdf);		//coords are % on height of imag
									
									vl.x2	=	bopnOn.x	+((parseFloat(vl.x2)-pageFHOn*10)*dwpdf);		//coords are % on width of image
									vl.y2	=	bopnOn.y	+((parseFloat(vl.y2)-pageFHOn*10)*dhpdf);		//coords are % on height of imag
									vl['lineThickness']	=	vl['lineThickness']*width;
									
									if (vl['a2']==true){				//Arrow																				
										var x1	=	parseInt(vl['x1']);	
										var y1	=	parseInt(vl['y1']);
										var x2	=	parseInt(vl['x2']);
										var y2	=	parseInt(vl['y2']);
										var size	=	9*vl.lineThickness/2;
										
										var angle = Raphael.angle(x1, y1, x2, y2);
										var a45 = Raphael.rad(angle-45);
										var a45m = Raphael.rad(angle+45);
										var a135 = Raphael.rad(angle-135);
										var a135m = Raphael.rad(angle+135);
										
										var x1a = x1 + Math.cos(a135) * size;
										var y1a = y1 + Math.sin(a135) * size;
										var x1b = x1 + Math.cos(a135m) * size;
										var y1b = y1 + Math.sin(a135m) * size;
										var x2a = x2 + Math.cos(a45) * size;
										var y2a = y2 + Math.sin(a45) * size;
										var x2b = x2 + Math.cos(a45m) * size;
										var y2b = y2 + Math.sin(a45m) * size;
																				
										vl.lineColor	=	decimalToHexStringLineColor(vl.lineColor);										
																				
										var arrow1	=	window["paper"+this.idPn+"_"+nbPage].path(
											"M"+x1+" "+y1+"L"+x2+" "+y2+
											"M"+x2+" "+y2+"L"+x2a+" "+y2a+
											"M"+x2+" "+y2+"L"+x2b+" "+y2b
										);
										arrow1.attr('stroke-width',vl.lineThickness);
										arrow1.attr('stroke','#'+vl.lineColor);
										
									}else{								//Line
																				
										var line	=	window["paper"+this.idPn+"_"+nbPage].path("M"+vl.x1+","+vl.y1+" "+vl.x2+","+vl.y2);		
										line.attr('stroke-width',vl['lineThickness']);		
										var lineColor	=	decimalToHexStringLineColor(vl.lineColor);		
										line.attr('stroke','#'+lineColor);
									}									
								}								
							}
							else if (vl.shapeType=="rect"){
																
								var pageFHOn	=	parseInt((vl.x1+5)/10);	//page where Comments is on
								
								if (pageFHOn==nbPage){				
																		
									var bopnOn		=	window[this.id+"_"+pageFHOn].getBBox();
									vl.x1	=	bopnOn.x	+((parseFloat(vl.x1)-pageFHOn*10)*dwpdf);		//coords are % on width of image
									vl.y1	=	bopnOn.y	+((parseFloat(vl.y1)-pageFHOn*10)*dhpdf);		//coords are % on height of imag
									
									vl.x2	=	bopnOn.x	+((parseFloat(vl.x2)-pageFHOn*10)*dwpdf);		//coords are % on width of image
									vl.y2	=	bopnOn.y	+((parseFloat(vl.y2)-pageFHOn*10)*dhpdf);		//coords are % on height of imag
									vl['lineThickness']	=	vl['lineThickness']*width;
									
									scaleX	=	Math.min(vl.x1,vl.x2);
									scaleY	=	Math.min(vl.y1,vl.y2);
																		
									var rectang	=	window["paper"+this.idPn+"_"+nbPage].rect(scaleX,scaleY,Math.abs(vl.x1-vl.x2),Math.abs(vl.y1-vl.y2));
									
									if (Number(vl.fillColor)>=0)
									{
										var fillcolor	=	decimalToHexStringFillColor(vl.fillColor);		
										rectang.attr('fill','#'+fillcolor);
										//rectang.attr('fill',"#E01B4C");
									}			
									
									var lineColor		=	decimalToHexStringLineColor(vl.lineColor);
									rectang.attr('stroke','#'+lineColor);
									rectang.attr('stroke-width',vl.lineThickness);	
									rectang.attr('fill-opacity',vl.al);
								}								
							}
							else if (vl.shapeType=="text"){
								
								var pageFHOn	=	parseInt((vl.sx+5)/10);	//page where Comments is on
								
								if (pageFHOn==nbPage){
									
									var bopnOn		=	window[this.id+"_"+pageFHOn].getBBox();																	
									var nbLines		=	lineBreakCount(vl.txtContent)+1;
																		
									vl['txtSize']	=	parseInt(vl['txtSize']*width);
									
									var sx	=	bopnOn.x	+((parseFloat(vl.sx)-pageFHOn*10)*dwpdf);		//coords are % on width of image
									var sy	=	bopnOn.y	+((parseFloat(vl.sy)-pageFHOn*10)*dhpdf);		//coords are % on height of imag
									
									var text	=	window["paper"+this.idPn+"_"+nbPage].text(sx,sy,unescape(vl.txtContent));
																		
									text.attr('text-anchor','start');
									text.attr('font-size',vl.txtSize);
									text.attr('font-family',"Times New Roman,serif");
									var textColor	=	decimalToHexStringLineColor(vl.txtColor);	
									text.attr('fill','#'+textColor);
																		
									//text.translate(0, (nbLines-1)*vl.txtSize);		//for text multilines
									text.translate(0, (nbLines-1)*vl.txtSize);		//for text multilines
									var topp=0,leftp=0;
									var dltext	=	10;
									/*for(var ttt=0;ttt<arrPadTxt.length;ttt++){
										if (Math.abs(vl.txtSize/2-arrPadTxt[ttt]['tsz'])<dltext){
											dltext	=	arrPadTxt[ttt]['tsz'];
										}
									}
											
									for(var ttt=0;ttt<arrPadTxt.length;ttt++){			
										if (parseInt(dltext)==parseInt(arrPadTxt[ttt]['tsz'])){				
											topp	=	parseInt(arrPadTxt[ttt]['topp']);
											leftp	=	parseInt(arrPadTxt[ttt]['lefp']);
											break;
										}
									}*/
									//text.translate(leftp,topp);			//padding of text
									//text.translate(0,dltext);				//padding of text
									text.translate(2,parseInt(vl.txtSize/2));				//padding of text
									
									var ellipvv	=	window["paper"+this.idPn+"_"+nbPage].circle(sx,sy,1);											
									ellipvv.attr('fill','#5ecfff');	
								}								
							}
							else if (vl.shapeType=="oval"){		//oval
																
								var pageFHOn	=	parseInt((vl.x1+5)/10);	//page where Comments is on
								
								if (pageFHOn==nbPage){				
																		
									var bopnOn		=	window[this.id+"_"+pageFHOn].getBBox();
																		
									vl.x1	=	bopnOn.x	+((parseFloat(vl.x1)-pageFHOn*10)*dwpdf);		//coords are % on width of image
									vl.y1	=	bopnOn.y	+((parseFloat(vl.y1)-pageFHOn*10)*dhpdf);		//coords are % on height of imag
									
									vl.x2	=	bopnOn.x	+((parseFloat(vl.x2)-pageFHOn*10)*dwpdf);		//coords are % on width of image
									vl.y2	=	bopnOn.y	+((parseFloat(vl.y2)-pageFHOn*10)*dhpdf);		//coords are % on height of imag
									vl['lineThickness']	=	vl['lineThickness']*width;
									
									var cx	=	(vl.x1+vl.x2)/2;
									var cy	=	(vl.y1+vl.y2)/2;	
									var rx	=	Math.abs(vl.x2-vl.x1)/2;
									var ry	=	Math.abs(vl.y2-vl.y1)/2;
																		
									var newCx	=	Math.abs(cx);
									var newCy	=	Math.abs(cy);
									
									var ellip	=	window["paper"+this.idPn+"_"+nbPage].ellipse(newCx, newCy, rx, ry);
									
									if (Number(vl.fillColor)>=0)
									{
										var fillColor=decimalToHexStringFillColor(vl.fillColor);	
										ellip.attr('fill','#'+fillColor);
									}	
									var lineColor=decimalToHexStringLineColor(vl.lineColor);
									ellip.attr('stroke','#'+lineColor);
									ellip.attr('stroke-width',vl.lineThickness);	
									ellip.attr('fill-opacity',vl.al);
								}								
							}
							else if (vl.shapeType=="freeHand"){					//exactly FreeHand
								if ((vl.code==undefined)||(vl.code==null)||(vl.code=="")||(vl.code!="delete")){			//deleted or not
									if (vl.p.length>0){
										var pageFHOn	=	parseInt((vl.p[0]['x']+5)/10);	//page where FH is on
																				
										if (pageFHOn==nbPage){
											
											hasFh	=	"yes";											
											
											/*var bopnOn		=	window[this.id+"_"+pageFHOn].getBBox();																						
											for (var t=0;t<vl.p.length;t++)
											{	
												vl.p[t]['x']	=	bopnOn.x	+((parseFloat(vl.p[t]['x'])-pageFHOn*10)*dwpdf);		//coords are % on width of image
												vl.p[t]['y']	=	bopnOn.y	+((parseFloat(vl.p[t]['y'])-pageFHOn*10)*dhpdf);		//coords are % on height of image
											}
											vl['lineThickness']	=	vl['lineThickness']*width;												
											var newFH	=	new Freehand2(vl,pdf['id'],nbPage,this.newzoom,window["paper"+this.idPn+"_"+nbPage],window[this.id+"_"+pageFHOn],"panel"+this.idPn+"_"+pageFHOn);
											newFH.draw();*/
											
											var bopnOn		=	window[this.id+"_"+pageFHOn].getBBox();
											
											for (var t=0;t<vl.p.length;t++)
											{	
												vl.p[t]['x']	=	bopnOn.x	+((parseFloat(vl.p[t]['x'])-pageFHOn*10)*dwpdf);		//coords are % on width of image
												vl.p[t]['y']	=	bopnOn.y	+((parseFloat(vl.p[t]['y'])-pageFHOn*10)*dhpdf);		//coords are % on height of image
											}
											
											
											vl['lineThickness']	=	vl['lineThickness']*width;
											var points	=	"'M";
											for (var t=0;t<vl['p'].length;t++)
											{
												points +=	Math.abs(parseInt(vl['p'][t]['x']))+","+Math.abs(parseInt(vl['p'][t]['y']))+" ";
											}
											var fillcolor,re;
											
											if (Number(vl['fillColor']) > 0)
											{
												re	=	Number(vl['fillColor']).toString(16).toUpperCase();				
												var lengthFill	=	6-re.length;					
												var tp			=	"";
												
												for(var u=0;u<lengthFill;u++)
												{
													tp	=	tp.concat("0");
												}
												tp			=	tp.concat(re);
												fillcolor	=	tp;
												
												points	=	points+" z ";
											}
											else if(Number(vl['fillColor']) == 0)
											{
												fillcolor	=	"000000";
												points		=	points+" z ";
											}
											
											var fh		=	window["paper"+this.idPn+"_"+nbPage].path(points);
											
											if ((vl['lineThickness']>0)&&(vl['lineThickness']<1)){
												vl['lineThickness']	=	1;
											}
											
											fh.attr('stroke-width',vl['lineThickness']);
											
											var lineColor	=	decimalToHexStringLineColor(vl.lineColor);
											fh.attr('stroke','#'+lineColor);
											//fh.attr('fill','#'+fillcolor);
											
										}
									}
								}
							}
							
						}
						
					}
				}		
			}
			
			//show comment of current page
			arrcmtmp	=	sortComment2(arrcmtmp);
			
			if (hasComment=="yes"){
				this.showComments(nbPage);
			}
			
			arrcmtmp	=	new Array();		//remove all comment of page after diplaying			
			
			window["paper"+this.idPn+"_"+nbPage].initZoom(1);
			//window[this.id+"_"+u+"rect"].attr("height",);
						
			var boPnoFH	=	window["paper"+this.idPn+"_"+nbPage].getBound();
			
			
			/*window[this.id+"_"+nbPage+"rect"].attr("height",boPnoFH.maxY-boPnoFH.minY+2);
			window[this.id+"_"+nbPage+"rect"].attr("width",boPnoFH.maxX-boPnoFH.minX+2);
			window[this.id+"_"+nbPage+"rect"].attr("x",boPnoFH.minX-2);*/
			
			var boPnoFH	=	window["paper"+this.idPn+"_"+nbPage].getBound();
			
			//window["paper"+this.idPn+"_"+nbPage].translatepp(-boPnoFH.minX,-boPnoFH.minY);		//move paper to 0,0
			window["paper"+this.idPn+"_"+nbPage].translatepp(-boPnoFH.minX,-boPnoFH.minY);			//move paper to 0,0
			
			//window["paper"+this.idPn+"_"+nbPage].
			
			/*
			if (hasFh	!=	"yes"){
				window[this.id+"_"+nbPage+"rect"].attr('x',0);
				window[this.id+"_"+nbPage+"rect"].attr('y',0);
				window[this.id+"_"+nbPage+"rect"].attr('width',850);
				window[this.id+"_"+nbPage].attr('x',1);
				window[this.id+"_"+nbPage].attr('y',1);
				window[this.id+"_"+nbPage].attr('width',848);
			}
			*/			
						
			var newzoom	=	850/(boPnoFH.maxX-boPnoFH.minX);			
			//window["paper"+this.idPn+"_"+nbPage].setZoom(newzoom);
			
			var boPnoFH	=	window["paper"+this.idPn+"_"+nbPage].getBound();
			$("#panel"+this.idPn+"_"+nbPage).width(850);
			$("#panel"+this.idPn+"_"+nbPage).height(boPnoFH.maxY-boPnoFH.minY);
						
			//var str			=	"<input id='zoomPaper"+this.idPn+"_"+nbPage+"' type='hidden'  value='1' />";
			
			/*var str			=	"<input id='zoomPaper"+this.idPn+"_"+nbPage+"' type='hidden'  value='"+(newzoom)+"' />";
			$('#panel'+this.idPn+"_"+nbPage).append(str);*/
			
			str			=	"<input id='zoomPaper"+this.idPn+"_"+nbPage+"' type='hidden'  value='"+newzoom+"' />";
			$('#panel'+this.idPn+"_"+nbPage).append(str);
			//$('#zoomPaper'+this.idPn+"_"+nbPage).val(newzoom);
			
			//window["paper"+this.idPn+"_"+nbPage].setZoom(newzoom);
		}
	};
	
	/**
	 * Show comments
	 */
	this.showComments	=	function(nbPage)
	{	
		var pdf		=	this.pdf;
		var bigArr	=	this.bigArr;
		var idPn	=	this.idPn;
		var sttCm	=	0;	
		var topRect	=	new Array();
		var totalLine	=	0;
				
		for (var i=0;i<arrcmtmp.length;i++)
		{
			if (arrcmtmp[i]['page']==nbPage)
			{	
				var b	=	arrcmtmp[i]['id'];
				
				var lengthIdPdf	=	pdf['id'].length;				
				var protie	=	b.substr(5+lengthIdPdf+1);			//name of protie
				var vl		=	$.parseJSON(bigArr[b]);				//array value					
					
				if ((vl.code==undefined)||(vl.code==null)||(vl.code=="")||(vl.code!="delete")){			//deleted or not									
					
					if (parseInt(vl.sx)>0){
						
						var pageFHOn	=	parseInt((vl.sx+5)/10);	//page where Comments is on
						sttCm++;
						
						if (pageFHOn==nbPage){
							
							var bopnOn		=	window[this.id+"_"+pageFHOn].getBBox();
							
							vl.sx	=	bopnOn.x	+((parseFloat(vl.sx)-pageFHOn*10)*dwpdf);		//coords are % on width of image
							vl.sy	=	bopnOn.y	+((parseFloat(vl.sy)-pageFHOn*10)*dhpdf);		//coords are % on height of imag
							
							var boPnoFH	=	window["paper"+this.idPn+"_"+nbPage].getBound();
							
							if (sttCm==1){
								
								//Text: Comments								
								window["comments_text"+nbPage]	=	window["paper"+this.idPn+"_"+nbPage].text(boPnoFH.minX+35,boPnoFH.maxY+20,"Comments");
								window["comments_text"+nbPage].attr('text-anchor','start');
								window["comments_text"+nbPage].attr('font-size',20);
								window["comments_text"+nbPage].attr('font-family',"Arial,serif");
								window["comments_text"+nbPage].attr('font-weight',"bold");
								
								//Rectangle
								window["rect_text"+nbPage]	=	window["paper"+this.idPn+"_"+nbPage].rect(boPnoFH.minX,boPnoFH.maxY+30,boPnoFH.maxX-boPnoFH.minX,40);
								window["rect_text"+nbPage].attr('fill','#FFFFFF');
								window["rect_text"+nbPage].attr('stroke','#FFFFFF');
								window["rect_text"+nbPage].attr('stroke-width',0);
								
								//line
								window["line_text"+nbPage]	=	window["paper"+this.idPn+"_"+nbPage].path("M"+(boPnoFH.minX+30)+","+(boPnoFH.maxY+35)+" "+(boPnoFH.maxX-30)+","+(boPnoFH.maxY+35));		
								window["line_text"+nbPage].attr('stroke-width',1);
								window["line_text"+nbPage].attr('stroke','#736F6E');
								
							}
							
							//pri on pdf
							window[vl.id+"_comment"+"_"+sttCm]	=	window["paper"+this.idPn+"_"+nbPage].circle(vl.sx,vl.sy,10);											
							window[vl.id+"_comment"+"_"+sttCm].attr('fill','#5ecfff');											
							window["text"+nbPage+"_"+sttCm]	=	window["paper"+this.idPn+"_"+nbPage].text(vl.sx,vl.sy,""+sttCm);
							window["text"+nbPage+"_"+sttCm].attr('fill','#FFFFFF');
																																			
							var markEspace		=	new Array();
							var arrstr			=	new Array();
							var splitTxtContent	=	vl.txtContent.split("\n");
							var cutline,txtcontentTemp;
							var contentText	=	"";
																					
							for (var splTxt=0;splTxt<splitTxtContent.length;splTxt++){								
								cutline			=	parseInt(splitTxtContent[splTxt].length/95)+1;
								markEspace		=	new Array();
																
								if (cutline>1){									
									txtcontentTemp	=	"";
									markEspace.push(0);
									
									for (var k=1;k<cutline;k++){
										markEspace.push(k*95);
									}
									
									markEspace.push(splitTxtContent[splTxt].length);
									
									for (var r=0;r<(markEspace.length)-1;r++){																				
										if (r!=(markEspace.length)-2){
											//txtcontentTemp	+=	splitTxtContent[splTxt].substring(markEspace[r],markEspace[r+1])+"\n";
											arrstr.push(splitTxtContent[splTxt].substring(markEspace[r],markEspace[r+1]));
										}else{
											//txtcontentTemp	+=	splitTxtContent[splTxt].substring(markEspace[r],markEspace[r+1]);
											arrstr.push(splitTxtContent[splTxt].substring(markEspace[r],markEspace[r+1]));
										}
										//splitTxtContent[splTxt]		=	txtcontentTemp;
										//arrstr.push(txtcontentTemp);
									}
								}else{
									arrstr.push(splitTxtContent[splTxt]);
								}
							}
							
							//alert(splitTxtContent.length);
							/*for (var splTxt=0;splTxt<splitTxtContent.length;splTxt++){
								contentText	+=	splitTxtContent[splTxt]+"\n";
							}*/
							for (var splTxt=0;splTxt<arrstr.length;splTxt++){
								contentText	+=	arrstr[splTxt]+"\n";
							}
							vl.txtContent	=	contentText;
							//alert(vl.txtContent);
							
							/*var markEspace	=	new Array();
							var cutline		=	parseInt(vl.txtContent.length/95)+1;
							
							if (cutline>1){								
								var txtcontentTemp	=	"";
								markEspace.push(0);								
								for (var k=1;k<cutline;k++){
									markEspace.push(k*95);
								}
								markEspace.push(vl.txtContent.length);								
								for (var r=0;r<(markEspace.length)-1;r++){																		
									if (r!=(markEspace.length)-2){
										txtcontentTemp	+=	vl.txtContent.substring(markEspace[r],markEspace[r+1])+"\n";
									}else{
										txtcontentTemp	+=	vl.txtContent.substring(markEspace[r],markEspace[r+1]);
									}	
								}
								vl.txtContent		=	txtcontentTemp;
								if (markEspace==0){
									markEspace	=	77;
								}								
								vl.txtContent	=	vl.txtContent.substring(0,markEspace)+"\n"+vl.txtContent.substring(markEspace,vl.txtContent.length-1);
							}*/
							
							//add comment text below							
							if (sttCm==1){
								//pri
								window[vl.id+"_comment"+"_"+sttCm]	=	window["paper"+this.idPn+"_"+nbPage].circle(boPnoFH.minX+75,boPnoFH.maxY+65,10);											
								window[vl.id+"_comment"+"_"+sttCm].attr('fill','#5ecfff');											
								window["text2"+nbPage+"_"+sttCm]	=	window["paper"+this.idPn+"_"+nbPage].text(boPnoFH.minX+75,boPnoFH.maxY+65,""+sttCm);
								window["text2"+nbPage+"_"+sttCm].attr('fill','#FFFFFF');
								
								//content of text
								var nbLines		=	lineBreakCount(vl.txtContent)+1;
								totalLine		=	totalLine+nbLines;
								window["ct_text"+nbPage+"_"+sttCm]	=	window["paper"+this.idPn+"_"+nbPage].text(boPnoFH.minX+95,boPnoFH.maxY+55,unescape(vl.txtContent));
								window["ct_text"+nbPage+"_"+sttCm].attr('text-anchor','start');	
								window["ct_text"+nbPage+"_"+sttCm].attr('font-size',15);
								window["ct_text"+nbPage+"_"+sttCm].attr('font-family',"Arial,serif");	
																
								if (nbLines>1){
									window["ct_text"+nbPage+"_"+sttCm].translate(0, (nbLines-1)*10);		//for text multilines
								}		
							}else{
								//pri
								window[vl.id+"_comment"+"_"+sttCm]	=	window["paper"+this.idPn+"_"+nbPage].circle(boPnoFH.minX+75,boPnoFH.maxY+40,10);											
								window[vl.id+"_comment"+"_"+sttCm].attr('fill','#5ecfff');											
								window["text2"+nbPage+"_"+sttCm]	=	window["paper"+this.idPn+"_"+nbPage].text(boPnoFH.minX+75,boPnoFH.maxY+40,""+sttCm);
								window["text2"+nbPage+"_"+sttCm].attr('fill','#FFFFFF');
								
								//content of text
								var nbLines		=	lineBreakCount(vl.txtContent)+1;
								totalLine		=	totalLine+nbLines;
								window["ct_text"+nbPage+"_"+sttCm]	=	window["paper"+this.idPn+"_"+nbPage].text(boPnoFH.minX+95,boPnoFH.maxY+30,unescape(vl.txtContent));
								window["ct_text"+nbPage+"_"+sttCm].attr('text-anchor','start');	
								window["ct_text"+nbPage+"_"+sttCm].attr('font-size',15);
								window["ct_text"+nbPage+"_"+sttCm].attr('font-family',"Arial,serif");							
								if (nbLines>1){
									window["ct_text"+nbPage+"_"+sttCm].translate(0, (nbLines-1)*9);		//for text multilines
								}
							}				
														
							var boText	=	window["ct_text"+nbPage+"_"+sttCm].getBound();
							window["ct_text_author"+nbPage+"_"+sttCm]	=	window["paper"+this.idPn+"_"+nbPage].text(boText.x,boText.y+boText.height+15,vl.author);
							window["ct_text_author"+nbPage+"_"+sttCm].attr('text-anchor','start');	
							window["ct_text_author"+nbPage+"_"+sttCm].attr('font-size',15);
							window["ct_text_author"+nbPage+"_"+sttCm].attr('font-family',"Arial,serif");
							window["ct_text_author"+nbPage+"_"+sttCm].attr('font-weight',"bold");
							
							/*
							var boPnoAuthor	=	window["ct_text_author"+nbPage+"_"+sttCm].getBound();
							window["ct_text_date"+nbPage+"_"+sttCm]	=	window["paper"+this.idPn+"_"+nbPage].text(boPnoAuthor.x+boPnoAuthor.width+10,boPnoAuthor.y+7,formattedTime);
							window["ct_text_date"+nbPage+"_"+sttCm].attr('font-size',15);
							window["ct_text_date"+nbPage+"_"+sttCm].attr('font-family',"Arial,serif");
							window["ct_text_date"+nbPage+"_"+sttCm].attr('text-anchor','start');
							window["ct_text_date"+nbPage+"_"+sttCm].attr('font-weight',"Italic");
							*/
							
							/*text.attr('text-anchor','start');
							text.attr('font-size',vl.txtSize);
							text.attr('font-family',"Times New Roman,serif");
							var textColor	=	decimalToHexStringLineColor(vl.txtColor);	
							text.attr('fill','#'+textColor);
							text.translate(0, (nbLines-1)*vl.txtSize);		//for text multilines
							var topp=0,leftp=0;
									
							for(var i=0;i<arrPadTxt.length;i++){			
								if (parseInt(vl.txtSize)==parseInt(arrPadTxt[i]['tsz'])){				
									topp	=	parseInt(arrPadTxt[i]['topp']);
									leftp	=	parseInt(arrPadTxt[i]['lefp']);
									break;
								}
							}
							text.translate(leftp,topp);				//padding of text
							*/
						}
					}					
				}
			}				
		}
		
		var boPnoFH		=	window["paper"+this.idPn+"_"+nbPage].getBound();
		
		var boPnoFHRT	=	window["rect_text"+nbPage].getBound();
		
		window["rect_text"+nbPage].attr('height',boPnoFH.maxY-boPnoFHRT.y+70);
				
		//window["rect_text"+nbPage].attr('height',(totalLine+1)*50);		
		
		//add comment text
		/*var boPnoFH	=	window["paper"+this.idPn+"_"+nbPage].getBound();							
		
		window["rect_text"+nbPage+"_"]	=	window["paper"+this.idPn+"_"+nbPage].rect(topRect[0],topRect[1],boPnoFH.maxX-boPnoFH.minX,boPnoFH.maxX-topRect[1]+10);
		window["rect_text"+nbPage+"_"].attr('fill','#FFFFFF');
		window["rect_text"+nbPage+"_"].attr('stroke-width',1);*/				
		
		/*var boPnoFH	=	window["paper"+this.idPn+"_"+nbPage].getBound();
		window["paper"+this.idPn+"_"+nbPage].translatepp(-boPnoFH.minX,-boPnoFH.minY);
					
		var newzoom	=	850/(boPnoFH.maxX-boPnoFH.minX);			
		window["paper"+this.idPn+"_"+nbPage].setZoom(newzoom);
		
		var boPnoFH	=	window["paper"+this.idPn+"_"+nbPage].getBound();
		$("#panel"+this.idPn+"_"+nbPage).width(850);
		$("#panel"+this.idPn+"_"+nbPage).height(boPnoFH.maxY-boPnoFH.minY);
		
		var str			=	"<input id='zoomPaper"+this.idPn+"_"+nbPage+"' type='hidden'  value='"+(newzoom)+"' />";
		$('#panel'+this.idPn+"_"+nbPage).append(str);*/
		
	};
}

//inherit   
Pdf.prototype = new Shape;  
Pdf.prototype.constructor	=	Pdf;		// correct the constructor pointer because it points to Pdf

/**
 * Freehand for pdf 
 * currentPagePdf: current Page showing
 * currentPagePdf: number of page that FH's on
 */
//var newFH	=	new Freehand3(vl,pdf['id'],nbPage,this.newzoom,window["paper"+this.idPn+"_"+nbPage],window[this.id+"_"+pageFHOn],"panel"+this.idPn+"_"+pageFHOn);
function Freehand3(ip,pdfId,pageActive,zumm,pPDF,pImage,pnPP)
{	
	this.lineThickness	=	ip['lineThickness'];
	this.fillColor		=	ip['fillColor'];
	this.lineDash		=	ip['lineDash'];	
	this.lineColor		=	ip['lineColor'];	
	
	var points	=	"'M";	
	this.id		=	ip['id'].replace(".","");
	
	var scaleX	=	(minPoint(ip['p']))[0];
	var scaleY	=	(minPoint(ip['p']))[1];
	
	var bopn1	=	pPDF.getBound();
	scaleX		=	Math.min(scaleX,bopn1.minX);
	scaleY		=	Math.min(scaleY,bopn1.minY);
	
	var scaleY	=	0;
	var scaleX	=	0;
		
	for (var t=0;t<ip['p'].length;t++)
	{
		points +=	Math.abs(parseInt(ip['p'][t]['x'])-scaleX)+","+Math.abs(parseInt(ip['p'][t]['y'])-scaleY)+" ";
	}	
	
	points +=" '";
	this.points	=	points;	
		
	this.draw	=	function()
	{	
		var re,fillcolor;
			
		if (Number(this.fillColor) > 0)
		{
			re=	Number(this.fillColor).toString(16).toUpperCase();				
			var lengthFill	=	6-re.length;					
			var tp			=	"";
			
			for(var u=0;u<lengthFill;u++)
			{
				tp=tp.concat("0");
			}
			tp			=	tp.concat(re);
			fillcolor	=	tp;
			
			this.points	=	this.points+" z ";
		}
		else if(Number(this.fillColor) == 0)
		{
			fillcolor	=	"000000";
			this.points	=	this.points+" z ";
		}
		
		window["freeHand"+pdfId].push("freeHand"+this.id);
		window["freeHand"+this.id]		=	pPDF.path(this.points);
		var lineThickness	=	parseInt(zumm*this.lineThickness);
		
		if ((lineThickness>0)&&(lineThickness<1)){
			lineThickness	=	1;
		}
		
		window["freeHand"+this.id].attr('stroke-width',lineThickness);
		
		var lineColor	=	decimalToHexStringLineColor(this.lineColor);
		window["freeHand"+this.id].attr('stroke','#'+lineColor);
		window["freeHand"+this.id].attr('fill','#'+fillcolor);
		
		var bbFH	=	window["freeHand"+this.id].getBBox();
						
		var bopn1		=	pPDF.getBound();
		var widthPn1	=	bopn1.maxX	-	bopn1.minX;
		var heightPn1	=	bopn1.maxY	-	bopn1.minY;
		
		$("#"+pnPP).width(bopn1.maxX);
		$("#"+pnPP).height(bopn1.maxY);
	};
	
}

//inherit   
Freehand3.prototype = new Shape;  
Freehand3.prototype.constructor	=	Freehand3;		// correct the constructor pointer because it points to Freehand

/**
 * Check element in array
 */
function inarray(tp){
	
	var arrTypes	=	["__max","zoom","urlpdf","page","npages","scroll","idr","dimension","oh","ow","oh2","ow2"];
	
	for (var k=0;k<arrTypes.length;k++){
		if (tp==arrTypes[k]){
			return true;
			break;
		}
	}
	return false;
}

/**
 * Check element in array
 */
function listThickness(tp){
	
	var arrThickness	=	[1,2,3,4,5,8,10,15,20,50];
	
	for (var k=0;k<arrTypes.length;k++){
		if (tp==arrTypes[k]){
			return true;
			break;
		}
	}
	return false;
}

function lineBreakCount(str){
	/* counts \n */
	try {
		var nbl	=	str.match(/[^\n]*\n[^\n]*/gi);
		if (nbl!=null){
			return nbl.length;
		}else{
			return 0;
		}
		//return((str.match(/[^\n]*\n[^\n]*/gi).length));
	} catch(e) {
		return 0;
	}
}

function showNavigation()
{	
	var str		=	"<button class='previousBtn' onClick=\"changePn(-1)\"></button>";
	$('#navigation').html(str);
	var str2	=	"<button class='nextBtn' onClick=\" changePn(1)\"></button>";
	$('#navigation').append(str2);
	str			=	"<input id='currentPn' type='hidden'  value='1' />";
	$('#navigation').append(str);
	
	//addZoomDoc();		//add button zoom
}	

function changePn(type){
	var cpn	=	$('#currentPn').val()+"";
	var tpn;
	for (var j=0;j<arrPnDt.length;j++)	
	{	
		tpn	=	arrPnDt[j]['idpn']+"";
		if (cpn==tpn){
			if (type==1)						//Next
			{
				if (j<(arrPnDt.length-1)){
					$('#currentPn').val(arrPnDt[j+1]['idpn']);
					activePn(arrPnDt[j+1]['idpn']);
				}
			}
			else{
				if (j>0){
					$('#currentPn').val(arrPnDt[j-1]['idpn']);
					activePn(arrPnDt[j-1]['idpn']);
				}
			}	
			break;
		}							
	}
	
}

function showImagePdf(str,sourcePdf,type,nps)
{
	if (type==1)						//Next
	{
		if (parseInt($('#'+str).val())<nps)
		{	
			var cp	=	parseInt($('#'+str).val())+1;
			$('#'+str).val(parseInt(cp));
			window[str].attr('src',sourcePdf+cp+'.jpg');				
		}
	}
	else								//Previous
	{
		if (parseInt($('#'+str).val())>1)
		{
			var cp	=	parseInt($('#'+str).val())-1;
			$('#'+str).val(parseInt(cp));
			window[str].attr('src',sourcePdf+cp+'.jpg');	
		}		
	}
	window["pdf"+str].showFreeHand(cp);
}

/**
 * Zoom for image of pdf
 */
function zoomPdf(str,type){
	
	var cp	=	$('#zoom'+str).val();	
	if (parseInt(type)==1){		
		cp	=	parseFloat(cp)	+	0.5;
	}else{
		cp	=	parseFloat(cp)	-	0.1;
	}	
	$('#zoom'+str).val(parseFloat(cp));
	window[str].setZoom(cp);
}

var fixwidth	=	850;
var fixheight	=	850;
var zoomStt		=	1;

/**
 * Zoom paper
 */
function zoomPaper(str,type){
	
	/*
	var cp		=	$('#zoomPaper'+str).val();
	var oldzm	=	parseFloat($('#zoomPaper'+str).val());
	var newwidth;
	var newheight;
		
	fixwidth	=	$('#panel'+str).width();
	fixheight	=	$('#panel'+str).height();
	
	if (parseInt(type)==1){		//zoon in
		cp	=	parseFloat(cp)	+	0.1;
	}else{						//zoon out
		cp	=	parseFloat(cp)	-	0.1;		
		if (cp>=0.2){
		}else{
			cp	=	parseFloat(cp)	+	0.1;
		}
	}
	var bb1		=	window["paper"+str].getBound();	
	var decx	=	fixwidth	-	bb1.maxX;
	var decy	=	fixheight	-	bb1.maxY;
	decx		=	(decx*cp)/oldzm;
	decy		=	(decy*cp)/oldzm;
	
	$('#zoomPaper'+str).val(parseFloat(cp));
	window["paper"+str].setZoom(cp);
	
	var bb2	=	window["paper"+str].getBound();
	$("#panel"+str).width(bb2.maxX+decx);
	$("#panel"+str).height(bb2.maxY+decy);
	*/
	zoomDoc(type);
}

/**
 * Zoom all paper
 */
//type=1 - zoom in
//type=-1 - zoom out
function zoomDoc(type){
	   
    //arrPnDt.push({'idpn':strpn,'typepn':typepn});
    var tmpvr;
    var strvr    =    "";
   
    for (var u=0;u<arrPnDt.length;u++){              //loop over the array arrPnDt
       
        var vloldzoom    =    arrPnDt[u].idpn;        //get id of div panel
        try{           
            var cp        =    $('#zoomPaper'+vloldzoom).val();       //get old zoom value of div panel
            if (cp!=undefined){
           
                var oldzm    =    parseFloat($('#zoomPaper'+vloldzoom).val());
                var newwidth;
                var newheight;
                   
                fixwidth    =    $('#panel'+vloldzoom).width();        //old width of div panel
                fixheight    =    $('#panel'+vloldzoom).height();     //old height of div panel
                               
                if (parseInt(type)==1){        //zoon in
                    newwidth    =    fixwidth*1.1;                         //calculate new width
                    newheight    =    fixheight*1.1;                      //calculate new height
                    cp    =    parseFloat(cp)*1.1;                   
                    changeFontSize(1.03);
                }else{                        //zoon out
                    newwidth    =    fixwidth*0.9;                         //calculate new width
                    newheight    =    fixheight*0.9;                      //calculate new height
                    cp    =    parseFloat(cp)*0.9;
                    changeFontSize(0.97);
                    if (cp>=0.2){
                    }else{
                        cp    =    parseFloat(cp)    +    0.1;
                    }
                }
               
                if (arrPnDt[u].typepn!="gmap"){
               
                    var bb1        =    window["paper"+vloldzoom].getBound();   
                    var decx    =    fixwidth    -    bb1.maxX;
                    var decy    =    fixheight    -    bb1.maxY;
                    decx        =    (decx*cp)/oldzm;
                    decy        =    (decy*cp)/oldzm;
                   
                    $('#zoomPaper'+vloldzoom).val(parseFloat(cp));        //save new zoom
                    window["paper"+vloldzoom].setZoom(cp);                 //set new zoom   
                }
               
                $("#panel"+vloldzoom).width(newwidth);                       //set new width of div panel
                $("#panel"+vloldzoom).height(newheight);                     //set new width of div panel
                
                //$("#contentPanel_innerwrap").width(newwidth+2);
                $('#contentPanel_innerwrap').css({'width':(newwidth+2)+'px','overflow-x':'auto'});
                
                if((navigator.userAgent.match(/iPhone/i)) || (navigator.userAgent.match(/iPod/i)) || (navigator.userAgent.match(/iPad/i)))
				{
					thumb_iscroll.refresh();
					content_iscroll.refresh();
				}
               
                //zoom firt page
                if ((vloldzoom==1)||(vloldzoom=='1')){
                    //$("#panel"+vloldzoom).attr("zoom",parseInt(cp*100)+"%");
                }
               
            }
        }catch (e) {
            //alert(e.description);
        }
    }
}



function setTimeOutForImg(){
	//if (startRunTimeImg==false){	
	var markStartTimeOutImg	=	0;	
	startRunTimeImg	=	true;
	//if (markStartTimeOutImg>0)	markStartTimeOutImg	=	markStartTimeOutImg-1;
	setImgSourceImgFibo(nameImgs[markStartTimeOutImg]['objs'],nameImgs[markStartTimeOutImg]['srcImg'],markStartTimeOutImg);
	//}
}

function setImgsource(objSource,newUrl){
	objSource.node.href.baseVal	=	newUrl;	
}
var newobjSource;
var newnewUrl;
var newnext;

var timeoutImg	=	false;

function setImgSourceFibo(objSource,newUrl,next){
	
	//var str		=	objSource.substr(0,objSource.lastIndexOf("_"));
	/*
	if (window["img_"+str]=="ok"){
		window[objSource].attr('src',newUrl);
		window[objSource+"temp"].remove();
	}else{
		//var text	=	paper.text(this.co[0][0],this.co[0][1]).attr('text-anchor', 'start');
		//window[objSource]
		window[objSource].attr('src',imgWait);
	}
	*/
	//imgMng.push({"objs":repJson.id+"_"+repImg[i]['order'],"srcImg":repImg[i]['url'],"order":repImg[i]['order'],"existed":repImg[i]['existed'],"loaded":"nok"});
	
	try{
		for (var u=0;u<imgMng.length;u++){
			if ((imgMng[u]['objs']==objSource))
			{
				if (imgMng[u]['existed']==1){
					
					if (window[imgMng[u]['objs']]!=undefined){
						window[objSource].attr('src',newUrl);
						window[objSource+"temp"].remove();
						imgMng[u]['loaded']	=	"ok";
					}
				}else{
					window[objSource].attr('src',whiteWait);
				}
				break;
			}
		}
		
		newnext	=	next+1;
	}catch(err){
		
	}
	
	
	/*if((typeof(namepdf[newnext]) != "undefined")) {
		if(!(namepdf[newnext]['objs'] == "undefined")) {
			newobjSource	=	namepdf[newnext]['objs'];
			newnewUrl		=	namepdf[newnext]['srcImg'];
			//gbnbTimeRun		=	nbTimeRun;
			setTimeout("setImgSourceFibo(newobjSource,newnewUrl,newnext);", 600);
		}
	}*/
	
	if((typeof(imgMng[newnext]) != "undefined")) {
		if(!(imgMng[newnext]['objs'] == "undefined")) {
			newobjSource	=	imgMng[newnext]['objs'];
			newnewUrl		=	imgMng[newnext]['srcImg'];
			//gbnbTimeRun		=	nbTimeRun;
			setTimeout("setImgSourceFibo(newobjSource,newnewUrl,newnext);", 600);
		}
	}
	
}

/**
 * Fill missed images
 */
function fillImgsAuto(){
	
	var p	=	0;
	var z	=	0;
	
	for (var u=0;u<imgMng.length;u++){
		
		if ((imgMng[u]['loaded']!="ok"))
		{
			if (imgMng[u]['existed']==1){
				
				try{
					
					if (window[imgMng[u]['objs']]!=undefined){
						window[imgMng[u]['objs']].attr('src',imgMng[u]['srcImg']);
						window[imgMng[u]['objs']+"temp"].remove();
						imgMng[u]['loaded']	=	"ok";
					}
				}catch(err){
					
				}
				
			}else{
				//get infor by ajax
				var data = {
						'url':imgMng[u]['srcImg']
				};
				ajaxJqueryPost(site+'tools/checkimg',data,finishCheck1Img);
			}
		}else{
			p++;
		}
	}
	
	if (p==imgMng.length){
		
		for (var l=0;l<txtedtMng.length;l++){
			if ((txtedtMng[l]['shown']=="ok"))
			{	
				z++;
			}else{
				break;
			}
		}
		
		if (z==txtedtMng.length){
			clearInterval(tmFill);
			if (!((linkpdf!=null)&&(linkpdf!=""))){
				save2svgByDiv();	
			}
		}
		
	}
}

/**
 * Pb: callback not accept variable assy
 */
function finishCheck1Img(repJson){
	
	var repImg	=	repJson.result;
	
	if (repImg['existed']==1){		
		
		for (var u=0;u<imgMng.length;u++){
			if ((imgMng[u]['srcImg']==repImg['url'])){
				imgMng[u]['existed']	=	1;
				break;
			}
		}
	}
}

var imagec="",req,imagepath="";
var started5Pages	=	false;
/**
 * Check images existed
 */
function checkImgExist(urlImg,j,np,idComp){
	var lp	=	np;
	
	var secondCall	=	false;
	
	if (started5Pages==false){
		started5Pages	=	true;
		if (np>5){
			lp			=	5;
			secondCall	=	true;
		}
	}
		
	var data = {
			'url':urlImg,
			'rg':'1-'+lp,
			'ttpages':np,
			'crPn':j,
			'id':idComp
	};
		
	ajaxJqueryPost(site+'tools/checkimg',data,finishCheckImg);
	
	if (secondCall==true){
		var data = {
				'url':urlImg,
				'rg':'6-'+np,
				'cmd':5,
				'crPn':j,
				'id':idComp
		};
			
		ajaxJqueryPost(site+'tools/checkimg',data,finishCheckImgNotShow);
	}
	
	/*
	$("#divtemp").append("<img id='chimg"+tempVar['id']+"' style='display: none;' />");
	$('#chimg'+tempVar['id']).attr('src',urlImg);
	$('#chimg'+tempVar['id']).load(function(){
		//$('#chimg').attr('src',"");
		window["img_"+tempVar['id']]	=	"ok";
		showPdf(tempVar,sh,its,j);	
	})
	.error(function(){
		//$('#chimg').attr('src',"");
		window["img_"+tempVar['id']]	=	"nok";
		showPdf(tempVar,sh,its,j);
	});
	*/
}

/**
 * Pb: callback not accept variable assy
 */
function finishCheckImg(repJson){
	var repImg	=	repJson.result;
		
	for (var i=0;i<repImg.length;i++){
		//not add -> update
		//imgMng.push({"objs":repJson.id+"_"+repImg[i]['order'],"srcImg":repImg[i]['url'],"order":repImg[i]['order'],"existed":repImg[i]['existed'],"loaded":"nok"});
		
		for (var u=0;u<imgMng.length;u++){
			if ((imgMng[u]['objs']==repJson.id+"_"+repImg[i]['order']))
			{	
				imgMng[u]['existed']	=	repImg[i]['existed'];
				break;
			}
		}
	}
	
	var tempVar = $.parseJSON(arrS[repJson.id]);
	showPdf(tempVar,arrS,items,repJson.crPn);
}

/**
 * Callback of function but not show images
 */
function finishCheckImgNotShow(repJson){
	var repImg	=	repJson.result;
	//update
	for (var i=0;i<repImg.length;i++){
		//imgMng.push({"objs":repJson.id+"_"+repImg[i]['order'],"srcImg":repImg[i]['url'],"order":repImg[i]['order'],"existed":repImg[i]['existed'],"loaded":"nok"});
		for (var u=0;u<imgMng.length;u++){
			if ((imgMng[u]['objs']==repJson.id+"_"+repImg[i]['order']))
			{	
				imgMng[u]['existed']	=	repImg[i]['existed'];
				break;
			}
		}
	}
}

/**
 * Timer loading images
 */
function runAutoSource(){
	
	if (newnext<totalImages){
		
		/*newobjSource	=	namepdf[newnext]['objs'];
		newnewUrl		=	namepdf[newnext]['srcImg'];
		//gbnbTimeRun		=	nbTimeRun;
		setTimeout("setImgSourceFibo(newobjSource,newnewUrl,newnext);", 500);*/
		
		newobjSource	=	imgMng[newnext]['objs'];
		newnewUrl		=	imgMng[newnext]['srcImg'];
		setTimeout("setImgSourceFibo(newobjSource,newnewUrl,newnext);", 500);
		
	}else{
		onLoadDocument();
		clearInterval(tmimg);
	}
}

var newobjSourceImg;
var newnewUrlImg;
var newnextImg;

var strtry	=	"";

function setImgSourceImgFibo(objSource,newUrl,next){
	
	strtry	=	strtry+next+" ";
	
	//nameImgs.push({"objs":"shape"+this.id,"srcImg":this.urlContent,"x":x,"y":y,"wid":wid,"hei":hei});	
	//window[objSource].node.href.baseVal	=	newUrl;
	
	window[objSource].attr('src',newUrl);
	window[objSource+"temp"].remove();	
	
	/*window[objSource].attr('width',nameImgs[next]['wid']);
	window[objSource].attr('height',nameImgs[next]['hei']);
	window[objSource].attr('x',nameImgs[next]['x']);
	window[objSource].attr('y',nameImgs[next]['x']);*/
	
	//window[objSource].attr('x', nameImgs[next]['x']);
	//window[objSource].attr('y', nameImgs[next]['y']);
	//window[objSource].attr
	//window[objSource].node.x	=	nameImgs[next]['x'];
	//window[objSource].node.y	=	nameImgs[next]['y'];
	//window[objSource].node.width	=	nameImgs[next]['wid'];
	
	/*window[objSource].attr('x',nameImgs[next]['x']);
	
	window[objSource].attr('y',nameImgs[next]['y']);
	window[objSource].attr('width',nameImgs[next]['wid']);
	window[objSource].attr('height',nameImgs[next]['hei']);*/
		
	newnextImg	=	parseInt(next)+1;
	
	//namepdf.push({"objs":this.id+"_"+u,"srcImg":sourceImg});	
		
	//if(!((namepdf[newnext]['objs'] == "undefined")||(namepdf[newnext]['objs']==null)||(namepdf[newnext]['objs']==""))) {
	//if((typeof(namepdf[newnext]) != "undefined")&&((nbTimeRun)>=(namepdf.length-newnext))) {
	//objused	=	objuse;
	
	//typeTo	=	typeTO;	
	
	//if((typeof(nameImgs[newnextImg]) != "undefined")) {
		//if(nameImgs[newnextImg]['objs'] != "undefined") {
		if (newnextImg<nameImgs.length){
			newobjSourceImg		=	nameImgs[newnextImg]['objs'];
			newnewUrlImg		=	nameImgs[newnextImg]['srcImg'];
			//gbnbTimeRun		=	nbTimeRun;
			setTimeout("setImgSourceFibo(newobjSourceImg,newnewUrlImg,newnextImg);", 1000);
		}
			
		//}
	//}
	
	
}


/**
 * Get dimension of image
 */
function getImgSize(imgSrc)
{
	var newImg	= new Image();
	newImg.src 	= imgSrc;
	var arrim	= [];
	arrim[0]	= newImg.width;
	arrim[1]	= newImg.height;
	return arrim;
}

/**
 * Set active panel
 */
function activePn(ipPn){
	var arrstr;
	var idstr;
	pnActive	=	ipPn+"";
	//$("#zoom").html("");
	showPanel(pnActive);									//show panel active and hide others
	if (pnActive.lastIndexOf("_")!=-1){
		arrstr	=	pnActive.split("_");
		idstr	=	arrstr[0];
	}else{
		idstr	=	pnActive;
	}
	var pnid	=	arrPn[idstr];							//get panel id
	for (var m=0;m<(shapes.length);m++){
		if (shapes[m]['panel']==pnid){
			if (shapes[m]['shapeType']=="pdf"){					//show button next-previous and zoom
				if (typeof(window["pdf"+shapes[m]['sid']])!="undefined"){
					
					//window["pdf"+shapes[m]['sid']].drawZoom(pnActive);
					
				}
				
				break;
			}else{													//zoom for all paper
				if ((shapes[m]['shapeType']!="gmap")&&(shapes[m]['shapeType']!="youtube")){					
					//addZoomPaper(pnActive,1);
					break;
				}
			}
		}
	}
	
	$('#currentPn').val(pnActive);
}

/**
 * Show panel active and hide others
 */
function showPanel(idpanel){
	
	for (var m=0;m<arrPnDt.length;m++){
		if (arrPnDt[m]['idpn']==idpanel){
			if ($("#panel"+idpanel).length>0) {
				$("#panel"+idpanel).show();					//show panel
				document.getElementById("currentImage"+arrPnDt[m]['idpn']).className = "thumbImg selectedImg"; //change ju - when image thumbnail is selected
				document.getElementById("currentNum"+arrPnDt[m]['idpn']).className = "thumbNum selectedNum"; //change ju - when number of thumbnail is selected
			}
		}else{
			if ($("#panel"+arrPnDt[m]['idpn']).length>0) {
				//BOF MPS EDIT
				//$("#panel"+arrPnDt[m]['idpn']).hide();
				//EOF MPS EDIT
				document.getElementById("currentImage"+arrPnDt[m]['idpn']).className = "thumbImg"; //change ju - when image thumbnail is not selected
				document.getElementById("currentNum"+arrPnDt[m]['idpn']).className = "thumbNum"; //change ju - when number of thumbnail is not selected
			}
		}
		
		if (ismobile == "1") {
			//new iScroll(document.getElementById('panel'+arrPnDt[m]['idpn']),{ hScrollbar : true, vScrollbar: true }); //change ju - for ipad scrolling
  			new iScroll(document.getElementById("firstpage"),{ vScrollbar: true });
			new iScroll(document.getElementById("panel"+arrPnDt[m]['idpn']),{ vScrollbar: true });
		}
	}
}

/**
 * Add zoom for paper
 */
function addZoomPaper(idPn,zum){
	$('#zoom').html("");
	var str		=	"<button onclick=\"zoomPaper('"+idPn+"',1)\" class='zoominBtn'></button>";
	$('#zoom').html(str);
	var str2	=	"<button onclick=\"zoomPaper('"+idPn+"',-1)\" class='zoomoutBtn'></button>";
	$('#zoom').append(str2);
}

/**
 * Add zoom for paper
 */
function addZoomDoc(){
	$('#zoom').html("");
	var str		=	"<button onclick=\"zoomDoc(1)\" class='zoominBtn'></button>";
	$('#zoom').html(str);
	var str2	=	"<button onclick=\"zoomDoc(-1)\" class='zoomoutBtn'></button>";
	$('#zoom').append(str2);
}

function decimalToHexStringFillColor(number)
{
    var re;
	if (Number(number) < 0)
    {
        re =	"FFFFFF";
    }
	else
	{
		re	=	Number(number).toString(16).toUpperCase();	
	}
	var lengthFill	=	6-re.length;
	var tp="";
	for(var u=0;u<lengthFill;u++)
	{
		tp=tp.concat("0");
	}
	tp=tp.concat(re);
    return tp;}

function decimalToHexStringLineColor(number)
{	
	var re;
	if (Number(number) > 0)
	{
		re=Number(number).toString(16).toUpperCase();
	}
	else
	{
		re ="000000";	
	}
	var lengthFill=6-re.length;
	var tp="";
	for(var u=0;u<lengthFill;u++)
	{
		tp=tp.concat("0");
	}
	tp	=	tp.concat(re);
	return tp;
}

//find min point
function minPoint(inPutArr)
{
	var arP=new Array(2);
	arP[0]=850;
	arP[1]=850;
	for (var t=0;t<inPutArr.length;t++)
	{
		if (parseInt(inPutArr[t]['x'])<arP[0])
		{
			arP[0]=parseInt(inPutArr[t]['x']);
		}
		if (parseInt(inPutArr[t]['y'])<arP[1])
		{
			arP[1]=parseInt(inPutArr[t]['y']);
		}
	}
	return arP;
}

/**
 * Array unique
 */
function arrunique(arrayName)
{
    var newArray	=	new Array();
    label:for(var i=0; i<arrayName.length;i++ )
    {  
        for(var j=0; j<newArray.length;j++ )
        {
            if(newArray[j]==arrayName[i]) 
                continue label;
        }
        newArray[newArray.length] = arrayName[i];
    }
    return newArray;
}
