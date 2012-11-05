/**
 * User: arlekino
 * Date: 9/15/12
 * Time: 7:55 PM
 */
function Slat(xpos, ypos) {
    this.height = 35;
    this.xpos = xpos;
    this.ypos = ypos;
    this.width = 93;
    this.image  = new Image();
    this.image.src = "images/slat.png";
    this.id;
    this.div = null;

	this.draw = function(x, y){

	};
    this.addToDom = function(id, left, top) {
        div = document.createElement('div');
        var divIdName = 'slat'+id;
        div.setAttribute('id',divIdName);
        var img = document.createElement("img");
        img.src = this.image.src;
        div.appendChild(img);

        document.body.appendChild(div);
        div.setAttribute('style','position: absolute; left: '+ left + 'px; top: ' + top + 'px;');
        this.div = div;
    };

	this.update = function(height){
        this.ypos -= height;
        this.div.style.top = this.ypos;
	};

}
