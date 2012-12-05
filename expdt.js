// JavaScript Document

/**
 * Save SVGs
 */
function save2svgByDiv(){

	var widthpn	=	new Array();
	var heightpn=	new Array();
	var typepnarr=	new Array();
	var strallsvg	=	"";
	var sttpn		=	new Array();
	var firstpage	=	"";
	var s			=	-1;
	var titleofmt	=	$("#ttt").text();
	
	//allppdiv	-	all div include content
	for (s=0;s<alldivpp.length;s++){				
		widthpn.push($("#"+alldivpp[s]['idpn']).width());
		heightpn.push($("#"+alldivpp[s]['idpn']).height());
				
		if (s==0){
			firstpage	=	$("#"+alldivpp[s]['idpn']).html();
		}		
		
		if (alldivpp[s]['type']=="gmap"){
			if (s==1){
				strallsvg	+=	"bgmappppp"+scode;
			}else if (s>1){
				strallsvg	=	strallsvg+"Welcomtolm"+"bgmappppp"+scode;
			}	
		}else if (alldivpp[s]['type']=="chat"){
			//need to check the height of chat page
			if (s==1){
				strallsvg	+=	"tttchatttt"+$("#"+alldivpp[s]['idpn']).html();
			}else if (s>1){
				strallsvg	=	strallsvg+"Welcomtolm"+"tttchatttt"+$("#"+alldivpp[s]['idpn']).html();
			}		
		}else if (alldivpp[s]['type']=="textEditor"){
			if (s==1){
				strallsvg	+=	"ttttexteditorttt"+$("#"+alldivpp[s]['idpn']).html();
			}else if (s>1){
				strallsvg	=	strallsvg+"Welcomtolm"+"ttttexteditorttt"+$("#"+alldivpp[s]['idpn']).html();
			}		
		}else{
			if (s==1){
				strallsvg	+=	$("#"+alldivpp[s]['idpn']).html();
			}else if (s>1){
				strallsvg	=	strallsvg+"Welcomtolm"+$("#"+alldivpp[s]['idpn']).html();
			}
		} 
		
		/*
		if (alldivpp[s]['type']!="gmap"){		
			if (s==1){
				strallsvg	+=	$("#"+alldivpp[s]['idpn']).html();
			}else if (s>1){
				strallsvg	=	strallsvg+"Welcomtolm"+$("#"+alldivpp[s]['idpn']).html();
			}		
		}else if (alldivpp[s]['type']!="chat"){		
			if (s==1){
				strallsvg	+=	$("#"+alldivpp[s]['idpn']).html();
			}else if (s>1){
				strallsvg	=	strallsvg+"Welcomtolm"+$("#"+alldivpp[s]['idpn']).html();
			}		
		}else {				//gmap
			if (s==1){
				strallsvg	+=	"bgmappppp"+scode;
			}else if (s>1){
				strallsvg	=	strallsvg+"Welcomtolm"+"bgmappppp"+scode;
			}	
		}
		*/
		
		sttpn.push(s);
	}
	
	if (s>0){
		strallsvg	=	firstpage+"Welcomtolm"+strallsvg;
	}else if (s==0){
		strallsvg	=	firstpage;
	}	
	//alert(widthpn.toString()+" "+heightpn.toString());
	var data = {
			'sid':sid,
			'scode':scode,
			'titleofmt':titleofmt,
			'dt':strallsvg,
			'widths':widthpn.toString(),
			'heights':heightpn.toString(),
			'sttpn':sttpn.toString()
	};
	ajaxJqueryPost('/recette/reportEclass/svdtsg.php',data,finishSdtsvg);
}

function finishSdtsvg(repJson){
	if(repJson.result== "ok"){
		$("#generatePdf").hide();
		$("#generatePdfClose").hide();
		$("#generatePdfOpen").hide();
		$("#download").append("<a class='downloadBtn' href='"+repJson.pdf+"'><span>DOWNLOAD PDF</span></a>");
	}else{
		$("#generatePdf").hide();
		$("#generatePdfClose").hide();
		$("#generatePdfOpen").hide();		
		$("#nodownloadBtn").show();
		var dts = {
			'chid':sid,
			'o':uscnt
		};
		ajaxJqueryPost('tools/signe',dts,fnsm);
		
	}
}

function fnsm(rep){}