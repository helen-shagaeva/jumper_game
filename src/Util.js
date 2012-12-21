/*function getElementComputedStyle(elem, prop) {
  if (typeof elem!="object") {
	elem = document.getElementById(elem);
  }
  
  // external stylesheet for Mozilla, Opera 7+ and Safari 1.3+
  if (document.defaultView && document.defaultView.getComputedStyle) {
    if (prop.match(/[A-Z]/)) prop = prop.replace(/([A-Z])/g, "-$1").toLowerCase();
    return document.defaultView.getComputedStyle(elem, "").getPropertyValue(prop);
  }
  
  // external stylesheet for Explorer and Opera 9
  if (elem.currentStyle) {
    var i;
    while ((i=prop.indexOf("-"))!=-1) prop = prop.substr(0, i) + prop.substr(i+1,1).toUpperCase() + prop.substr(i+2);
    return elem.currentStyle[prop];
  }
  return "";
}*/
function gameStart() {
    document.getElementById("player").play();
    setTimeout(function(){
        document.location.href = "game.html";    
    },2500);
}
function gameRecord() {
    document.getElementById("player").play();
    setTimeout(function(){
        document.location.href = "record.html";    
    },2500);
}

function gameMsg() {
    document.getElementById("player").play();
    setTimeout(function(){
        alert("Some Button!");    
    },2500);
}

function playJumpAudio(){
//    document.getElementById("player").pause();
//    document.getElementById("player").currentTime=0;
//    document.getElementById("player").play();
}

function getKeyCode(event) {
	var e = event || window.event;
    return keyCode = e.which || e.KeyCode;
}
/*--------------*/
function mouseShowHandler(event) {
    var e = event || window.event;
    var mouseXY = {
        'x':'0',
        'y':'0'
    };

    if (e.pageX == null && e.clientX != null) {
        var html = document.documentElement
        var body = document.body

        e.pageX = e.clientX + (html && html.scrollLeft || body && body.scrollLeft || 0) - (html.clientLeft || 0)
        e.pageY = e.clientY + (html && html.scrollTop || body && body.scrollTop || 0) - (html.clientTop || 0)
    }

    mouseXY.x = e.pageX
    mouseXY.y = e.pageY
    return mouseXY;
}
/*--------------*/

function getWinSize() {
    var sizes = {
        'myWidth':'0',
        'myHeight':'0'
    };
    if (typeof( window.innerWidth ) == 'number') {

        // not IE
        sizes.myWidth = window.innerWidth;
        sizes.myHeight = window.innerHeight;
    } else if (document.documentElement && ( document.documentElement.clientWidth || document.documentElement.clientHeight )) {

        // IE 6+
        sizes.myWidth = document.documentElement.clientWidth;
        sizes.myHeight = document.documentElement.clientHeight;
    } else if (document.body && ( document.body.clientWidth || document.body.clientHeight )) {

        // IE 4
        sizes.myWidth = document.body.clientWidth;
        sizes.myHeight = document.body.clientHeight;
    } else if (0 != arguments.length) {
		var o_canvasID = arguments[0];
		var o_canvas = document.getElementById(o_canvasID);
		window.console.log(o_canvas);
		sizes.myWidth = o_canvas.getAttribute('width');
        sizes.myHeight = o_canvas.getAttribute('height');
	}
    return sizes;
}

function getCanvasSize(o_canvasID) {
    var sizes = {
        'myWidth':'0',
        'myHeight':'0'
    };
    
    if (typeof(o_canvasID) != "undefined") {
		var o_canvas = document.getElementById(o_canvasID);
		sizes.myWidth = o_canvas.getAttribute('width') || o_canvas.style.width || o_canvas.currentStyle[width] || document.defaultView.getComputedStyle(o_canvas, "").getPropertyValue(width);
        sizes.myHeight = o_canvas.getAttribute('height') || o_canvas.style.height || o_canvas.currentStyle[height] || document.defaultView.getComputedStyle(o_canvas, "").getPropertyValue(height);
	}
    return sizes;
}

