function writeRecord(points1) {//записб рекордов в БД
    var arr = new Array();

    var db = openDatabase("jumpDB", "1.0", "HTML5 Database", 200000);
    if (!db) {
        alert('Failed');
    } else {
        db.transaction(function (tx) {
            tx.executeSql("SELECT * FROM Records", [], function (tx, result) {

                for (var i = 0; i < 10; i++) {
                    arr[i] = new Array();
                    arr[i][0] = result.rows.item(i)['id'];
                    arr[i][1] = result.rows.item(i)['name'];
                    arr[i][2] = result.rows.item(i)['points'];
                }
                for (var i = 0; i < 10; i++) {
                    if (points1 > arr[i][2]) {
                        arr[9][2] = points1;
                        var Pl_name = prompt(arr[9][2] + "  Your Name?", "Player name");
                        arr[9][1] = Pl_name;
                        i = 10;
                    }
                }

                function Msort(i, ii) {
                    if (i[2] > ii[2])
                        return -1;
                    else if (i[2] < ii[2])
                        return 1;
                    else
                        return 0;
                }

                arr.sort(Msort);

                for (var i = 0; i < 10; i++) {
                    tx.executeSql("UPDATE Records SET name = ?, points=? WHERE id = ?", [arr[i][1], arr[i][2], i + 1], null, null);

                }


            }, function (tx, error) {
                tx.executeSql("CREATE TABLE Records (id REAL UNIQUE, name TEXT,  points INTEGER)", [], null, null);
                for (var i = 1; i < 11; i++) {
                    tx.executeSql("INSERT INTO Records (id,name,points) values(?,?,?)", [i, " ", 0], null, null);
                }
            });
        });
    }
    location.reload();
//mysql_query("TRUNCATE TABLE jumpDB");


}

function Msort(i, ii) {
    if (i[2] > ii[2])
        return -1;
    else if (i[2] < ii[2])
        return 1;

    else
        return 0;
}
arr.sort(Msort);


