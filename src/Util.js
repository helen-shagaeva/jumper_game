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
    }
    return sizes;
}

// Todo utill must choose from different resources
function Util() {
    this.i_typesOfImages = 1;
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
    this.getSlatWidth = function(slat) {
       alert(this.images[slat.slatType].width);
        return this.images[slat.slatType].width; //93

    };

    this.getSlatHeight = function(slat) {
       return this.images[slat.slatType].height; //40
    };

    var b_keyPressed = false;

    this.movingControll = function(jumperObj) {
        document.onmousedown = function (event) {
            b_keyPressed = true;
			
			var winSizes = getWinSize();
			
            if (mouseShowHandler(event).x < winSizes.myWidth / 2 && b_keyPressed) {

                // Проверяем не превысил ли обект скорость по ОХ
                if (jumperObj.i_xAcc - jumperObj.i_yShift < -jumperObj.i_yMaxacceleration) {
                    jumperObj.i_xAcc = -jumperObj.i_yMaxacceleration;
                } else {
                    jumperObj.i_xAcc -= jumperObj.i_yShift;
                }
                if (jumperObj.i_xPos <= -20) {
                    jumperObj.i_xPos = winSizes.myWidth - 40;
                }

            }
            else if (mouseShowHandler(event).x > winSizes.myWidth / 2 && b_keyPressed) {

                // Проверяем не превысил ли обект скорость по ОХ
                if (jumperObj.i_xAcc + jumperObj.i_yShift > jumperObj.i_yMaxacceleration) {
                    jumperObj.i_xAcc = jumperObj.i_yMaxacceleration;
                } else {
                    jumperObj.i_xAcc += jumperObj.i_yShift;
                }

                if (jumperObj.i_xPos >= winSizes.myWidth - 60) {
                    jumperObj.i_xPos = -40;
                }
            }
        }


        document.onmouseup = function (event) {
            b_keyPressed = false;
        }

        document.onkeypress = function (event) {
            var winSizes = getWinSize();
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
                            jumperObj.i_xPos = winSizes.myWidth - 40;
                        }
                        break;
                    case 39:    // right

                        // Проверяем не превысил ли обект скорость по ОХ
                        if (jumperObj.i_xAcc + jumperObj.i_yShift > jumperObj.i_yMaxacceleration) {
                            jumperObj.i_xAcc = jumperObj.i_yMaxacceleration;
                        } else {
                            jumperObj.i_xAcc += jumperObj.i_yShift;
                        }
                        if (jumperObj.i_xPos >= winSizes.myWidth - 60) {
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
                        jumperObj.i_xPos = winSizes.myWidth - 40;
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
                    if (jumperObj.i_xPos >= winSizes.myWidth - 60) {
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
		$("document").bind('touchstart',function(event){
			if (event.targetTouches.length == 1) {
				var touch = event.targetTouches[0];
				var winSizes = getWinSize();
				b_keyPressed = true;
				// Place element where the finger is
				//console.log(touch.pageX);
				if (touch.pageX < winSizes.myWidth / 2 && b_keyPressed) {

					// Проверяем не превысил ли обект скорость по ОХ
					if (jumperObj.i_xAcc - jumperObj.i_yShift < -jumperObj.i_yMaxacceleration) {
						jumperObj.i_xAcc = -jumperObj.i_yMaxacceleration;
					} else {
						jumperObj.i_xAcc -= jumperObj.i_yShift;
					}
					if (jumperObj.i_xPos <= -20) {
						jumperObj.i_xPos = winSizes.myWidth - 40;
					}

				}
				else if (touch.pageX > winSizes.myWidth / 2 && b_keyPressed) {

					// Проверяем не превысил ли обект скорость по ОХ
					if (jumperObj.i_xAcc + jumperObj.i_yShift > jumperObj.i_yMaxacceleration) {
						jumperObj.i_xAcc = jumperObj.i_yMaxacceleration;
					} else {
						jumperObj.i_xAcc += jumperObj.i_yShift;
					}

					if (jumperObj.i_xPos >= winSizes.myWidth - 60) {
						jumperObj.i_xPos = -40;
					}
				}
			}
		});
		
		$("document").bind('touchend',function(event){
			b_keyPressed = false;
		});
		/*--------------*/
    };

    function getKeyCode(event) {
        var e = event || window.event;
        return keyCode = e.which || e.KeyCode;
    }
}