<?php 
<<<<<<< HEAD
	//define('WORKLYURL','http://so.workly.net:3001/');
	define('WORKLYURL','http://log.liveminutes.com:8125/');
	
	$scodeUserGuide	=	"155D1R";
	
=======
	$scodeUserGuide	=	"155D1R";
>>>>>>> 2cf8d2a53821e59434137a05c3a9b768dcce045b
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