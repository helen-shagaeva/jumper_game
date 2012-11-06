/**
 * User: arlekino
 * Date: 9/16/12
 * Time: 5:44 PM
 */
function Jumper() {
//Очки за прыжки
    this.point = 0;

    this.width = 40;
    this.height = 70;

    this.image = new Image();
    this.image.src = 'images/human.png';

    this.i_max_jumper_ypos = 300;

    // Значение гравитации, влияющей на ускорение по ОУ
    this.i_gravity = 2;

    // Трение объекта с воздухом,
    // Сила, противоположная движению по ОХ
    this.i_friction = 1;

    // Максимальная скорость движения объекта по ОХ
    this.i_yMaxacceleration = 10;

    // Значение изменения скорости по ОХ
    this.i_yShift = 6;

    // Координаты объекта (х, у)
    this.i_xpos = 320;
    this.i_ypos = 300;

    // Ускорение по ОХ (изначально 0 - объект не движется по горизонтали)
    this.i_xacc = 0;

    // Ускорение по ОУ (изначально 3 - объект падает)
    this.i_yacc = 3;

    // Вспомогательная переменная хранящая последнюю пересеченную ступень
    this.o_last_slat = null;

    // Переменная, определяющая взлет и падение объекта
    this.b_boosting = false;

    this.i_score = 0;
    this.i_redraw_height = 0;

    /*
     this.drawJumper = function (canvas, i_xpos = this.i_xpos, i_ypos = this.i_ypos) {
     var o_ctx = canvas.getContext('2d');
     o_ctx.clearRect(0, 0, winSizes.myWidth, winSizes.myHeight);
     o_ctx.drawImage(this.image, i_xpos, i_ypos);
     };
     */
    this.moveScene = function (i_heightToMove, a_slats) {
        if (i_heightToMove != 0) {

            this.i_score -= i_heightToMove;
            sPoint(jumperObj.i_score);
            this.i_redraw_height -= i_heightToMove;
            if (typeof winSizes !== "undefined" && this.i_redraw_height > winSizes.myHeight) {
                //alert("Go away " + a_slats.length);
                generator.slatsGenerate(a_slats, winSizes.myHeight, false);
                this.i_redraw_height = 0;
                //alert("after " + a_slats.length);
            }

            for (var i = 0; i < a_slats.length; i++) {
                a_slats[i].update(i_heightToMove);
                if (typeof winSizes !== "undefined" && a_slats[i].ypos > winSizes.myHeight) {
                    a_slats.splice(i, 1);
                }
                //    a_slats[i].ypos -= i_heightToMove;
                //    var cur_div = document.getElementById("slat" + a_slats[i].id);
                //    cur_div.style.top = a_slats[i].ypos;
            }


        }
    }

    this.updateJumper = function (jumperObj, a_slats) {

        // Трение - уменьшает ускорение объекта до 0.
        if (this.i_xacc > this.i_friction) {
            this.i_xacc -= this.i_friction;
        } else if (this.i_xacc < -this.i_friction) {
            this.i_xacc += this.i_friction;
        } else {
            this.i_xacc = 0;
        }
        jumperObj.i_xpos += jumperObj.i_xacc;

        // Объект падает при положительном ускорении
        if (jumperObj.i_yacc >= 0) {
            jumperObj.b_boosting = false;
        }

        // Если объект пересекает ступень - задаем начальное положение, и ускорение объекту,
        // Иначе наращиваем ускорени объекту
        if (this.falling(a_slats)) {
            jumperObj.i_ypos = this.o_last_slat.ypos - a_slats[oneSlat].height - 30;
            jumperObj.b_boosting = true;
            jumperObj.i_yacc = -30;
            jumperObj.i_xacc = 0;
        } else {
            jumperObj.i_yacc += this.i_gravity;
            if (this.b_boosting && this.i_ypos + this.i_yacc <= this.i_max_jumper_ypos) {
                if (jumperObj.i_ypos <= this.i_max_jumper_ypos) {
                    this.moveScene(this.i_yacc, a_slats);
                } else {
                    //this.moveScene(this.i_max_jumper_ypos - jumperObj.i_ypos, a_slats, a_slat_divs);
                    this.moveScene(this.i_yacc - (this.i_max_jumper_ypos - jumperObj.i_ypos), a_slats);
                    jumperObj.i_ypos += this.i_max_jumper_ypos - jumperObj.i_ypos;
                }
            } else {
                jumperObj.i_ypos += this.i_yacc;
            }
        }


        /*-----------------------------------------------------------*/
        /*-------------mouse and keyboard events:------------------- */

        document.onmousedown = function (event) {
            b_keyPressed = true;

            if (mouseShowHandler(event).x < winSizes.myWidth / 2 && b_keyPressed) {

                // Проверяем не превысил ли обект скорость по ОХ
                if (jumperObj.i_xacc - jumperObj.i_yShift < -jumperObj.i_yMaxacceleration) {
                    jumperObj.i_xacc = -jumperObj.i_yMaxacceleration;
                } else {
                    jumperObj.i_xacc -= jumperObj.i_yShift;
                }
                if (jumperObj.i_xpos <= -20) {
                    jumperObj.i_xpos = winSizes.myWidth - 40;
                }

            }
            else if (mouseShowHandler(event).x > winSizes.myWidth / 2 && b_keyPressed) {

                // Проверяем не превысил ли обект скорость по ОХ
                if (jumperObj.i_xacc + jumperObj.i_yShift > jumperObj.i_yMaxacceleration) {
                    jumperObj.i_xacc = jumperObj.i_yMaxacceleration;
                } else {
                    jumperObj.i_xacc += jumperObj.i_yShift;
                }

                if (jumperObj.i_xpos >= winSizes.myWidth - 60) {
                    jumperObj.i_xpos = -40;
                }
            }
        }


        document.onmouseup = function (event) {
            b_keyPressed = false;
        }

        //==================
        //==================
        //==================

        document.onkeypress = function (event) {
            if (b_keyPressed) {

                switch (parseInt(getKeyCode(event))) {
                    case 37:    // left

                        // Проверяем не превысил ли обект скорость по ОХ
                        if (jumperObj.i_xacc - jumperObj.i_yShift < -jumperObj.i_yMaxacceleration) {
                            jumperObj.i_xacc = -jumperObj.i_yMaxacceleration;
                        } else {
                            jumperObj.i_xacc -= jumperObj.i_yShift;
                        }
                        if (jumperObj.i_xpos <= -20) {
                            jumperObj.i_xpos = winSizes.myWidth - 40;
                        }
                        break;
                    case 39:    // right

                        // Проверяем не превысил ли обект скорость по ОХ
                        if (jumperObj.i_xacc + jumperObj.i_yShift > jumperObj.i_yMaxacceleration) {
                            jumperObj.i_xacc = jumperObj.i_yMaxacceleration;
                        } else {
                            jumperObj.i_xacc += jumperObj.i_yShift;
                        }
                        if (jumperObj.i_xpos >= winSizes.myWidth - 60) {
                            jumperObj.i_xpos = -40;
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
                    if (jumperObj.i_xacc - jumperObj.i_yShift < -jumperObj.i_yMaxacceleration) {
                        jumperObj.i_xacc = -jumperObj.i_yMaxacceleration;
                    } else {
                        jumperObj.i_xacc -= jumperObj.i_yShift;
                    }
                    if (jumperObj.i_xpos <= -20) {
                        jumperObj.i_xpos = winSizes.myWidth - 40;
                    }
                    break;
                case 39:    // right
                    b_keyPressed = true;

                    // Проверяем не превысил ли обект скорость по ОХ
                    if (jumperObj.i_xacc + jumperObj.i_yShift > jumperObj.i_yMaxacceleration) {
                        jumperObj.i_xacc = jumperObj.i_yMaxacceleration;
                    } else {
                        jumperObj.i_xacc += jumperObj.i_yShift;
                    }
                    if (jumperObj.i_xpos >= winSizes.myWidth - 60) {
                        jumperObj.i_xpos = -40;
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
        /*-----------------------------------------------------------*/

        //exit to 'start menu'

        if (typeof winSizes !== "undefined" && this.explode()) {
            alert('you loose ...');
            document.location.href = "start_menu.html";
        }
    };

    // определяет пересекается ли объект со ступенью на следующем шаге.
    // принимает массив со ступенями.
    // возвращает true если объект пересекаетсь со ступенью, а также присваивает this.o_last_slat объект пересекаемой
    // ступени,
    // или false иначе.
    this.falling = function (a_slats) {
        for (oneSlat in a_slats) {
            if (!this.b_boosting) {

                if (this.i_xpos + this.width > a_slats[oneSlat].xpos && this.i_xpos < a_slats[oneSlat].xpos + a_slats[oneSlat].width
                    && this.i_ypos <= a_slats[oneSlat].ypos - a_slats[oneSlat].height
                    && this.i_ypos + this.i_yacc + this.height >= a_slats[oneSlat].ypos - a_slats[oneSlat].height) {

                    //alert((this.i_ypos + this.i_yacc + this.height) +' - '+ (a_slats[0].ypos - a_slats[0].height));
                    this.o_last_slat = a_slats[oneSlat];
                    return true;
                }
            }
        }
        return false;
    };

    //if person die
    this.explode = function () {
        if (this.i_ypos + this.height <= winSizes.myHeight) {
            return false;
        }
        return true;
    }
}