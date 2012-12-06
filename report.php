<?php 
	include 'commonParams.php';	
	$scode			=	$this->infoSS['chid'];
	$showViralPopup	=	isExistCookieMinutes($this->infoSS['chid']);
		
	//$this->infoSS['chid']	=	"75K8A2";
	$sid		=	$this->sid;
	$hasGmap	=	false;	
	$imgCreated =   true;
	$imgcheck   =   false; //put this at true if we want server side check	
		
	if ($sid<$limitSession){
		$imgcheck   =   true; 
	}
	
	$urlfile	=	WORKLYURL."report?room=".$this->infoSS['chid']."_FCWhiteBoard.vHxWhiteBoard.whiteboard&j";	
		
	$fileJson	=	@file_get_contents($urlfile);	
		
	if ($fileJson =="{ }"){		
		$json_request 	= json_decode($fileJson,true);
		//http://stockjson.s3.amazonaws.com/LM_L59R7M_FCWhiteBoard.vHxWhiteBoard.whiteboard.json
		
		if (count($json_request)<=0){
			
			$urlfile	=	"http://stockjson.s3.amazonaws.com/LM_".$this->infoSS['chid']."_FCWhiteBoard.vHxWhiteBoard.whiteboard.json";	
			$fileJson	=	@file_get_contents($urlfile);
			$json_request 	= json_decode($fileJson,true);
			
			if (count($json_request)<=0){
				$urlfile	=	WORKLYURL."report?room=R".$sid."_FCWhiteBoard.vHxWhiteBoard.whiteboard&j";	
				$fileJson	=	@file_get_contents($urlfile);
			}
			//echo $urlfile;
		}
	}	
	
	if ($fileJson !=="{ }"){
		$fileJson	=	str_replace("\\r","\\n",$fileJson);						//for text shape	
	}else{
		$te			=	array();
		$fileJson	=	json_encode($te);
	}
	
	$json_request 	= json_decode($fileJson,true);
	
	/*
	Zend_Loader::loadClass('LM_translate');
	$report	=	new LM_translate();
	$report->setSource('report');
	*/
?>
<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
<html xmlns="http://www.w3.org/1999/xhtml">
<head>

<script type="text/javascript">var ie7 = false;</script>
<!--[if IE 7]>
<script type="text/javascript">var ie7 = true;</script>
<![endif]-->

<?php 
	$baseUrl	=	"http://".$_SERVER['SERVER_NAME'].'/en/';
?>
<base href="<?php echo $baseUrl;?>" />

<script type="text/javascript">
	var site	=	"<?php echo $baseUrl;?>";	
</script>
<meta http-equiv="Content-Type" content="text/html; charset=UTF-8" />
<?php if ($this->refresh==1){?>
<meta http-equiv="refresh" content="360" >
<?php }?> 
<title><?php if ($scode==$scodeUserGuide) { echo $report->translate('reportLiveminutesUserGuide','LiveMinutes User Guide'); } else {?><?php echo $report->translate('reportMeetingReport','Meeting Report'); ?><?php }?></title>

<?php if ($_SERVER['SERVER_NAME']!="liveminutes.com"){ ?>
	<link rel="stylesheet" href="http://f.fontdeck.com/s/css/YbEbVONS3yZB1DYf9YVHgZSgeMA/www.devminutes.com/10811.css" type="text/css" />
	<link rel="stylesheet" href="http://f.fontdeck.com/s/css/YbEbVONS3yZB1DYf9YVHgZSgeMA/devminutes.com/10811.css" type="text/css" />
<?php } else { ?>
	<link rel="stylesheet" href="http://f.fontdeck.com/s/css/YbEbVONS3yZB1DYf9YVHgZSgeMA/www.liveminutes.com/11018.css" type="text/css" />
	<link rel="stylesheet" href="http://f.fontdeck.com/s/css/YbEbVONS3yZB1DYf9YVHgZSgeMA/liveminutes.com/11018.css" type="text/css" />
<?php } ?>

<link rel="stylesheet" href="<?php echo CDNURL; ?>css/resetter.css" type="text/css" />
<!-- <link rel="stylesheet" href="<?php echo CDNURL; ?>css/stylesite.css" type="text/css" /> -->

<link rel="stylesheet" href="shops/css/stylesite.css" type="text/css" />

<!--[if IE 7]>
        <link rel="stylesheet" type="text/css" href="shops/css/ie7.css" />
<![endif]-->

<!--[if IE 8]>
        <link rel="stylesheet" type="text/css" href="shops/css/ie8.css" />
<![endif]-->

<!--[if IE 9]>
        <link rel="stylesheet" type="text/css" href="shops/css/ie9.css" />
<![endif]-->

<link rel="shortcut icon" href="favicon.png" type="image/x-icon" />
<link rel="image_src" href="logoLM.png" />

<script type="text/javascript" src="jquery-1.4.4.js"></script>
<script type="text/javascript" src="raphael.js"></script>
<script type="text/javascript" src="raphael.zoom.js"></script>
<script type="text/javascript" src="raphael.bound.js"></script>
<script type="text/javascript" src="jscripts/raphael.translatepp.js"></script>
<!-- BOF MPS EDIT -->
<script type="text/javascript" src="jscripts/iscroll.js"></script>
<script type="text/javascript" src="jscripts/jScrollTouch-2.js"></script>
<script type="text/javascript" src="jscripts/jquery.ba-dotimeout.js"></script>
<!-- EOF MPS EDIT -->
<script type="text/javascript" src="tools2_general.js"></script>
<script type="text/javascript" src="jshapes.js"></script>
<script type="text/javascript" src="libDraw.js"></script>

