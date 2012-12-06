function CreateLinkPage(Links,nbTotalResult,nbLignResultByPage,strFctForLink,unArray){var nbLink=Math.ceil(nbTotalResult/nbLignResultByPage);strFctForLink2="javascript:"+strFctForLink+"(";if(unArray.length>0){for(var i=0;i<unArray.length;i++){strFctForLink2+=unArray[i];if(i<unArray.length)strFctForLink2+=","}}strFctForLinkNewer=strFctForLink2+"1)";strFctForLinkOlder=strFctForLink2+nbLink+")";if(nbLink>1){var templateLinkDiv=document.getElementById('templateBlocLink').innerHTML;templateLinkDiv=repS(templateLinkDiv,"Links",Links);if(nbLink>=3){templateLinkDiv=repS(templateLinkDiv,"Newer","<li class='page-number'><a href='"+strFctForLinkNewer+"'>"+MLJS("txtNewer")+"</a></li>");templateLinkDiv=repS(templateLinkDiv,"Older","<li class='page-number'><a href='"+strFctForLinkOlder+"'>"+MLJS("txtOlder")+"</a></li>")}else{templateLinkDiv=repS(templateLinkDiv,"Newer","");templateLinkDiv=repS(templateLinkDiv,"Older","")}}return templateLinkDiv}function checkHourlyRate(divhourlyrate){valuehorlyrate=divhourlyrate.value;valuehorlyrate=treatComma(valuehorlyrate);var checkOK=true;var message="";if(valuehorlyrate.length==0){checkOK=false;divhourlyrate.style.backgroundColor="yellow"}else{if(Num(valuehorlyrate)==false){divhourlyrate.style.backgroundColor="red";valuehorlyrate='';checkOK=false}}if(checkOK==false){showalertpanel(MLJS("txtAttention"),message,'',3,1,'')}divhourlyrate.value=valuehorlyrate;return checkOK}function Num(strString){var strValidChars="0123456789.";var strChar;var nombredepoint=0;var blnResult=true;for(i=0;i<strString.length&&blnResult==true;i++){strChar=strString.charAt(i);if(strChar=='.')nombredepoint+=1;if((strValidChars.indexOf(strChar)==-1)||(nombredepoint>1))blnResult=false}return blnResult}function treatComma(strString){var s2="";var strChar="";for(i=0;i<strString.length;i++){strChar=strString.charAt(i);if(strChar==','){s2+='.'}else s2+=strChar}return s2}function onKeyBoardActivity(){lastActivityTime=new Date();isRequestOn=false}function onKeyBoardActivity2(){lastActivityTime2=new Date();isRequestOn2=false}function replaceCodeByString(strIn,code,str){var s="xxx"+code;return strIn.replace(new RegExp(s,"g"),str)}function repS(strIn,code,str){return replaceCodeByString(strIn,code,str)}function replaceCodeTemp(strIn,code,str){var s="TEMP"+code;return strIn.replace(new RegExp(s,"g"),str)}function repTemp(strIn,code,str){return replaceCodeTemp(strIn,code,str)}function replaceCodeByString2(strIn,code,str){var s=code;return strIn.replace(new RegExp(s,"g"),str)}function repS2(strIn,code,str){return replaceCodeByString2(strIn,code,str)}function isTheSame(string1,string2){return new RegExp(string1).test(string2)&&new RegExp(string2).test(string1)}function MLJS(){if(document.getElementById("MLJS_"+arguments[0])){var txt=document.getElementById("MLJS_"+arguments[0]).innerHTML}else{}if(txt!=""){for(var i=1;i<arguments.length;i++){var reg=new RegExp("[[](arg"+i+"])","gi");txt=txt.replace(reg,arguments[i])}}return txt}function isValidEmail(str){var maReg=new RegExp("^([a-zA-Z0-9]+(([\.\\-\+]?[a-zA-Z0-9\_]+)+)?)\@(([a-zA-Z0-9]+[\.\\-\_])+[a-zA-Z]{2,4})$");if((str).search(maReg)==-1)return false;else return true}function new_setHearBeatFicheUser(){ElementCommun();new_setheaderMenu()}function notifVisitorQuit(){try{if($("#isVisitor").length>0){var isVisitor=$("#isVisitor")[0].value;if(isVisitor==2){$().onUserExit({execute:function(){},internalURLs:"www.blueteach.com|blueteach.com|www.glueteach.com|glueteach.com"})}}}catch(err){}}function ElementCommun(){$('.lessonNow').cycle({fx:'fade',speed:800,timeout:800});clickBtnSettingManager();updateTimeZone4UserTmp('')}function checkIsHidden(id){for(var i=0;i<_hideMeArray.length;i++){if(_hideMeArray[i].id==id){return true}}return false}function hideMe(divid,id){_hideMeArray.push({id:id});document.getElementById(divid).style.display='none'}function show(id){var sessionSettings=document.getElementById(id);if(sessionSettings.style.display=="block"){sessionSettings.style.display="none"}else{closeElsOpen("ul","settingsList");sessionSettings.style.display="block"}}function closeElsOpen(tagname,classname){var tag=document.getElementsByTagName(tagname);for(var i=0;i<tag.length;i++){var el=tag[i];if(el.className==classname)el.style.display="none"}}function div4HoverEventGenerate(bool,txtDivId,animeDivId){if(bool){if($(txtDivId).hide()&&$(animeDivId).hide())$(txtDivId).show();else if($(txtDivId).hide())$(animeDivId).show();else $(animeDivId).hide()}else{$(txtDivId).hide();$(animeDivId).hide()}}function fadeInManager(div){$(div).fadeIn(180,function(){try{this.style.removeAttribute('filter')}catch(err){}})}function addTempleteMenuDeroulant(idname,data){if(data!=null){var res="<select id='"+idname+"' name='"+idname+"' class='selectInputPopupEclass'>";for(var i=0;i<data.length;i++){var tpl="<option value='"+data[i].id+"'>"+data[i].name+"</option>";res+=tpl}res+="</select>";return res}}function closePopupStartSession(){if(typeof(_popupStartSession)!="undefined"&&_popupStartSession!=null){_popupStartSession.destroy();_popupStartSession=null}}function windowOpenEclass(url){window.open(url,'','left=0,top=0,resizable=yes')}function ajaxJqueryPost(url,data,fct){$.post(url,data,function(res){fct(res)},"json")}function ajaxJqueryPost2(url,data,fct,pa1,pa2,pa3,pa4){$.post(url,data,function(res,pa1,pa2,pa3,pa4){fct(res,pa1,pa2,pa3,pa4)},"json")}function createPopupAjaxJquery(url,data,onCompleteFct,onCloseFct){$.fancybox({ajax:{type:"POST",data:data},type:'ajax',href:url,onComplete:onCompleteFct,onClosed:onCloseFct,scrolling:'no',padding:0,autoScale:false})}function showPopupSignup(mode,action){try{closePopupStartSession()}catch(err){}if(mode=="choice"){createPopupAjaxJquery(site+"home/popup-signup",{'popup':'signup','actionload':action},onloadPopupSignupComplete,null)}else if(mode=="forbidden"){createPopupAjaxJquery(site+"home/popup-signup",{'popup':'signup','actionload':action},onloadPopupSignupComplete,null)}}function closePopupForbidden(){window.history.back()}function closePopupSignup(){$.fancybox.close()}function imageCheckFormManager(bool,input,idok,idnok){if(bool){$(input).removeClass("checkNotOk");$(input).addClass("checkOk");$(idok).show();$(idnok).hide()}else{$(input).removeClass("checkOk");$(input).addClass("checkNotOk");$(idok).hide();$(idnok).show()}}function checkMailSignupAlreadyUsed(email){var email_old=$("#email_signup_old")[0].value;if(email!=email_old){var data={actionCheckmail:'checkemail',email:email};ajaxJqueryPost(site+"home/check-email",data,checkEmailAreadyUsedComplete)}}function checkEmailAreadyUsedComplete(repJson){try{var result=repJson;if(result.result==0){$("#email_signupCheck")[0].value=1;imageCheckFormManager(true,"#email_signup","#email_signupOK","#email_signupNOK");$("#email_signup_old")[0].value=result.email;doCreateUser()}else{$("#email_signupCheck")[0].value=0;$("#email_signup_old")[0].value=result.email;imageCheckFormManager(false,"#email_signup","#email_signupOK","#email_signupNOK")}}catch(err){}}function onloadPopupSignupComplete(){return;$("#popupSignup input").each(function(i,evt){if(evt!=null&&(evt.type=="text"||evt.type=="password")){if(evt.id!=null&&evt.id!="email_signup"){$("#"+evt.id).blur(function(){var id=evt.id;var val=$("#"+id)[0].value;var idOK=id+"OK";var idNOK=id+"NOK";var idCheck=id+"Check";var imageCheck=false;if(((id!="password_signup"&&val.length>=3)||(id=="password_signup"&&val.length>=4))&&val!=""&&val!=null){imageCheck=true;$("#"+idCheck)[0].value=1}else{imageCheck=false;$("#"+idCheck)[0].value=0}imageCheckFormManager(imageCheck,"#"+id,"#"+idOK,"#"+idNOK)})}else if(evt.id!=null&&evt.id=="email_signup"){$("#"+evt.id).blur(function(){var id=evt.id;var val=$("#"+id)[0].value;var idOK=id+"OK";var idNOK=id+"NOK";var imageCheck=false;if(isValidEmail(val)){checkMailSignupAlreadyUsed(val)}else{imageCheckFormManager(false,"#"+id,"#"+idOK,"#"+idNOK);("#email_signupCheck")[0].value=0}})}}})}function preCheckFormSignup(){$("#signup input").each(function(i,evt){if(evt!=null&&(evt.type=="text"||evt.type=="password")&&evt.id!=null){var id=evt.id;var val=$("#"+id)[0].value;var idOK=id+"OK";var idNOK=id+"NOK";var idCheck=id+"Check";var imageCheck=null;if(id!=null&&id!="email_signup"&&id!="password_signup"&&val!=null&&val!=""){if(val.length>=3){imageCheck=true;$("#"+idCheck)[0].value=1}else{imageCheck=false;$("#"+idCheck)[0].value=0}if(imageCheck!=null)imageCheckFormManager(imageCheck,"#"+id,"#"+idOK,"#"+idNOK)}else if(id!=null&&id=="password_signup"&&val!=null&&val!=""){if(val.length>=4){imageCheck=true;$("#"+idCheck)[0].value=1}else{imageCheck=false;$("#"+idCheck)[0].value=0}if(imageCheck!=null)imageCheckFormManager(imageCheck,"#"+id,"#"+idOK,"#"+idNOK)}else if(id!=null&&id=="email_signup"&&val!=""){var idOK=id+"OK";var idNOK=id+"NOK";imageCheck=false;if(isValidEmail(val)){checkMailSignupAlreadyUsed(val)}else{imageCheckFormManager(false,"#"+id,"#"+idOK,"#"+idNOK);("#email_signupCheck")[0].value=0}}}})}function checkFormSignIn(){var emailSI=$("#mailSignin").val();var passwordSI=$("#passwordSignin").val();var checkform=true;if((emailSI.length==0)||(passwordSI.length==0)||(!isValidEmail(emailSI))){document.getElementById("oksignin").style.display="none";document.getElementById("notoksignin").style.display="block";document.getElementById("mailSignin").className="inputSignin notoksignin emailInput";document.getElementById("notoksigninPassword").style.display="block";document.getElementById("password-clear-signin").className="inputSignin notoksignin passwordInput";checkform=false;try{tyga(catGG,"login fail client","user failed to login");var lgs={email:emailSI,password:passwordSI,mdich:'signin_fail_client_'+catGG};ajaxJqueryPost(site+"tools/alog",lgs,fnlog)}catch(err){}}return checkform}function signinUser(){var emailSI=$("#mailSignin").val();var passwordSI=$("#passwordSignin").val();var nextpage=$("#nextpage").val();var viewmn=$("#viewmn").val();var actionCall="signin";try{var catga=catGG}catch(err){var catga="Homepage"}try{tyga(catGG,'login sent','user clicked on login');var lgs={email:emailSI,password:passwordSI,mdich:'signin_sent_'+catga};ajaxJqueryPost(site+"tools/alog",lgs,fnlog)}catch(err){}if(checkFormSignIn()==true){var data={actionCall:actionCall,mail:emailSI,pass:MD5(passwordSI),nextpage:nextpage,catGG:catga,viewmn:viewmn};ajaxJqueryPost(site+"home/lgaj",data,signinComplet)}}function signinComplet(repJson){try{var result=repJson;if(result!=null){if(result.result=="ok"){var nextPage=$("#nextpagelogin").val();if(nextPage==""){window.open(site,'','')}else{document.location.href=nextPage}$("#signin").hide();$("#signup").hide();$("#showsignin").hide();$("#showsignup").hide();$("#logoutid").show();$("#menuLogged").show();$("#introLive").hide()}else{try{tyga(catGG,"login fail server","user failed to login")}catch(err){}document.getElementById("oksignin").style.display="none";document.getElementById("notoksignin").style.display="block";document.getElementById("mailSignin").className="inputSignin notoksignin emailInput";document.getElementById("notoksigninPassword").style.display="block";document.getElementById("password-clear-signin").className="inputSignin notoksignin passwordInput"}}}catch(err){}}function signinUserRP(){if(checkFormSignIn()==true){var emailSI=$("#mailSignin").val();var passwordSI=$("#passwordSignin").val();var nextpage=$("#nextpage").val();var viewmn=$("#viewmn").val();var actionCall="signin";var data={actionCall:actionCall,mail:emailSI,pass:MD5(passwordSI),nextpage:nextpage,viewmn:viewmn};ajaxJqueryPost(site+"home/lgaj",data,signinCompletRP)}}function signinCompletRP(repJson){try{var result=repJson;if(result!=null){if(result.result=="ok"){var nextPage=$("#nextpagelogin").val();if(nextPage==""){window.open(site,'','')}else{document.location.href=nextPage}$("#signup").hide();$("#showsignup").hide();$("#logoutid").show();$("#menuLogged").show();$("#introLive").hide()}else{document.getElementById("oksignin").style.display="none";document.getElementById("notoksignin").style.display="block";document.getElementById("mailSignin").className="inputSignin notoksignin emailInput";document.getElementById("notoksigninPassword").style.display="block";document.getElementById("password-clear-signin").className="inputSignin notoksignin passwordInput";document.getElementById("password-clear-signinP").className="inputSignin notoksignin passwordInput"}}}catch(err){}}function checkFormSignup(){var email=$("#email_signup")[0].value;var password=$("#password_signup")[0].value;var username=$("#username_signup")[0].value;var checkEmail=true;var checkUname=true;var checkPass=true;if((email.length==0)){document.getElementById("okemail").style.display="none";document.getElementById("notokemail").style.display="block";$("#errorEmail").text($("#msgerrorEmail1").text());document.getElementById("email_signup").className="inputSignup inputnotok emailInput";checkEmail=false}else if(!isValidEmail(email)){document.getElementById("okemail").style.display="none";document.getElementById("notokemail").style.display="block";$("#errorEmail").text($("#msgerrorEmail2").text());document.getElementById("email_signup").className="inputSignup inputnotok emailInput";checkEmail=false}else{$("#errorEmail").hide();document.getElementById("notokemail").style.display="none";document.getElementById("okemail").style.display="block";document.getElementById("email_signup").className="inputSignup inputok emailInput"}var regex=/^[0-9A-Za-z_-]+$/;var nnes= username.replace(/^\s+|\s+$/g,"");if((username.length==0)){document.getElementById("okname").style.display="none";document.getElementById("notokname").style.display="block";$("#errorUsername").text($("#msgerrorUsername1").text());document.getElementById("username_signup").className="inputSignup inputnotok nameInput";checkUname=false}else if((username.length<4)){document.getElementById("okname").style.display="none";document.getElementById("notokname").style.display="block";$("#errorUsername").text($("#msgerrorUsername2").text());document.getElementById("username_signup").className="inputSignup inputnotok nameInput";checkUname=false;}else if (nnes.length==0){document.getElementById("okname").style.display = "none";document.getElementById("notokname").style.display = "block";$("#errorUsername").text($("#msgerrorUsername1").text());document.getElementById("username_signup").className = "inputSignup inputnotok nameInput";checkUname=false;}else{$("#errorUsername").hide();document.getElementById("notokname").style.display="none";document.getElementById("okname").style.display="block";document.getElementById("username_signup").className="inputSignup inputok nameInput"}if(password.length==0){document.getElementById("okpass").style.display="none";document.getElementById("notokpass").style.display="block";$("#errorPassword").text($("#msgerrorPassword1").text());document.getElementById("password-clear").className="inputSignup inputnotok passwordInput";document.getElementById("password_signup").className="inputSignup inputnotok passwordInput";checkPass=false}else if(password.length<4){document.getElementById("okpass").style.display="none";document.getElementById("notokpass").style.display="block";$("#errorPassword").text($("#msgerrorPassword2").text());document.getElementById("password-clear").className="inputSignup inputnotok passwordInput";document.getElementById("password_signup").className="inputSignup inputnotok passwordInput";checkPass=false}else if(password.indexOf(" ")!=-1){document.getElementById("okpass").style.display="none";document.getElementById("notokpass").style.display="block";$("#errorPassword").text($("#msgerrorPassword3").text());document.getElementById("password-clear").className="inputSignup inputnotok passwordInput";document.getElementById("password_signup").className="inputSignup inputnotok passwordInput";checkPass=false}else{$("#errorPassword").hide();document.getElementById("notokpass").style.display="none";document.getElementById("okpass").style.display="block";document.getElementById("password_signup").className="inputSignup inputok passwordInput"}return checkEmail&&checkUname&&checkPass}var oksig=true;function createUser4Visitor(){if(oksig){oksig=false;doCreateUser()}else{try{tyga(catGG,"signup fail client double click","user filled form and signup failed")}catch(err){}}}function doCreateUser(){try{var pgon=catGG}catch(err){var pgon="Homepage"}var action="";var isok4newsletter=0;var firstname="Firstname";var lastname="Lastname";var email=$("#email_signup").val();var chid=$("#chid").val();var password=$("#password_signup")[0].value;var username=$("#username_signup")[0].value;var nextpage=$("#nextpage").val();var val=calculate_time_zone();val=val.split(',');var decalage=val[0];var dst=val[1];try{tyga(catGG,'signup sent','user click on signup nw');var lgs={mdich:'signup_sent_'+catGG,username:username,email:email,password:password,decalage:decalage,dst:dst};ajaxJqueryPost(site+"tools/alog",lgs,fnlog)}catch(err){}if(checkFormSignup()){if(firstname==""||lastname==""||email==""||password=="")return;if(!isValidEmail(email))return;action="signup";var userid=0;var ismineur=0;if($("#newsletter").length>0&&document.getElementById('newsletter').checked){isok4newsletter=1}var topics=new Array();var levels=new Array();if(action!="")var data={action:action,firstname:firstname,lastname:lastname,username:username,email:email,password:MD5(password),userid:userid,decalage:decalage,dst:dst,chid:chid,isok4newsletter:isok4newsletter,nextpage:nextpage,ismineur:ismineur,pageon:pgon};if(action!=""){$(".loadingcreateaccount").show();ajaxJqueryPost(site+"home/ana",data,createUserFromPopupComplete)}}else{oksig=true;try{tyga(catGG,"signup fail client","user filled form and signup failed")}catch(err){}var email=$("#email_signup")[0].value;var password=$("#password_signup")[0].value;var username=$("#username_signup")[0].value;var val=calculate_time_zone();val=val.split(',');var decalage=val[0];var dst=val[1];var lgs={username:username,email:email,password:password,userid:userid,decalage:decalage,dst:dst,mdich:pgon};ajaxJqueryPost(site+"tools/alog",lgs,fnlog)}}function fnlog(rep){}function signupUser4Visitor(){doActionCreateUser()}function doActionCreateUser(){try{var pgon=catGG}catch(err){var pgon="Homepage"}var action="";var isok4newsletter=0;var firstname="Firstname";var lastname="Lastname";var email=$("#email_signup").val();var password=$("#password_signup")[0].value;var username=$("#username_signup")[0].value;var userid=0;var val=calculate_time_zone();val=val.split(',');var decalage=val[0];var dst=val[1];var ismineur=2;if(checkFormSignup()){try{tyga(catGG,'signup sent','user click on signup nw');var lgs={mdich:'signup_sent_'+catGG,username:username,email:email,password:password,decalage:decalage,dst:dst};ajaxJqueryPost(site+"tools/alog",lgs,fnlog)}catch(err){}if(firstname==""||lastname==""||email==""||password=="")return;if(!isValidEmail(email))return;action="signup";if($("#newsletter").length>0&&document.getElementById('newsletter').checked){isok4newsletter=1}var topics=new Array();var levels=new Array();if(action!="")var data={action:action,firstname:firstname,lastname:lastname,username:username,email:email,password:MD5(password),userid:userid,decalage:decalage,dst:dst,chid:chid,isok4newsletter:isok4newsletter,pageon:pgon};if(action!=""){ajaxJqueryPost(site+"home/ana",data,createActionUserComplete)}}else{try{tyga(catGG,"signup fail client","user filled form and signup failed")}catch(err){}var email=$("#email_signup").val();var password=$("#password_signup")[0].value;var username=$("#username_signup")[0].value;var val=calculate_time_zone();val=val.split(',');var decalage=val[0];var dst=val[1];var lgs={username:username,email:email,password:password,userid:userid,decalage:decalage,dst:dst,mdich:pgon};ajaxJqueryPost(site+"tools/alog",lgs,fnlog)}}function createActionUserComplete(repJson){try{var result=repJson;if(result!=null){if(result.result=="ok"){window.open(site,'','');$("#signin").hide();$("#signup").hide();$("#showsignin").hide();$("#showsignup").hide();$("#logoutid").show();$("#menuLogged").show();try{$("#myconversion").attr("src",google_conversion_link);}catch(err){};tyga("onSite","SignedUpAndLogged","user successfully signup");$("#introLive").hide()}else{if(result.params=="email"){document.getElementById("okemail").style.display="none";document.getElementById("notokemail").style.display="block";$("#errorEmail").text("This email is already in use");document.getElementById("email_signup").className="inputSignup inputnotok emailInput";checkEmail=false}if(result.params=="username"){document.getElementById("okname").style.display="none";document.getElementById("notokname").style.display="block";$("#errorUsername").text("This username is already in use");document.getElementById("username_signup").className="inputSignup inputnotok nameInput";checkUname=false}}}}catch(err){}}function putJqueryObjectIntoArray(obj){var res=new Array();for(var i=0;i<obj.length;i++){res.push(obj[i].value)}return res}function createUserFromPopupComplete(repJson){try{var result=repJson;if(result!=null){if(result.result=="ok"){callback=result.callback;oksig=true;if(callback==""){document.location.href=site+"meetings"}else{document.location.href=callback}}else{oksig=true;try{tyga("Homepage","signup fail server","user filled form and signup failed")}catch(err){}$(".loadingcreateaccount").hide();if(result.params=="email"){document.getElementById("okemail").style.display="none";document.getElementById("notokemail").style.display="block";$("#errorEmail").text("This email is already in use");document.getElementById("email_signup").className="inputSignup inputnotok emailInput";checkEmail=false}if(result.params=="username"){document.getElementById("okname").style.display="none";document.getElementById("notokname").style.display="block";$("#errorUsername").text("This username is already in use");document.getElementById("username_signup").className="inputSignup inputnotok nameInput";checkUname=false}}}else{oksig=true}}catch(err){}}function googleTracker(mode){var googlecode=document.getElementById('googleAnalyticCode').value;var page="";if(mode=="tmp")page="/action/usagetemp";else if(mode=="signup")page="/action/signup";else if(mode=="home")page="/action/home";else if(mode=="try")page="action/try";else if(mode=="startbuycredit")page="action/startbuycredit";else if(mode=="buycreditok")page="action/buycreditok";else if(mode=="buycreditnok")page="action/buycreditnok";try{var pageTrackerInternal=_gat._getTracker(googlecode);pageTrackerInternal._trackPageview(page)}catch(err){}}function initUser4VisitorComplete(repJson){try{var result=repJson;if(result.result=="ok"){var callback=result.callback;googleTracker("tmp");if(callback=="startsessionleft"){$("#isVisitor")[0].value=2;updateTimeZone4UserTmp('startsessionleft')}else if(callback=="createsession")new_createSession();else if(callback=="submitform")return true}}catch(err){}}function updateTimeZone4UserTmp(callback){if(("#updateUserFuseau").length>0){var updateUserFuseau=$("#updateUserFuseau")[0].value;if(updateUserFuseau==1){var val=calculate_time_zone();val=val.split(',');var data={action:'updatetimezone',decalage:codeUrl(val[0]),dst:val[1],callback:callback};ajaxJqueryPost(site+"session/updatetimezone",data,updateTimeZone4UserTmpComplete)}}}function updateTimeZone4UserTmpComplete(repJson){try{var result=repJson;if(result!=null&&result.result=="ok"){if(result.callback=="startsessionleft")startSessionLeft();location.reload()}}catch(err){}}function checkCreatedTmp(isUserTmpCreated){var isVisitor=$("#isVisitor")[0].value;if(isVisitor==2&&isUserTmpCreated==1)googleTracker("tmp")}function setSelectionRange(input,selectionStart,selectionEnd){if(input.setSelectionRange){input.focus();input.setSelectionRange(selectionStart,selectionEnd)}else if(input.createTextRange){var range=input.createTextRange();range.collapse(true);range.moveEnd('character',selectionEnd);range.moveStart('character',selectionStart);range.select()}}function setCaretToPos(input,pos){setSelectionRange(input,pos,pos)}function loginManager(form){if(form=="open"){$("div#panel").slideDown("slow")}else if(form=="close"){$("div#panel").slideUp("slow")}$("#toggle a").toggle()}function calculate_time_zone(){var dateuser=new Date();var jan1=new Date(dateuser.getFullYear(),0,1,0,0,0,0);var june1=new Date(dateuser.getFullYear(),6,1,0,0,0,0);var temp=jan1.toGMTString();var jan2=new Date(temp.substring(0,temp.lastIndexOf(" ")-1));temp=june1.toGMTString();var june2=new Date(temp.substring(0,temp.lastIndexOf(" ")-1));var std_time_offset=(jan1-jan2)/(1000*60*60);var daylight_time_offset=(june1-june2)/(1000*60*60);var dst="0";if(std_time_offset==daylight_time_offset){dst="0"}else{var hemisphere=std_time_offset-daylight_time_offset;if(hemisphere>=0)std_time_offset=daylight_time_offset;dst="1"}var hour=parseInt(std_time_offset);var mins=parseInt((std_time_offset-hour)*60);if(hour==0)hour="00";else if(hour>9)hour="+"+hour;else if(hour>0&&hour<10)hour="+0"+hour;else if(std_time_offset<-9)hour="-"+Math.abs(hour);else hour="-0"+Math.abs(hour);if(mins==0)mins="00";var decalage=hour+":"+mins;var data=decalage+","+dst;return data}function calculate_time_zone2(){var rightNow=new Date();var jan1=new Date(rightNow.getFullYear(),0,1,0,0,0,0);var june1=new Date(rightNow.getFullYear(),6,1,0,0,0,0);var temp=jan1.toGMTString();var jan2=new Date(temp.substring(0,temp.lastIndexOf(" ")-1));temp=june1.toGMTString();var june2=new Date(temp.substring(0,temp.lastIndexOf(" ")-1));var std_time_offset=(jan1-jan2)/(1000*60*60);var daylight_time_offset=(june1-june2)/(1000*60*60);var dst;if(std_time_offset==daylight_time_offset){dst="0"}else{var hemisphere=std_time_offset-daylight_time_offset;if(hemisphere>=0)std_time_offset=daylight_time_offset;dst="1"}var i;if(document.getElementById('timezone')){for(i=0;i<document.getElementById('timezone').options.length;i++){if(document.getElementById('timezone').options[i].value==convert(std_time_offset)+","+dst){document.getElementById('timezone').selectedIndex=i;break}}}}function Trim(str){var str=str.replace(/^\s\s*/,''),ws=/\s/,i=str.length;while(ws.test(str.charAt(--i)));return str.slice(0,i+1)}function repcreateWall(jsonRep){var infowallarray=jsonRep;var res=infowallarray.res;if(res=='ok'){var parentid=infowallarray.parentid;var type=infowallarray.type;loadWall(parentid,type)}}function removeElement(num){for(var i=0;i<numArray.length;i++){if(numArray[i].id==num)numArray.splice(i,1)}var divIdName='my'+num+'Div';var d=document.getElementById('myDiv');var olddiv=document.getElementById(divIdName);d.removeChild(olddiv)}function indexMoisDate(shortmois){var shortMonths=new Array();var shortMonths=['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec'];for(var j=0;j<shortMonths.length;j++){if(shortMonths[j]==shortmois)return j}return 0}function addSubtopics(value){var res=checkItemInArrayByValue(oldSubtopics,value.name);var nb=1;var index=0;if(res.index!==null){nb=(parseInt(res.nb)+1);index=res.index}if(nb!=1)oldSubtopics.splice(index,1);oldSubtopics.push({'id':value.id,'name':$.trim(value.name),'nb':nb})}function removeSubtopics(id){var res=checkItemInArrayById(oldSubtopics,id);var nb=0;var index=0;if(res.index!==null){index=res.index;nb=(parseInt(res.nb)-1);var id=oldSubtopics[index].id;var value=oldSubtopics[index].name;oldSubtopics.splice(res.index,1);if(nb!=0)oldSubtopics.push({'id':id,'name':$.trim(value),'nb':nb})}}function addNewSubtopics(value){var res=checkItemInArrayByValue(newSubtopics,value);var nb=1;var index=0;if(res.index!==null){nb=(parseInt(res.nb)+1);index=res.index}if(nb!=1)newSubtopics.splice(res.index,1);newSubtopics.push({'name':$.trim(value),'nb':nb})}function removeNewSubtopics(value){var res=checkItemInArrayByValue(newSubtopics,value);var nb=0;var index=0;if(res.index!==null){index=res.index;nb=(parseInt(res.nb)-1);newSubtopics.splice(index,1);if(nb!=0)newSubtopics.push({'name':$.trim(value),'nb':nb})}}function checkItemInArrayByValue(array,val){for(var i=0;i<array.length;i++){if($.trim(array[i].name)===$.trim(val)){return{'index':i,'nb':array[i].nb}}}return{'index':null,'nb':0}}function checkItemInArrayById(array,val){for(var i=0;i<array.length;i++){if($.trim(array[i].id)===$.trim(val)){return{'index':i,'nb':array[i].nb}}}return{'index':null,'nb':0}}function checkItemInArrayByValue(array,val){for(var i=0;i<array.length;i++){if($.trim(array[i].name)===$.trim(val)){return{'index':i,'nb':array[i].nb}}}return{'index':null,'nb':0}}function checkItemInArrayById(array,val){for(var i=0;i<array.length;i++){if($.trim(array[i].id)===$.trim(val)){return{'index':i,'nb':array[i].nb}}}return{'index':null,'nb':0}}function new_checkinfoDate(data){var res=true;var currentTime=new Date();var curDate=currentTime.getDate();var curMonth=currentTime.getMonth();var curYear=currentTime.getFullYear();var curHours=currentTime.getHours();var curMins=currentTime.getMinutes();var arraydate=data[0].datesArray;var arrayhour=data[0].hoursArray;var arraymin=data[0].minsArray;for(var j=0;j<numArray.length;j++){var date=arraydate[j].replace(/-/g,",");var dateObj=new Date(date);var month=(dateObj.getMonth());var date=dateObj.getDate();var year=dateObj.getFullYear();if(isNaN(date)||isNaN(year)||isNaN(month)){document.getElementById('date'+numArray[j].id).className='planInputErrorStyle Date';$("#ErrorDate"+numArray[j].id).show();return false}else{if((year<curYear)||(year==curYear&&month<curMonth)||(year==curYear&&month==curMonth&&date<curDate)){$("#ErrorDate"+numArray[j].id).show();res=false}else if(year==curYear&&month==curMonth&&date==curDate){if((curHours>arrayhour[j])){$("#ErrorDate"+numArray[j].id).show();return false}else if(curHours==arrayhour[j]&&curMins>arraymin[j]){$("#ErrorDate"+numArray[j].id).show();return false}}$("#ErrorDate"+numArray[j].id).hide()}}return true}function showPopupVideoDemo(action){createPopupAjaxJquery(site+"user/popup-commun",{'popup':'videodemo','actionload':action},null,null)}function supprimerDoublonTableau(TabInit){var NvTab=new Array();var q=0;var LnChaine=TabInit.length;for(var j=0;j<LnChaine;j++){for(i=0;i<LnChaine;i++){if(TabInit[j]==TabInit[i]&&j!=i)TabInit[i]='faux'}if(TabInit[j]!='faux'){NvTab[q]=TabInit[j];q++}}return NvTab}function CloseFancyBox(){$.fancybox.close()}
var MD5 = function (string) {
 
	function RotateLeft(lValue, iShiftBits) {
		return (lValue<<iShiftBits) | (lValue>>>(32-iShiftBits));
	}
 
	function AddUnsigned(lX,lY) {
		var lX4,lY4,lX8,lY8,lResult;
		lX8 = (lX & 0x80000000);
		lY8 = (lY & 0x80000000);
		lX4 = (lX & 0x40000000);
		lY4 = (lY & 0x40000000);
		lResult = (lX & 0x3FFFFFFF)+(lY & 0x3FFFFFFF);
		if (lX4 & lY4) {
			return (lResult ^ 0x80000000 ^ lX8 ^ lY8);
		}
		if (lX4 | lY4) {
			if (lResult & 0x40000000) {
				return (lResult ^ 0xC0000000 ^ lX8 ^ lY8);
			} else {
				return (lResult ^ 0x40000000 ^ lX8 ^ lY8);
			}
		} else {
			return (lResult ^ lX8 ^ lY8);
		}
 	}
 
 	function F(x,y,z) { return (x & y) | ((~x) & z); }
 	function G(x,y,z) { return (x & z) | (y & (~z)); }
 	function H(x,y,z) { return (x ^ y ^ z); }
	function I(x,y,z) { return (y ^ (x | (~z))); }
 
	function FF(a,b,c,d,x,s,ac) {
		a = AddUnsigned(a, AddUnsigned(AddUnsigned(F(b, c, d), x), ac));
		return AddUnsigned(RotateLeft(a, s), b);
	};
 
	function GG(a,b,c,d,x,s,ac) {
		a = AddUnsigned(a, AddUnsigned(AddUnsigned(G(b, c, d), x), ac));
		return AddUnsigned(RotateLeft(a, s), b);
	};
 
	function HH(a,b,c,d,x,s,ac) {
		a = AddUnsigned(a, AddUnsigned(AddUnsigned(H(b, c, d), x), ac));
		return AddUnsigned(RotateLeft(a, s), b);
	};
 
	function II(a,b,c,d,x,s,ac) {
		a = AddUnsigned(a, AddUnsigned(AddUnsigned(I(b, c, d), x), ac));
		return AddUnsigned(RotateLeft(a, s), b);
	};
 
	function ConvertToWordArray(string) {
		var lWordCount;
		var lMessageLength = string.length;
		var lNumberOfWords_temp1=lMessageLength + 8;
		var lNumberOfWords_temp2=(lNumberOfWords_temp1-(lNumberOfWords_temp1 % 64))/64;
		var lNumberOfWords = (lNumberOfWords_temp2+1)*16;
		var lWordArray=Array(lNumberOfWords-1);
		var lBytePosition = 0;
		var lByteCount = 0;
		while ( lByteCount < lMessageLength ) {
			lWordCount = (lByteCount-(lByteCount % 4))/4;
			lBytePosition = (lByteCount % 4)*8;
			lWordArray[lWordCount] = (lWordArray[lWordCount] | (string.charCodeAt(lByteCount)<<lBytePosition));
			lByteCount++;
		}
		lWordCount = (lByteCount-(lByteCount % 4))/4;
		lBytePosition = (lByteCount % 4)*8;
		lWordArray[lWordCount] = lWordArray[lWordCount] | (0x80<<lBytePosition);
		lWordArray[lNumberOfWords-2] = lMessageLength<<3;
		lWordArray[lNumberOfWords-1] = lMessageLength>>>29;
		return lWordArray;
	};
 
	function WordToHex(lValue) {
		var WordToHexValue="",WordToHexValue_temp="",lByte,lCount;
		for (lCount = 0;lCount<=3;lCount++) {
			lByte = (lValue>>>(lCount*8)) & 255;
			WordToHexValue_temp = "0" + lByte.toString(16);
			WordToHexValue = WordToHexValue + WordToHexValue_temp.substr(WordToHexValue_temp.length-2,2);
		}
		return WordToHexValue;
	};
 
	function Utf8Encode(string) {
		string = string.replace(/\r\n/g,"\n");
		var utftext = "";
 
		for (var n = 0; n < string.length; n++) {
 
			var c = string.charCodeAt(n);
 
			if (c < 128) {
				utftext += String.fromCharCode(c);
			}
			else if((c > 127) && (c < 2048)) {
				utftext += String.fromCharCode((c >> 6) | 192);
				utftext += String.fromCharCode((c & 63) | 128);
			}
			else {
				utftext += String.fromCharCode((c >> 12) | 224);
				utftext += String.fromCharCode(((c >> 6) & 63) | 128);
				utftext += String.fromCharCode((c & 63) | 128);
			}
 
		}
 
		return utftext;
	};
 
	var x=Array();
	var k,AA,BB,CC,DD,a,b,c,d;
	var S11=7, S12=12, S13=17, S14=22;
	var S21=5, S22=9 , S23=14, S24=20;
	var S31=4, S32=11, S33=16, S34=23;
	var S41=6, S42=10, S43=15, S44=21;
 
	string = Utf8Encode(string);
 
	x = ConvertToWordArray(string);
 
	a = 0x67452301; b = 0xEFCDAB89; c = 0x98BADCFE; d = 0x10325476;
 
	for (k=0;k<x.length;k+=16) {
		AA=a; BB=b; CC=c; DD=d;
		a=FF(a,b,c,d,x[k+0], S11,0xD76AA478);
		d=FF(d,a,b,c,x[k+1], S12,0xE8C7B756);
		c=FF(c,d,a,b,x[k+2], S13,0x242070DB);
		b=FF(b,c,d,a,x[k+3], S14,0xC1BDCEEE);
		a=FF(a,b,c,d,x[k+4], S11,0xF57C0FAF);
		d=FF(d,a,b,c,x[k+5], S12,0x4787C62A);
		c=FF(c,d,a,b,x[k+6], S13,0xA8304613);
		b=FF(b,c,d,a,x[k+7], S14,0xFD469501);
		a=FF(a,b,c,d,x[k+8], S11,0x698098D8);
		d=FF(d,a,b,c,x[k+9], S12,0x8B44F7AF);
		c=FF(c,d,a,b,x[k+10],S13,0xFFFF5BB1);
		b=FF(b,c,d,a,x[k+11],S14,0x895CD7BE);
		a=FF(a,b,c,d,x[k+12],S11,0x6B901122);
		d=FF(d,a,b,c,x[k+13],S12,0xFD987193);
		c=FF(c,d,a,b,x[k+14],S13,0xA679438E);
		b=FF(b,c,d,a,x[k+15],S14,0x49B40821);
		a=GG(a,b,c,d,x[k+1], S21,0xF61E2562);
		d=GG(d,a,b,c,x[k+6], S22,0xC040B340);
		c=GG(c,d,a,b,x[k+11],S23,0x265E5A51);
		b=GG(b,c,d,a,x[k+0], S24,0xE9B6C7AA);
		a=GG(a,b,c,d,x[k+5], S21,0xD62F105D);
		d=GG(d,a,b,c,x[k+10],S22,0x2441453);
		c=GG(c,d,a,b,x[k+15],S23,0xD8A1E681);
		b=GG(b,c,d,a,x[k+4], S24,0xE7D3FBC8);
		a=GG(a,b,c,d,x[k+9], S21,0x21E1CDE6);
		d=GG(d,a,b,c,x[k+14],S22,0xC33707D6);
		c=GG(c,d,a,b,x[k+3], S23,0xF4D50D87);
		b=GG(b,c,d,a,x[k+8], S24,0x455A14ED);
		a=GG(a,b,c,d,x[k+13],S21,0xA9E3E905);
		d=GG(d,a,b,c,x[k+2], S22,0xFCEFA3F8);
		c=GG(c,d,a,b,x[k+7], S23,0x676F02D9);
		b=GG(b,c,d,a,x[k+12],S24,0x8D2A4C8A);
		a=HH(a,b,c,d,x[k+5], S31,0xFFFA3942);
		d=HH(d,a,b,c,x[k+8], S32,0x8771F681);
		c=HH(c,d,a,b,x[k+11],S33,0x6D9D6122);
		b=HH(b,c,d,a,x[k+14],S34,0xFDE5380C);
		a=HH(a,b,c,d,x[k+1], S31,0xA4BEEA44);
		d=HH(d,a,b,c,x[k+4], S32,0x4BDECFA9);
		c=HH(c,d,a,b,x[k+7], S33,0xF6BB4B60);
		b=HH(b,c,d,a,x[k+10],S34,0xBEBFBC70);
		a=HH(a,b,c,d,x[k+13],S31,0x289B7EC6);
		d=HH(d,a,b,c,x[k+0], S32,0xEAA127FA);
		c=HH(c,d,a,b,x[k+3], S33,0xD4EF3085);
		b=HH(b,c,d,a,x[k+6], S34,0x4881D05);
		a=HH(a,b,c,d,x[k+9], S31,0xD9D4D039);
		d=HH(d,a,b,c,x[k+12],S32,0xE6DB99E5);
		c=HH(c,d,a,b,x[k+15],S33,0x1FA27CF8);
		b=HH(b,c,d,a,x[k+2], S34,0xC4AC5665);
		a=II(a,b,c,d,x[k+0], S41,0xF4292244);
		d=II(d,a,b,c,x[k+7], S42,0x432AFF97);
		c=II(c,d,a,b,x[k+14],S43,0xAB9423A7);
		b=II(b,c,d,a,x[k+5], S44,0xFC93A039);
		a=II(a,b,c,d,x[k+12],S41,0x655B59C3);
		d=II(d,a,b,c,x[k+3], S42,0x8F0CCC92);
		c=II(c,d,a,b,x[k+10],S43,0xFFEFF47D);
		b=II(b,c,d,a,x[k+1], S44,0x85845DD1);
		a=II(a,b,c,d,x[k+8], S41,0x6FA87E4F);
		d=II(d,a,b,c,x[k+15],S42,0xFE2CE6E0);
		c=II(c,d,a,b,x[k+6], S43,0xA3014314);
		b=II(b,c,d,a,x[k+13],S44,0x4E0811A1);
		a=II(a,b,c,d,x[k+4], S41,0xF7537E82);
		d=II(d,a,b,c,x[k+11],S42,0xBD3AF235);
		c=II(c,d,a,b,x[k+2], S43,0x2AD7D2BB);
		b=II(b,c,d,a,x[k+9], S44,0xEB86D391);
		a=AddUnsigned(a,AA);
		b=AddUnsigned(b,BB);
		c=AddUnsigned(c,CC);
		d=AddUnsigned(d,DD);
	}
 
	var temp = WordToHex(a)+WordToHex(b)+WordToHex(c)+WordToHex(d);
 
	return temp.toLowerCase();
}