// Todo utill must choose from different resources
function Util() {
    this.i_typesOfImages = 7;
    this.images = new Array();
    this.jumperImage = null;

    this.loadImage = function(funcAfterLoad, jumper, util) {
        this.loadSlats(funcAfterLoad, util);
        this.loadJumper(jumper, util);
    };

    this.loadSlats = function(funcAfterLoad, util) {
        var loadedImages = 0;
        for (var i=0; i<util.i_typesOfImages; i++) {
            util.images[i] = new Image();
            util.images[i].onload = function() {
                if(++loadedImages >= util.i_typesOfImages) {
                    funcAfterLoad();
                }
            };
            util.images[i].src = "../img/slat_type_" + i + ".png";
        }


    };

    this.loadJumper = function(jumper, util) {
        var img = new Image();
        img.onload = function() {
            jumper.i_jumperWidth = img.width;
            jumper.i_jumperHeight = img.height;
            util.jumperImage = img;

        };
        img.src = "../img/human.png";
    };


    //This method can change
    this.getSlatWidth = function(canvas) {
        return canvas.width * 0.2;
    };

    this.getSlatHeight = function(canvas) {
        return canvas.height * 0.02;
    };

    this.getJumperWidth = function(canvas) {
        return canvas.width * 0.15;
    };

    this.getJumperHeight = function(canvas) {
        return canvas.width * 0.15;
    };
    
    var b_keyPressed = false;
    var someInterval = '';
    var someTouchInterval = '';
    this.movingControll = function(jumperObj) {
       

        document.onmousedown = function (event) {
            b_keyPressed = true;			
			var winSizes = getWinSize();

               someInterval = setInterval(function(){
                //console.log(event);
                if (mouseShowHandler(event).x < winSizes.myWidth / 2 && b_keyPressed) {

                    // Проверяем не превысил ли обект скорость по ОХ
                    if (jumperObj.i_xAcc - jumperObj.i_yShift < -jumperObj.i_yMaxacceleration) {
                        jumperObj.i_xAcc = -jumperObj.i_yMaxacceleration;
                    } else {
                        jumperObj.i_xAcc -= jumperObj.i_yShift;
                    }
                    if (jumperObj.i_xPos <= -20) {
                        jumperObj.i_xPos = i_canvasWidth - 40;
                    }

                }
                else if (mouseShowHandler(event).x > winSizes.myWidth / 2 && b_keyPressed) {

                    // Проверяем не превысил ли обект скорость по ОХ
                    if (jumperObj.i_xAcc + jumperObj.i_yShift > jumperObj.i_yMaxacceleration) {
                        jumperObj.i_xAcc = jumperObj.i_yMaxacceleration;
                    } else {
                        jumperObj.i_xAcc += jumperObj.i_yShift;
                    }

                    if (jumperObj.i_xPos >= i_canvasWidth - 60) {
                        jumperObj.i_xPos = -40;
                    }
                }

               },100);
                
                if (mouseShowHandler(event).x < winSizes.myWidth / 2 && b_keyPressed) {

                    // Проверяем не превысил ли обект скорость по ОХ
                    if (jumperObj.i_xAcc - jumperObj.i_yShift < -jumperObj.i_yMaxacceleration) {
                        jumperObj.i_xAcc = -jumperObj.i_yMaxacceleration;
                    } else {
                        jumperObj.i_xAcc -= jumperObj.i_yShift;
                    }
                    if (jumperObj.i_xPos <= -20) {
                        jumperObj.i_xPos = i_canvasWidth - 40;
                    }

                }
                else if (mouseShowHandler(event).x > winSizes.myWidth / 2 && b_keyPressed) {

                    // Проверяем не превысил ли обект скорость по ОХ
                    if (jumperObj.i_xAcc + jumperObj.i_yShift > jumperObj.i_yMaxacceleration) {
                        jumperObj.i_xAcc = jumperObj.i_yMaxacceleration;
                    } else {
                        jumperObj.i_xAcc += jumperObj.i_yShift;
                    }

                    if (jumperObj.i_xPos >= i_canvasWidth - 60) {
                        jumperObj.i_xPos = -40;
                    }
                }
        }


        document.onmouseup = function (event) {
            b_keyPressed = false;
            clearInterval(someInterval);
        }
        
        //console.log(b_keyPressed);

        document.onkeypress = function (event) {
            if (b_keyPressed) {

                switch (parseInt(getKeyCode(event))) {
                    case 37:    // left

                        // Проверяем не превысил ли обект скорость по ОХ
                        if (jumperObj.i_xAcc - jumperObj.i_yShift < -jumperObj.i_yMaxacceleration) {
                            jumperObj.i_xAcc = -jumperObj.i_yMaxacceleration;
                        } else {
                            jumperObj.i_xAcc -= jumperObj.i_yShift;
                        }
                        if (jumperObj.i_xPos <= -20) {
                            jumperObj.i_xPos = i_canvasWidth - 40;
                        }
                        break;
                    case 39:    // right

                        // Проверяем не превысил ли обект скорость по ОХ
                        if (jumperObj.i_xAcc + jumperObj.i_yShift > jumperObj.i_yMaxacceleration) {
                            jumperObj.i_xAcc = jumperObj.i_yMaxacceleration;
                        } else {
                            jumperObj.i_xAcc += jumperObj.i_yShift;
                        }
                        if (jumperObj.i_xPos >= i_canvasWidth - 60) {
                            jumperObj.i_xPos = -40;
                        }
                        break;
                }

            }
        }

        document.onkeydown = function (event) {
            var winSizes = getWinSize();
            switch (parseInt(getKeyCode(event))) {
                case 37:    // left
                    b_keyPressed = true;

                    // Проверяем не превысил ли обект скорость по ОХ
                    if (jumperObj.i_xAcc - jumperObj.i_yShift < -jumperObj.i_yMaxacceleration) {
                        jumperObj.i_xAcc = -jumperObj.i_yMaxacceleration;
                    } else {
                        jumperObj.i_xAcc -= jumperObj.i_yShift;
                    }
                    if (jumperObj.i_xPos <= -20) {
                        jumperObj.i_xPos = i_canvasWidth - 40;
                    }
                    break;
                case 39:    // right
                    b_keyPressed = true;

                    // Проверяем не превысил ли обект скорость по ОХ
                    if (jumperObj.i_xAcc + jumperObj.i_yShift > jumperObj.i_yMaxacceleration) {
                        jumperObj.i_xAcc = jumperObj.i_yMaxacceleration;
                    } else {
                        jumperObj.i_xAcc += jumperObj.i_yShift;
                    }
                    if (jumperObj.i_xPos >= i_canvasWidth - 60) {
                        jumperObj.i_xPos = -40;
                    }
                    break;
            }
        }

        document.onkeyup = function (event) {
            switch (parseInt(getKeyCode(event))) {
                case 37:    // left
                    b_keyPressed = false;
                    break;
                case 39:    // right
                    b_keyPressed = false;
                    break;
            }
        }
		/*--------------*/
		$("document").bind('touchstart touchmove',function(event){
			if (event.targetTouches.length == 1) {
				var touch = event.targetTouches[0];
				var winSizes = getWinSize();
				b_keyPressed = true;
				// Place element where the finger is
				//console.log(touch.pageX);
                someTouchInterval = setInterval(function(){
    				if (touch.pageX < winSizes.myWidth / 2 && b_keyPressed) {

    					// Проверяем не превысил ли обект скорость по ОХ
    					if (jumperObj.i_xAcc - jumperObj.i_yShift < -jumperObj.i_yMaxacceleration) {
    						jumperObj.i_xAcc = -jumperObj.i_yMaxacceleration;
    					} else {
    						jumperObj.i_xAcc -= jumperObj.i_yShift;
    					}
    					if (jumperObj.i_xPos <= -20) {
    						jumperObj.i_xPos = i_canvasWidth - 40;
    					}

    				}
    				else if (touch.pageX > winSizes.myWidth / 2 && b_keyPressed) {

    					// Проверяем не превысил ли обект скорость по ОХ
    					if (jumperObj.i_xAcc + jumperObj.i_yShift > jumperObj.i_yMaxacceleration) {
    						jumperObj.i_xAcc = jumperObj.i_yMaxacceleration;
    					} else {
    						jumperObj.i_xAcc += jumperObj.i_yShift;
    					}

    					if (jumperObj.i_xPos >= i_canvasWidth - 60) {
    						jumperObj.i_xPos = -40;
    					}
    				}
                },100);
			}
		});
		
		$("document").bind('touchend',function(event){
			b_keyPressed = false;
            clearInterval(someTouchInterval);
		});
		/*--------------*/
    };
    this.gameOver = function() {
        document.location.href = "menu.html";
    }
}