<script type="text/javascript" src="expdt.js"></script>
<script type="text/javascript" src="jquery.tipsy.js"></script>
<link rel="stylesheet" type="text/css" media="screen, print, projection"  href="tipsy.css"></link>
<script type="text/javascript">
/* <![CDATA[ */
var google_conversion_id = 1023038625;
var google_conversion_language = "en";
var google_conversion_format = "3";
var google_conversion_color = "ffffff";
var google_conversion_label = "wypiCJ_m3QMQoanp5wM";
var google_conversion_value = 0;
<?php if ($_SERVER['SERVER_NAME']=="liveminutes.com"){ ?>
var google_conversion_link	=	"http://www.googleadservices.com/pagead/conversion/1023038625/?value=0&amp;label=wypiCJ_m3QMQoanp5wM&amp;guid=ON&amp;script=0";
<?php }else{
?>
var google_conversion_link	=	"";
<?php
} ?>
/* ]]> */
</script>
<?php if (($_SERVER['SERVER_NAME']=="liveminutes.com")&&($_SESSION['firstloginNormal']==1)){ 	
?>
<!-- Google Code for SignUp Complete Conversion Page -->
<script type="text/javascript" src="http://www.googleadservices.com/pagead/conversion.js">
</script>
<noscript>
<div style="display:inline;">
<img height="1" width="1" style="border-style:none;" alt="" src="http://www.googleadservices.com/pagead/conversion/1023038625/?value=0&amp;label=wypiCJ_m3QMQoanp5wM&amp;guid=ON&amp;script=0"/>
</div>
</noscript>
<?php }?>

<?php
// check if user is on web browser or mobile browser
require_once "ismobile.class.php";
$ismobile = new IsMobile(); 
?>

<script src="http://ajax.googleapis.com/ajax/libs/jqueryui/1.8.4/jquery-ui.js"></script>
<script type="text/javascript" src="jquery.ui.autocomplete.autoSelect.js"></script>
<script>
var catGG	=	"Report";
var autoa	=	"";
var termSearch	=	"";
var ftext	=	"";
var sltit	=	"";
function filterSearch(str){
	str	=	str.replace(/ /gi,'');
	autoa	=	"";
	var tt	=	str.split(';');
	for (var o=0;o<tt.length-1;o++){
		autoa	+=	tt[o]+";";
	}
	return tt[tt.length-1];
}

$(function() {
		
		$("#emailsshare").autocomplete({
			delay: 700,
			source: function(request, response) {				
				var termS	=	request.term;
				termS	=	filterSearch(termS);
				if (termS.length>0){
					$.getJSON(site+"meeting/gct", {term:termS}, response);
				}
			},			
			search: function( event, ui ) {
			},
			focus: function( event, ui ) {
				//log( "focus: " + ui.item.label );
				//$("#autocomplete").val($("#autocomplete").val());
				sltit	=	ui.item.label;
				return false;
			},
			select: function( event, ui ) {
				//log( "select: " + ui.item.label );
				autoa	+=	sltit+";";
				$("#emailsshare").val(autoa);
				return false;		//for custom display				
			},
			change: function( event, ui ) {
				//log( "change: " + ( ui.item ? ui.item.label : "<no item>" ) );
				//alert(ui.item.label);
			}
			
		});
	});
</script>


<script type="text/javascript">

	// BOF MPS EDIT
	var can_display_scroll = false;
	var current_orientation = Math.abs(window.orientation);
	// EOF MPS EDIT

	var baseUrl		=	"<?php echo "http://".$_SERVER['SERVER_NAME']."/en/"; ?>";
	var pdfUrl		=	"<?php echo "http://".$_SERVER['SERVER_NAME']."/recette/phplib/eclass_resource/"; ?>";
	var	sid		=	"<?php echo $sid;?>"; 
	var scode		=	"<?php echo $scode;?>";
	var linkpdf		=	"<?php if (($this->infoSSSup['link_pdf']!=NULL)&&($this->infoSSSup['link_pdf']!="")) echo $this->infoSSSup['link_pdf']; ?>";
	var imgLoading	=	"<?php echo CDNURL; ?>images/loading.gif";
	var imgWait		=	"<?php echo CDNURL; ?>images/tryagain.JPG";
	var whiteWait	=	"<?php echo CDNURL; ?>images/white.JPG";
	var special		=	"<?php if ($scode=="11TQ71"){?>ok<?php }?>";
	var lkgetext	=	"<?php echo "http://".$_SERVER['SERVER_NAME']; ?>/recette/phplib/eclass_resource/getCompTxt.php";
	var tbncrt		=	<?php echo $this->thumbnail;?>;
	var tblink		=	"<?php echo TBLINK;?>";
	var uscnt		=	"<?php echo base64_encode($this->userconnect['id']);?>";
	var clmton		=	"<?php if ((int)$this->infoSSSup['status_session']!=2){echo "no"; }else{echo "ye";} ?>";
	var activemp3	=	"<?php if ($this->infoSSSup['id']>1){echo "true";}else{echo "false";}?>";
	var linkmp3		=	"<?php if (($this->infoSSSup['link_static']!=NULL)&&($this->infoSSSup['link_static']!="")) echo $this->infoSSSup['link_static']; ?>";
	var newec		=	"<?php if ($sid>NewMtOderPn){echo "true";}else{echo "false";} ?>";

	<?php 
		if ($imgcheck){			//check dimension of image (not pdf)
			?>
			var	chdmImg			=	true;		
			<?php 
		}else{
			?>
			var	chdmImg			=	false;
			<?php
		}
	?>
	
	$(document).ready(function () {		
		//prefill();
		<?php
		if (count($json_request)>0){?>
			drawData(<?php echo $fileJson;?>);
		<?php }else{		//if has not data?>
			addInfoPanel();
		<?php }?>
		<?php		
		if ($_SESSION['firstloginNormal']==1){	//first time login			
			$_SESSION['firstloginNormal']	=	2;
		?>	
		try{
			tyga("onSite","SignedUpAndLogged","user successfully signup-go to report");
		}catch(err){}
		<?php } ?>
		getnbread();
		setInterval("getnbread()",60000);
	});
	
	function getnbread(){
		var data = {};
		ajaxJqueryPost(site+"meeting/getnbnr",data,finishGetnbread);
	}
	
	function finishGetnbread(repJson){
		if (repJson.nb!=0){
			$("#nbread").text(repJson.nb);
			$("#nbread").show();
		}else{
			$("#nbread").hide();
		}	
	}
	
	<?php if($ismobile->CheckMobile()) { ?>
		var ismobile = "1";
	<?php } ?>
