/**
 * User: arlekino
 * Date: 9/15/12
 * Time: 7:55 PM
 */
function Slat(xpos, ypos) {
    this.height = 10;
    this.xpos = xpos;
    this.ypos = ypos;
    this.width = 93;
    this.image  = new Image();
    this.image.src = "images/slat.png";
    this.id;

	this.draw = function(x, y){

	};
    this.addToDom = function(id, left, top) {
        var newdiv = document.createElement('div');
        var divIdName = 'slat'+id;
        newdiv.setAttribute('id',divIdName);
        var img = document.createElement("img");
        img.src = this.image.src;
        newdiv.appendChild(img);

        document.body.appendChild(newdiv);
        newdiv.setAttribute('style','position: absolute; left: '+ left + 'px; top: ' + top + 'px;');
    };
    /*
	this.update = function(){
		//update function of this object
	};
	*/
}
