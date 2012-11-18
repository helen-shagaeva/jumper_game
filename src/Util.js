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

    this.loadImage = function(funcAfterLoad) {

        var loadedImages = 0;
        for (var i=0; i<util.i_typesOfImages; i++) {
            this.images[i] = new Image();
            this.images[i].onload = function() {
                if(++loadedImages >= this.i_typesOfImages) {
                    funcAfterLoad();
                }
            };
            this.images[i].src = "../img/slat_type_" + i + ".png";
        }
    };


    //This method can change
    this.getSlatWidth = function(slat) {
        return this.images[slat.slatType].width;
    };

    this.getSlatHeight = function(slat) {
        return this.images[slat.slatType].height;
    };

    this.movingControll = function(jumperObj) {
        document.onmousedown = function (event) {
            b_keyPressed = true;

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
    };

    function getKeyCode(event) {
        var e = event || window.event;
        return keyCode = e.which || e.KeyCode;
    }
}