</script>

<script>

		function resize(){
			
			document.getElementById("navigation").style.left = ( ($('#controlBar').width()/2) - ($('#navigation').width()/2) )+"px";
			document.getElementById("content").style.left = ( ($('#headerContainer').width()/2) - ($('#content').width()/2) )+"px";
			
			<?php if($ismobile->CheckMobile()) { ?>
						$('#contentPanel').width($(window).width() - 204);
						document.getElementById("navigation").style.left = ( ($('#controlBar').width()/2) - ($('#navigation').width()/2) )+"px";
						document.getElementById("content").style.left = ( ($('#headerContainer').width()/2) - ($('#content').width()/2) )+"px";
			<?php } ?>			
			
			$('#contentPanel').height($(window).height() - 90);
			$('#thumbPanel').height($(window).height() - 43);
			
			document.addEventListener('touchmove', function(e){ e.preventDefault(); });
						
		}
		
		function replacePopupReport(){
			
			if (ie7 == true){
				
				document.getElementById("sharePopup").style.left = ( ($(window).width()/2) - ($('#sharePopup').width()/2))+"px";
				document.getElementById("sharePopup").style.top = ( ( ($(window).height()/2) - ($('#sharePopup').height()/2)) + $(window).scrollTop() - 86 + "px");
			
				document.getElementById("shareSettingsPopup").style.left = ( ($(window).width()/2) - ($('#shareSettingsPopup').width()/2))+"px";
				document.getElementById("shareSettingsPopup").style.top = ( ( ($(window).height()/2) - ($('#shareSettingsPopup').height()/2)) + $(window).scrollTop() - 86 + "px");
				
			} else {
				
				document.getElementById("sharePopup").style.left = ( ($(window).width()/2) - ($('#sharePopup').width()/2))+"px";
				document.getElementById("sharePopup").style.top = ( ( ($(window).height()/2) - ($('#sharePopup').height()/2)) + $(window).scrollTop() - 86 + "px");
				
				document.getElementById("shareSettingsPopup").style.left = ( ($(window).width()/2) - ($('#shareSettingsPopup').width()/2))+"px";
				document.getElementById("shareSettingsPopup").style.top = ( ( ($(window).height()/2) - ($('#shareSettingsPopup').height()/2)) + $(window).scrollTop() - 86 + "px");
				
			}
		}
		
		$(window).resize(function() {			
			resize();
			replacePopupReport();
		});
		
		$(document).ready(function() {			
			replacePopupReport();
		});
		
		function init(){
			resize();									
			getvwmn('<?php echo $scode; ?>');			
		}
				
		function select_all() {
			el = document.getElementById('linkshare');
			el.focus(); 
			el.select();
		}
			
		function showErrorMsgPopup(id){	
			if (id == 1){
				if(document.getElementById("errorShareEmails").style.display == "none"){
					
					if(document.getElementById("emailsshare").className == "emailsInput errorShareEmails"){
						$('#errorShareEmails').fadeIn("slow");
						$('#errorShareEmails').show();
					}
				} else {
					$('#errorShareEmails').fadeOut("slow");
					$('#errorShareEmails').hide();
				}			
			} else if (id == 2){
				if(document.getElementById("errorShareEmails").style.display == "none"){
					
					if(document.getElementById("emailsshare").className == "emailsInput errorShareEmails"){
						$('#errorShareEmails').fadeIn("slow");
						$('#errorShareEmails').show();
					}
				} else {
					$('#errorShareEmails').fadeOut("slow");
					$('#errorShareEmails').hide();
				}			
			}
		}
	
		function showSettings2(){
			document.getElementById("popupshare").style.display = "none";
			document.getElementById("popupShareSettings").style.display = "block";
			replacePopupReport();
		}
		
		function saveShareSettings2(){
			savePrivacy();
			document.getElementById("popupShareSettings").style.display = "none";
			document.getElementById("popupshare").style.display = "block";
			replacePopupReport();
		}
		
		function cancelShareSettings2(){
			document.getElementById("popupShareSettings").style.display = "none";
			document.getElementById("popupshare").style.display = "block";	
			replacePopupReport();
		}
		
		function showSharePopup(){
			document.getElementById("popupshare").style.display = "block";
			replacePopupReport();
		}
		
		function closePopupShare(){
			document.getElementById("popupshare").style.display = "none";		
		}
		
		function closeMtInline(){
			var data = {
				mid:"<?php echo $this->infoSS['chid']; ?>",
				actiondo:"deactive",
				sldontshow:"ok"
			};
			ajaxJqueryPost(site+"meeting/doop",data,finishCloseMtInline); 
		}
		
		function finishCloseMtInline(rs){
			
			if (rs.result="ok"){
				$("#clsMtInline").hide();
				$("#sttMtc").show();

				if (activemp3=="true"){
					genmp3();
					$("#rengen").show();
					$("#recnot").hide();
				}
			}
		}
		
		function genmp3(){
			var data = {
				chid:"<?php echo $this->infoSS['chid']; ?>"
			};
			ajaxJqueryPost(site+"tools/genmp3",data,finishGenmp3); 
		}

		function finishGenmp3(rep){
			$("#rengen").hide();
			if (rep.result=="ok"){
				$("#recmp3").attr("href", rep.mp3link);
				$("#recmp3").show();
			}else{
				$("#norec").show();
			}
		}
		
		$(document).ready(function() {					   
			$('#recnot').tipsy({gravity: 's',fade: true}); 
			$('#norec').tipsy({gravity: 's',fade: true});
			$('#generatePdfOpen').tipsy({gravity: 's',fade: true});
					
			$('#tooltipNoReport').hover(function(){ 
				mouse_is_inside=true; 
			}, function(){ 
				mouse_is_inside=false; 
			});
		
			$("body").mouseup(function(){ 
				if(! mouse_is_inside) $('#tooltipNoReport').hide();
			});
			
			$("#nodownloadBtn").mouseup(function(){ 							
				if ( (! mouse_is_inside) && (document.getElementById("tooltipNoReport").style.display == "block" )) {  
					ttipcount = 1;
					$('#tooltipNoReport').hide(); 
				} else {
					ttipcount = 0;
				}
			});
			
		});
		
		var mouse_is_inside = false;
		var ttipcount = 0;
		
		function showTtip(){		
			if( (document.getElementById("tooltipNoReport").style.display == "none") && (ttipcount == 0) ){
				$('#tooltipNoReport').fadeIn("slow");
			} else {
				$('#tooltipNoReport').hide();
			}
		}
		
		
		<?php include "opShare.phtml"; ?>

