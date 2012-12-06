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

//get bound of paper
Raphael.fn.getBound = function() {
	var elements = this.elements();
	var minX	=	0;
	var minY	=	0;
	var maxX	=	0;
	var maxY	=	0;
	var temp;
	for (var i = 0; i < elements.length; i++) {
		temp	=	elements[i].getBound();
		if (i==0){
			minX	=	temp.x;
			minY	=	temp.y;
			maxX	=	temp.x+temp.width;
			maxY	=	temp.y+temp.height;
		}else{
			if (temp.x<minX){
				minX	=	temp.x;
			}
			if (temp.y<minY){
				minY	=	temp.y;
			}
			if ((temp.x+temp.width)>maxX){
				maxX	=	temp.x+temp.width;
			}
			if ((temp.y+temp.height)>maxY){
				maxY	=	temp.y+temp.height;
			}
		}
	}
	var rt		=	new Array();
	rt['minX']	=	minX;
	rt['minY']	=	minY;
	rt['maxX']	=	maxX;
	rt['maxY']	=	maxY;
	return rt;
}

//get bound of element
Raphael.el.getBound = function() {	
	var bb	=	this.getBBox();
	return bb;
}
