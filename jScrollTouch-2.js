/*
 * jQuery jScrollTouch2 plugin 2.1  
 *
 * Copyright (c) 2010 Damien Rottemberg damien@dealsurf.com
 *
 * Dual licensed under the MIT and GPL licenses:
 *   http://www.opensource.org/licenses/mit-license.php
 *   http://www.gnu.org/licenses/gpl.html
 * 
 * Change: smoother scroll with accesleration and ease
 *
 */


(function($){
  $.fn.jScrollTouch = function (optionSettings) {
	  
	
	  
	  if(!optionSettings) optionSettings = {};
	if((navigator.userAgent.match(/iPhone/i)) || (navigator.userAgent.match(/iPod/i)) || (navigator.userAgent.match(/iPad/i))) {
 		var isTouchScreen = 1;
 	}else{
 		var isTouchScreen = 0;
 	}
 	if(isTouchScreen){
 		
 		optionDefault = {ease:650,displayScrollBar:true,wrapperClass:'',wrapperStyle:{}};
 		
 		var options = $.extend(optionDefault,optionSettings);
	 	
 		$(this).css({'overflow': 'hidden'});
 		if($(this).css('position') != 'relative' && $(this).css('position') != 'absolute'){
 			$(this).css({'position': 'relative'});
 		} 
	 	
		return this.each(function() {
		
			var wrapper = $("<div class='jScrollTouch "+options.wrapperClass+"' style ='-webkit-transition-property: -webkit-transform; -webkit-transition-duration: "+options.ease+"ms; -webkit-transition-timing-function: ease-out; -webkit-transition-delay: initial; -webkit-transform: translate3d(0px, 0px, 0px); '/>");
			wrapper.css(options.wrapperStyle);
			$(this).wrapInner(wrapper);
			var cont = $(this);
			var top=0;
			var stopY=0;
			var minY = 0;
			var maxY =0;
			var realheight = 0;
			var doTranslateY = 0;
			var fullheight = 0;
			var scrollbarV_length = 0;
			
			var left=0;
			var stopX=0;
			var minX = 0;
			var realwidth = 0;
			var maxX = 0;
			var doTranslateX =false;
			var fullwidth = 0;
			var scrollbarH_length = 0;
			
			var scrollbarV = $('<div style="-webkit-transition-property: top; -webkit-transition-duration: '+options.ease+'ms; -webkit-transition-timing-function: ease-out; -webkit-transition-delay: initial;"></div>');
			var scrollbarH = $('<div style="-webkit-transition-property: left; -webkit-transition-duration: '+options.ease+'ms; -webkit-transition-timing-function: ease-out; -webkit-transition-delay: initial"></div>');
			
			cont.append(scrollbarV);
			cont.append(scrollbarH);
			
			function init(){
				realheight = 0;
				$('.jScrollTouch',cont).children().each(function(){
					realheight = realheight+ $(this).outerHeight();
				});
				
				realheight  = Math.max(realheight,$('.jScrollTouch',cont).outerHeight());
				
				doTranslateY = realheight>cont.height();
				
				
				fullheight = realheight;
				scrollbarV_length = cont.innerHeight()*(cont.innerHeight()/fullheight)+2;
				maxY = fullheight-cont.height();
				
				realwidth = (Math.max.apply(Math, $('.jScrollTouch',cont).children().map(function(){ return $(this).width(); }).get()));
				doTranslateX =realwidth >cont.width();
				fullwidth = realwidth ;
				maxX = realwidth-cont.width();
				scrollbarH_length = cont.innerWidth()*(cont.innerWidth()/fullwidth)+2;
				
				scrollbarV.css({'display':'none','position':'absolute','width':'5px','height':scrollbarV_length+'px','background':'black','border':'1px white solid','-webkit-border-radius':'5px','opacity':'0.9'});
				scrollbarH.css({'display':'none','position':'absolute','height':'5px','width':scrollbarH_length+'px','background':'black','border':'1px white solid','-webkit-border-radius':'5px','opacity':'0.9'});
				
				cont.unbind('mousemove touchmove mouseup touchend');
			
			}
			
			
			
			
			
			
			
			cont.bind('mousedown touchstart',function(e){		
				
				if(isTouchScreen && e.originalEvent.touches){
					e = e.originalEvent.touches[0];
				}
				var sY = e.pageY;
				var sX = e.pageX;
				
				init();
				
				if(doTranslateY && options.displayScrollBar) scrollbarV.fadeIn(300);
				if(doTranslateX && options.displayScrollBar) scrollbarH.fadeIn(300);
				
				cont.bind('mousemove touchmove ',function(ev){
					
					if(isTouchScreen && ev.originalEvent.touches){
						ev.preventDefault();
						ev = ev.originalEvent.touches[0];
					}	
					top = (ev.pageY-sY);
					left = (ev.pageX-sX);
					var tX = (doTranslateX)?stopX+left:0;
					var tY = (doTranslateY)?(stopY+top):0;
					$('.jScrollTouch',cont).css({"-webkit-transform": "translate3d("+tX+"px, "+tY+"px, 0px)"});
					if(doTranslateY)  scrollbarV.css({'left':(cont.innerWidth()-7)+'px','top':(-tY*cont.innerHeight()/fullheight)+'px'});
					if(doTranslateX)  scrollbarH.css({'top':(cont.innerHeight()-7)+'px','left':(-tX*cont.innerWidth()/fullwidth)+'px'});
					
				});
				cont.bind('mouseup touchend',function(ev){	
					
					cont.unbind('mousemove touchmove mouseup touchend');
					stopY = stopY + top;
					stopX = stopX + left;
					stopY = (doTranslateY)?Math.max(Math.min(stopY,minY),-maxY):0;
					stopX =(doTranslateX)? Math.max(Math.min(stopX,minX),-maxX):0;
					$('.jScrollTouch',cont).css({"-webkit-transform": "translate3d("+stopX+"px, "+stopY+"px, 0px)"});
					if(doTranslateY)  scrollbarV.css({'left':(cont.innerWidth()-7)+'px','top':(-stopY*cont.innerHeight()/fullheight)+'px'});
					if(doTranslateX)  scrollbarH.css({'top':(cont.innerHeight()-7)+'px','left':(-stopX*cont.innerWidth()/fullwidth)+'px'});
				
					if(doTranslateY) scrollbarV.fadeOut(300, function() { $(this).hide(); });
					if(doTranslateX) scrollbarH.fadeOut(300, function() { $(this).hide(); });
					
				});
			});
		});
	}
};
})(jQuery);   