</script>

<style>
/* css for autocomplete */
.ui-corner-all, .ui-corner-bottom, .ui-corner-right, .ui-corner-br {
    border-bottom-right-radius: 0px;
}
.ui-corner-all, .ui-corner-bottom, .ui-corner-left, .ui-corner-bl {
    border-bottom-left-radius: 0px;
}
.ui-corner-all, .ui-corner-top, .ui-corner-right, .ui-corner-tr {
    border-top-right-radius: 0px;
}
.ui-corner-all, .ui-corner-top, .ui-corner-left, .ui-corner-tl {
    border-top-left-radius: 0px;
}
.ui-widget-content {
	background:none #F4F8FA;
    border: 1px solid #B9CFD8;
    color: #362B36;
	width:380px;
	font-family:Arial, Helvetica, sans-serif;
	font-size:14px;
}
.ui-menu {
	list-style:none;
	padding: 2px;
	margin: 0;
	display:block;
	float: left;
}
.ui-menu .ui-menu {
	margin-top: -3px;
}
.ui-menu .ui-menu-item {
	margin:0;
	padding: 0;
	zoom: 1;
	float: left;
	clear: left;
	width: 100%;
}
.ui-menu .ui-menu-item a {
	text-decoration:none;
	display:block;
	padding:.2em .4em;
	line-height:1.5;
	zoom:1;
}
.ui-menu .ui-menu-item a.ui-state-hover,
.ui-menu .ui-menu-item a.ui-state-active {
	font-weight: normal;
	cursor:pointer;
	margin:0px;
	background: url(<?php echo CDNURL; ?>images/bgLinesMeetings.jpg) repeat-x scroll 0 0 transparent;
	color:#FFF;
	border:none;
	text-shadow: 0 1px 1px #3E3E3E;
}
</style>

<?php include 'ga.phtml'; ?>
</head>

