<?php 
	$scodeUserGuide	=	"155D1R";
	$limitSession		=	29504888;
	$marknewEclass		=	29504888;
	
	function isExistCookieMinutes($chid){
		
		if (isset($_COOKIE["mn".$chid])){
			$valueCk	=	(int)$_COOKIE["mn".$chid];
			if ($valueCk==2){
				return 2;
			}else{
				$expire	=	time()+60*60*24*7;    			
				setcookie("mn".$chid, 2, $expire,'/');
				return 3;
			}  
		}else{
			$expire	=	time()+60*60*24*7;    			
			setcookie("mn".$chid, 2, $expire,'/');
			return 3;
		}
		
	}
?>