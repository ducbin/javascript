/*
 * Liveminutes.com
 */

// get all elements in the paper
Raphael.fn.elements = function() {
  var b = this.bottom,
      r = []; 
  while (b) { 
    r.push(b); 
    b = b.next; 
  }
  return r;
}

//translate paper
Raphael.fn.translatepp = function(dx,dy) {
	var elements = this.elements();
	var temp;
	for (var i = 0; i < elements.length; i++) {
		elements[i].setTranslate(dx,dy);		
		/*		
		if (elements[i].type == "text"){
			var xtext	=	elements[i].attrs["x"];
			var ytext	=	elements[i].attrs["y"];
			elements[i].attr({x:xtext+dx,y:ytext+dy});
			//elements[i].animate({translation:dx,dy});
			elements[i].translate(dx,dy);
		}else{
			elements[i].translate(dx,dy);
		}
		*/
	}
}

//set element translation
Raphael.el.setTranslate = function(x, y) {
  if (this.type == "text")
    this.setAttr({
      x: this.attrs["x"] + x,
      y: this.attrs["y"] + y
    });
  else
    this.translate(x,y);
  
  return this;
}
