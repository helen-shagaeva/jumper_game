/**
 * User: arlekino
 * Date: 9/16/12
 * Time: 5:44 PM
 */
function Jumper() {
    // Значение гравитации, влияющей на ускорение по ОУ
	
	//Очки за прыжки
	this.point = 0;
	
	
    this.i_gravity = 2;

    // Трение объекта с воздухом,
    // Сила, противоположная движению по ОХ
    this.i_friction = 1;

    // Максимальная скорость движения объекта по ОХ
    this.i_yMaxacceleration = 10;

    // Значение изменения скорости по ОХ
    this.i_yShift = 6;

    // Координаты объекта (х, у)
    this.i_xpos = 300;
    this.i_ypos = 300;

    // Ускорение по ОХ (изначально 0 - объект не движется по горизонтали)
    this.i_xacc = 0;

    // Ускорение по ОУ (изначально 3 - объект падает)
    this.i_yacc = 3;

    // Вспомогательная переменная хранящая последнюю пересеченную ступень
    this.o_last_slat = null;

    // Переменная, определяющая взлет и падение объекта
    this.b_boosting = false;

    this.updateJumper = function (jumperObj, a_slats) {

        winSizes = getWinSize();

        // Трение - уменьшает ускорение объекта до 0.
        if (this.i_xacc > this.i_friction) {
            this.i_xacc -= this.i_friction;
        } else if (this.i_xacc < - this.i_friction) {
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
        if(this.falling(a_slats)) {
			var zz = jumperObj.point;
            jumperObj.i_ypos = this.o_last_slat.ypos - a_slats[oneSlat].height_of_slat - 30;
            jumperObj.b_boosting = true;
			jumperObj.point = zz+10;
			sPoint(jumperObj.point);
            jumperObj.i_yacc = -30;
            jumperObj.i_xacc = 0;
        } else {
            jumperObj.i_yacc += this.i_gravity;
            jumperObj.i_ypos += this.i_yacc;
        }


        document.onmousedown = function(e) {
            //var direction=mouseShowHandler(e).x<winSizes.myWidth/2 ? 'leftside' : 'rightside';
            if (mouseShowHandler(e).x < winSizes.myWidth / 2) {
                // Проверяем не превысил ли обект скорость по ОХ
                if(jumperObj.i_xacc - jumperObj.i_yShift < -jumperObj.i_yMaxacceleration) {
                    jumperObj.i_xacc = -jumperObj.i_yMaxacceleration;
                } else {
                    jumperObj.i_xacc -= jumperObj.i_yShift;
                }
                if (jumperObj.i_xpos <= -20) jumperObj.i_xpos = winSizes.myWidth - 40;
            }
            else if (mouseShowHandler(e).x > winSizes.myWidth / 2) {
                // Проверяем не превысил ли обект скорость по ОХ
                if(jumperObj.i_xacc + jumperObj.i_yShift > jumperObj.i_yMaxacceleration) {
                    jumperObj.i_xacc = jumperObj.i_yMaxacceleration;
                } else {
                    jumperObj.i_xacc += jumperObj.i_yShift;
                }
                if (jumperObj.i_xpos >= winSizes.myWidth - 60) jumperObj.i_xpos = -40;
            }
        }

        document.onkeydown = function(e) {
            b_keyPressed = true;
            if (b_keyPressed && getKeyCode(e) == "37") {
                //alert('left');
                // Проверяем не превысил ли обект скорость по ОХ
                if(jumperObj.i_xacc - jumperObj.i_yShift < -jumperObj.i_yMaxacceleration) {
                    jumperObj.i_xacc = -jumperObj.i_yMaxacceleration;
                } else {
                    jumperObj.i_xacc -= jumperObj.i_yShift;
                }
                if (jumperObj.i_xpos <= -20) jumperObj.i_xpos = winSizes.myWidth - 40;
            }
            else if (b_keyPressed && getKeyCode(e) == "39") {
                //alert('right');
                // Проверяем не превысил ли обект скорость по ОХ
                if(jumperObj.i_xacc + jumperObj.i_yShift > jumperObj.i_yMaxacceleration) {
                    jumperObj.i_xacc = jumperObj.i_yMaxacceleration;
                } else {
                    jumperObj.i_xacc += jumperObj.i_yShift;
                }
                if (jumperObj.i_xpos >= winSizes.myWidth - 60) jumperObj.i_xpos = -40;
            }
        }
        document.onkeyup = function() {
            b_keyPressed = false;
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
                if (this.i_xpos >= a_slats[oneSlat].xpos && this.i_xpos <= a_slats[oneSlat].xpos + a_slats[oneSlat].width
                        && this.i_ypos <= a_slats[oneSlat].ypos - a_slats[oneSlat].height_of_slat
                        && this.i_ypos + this.i_yacc >= a_slats[oneSlat].ypos - a_slats[oneSlat].height_of_slat) {

                    this.o_last_slat = a_slats[oneSlat];
                    return true;
                }
            }
        }
        return false;
    };
}