<body onload="init()">

	<?php include("head.phtml"); ?>
		
	<div id="templatePanel" style="display: none;">
		<li>
               <span id="currentImagexxxId" class="thumbImg"><a href='<?php echo "http://".$_SERVER['SERVER_NAME'].$_SERVER['REQUEST_URI'];?>#panelxxxId' onclick="activePn('xxxId')"><img src="xxxIMG" /></a></span>
               <span id="currentNumxxxId" class="thumbNum"><a href='<?php echo "http://".$_SERVER['SERVER_NAME'].$_SERVER['REQUEST_URI'];?>#panelxxxId' onclick="activePn('xxxId')">xxxOrder</a></span>
        </li>
	</div>	
    
        <script language="javascript">
		
			function closeSharePopup(){
				$("#sharetemppopupid").hide();
			}
			
			<?php
			if (count($this->pis)>1){
				$t	=	0;
				$sentence	=	"";
				$thirdper	=	"";
				foreach ($this->pis as $pi){			
					if ($pi['profile']!=2){
						if (!preg_match("/^user([0-9]+)$/i", $pi['nickname'])) {	//not format user123
							$t++;																				
							if ($t==1){
								$firstSentence	=	$report->translate('reportConsiderSharing',"Consider sharing with ")." ";
								$sentence		=	$pi['nickname'];
							}else{
								if ($t==2){
									$sentence	.=	"and123 ".$pi['nickname'];
								}else {
									if ($t==3){
										$sentence	.= "and234 ";
										$thirdper	=	$pi['nickname'];
									}
								}											
							}	
						}						
					}
				}
				
				if ($t==2){
					$sentence	=	str_replace("and123"," ".$report->translate('reportAnd',"and"),$sentence);
				}								
				if ($t==3){
					$sentence	=	str_replace("and123",", ",$sentence);
					$sentence	=	str_replace("and234"," ".$report->translate('reportAnd',"and"),$sentence);
					$sentence	.=	$thirdper;
				}
				if ($t>3){
					$sentence	=	str_replace("and123",",",$sentence);
					$sentence	=	str_replace("and234"," ".$report->translate('reportAnd',"and"),$sentence);
					$sentence	.=	" ".($t-2).$report->translate('reportOthers',"others");
				}
				
				if ($t==1){
					//$secondeSentence	=	" who doesn't have a LiveMinutes account and can't see this.";
					$secondeSentence	= " ".$report->translate('reportDoesntHaveAccount',"who doesn't have a LiveMinutes account and can't see this.");
				}
				if ($t>1){
					//$secondeSentence	= " who don't have LiveMinutes accounts and can't see this.";
					$secondeSentence	= " ".$report->translate('reportDontHaveAccount',"who don't have LiveMinutes accounts and can't see this.");
					
				}							
			}						
			?>	
			
			var ustmp	=	new Array();
			<?php
				$_3user	=	array();
				$_3userid	=	array();
				if (count($this->pis)>1){								
					$u	=	0;
					foreach ($this->pis as $pi){
						if ($pi['profile']!=2){
							if (!preg_match("/^user([0-9]+)$/i", $pi['nickname'])) {	//not format user123
								$u++;
								if ($u<4){
									$_3user[]	=	$pi['nickname'];
									$_3userid[]	=	$pi['id'];
									?>
									ustmp.push('<?php echo $pi['id']; ?>');
									<?php
								}else{
									break;
								}
							}
						}
					}
				}			
			?>
			
			function inviteTemp(){
				var emails	=	"";
				var wun		=	"";
				var nn		=	"";
												
				<?php				
				if (count($_3user)>0){
					for ($n=0;$n<count($_3user);$n++){
						?>
						emails		=	emails+"<?php if ($n>0){ echo ","; }?>"+$("#email<?php echo $_3userid[$n]; ?>").val();
						wun			=	wun+"<?php if ($n>0){ echo ","; }?>"+$("#wu<?php echo $_3userid[$n]; ?>").val();
						nn			=	nn+"<?php if ($n>0){ echo ","; }?>"+"<?php echo $_3user[$n]; ?>";
						<?php
					}
				}
				?>
				var currentmid	=	$("#idmtrn").val();
				var namemt		=	$('#renameMeeting').val();
				var data = {
					mid:currentmid,
					emails:emails,
					nn:nn,
					wun:wun,
					namemt:namemt
				};
				ajaxJqueryPost(site+"meeting/sharemntmp",data,finishInviteTemp);
				
			}
			var okuss	=	new Array();
			function finishInviteTemp(rs){			
				if (rs.result="ok"){		
					var emails	=	rs.emails.split(",");	
					var nn	=	rs.nn.split(",");	
					var wun	=	rs.wun.split(",");	
					for (var i=0;i<emails.length;i++){	
						if ((emails[i].indexOf("@")>0)&&(emails[i].indexOf(".")>0)){
							okuss.push(wun[i]);
							$("#email"+wun[i]).hide();
							$('#notokemail'+i).hide();
						}else{
							//document.getElementById("emailTemp1").className = "inputSignin notoktempemail nameInput";
							//$('#notokemail'+i).show();
						}
					}
					
					var narr	=	elementExclure(ustmp,okuss);
										
					if (narr.length>0){
						$('#formInvite').hide();				
						$('#formInviteOk').show();						
					}else{
						$('#formInvite').hide();							
						$('#cancelinvitemore').hide();
						$('#btinvitemore').hide();
						$('#formInviteOk').show();
					}
					getvwmn('<?php echo $scode; ?>');
				}
			}
			
			function inviteMore(){
				$('#formInviteOk').hide();
				$('#formInvite').show();				
			}
			
			function showErrorMsgTemp(id){	
					if (id == 1){
						if(document.getElementById("errorEmail1").style.display == "none"){
							
							if(document.getElementById("emailTemp1").className == "inputSignin notoktempemail emailInput"){
								$('#errorEmail1').fadeIn("slow");
								$('#errorEmail1').show();
							}
						} else {
							$('#errorEmail1').fadeOut("slow");
							$('#errorEmail1').hide();
						}			
					} else if (id == 2){
						if(document.getElementById("errorEmail2").style.display == "none"){
							
							if(document.getElementById("emailTemp2").className == "inputSignin notoktempemail emailInput"){
								$('#errorEmail2').fadeIn("slow");
								$('#errorEmail2').show();
							}
						} else {
							$('#errorEmail2').fadeOut("slow");
							$('#errorEmail2').hide();
						}			
					} else if (id == 3){
						if(document.getElementById("errorEmail3").style.display == "none"){
							
							if(document.getElementById("emailTemp3").className == "inputSignin notoktempemail emailInput"){
								$('#errorEmail3').fadeIn("slow");
								$('#errorEmail3').show();
							}
						} else {
							$('#errorEmail3').fadeOut("slow");
							$('#errorEmail3').hide();
						}			
					} 
			}
			
		</script>
		
        <?php 
			include 'tempChatCss.phtml';
			include 'tempChatHtml.phtml';			
			include 'tempTexteditor.phtml';
		?>
        
		<?php
			if (count($_3user)>0){
		?>	
				
        <!-- <div id="sharetemppopupid" class="sharetemppopup" <?php if (($this->userType!=2)||($showViralPopup==2)){ ?> style="display:none;" <?php } ?>> -->
        <div id="sharetemppopupid" class="sharetemppopup" <?php if ($this->userType!=2){ ?> style="display:none;" <?php } ?>>
                    
            	<div class="char"></div>
                <div id="formInvite" class="form">
                	<div class="close"><a onClick="closeSharePopup()"></a></div>
                    
					<div class="title"><?php echo $report->translate('reportShouldShareMinutes','Hey, you should share these minutes with'); ?> 
					<?php					
						echo $sentence." !";
					?>
					</div>
					 
                     <form id="" action="">
                        
                     <div class="listUsers">
					 <?php					
						for ($n=0;$n<count($_3user);$n++){
						?>
							<input type="text" id="email<?php echo $_3userid[$n]; ?>" value="<?php echo $_3user[$n]; ?>'s email" class="inputSignin emailInput" onBlur="if (this.value == '') {this.value = '<?php echo $_3user[$n]; ?>\'s email';}" onFocus="if(this.value=='<?php echo $_3user[$n]; ?>\'s email') {this.value=''; }" onMouseOver="showErrorMsgTemp(<?php echo $n; ?>)" onMouseOut="showErrorMsgTemp(<?php echo $n; ?>)" />
							<input type="hidden" id="wu<?php echo $_3userid[$n]; ?>" value="<?php echo $_3userid[$n]; ?>" />							
						<?php
						}
					?>	
                    </div>
                    <?php					
						for ($n=0;$n<count($_3user);$n++){
						?>
						<span id="okemail<?php echo $n; ?>" class="ok okemail" style="display:none;"></span>
						<?php
						}
					?>	
					
					<?php					
						for ($n=0;$n<count($_3user);$n++){
						?>
						<span id="notokemail<?php echo $n; ?>" class="notok notokemail" style="display:none;"></span>
						<?php
						}
					?>	
					
					<?php					
						for ($n=0;$n<count($_3user);$n++){
						?>
						<span id="errorEmail<?php echo $n; ?>" class="errorMsgRight" style="display:none;"><?php echo $report->translate('minutesMistakeEmail','Sorry there seems to be a mistake in your email'); ?></span>
						<?php
						}
					?>	
                        
                    <div class="inviteDiv"><a onclick="closeSharePopup()"><?php echo $report->translate('headCancel','CANCEL'); ?></a><button type="button" onClick="inviteTemp()" class="classicsmallBtn"><span><?php echo $report->translate('minutesInvite','INVITE'); ?></span></button></div>     
                    </form> 
            	</div>    
                
                <div id="formInviteOk" class="form formInvite" style="display:none;">
                	<div class="close"><a onClick="closeSharePopup()"></a></div>
                    <div class="title"><?php echo $report->translate('reportInvitationsSent','Invitations sent!'); ?></div>                   
                    <div id="cancelinvitemore" class="inviteDiv"><a onclick="closeSharePopup()"><?php echo $report->translate('headCancel','CANCEL'); ?></a>
					<button type="button" id="btinvitemore" onClick="inviteMore();" class="classicsmallBtn"><span><?php echo $report->translate('reportInviteMore','INVITE MORE'); ?></span></button></div>
                </div>   
                    
        </div>
		<?php
		}	
		?>
        <div id="divtemp" style="display: none;">
		</div>
        
		<img src="" width="1" height="1" style="visibility:hidden;" alt="" id="myconversion" />
		
        <div id="popupshare" class="wrapperpopup" style="display: none;">
        	<div class="bgpopup bgie7"></div>
            <div id="sharePopup" class="chatpopup">
            	<div class="close"><a onClick="closePopupShare()"></a></div>
                <h1><span id="shareLinkMnTitle"><?php echo $report->translate('minutesShare','Share'); ?></span></h1>  
				<div id="divPrvcNchange">		
					<h4 class="privacyminutes" id="vlPrvcPri" style="display: none;"><?php echo $report->translate('minutesPrivacyPrivate','Privacy : Private'); ?></h4>
					<h4 class="privacyminutes" id="vlPrvcPub" style="display: none;"><?php echo $report->translate('minutesPrivacyPublic','Privacy : Public'); ?></h4>
					<div class="legend" id="vlPrvcPriNote" style="display: none;"><?php echo $report->translate('minutesOnlyPeopleShare','(only people you explicitly share your minutes with can see them)'); ?></div>
					<div id="linkChangePrv" class="change"><a onclick="showSettings2()"><?php echo $report->translate('minutesChange','change'); ?></a></div>
					<input id="idmtrn" value="<?php echo $scode; ?>" type="hidden" />					
					
				</div>
                <h4 id="shareLinkMn" class="link"><?php echo $report->translate('minutesLinkToShare','Link to share :'); ?> 
                	<input type="text" value="<?php echo "http://".$_SERVER['SERVER_NAME']."/r/".$scode; ?>" spellcheck="false" id="linkshare" class="shareInputPopup" onClick="select_all('linkshare');" />
                	<div class="shareBtnsInline">
                        <!--<script src="//platform.twitter.com/widgets.js" type="text/javascript"></script>-->
                        <a id="linktwitterOpen" href="https://twitter.com/share?url=http://liveminutes.com/r/<?php echo $scode; ?>&text=<?php echo $report->translate('headerCheckOutMeetingMinutes','Check out the meeting minutes at :'); ?> " class="twitter"></a>
                        <!--<script src="http://static.ak.fbcdn.net/connect.php/js/FB.Share" type="text/javascript"> </script>-->
                        <a id="linkfacebook" href="http://www.facebook.com/sharer.php?u=http://liveminutes.com/r/<?php echo $scode; ?>&t=<?php echo $report->translate('headerCheckOutMeetingMinutes','Check out the meeting minutes at :'); ?> " class="fb"></a> 
                    </div>
                </h4>
								
				                
				<div id="divtempShareMn" style="display: none;">
					<li id="TEMPnicknameuser">
						<span class="photo"><img src="TEMPimguser" /></span>
						<span class="email">TEMPemail</span>
						<span class="role">TEMProleuser</span>						
					</li>		
				</div>
				
				<div id="divtempShareMnHost" style="display: none;">
					<li id="TEMPnicknameuser">
						<span class="photo"><img src="TEMPimguser" /></span>
						<span class="email">TEMPemail</span>
						<span class="role">TEMProleuser</span>
						<span id="dlTEMPnicknameuser" class="delete"><a onClick="dlVw('TEMPnicknameuser','TEMPchid');"><img src="<?php echo CDNURL; ?>images/crossIcon.png" title="<?php echo $report->translate('minutesDeletePeople','delete people'); ?>" alt="<?php echo $report->translate('minutesDeletePeople','delete people'); ?>" /></a></span>
					</li>		
				</div>
				
				<div id="divshareMn">
					<h4><?php echo $report->translate('minutesPeopleWhoCanSeeReport','People who can see this report'); ?></h4>
					<div class="people">
						<ul id="ppshmn">
						</ul>
					</div>
					
                    <div class="addpeople">
                        <h4><?php echo $report->translate('minutesAddPeople','Add people'); ?></h4>
                        
                        <div class="inputcontainer">
                            <input id="emailsshare" type="text" value="<?php echo $report->translate('minutesEmailsSeparatedCommas','Emails separated with commas'); ?>" class="emailsInput" onblur="if (this.value == '') {this.value = '<?php echo $report->translate('minutesEmailsSeparatedCommas','Emails separated with commas'); ?>';}" onfocus="if(this.value=='<?php echo $report->translate('minutesEmailsSeparatedCommas','Emails separated with commas'); ?>') {this.value=''; }" /> 
                                                                    
                            <span id="notokshareemails" class="notok notokshareemails" style="display:none;" onMouseOver="showErrorMsgPopup(2)" onMouseOut="showErrorMsgPopup(2)"></span>
                            <span id="errorShareEmails" class="errorMsgTop" style="display:none;"><?php echo $report->translate('minutesMistakeEmail','Sorry there seems to be a mistake in your email'); ?></span>
                            
                            <button type="button" class="blueBtn" onclick="saveEmails()"><span><?php echo $report->translate('minutesShare2','SHARE'); ?></span></button>
                        </div>
                    </div>
                
                </div>
            </div>
        </div>
        
        
        <div id="popupShareSettings" class="wrapperpopup" style="display: none;">
        	<div class="bgpopup bgie7"></div>
            <div id="shareSettingsPopup" class="chatpopup">
                <h1><?php echo $report->translate('minutesSharingOptions','Sharing options'); ?></h1>
                <h4><?php echo $report->translate('minutesMinutesPrivacy','Minutes Privacy :'); ?></h4>
                
                <div class="privacyradio">                        
                    <div class="radio" onClick="slPrv(3);" id="private"><input type="radio" id="cbpvcpr" value="3" name="privacy" /></div><div class="privacy"><?php echo $report->translate('minutesPrivate','Private'); ?> <span class="small"><?php echo $report->translate('minutesOnlyPeopleShare','(only people you explicitly share your minutes with can see them)'); ?></span></div>                        
                    <div class="radio" onClick="slPrv(1);" id="public"><input type="radio" id="cbpvcpb" value="1" name="privacy" /></div><div class="privacy"><?php echo $report->translate('minutesPublic','Public'); ?> <span class="small"><?php echo $report->translate('minutesAnyone','(anyone on the web can see them)'); ?></span></div>
                </div>
                        
                <div class="actions">
                	<a onclick="cancelShareSettings2()"><?php echo $report->translate('headCancel','CANCEL'); ?></a>
                	<button type="button" class="blueBtn" onclick="saveShareSettings2()"><span><?php echo $report->translate('headSave','SAVE'); ?></span></button>
                </div>
            </div>
        </div>
        
        
        	<!-- begin tutorial popup -->
                    <div id="tutorialPopup" class="classicPopup" style="display: none;">
						<h1><img src="<?php echo CDNURL; ?>images/matilda.png" /><?php echo $report->translate('reportMsgMatilda','missing text'); ?></h1>
						<p><?php echo $report->translate('reportGeneratedReport','missing text'); ?> <?php echo $report->translate('reportScrollFindComments','missing text'); ?></p>
						<div class="actions" style="width:100%;">
							<button type="button" class="connectdbBtnEv tutorialBtn" onClick="closewd()"><span><?php echo $report->translate('reportGetBackToTutorial','missing text'); ?></span></button>
                        </div>
      				</div>
            <!-- end tutorial popup -->

                
        <div style="display: none;">
            <div id="gmapPopup" class="popup" style="width:1000px;height:400px;">
                gmap
            </div>
        </div>
        
        <div style="display: none;">
            <div id="test" class="popup" style="width:1000px;height:400px;">
				test
            </div>
        </div>

	<div class="view">
    
    	<div id="thumbPanel" class="thumbPanel <?php if ($_SESSION['leftImage']!="") echo str_replace("userPanel", "", $_SESSION['leftImage']);else { echo "bg1"; } ?>" style="height:600px;">
        	<div id="scroller">
                <ul id="listPanels">
                   <li>
					<span class="thumbImg selectedImg" id="currentImage1">Loading....</span>					
					</li>
                </ul>   
            </div>     
        </div>
    
        <div id="contentPanel" class="contentPanel" style="width:auto;height:100%;">
			<div style="position:relative;width:850px;height:850px;" class="docContainer sudipta_scrollPage" id="panelPr">
				<img class="loadingreport" src="shops/images/loadingreport.gif" />
			</div>
		</div>	
                <?php 
                    $planDate	=	new Zend_Date($this->infoSS['planified'],"yyyy-MM-dd HH:mm:ss","en_US");
                ?>
				<div id="firstpage" class="docContainer" style="position: relative; width: 850px; height: 850px;display:none;">
                    <div id="scroller2">
                        <div id="ttt" class="title"><?php if ($scode==$scodeUserGuide) echo $report->translate('reportLiveminutesUserGuide','LiveMinutes User Guide');else { 
							if (($this->infoSSSup['name']=="")||($this->infoSSSup['name']==NULL)){
								echo $dateofMt	=	$planDate->get("MMM")." ".$planDate->get("d").$planDate->get(Zend_Date::DAY_SUFFIX)." ".$report->translate('minutesMeeting','meeting'); 						
							}else{
								echo stripslashes($this->infoSSSup['name']);
							}
						}
						?>
                        </div>
                        <div class="host" style="display:none;">host : <?php if ($scode==$scodeUserGuide) echo "LiveMinutes";else {?><?php echo $this->infoSS['nickname'];?><?php }?></div>                        
                        <div class="date" style="display:none;"><?php echo $planDate->get('M')."/".$planDate->get('d')."/".$planDate->get('yyy');?></div>
                        <div class="url" style="display:none;">share : www.liveminutes.com/r/<?php echo $scode;?></div>
                        <div class="logo" style="display:none;"><span class="blue">Live</span>Minutes</div>
                                                
                        <div class="participantsTitle"><img class="imgpis" src="<?php echo CDNURL; ?>images/participants.jpg" /><?php echo $report->translate('reportMeetingParticipants','Meeting participants :'); ?></div>
                        <div class="participants">
                        	<div class="list">
								<?php if ($scode==$scodeUserGuide) echo "LiveMinutes";else {?><?php echo $this->infoSS['nickname'];?>(<?php echo $report->translate('minutesHost','host'); ?>)<?php }?>
								<?php
									if (count($this->pis)>1){
										foreach ($this->pis as $pi){
											if (!preg_match("/^user([0-9]+)$/i",$pi['nickname'])) {	//not format user123
												if (($pi['nickname']!=$this->infoSS['nickname'])&&($pi['nickname']!="nntemp")){
													echo ", ".$pi['nickname'];
												}
											}
										}
									}
									
									if ($this->infoSS['topicid']==13){
										echo ",Matilda";
									}
								?>								
								
                            </div>
                        </div>
                        <div class="sharereport">
                        	<div class="btn">
                            	<a class="shareBtnBig" id="shareminutes123" onclick="showSharePopup()"><span><?php echo $report->translate('reportShareReport','SHARE REPORT'); ?></span></a>
                            </div>
                        </div>
                       	<div class="footerFirstpage">						
						<?php if ($this->userType==2){
								echo $firstSentence.$sentence.$secondeSentence;
							}
						?>
												
						</div>
                                                
						<?php if ($scode==$scodeUserGuide) echo $report->translate('reportLiveminutesUserGuide','LiveMinutes User Guide');else { 
							if (($this->infoSSSup['name']=="")||($this->infoSSSup['name']==NULL)){
								$namemt	=	$planDate->get("MMM")." ".$planDate->get("d").$planDate->get(Zend_Date::DAY_SUFFIX)." ".$report->translate('minutesMeeting','meeting'); 						
							}else{
								$namemt	=	 $this->infoSSSup['name'];
							}
						}
						?>					
						<input id="renameMeeting" type="hidden" value="<?php echo $namemt; ?>" />
                        
                        <div class="share" style="display:none;">
                            <div class="btndiv">
                                <span><?php echo $report->translate('minutesShare','Share'); ?> :</span>                            
                                <div class="sharediv">
                                    <!--<script src="//platform.twitter.com/widgets.js" type="text/javascript"></script>-->
                                    <a href="https://twitter.com/share?url=http://liveminutes.com/r/<?php echo $scode;?>" class="twitter" title="<?php echo $report->translate('reportShareTwitter','Share on Twitter'); ?>"></a>
                                    <!--<script src="http://static.ak.fbcdn.net/connect.php/js/FB.Share" type="text/javascript"> </script>-->
                                    <a href="http://www.facebook.com/sharer.php?u=http://liveminutes.com/r/<?php echo $scode;?>" class="fb" title="<?php echo $report->translate('reportShareFacebook','Share on Facebook'); ?>"></a>   
                                    <a href="" class="mail"></a>
                                </div>                
                            </div>
                        </div>  
                     </div>              
                </div>
        
        
        <div id="controlBar" class="controlBar" style="width:auto;">
				<?php
					//user connected, host and open session
					if (((int)$this->userconnect['profile']==2)&&((int)$this->userconnect['id']==(int)$this->infoSS['teacherid'])&&((int)$this->infoSSSup['status_session']!=2)){
				?>
				<div class="closeMeeting">
                	<a class="closeMeetingBtn" id="clsMtInline" onClick="closeMtInline()"><span><?php echo $report->translate('reportCloseMeeting','CLOSE THIS MEETING'); ?></span></a>
                    <p id="sttMtc" style="display:none;"><?php echo $report->translate('reportMeetingClosed','Meeting closed!'); ?></p>
                </div>
				<?php
					}
				?>
                
            	<div id="download" class="download">
                	
                	<div id="linkdownload"></div>
                    
                	<a class="shareprivacyBtn" id="shareminutes" onclick="showSharePopup()"><span id="textShareBt"><?php echo $report->translate('reportSharingPrivacy','SHARING &amp; PRIVACY'); ?></span></a>
                    <a class="shareprivacyBtn" id="shareminutesDisable" href="#sharePopup" style="display:none;"><span><?php echo $report->translate('reportSharingPrivacy','SHARING &amp; PRIVACY'); ?></span></a>
                    
                    <div class="nopdf" style="display:none;"><?php echo $report->translate('reportSorryPdfNotCreated',"Sorry, the pdf was not created and we've been warned. Please try again later."); ?></div>
                                       
                    
                    <!-- button when meeting isn't closed -->
                    <a id="recnot" title="<?php echo $report->translate('reportCloseGenerateRecording','missing text'); ?>" href="" class="recordingBtn nogenerate" style="display:none;"><span><?php echo $report->translate('reportDownloadRecording','missing text'); ?></span></a>
                    
                    <!-- button when meeting is closed and recording generated -->
                    <a id="recmp3" href="" class="recordingBtn" style="display:none;"><span><?php echo $report->translate('reportDownloadRecording','missing text'); ?></span></a>
                    
                    <!-- button when there is no recording -->
                    <a id="norec" title="<?php echo $report->translate('reportNoRecordingCloseGenerate','missing text'); ?>" class="recordingBtn norecording" style="display:none;"><span><?php echo $report->translate('reportNoRecording','missing text'); ?></span></a>
                    
                    <!-- button when generate recording -->
                    <a id="rengen" class="recordingBtn generate" style="display:none;"><img src="<?php echo CDNURL; ?>images/loadgenerate.gif"><span><?php echo $report->translate('reportGenerateRecording','missing text'); ?></span></a>
                    
                    <!-- button when report not generated and IE7/IE8 -->
                    <span id="tooltipNoReport" class="tooltip" style="display:none;">
						<p><?php echo $report->translate('reportNoReportIE','missing text'); ?></p>
                        <p><?php echo $report->translate('reportSolution','missing text'); ?></p>
                        <p class="list">- <?php echo $report->translate('reportCloseWaitPDF','missing text'); ?></p>
                        <p class="list">- <a href='http://www.microsoft.com/Internet-Explorer-9' target='_blank'><?php echo $report->translate('reportUpdateIE','missing text'); ?></a> <?php echo $report->translate('reportOr','missing text'); ?> <a href='http://browsehappy.com/?locale=en' target='_blank'><?php echo $report->translate('reportUseModernBrowsers','missing text'); ?></a></p>
                    </span>
                    
                    <a id="nodownloadBtn" style="display:none;" onmouseover="showTtip()" class="nodownloadBtn"><span><?php echo $report->translate('reportDownloadPDF','missing text'); ?></span></a>
                    
                    <a class="generatingBtn" id="generatePdfClose" style="display: none;"><img src="<?php echo CDNURL; ?>images/loadgenerate.gif"><span><?php echo $report->translate('reportGeneratingPDF','missing text'); ?></span></a>
                                        
                    <a class="generatingBtn" id="generatePdfOpen" title="<?php echo $report->translate('reportGeneratePDFAvoidWaiting','missing text'); ?>" style="display: none;"><img src="<?php echo CDNURL; ?>images/loadgenerate.gif"><span><?php echo $report->translate('reportGeneratingPDF','missing text'); ?></span></a>
                    
                </div>
                
                <div id="navigation" class="navigation" style="left:320px;display:none;">
                	<button class="previousBtn"></button>
                	<button class="nextBtn"></button>
                </div>
                
                <div class="gmap" style="display:none;"><a class="gmapBtn" id="gmap" href="#gmapPopup"><span>FULLSCREEN</span></a></div>
                
                <div id="zoom" class="zoom">
                </div>
                
         </div>
    
    </div>    
	<?php include("getsatisfaction.phtml"); ?>
</body>
</html>