var BrowserDetect = {
	init: function () {
		this.browser = this.searchString(this.dataBrowser) || "An unknown browser";
		this.version = this.searchVersion(navigator.userAgent)
			|| this.searchVersion(navigator.appVersion)
			|| "an unknown version";
		this.OS = this.searchString(this.dataOS) || "an unknown OS";
	},
	searchString: function (data) {
		for (var i=0;i<data.length;i++)	{
			var dataString = data[i].string;
			var dataProp = data[i].prop;
			this.versionSearchString = data[i].versionSearch || data[i].identity;
			if (dataString) {
				if (dataString.indexOf(data[i].subString) != -1)
					return data[i].identity;
			}
			else if (dataProp)
				return data[i].identity;
		}
	},
	searchVersion: function (dataString) {
		var index = dataString.indexOf(this.versionSearchString);
		if (index == -1) return;
		return parseFloat(dataString.substring(index+this.versionSearchString.length+1));
	},
	dataBrowser: [
		{
			string: navigator.userAgent,
			subString: "Chrome",
			identity: "Chrome"
		},
		{ 	string: navigator.userAgent,
			subString: "OmniWeb",
			versionSearch: "OmniWeb/",
			identity: "OmniWeb"
		},
		{
			string: navigator.vendor,
			subString: "Apple",
			identity: "Safari",
			versionSearch: "Version"
		},
		{
			prop: window.opera,
			identity: "Opera",
			versionSearch: "Version"
		},
		{
			string: navigator.vendor,
			subString: "iCab",
			identity: "iCab"
		},
		{
			string: navigator.vendor,
			subString: "KDE",
			identity: "Konqueror"
		},
		{
			string: navigator.userAgent,
			subString: "Firefox",
			identity: "Firefox"
		},
		{
			string: navigator.vendor,
			subString: "Camino",
			identity: "Camino"
		},
		{		// for newer Netscapes (6+)
			string: navigator.userAgent,
			subString: "Netscape",
			identity: "Netscape"
		},
		{
			string: navigator.userAgent,
			subString: "MSIE",
			identity: "Explorer",
			versionSearch: "MSIE"
		},
		{
			string: navigator.userAgent,
			subString: "Gecko",
			identity: "Mozilla",
			versionSearch: "rv"
		},
		{ 		// for older Netscapes (4-)
			string: navigator.userAgent,
			subString: "Mozilla",
			identity: "Netscape",
			versionSearch: "Mozilla"
		}
	],
	dataOS : [
		{
			string: navigator.platform,
			subString: "Win",
			identity: "Windows"
		},
		{
			string: navigator.platform,
			subString: "Mac",
			identity: "Mac"
		},
		{
			   string: navigator.userAgent,
			   subString: "iPhone",
			   identity: "iPhone/iPod"
	    },
		{
			string: navigator.platform,
			subString: "Linux",
			identity: "Linux"
		}
	]

};