function Jumper(canvas, util) {
    this.i_xPos = canvas.width / 2;
    this.i_yPos = canvas.height * 0.7;
    this.i_xAcc = 0;
    this.i_yAcc = 3;
    this.i_gravity = 0.003322259 * canvas.height;
    this.i_maxJumperYPos = canvas.height * 0.5;
    this.i_score = 0;
    this.i_regenerateHeight = 0;
    this.i_friction = 1;
    this.b_boosting = false;
    this.o_lastSlat = null;
    this.util = util;
    this.i_yShift = 6;
    this.i_yMaxacceleration = 10;
//  ���� �� ������
    this.point = 0;
    this.canvas = canvas;
    this.i_canvasHeight = canvas.height;
    this.i_jumperWidth = 0;
    this.i_jumperHeight = 0;

    this.startHeight = 0;
//    this.moveRight();
//    this.moveLeft();


    // this.drawBackground = function (backgroundImg) {

    //todo add movescene function to updateJumper args
    this.updateJumper = function (jumperObj, a_slats, scene) {
        if (jumperObj.i_xAcc > jumperObj.i_friction) {
            jumperObj.i_xAcc -= jumperObj.i_friction;
        } else if (jumperObj.i_xAcc < -jumperObj.i_friction) {
            jumperObj.i_xAcc += jumperObj.i_friction;
        } else {
            jumperObj.i_xAcc = 0;
        }
        jumperObj.i_xPos += jumperObj.i_xAcc;


        if (jumperObj.i_yAcc >= 0) {
            jumperObj.b_boosting = false;
        }

        if (this.falling(jumperObj, a_slats)) {

            var moveHeight = jumperObj.o_lastSlat.i_ySlatPos - this.i_jumperHeight - jumperObj.i_yPos;

            if (jumperObj.i_yPos + moveHeight <= jumperObj.i_maxJumperYPos) {
                if (jumperObj.i_yPos <= jumperObj.i_maxJumperYPos) {
                    jumperObj.preMoving(jumperObj, scene, a_slats, moveHeight);
                } else {
                    jumperObj.i_yPos += jumperObj.i_maxJumperYPos - jumperObj.i_yPos;
                    jumperObj.preMoving(jumperObj, scene, a_slats, moveHeight - (jumperObj.i_maxJumperYPos - jumperObj.i_yPos));
                }
            } else {
                jumperObj.i_yPos += moveHeight;
            }

            jumperObj.b_boosting = true;
            var dop = 1;
            if (jumperObj.o_lastSlat.slatType == 2) {
                dop = 2;
            }
            jumperObj.i_yAcc = -(this.canvas.height * 0.045 * dop);
            jumperObj.i_xAcc = 0;
        } else {
            jumperObj.i_yAcc += jumperObj.i_gravity;
            if (jumperObj.b_boosting && jumperObj.i_yPos + jumperObj.i_yAcc <= jumperObj.i_maxJumperYPos) {
                if (jumperObj.i_yPos <= jumperObj.i_maxJumperYPos) {
                    jumperObj.preMoving(jumperObj, scene, a_slats, jumperObj.i_yAcc);
                } else {
                    jumperObj.i_yPos += jumperObj.i_maxJumperYPos - jumperObj.i_yPos;
                    jumperObj.preMoving(jumperObj, scene, a_slats, jumperObj.i_yAcc - (jumperObj.i_maxJumperYPos - jumperObj.i_yPos));
                }
            } else {
                jumperObj.i_yPos += jumperObj.i_yAcc;
            }
        }

        //exit to 'start menu'
        if (typeof i_canvasHeight !== "undefined" && this.explode(jumperObj, this.i_canvasHeight)) {
            // save to records

            var audio_1 = document.getElementById("player");
            var audio_2 = document.getElementById("player_die");
            audio_1.pause();
            audio_1.currentTime = 0;
            audio_2.pause();
            audio_2.currentTime = 0;

            audio_2.play();
            //end save to records

            writeRecord(parseInt(jumperObj.i_score));

            setTimeout(function () {
            }, 6000);
            //alert('you loose ...'); 
            this.util.gameOver();
            //location.reload();
        }
    };

    this.preMoving = function (jumperObj, scene, a_slats, moveHeight) {
        // alert("premoving");
        jumperObj.i_score -= moveHeight;
        jumperObj.i_score = parseInt(jumperObj.i_score);
        jumperObj.i_regenerateHeight -= moveHeight;
        var isRegenerate = false;
        if (jumperObj.i_regenerateHeight > scene.regenerateLimit) {
            isRegenerate = true;
            jumperObj.i_regenerateHeight = 0;
        }
        scene.moveScene(moveHeight, a_slats, isRegenerate, jumperObj.i_score);
        sPoint(jumperObj.i_score);
    };


    this.falling = function (jumperObj, a_slats) {
        if (!this.b_boosting) {
            for (oneSlat in a_slats) {
                if (a_slats[oneSlat].slatType != 4 && jumperObj.i_xPos + jumperObj.i_jumperWidth > a_slats[oneSlat].i_xSlatPos
                    && jumperObj.i_xPos < a_slats[oneSlat].i_xSlatPos + this.util.getSlatWidth(this.canvas)
                    && jumperObj.i_yPos <= a_slats[oneSlat].i_ySlatPos - this.util.getSlatHeight(this.canvas)
                    && jumperObj.i_yPos + jumperObj.i_yAcc + jumperObj.i_jumperHeight >=
                    a_slats[oneSlat].i_ySlatPos - this.util.getSlatHeight(this.canvas)) {

                    jumperObj.o_lastSlat = a_slats[oneSlat];
                    if (jumperObj.o_lastSlat.slatType == 3) {
                        jumperObj.o_lastSlat.slatType = 4;
                    }

                    //here play audio when jumper is jump
                    playJumpAudio();
                    return true;
                }
            }
        }
        return false;
    };


    //if person die
    this.explode = function (jumperObj, i_canvasHeight) {
        if (jumperObj.i_yPos + jumperObj.i_jumperHeight <= i_canvasHeight) {
            return false;
        }
        return true;
    }
}
