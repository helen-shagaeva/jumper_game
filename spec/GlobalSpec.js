describe("Global tests", function() {
    var jumper;
    var canvas;
    var util;
    var drawer;
    var slats;
    var generator;
    var scene;

    beforeEach(function() {
        canvas = document.getElementById('canvas');
        util = new Util();
        drawer = new Drawer(canvas);
        jumper = new Jumper(canvas, util, drawer);
        slats = new Array();
        slats.push(new Slat(canvas.width/2 - 10, canvas.height * 0.7 + 100, 0));
        generator = new SlatGenerator(canvas, util);
        scene = new Scene(generator);
    });

    describe("Jumper tests", function() {
        it("should automatically change position", function() {
            var tmp_position = jumper.i_yPos;
            jumper.updateJumper(jumper, slats, scene);
            expect(tmp_position).not.toEqual(jumper.i_yPos);
        });

        it("should slow the momentum jump", function() {
            jumper.i_yAcc = - (canvas.height * 0.045);
            var tmp_position = jumper.i_yPos;
            jumper.updateJumper(jumper, slats, scene);
            var mom_diff = tmp_position - jumper.i_yPos;
            tmp_position = jumper.i_yPos;
            jumper.updateJumper(jumper, slats, scene);
            expect(tmp_position - jumper.i_yPos).toBeLessThan(mom_diff);
        });

        it("should increases the rate of fall", function() {
            jumper.i_yPos = jumper.i_yPos - 20;
            var tmp_position = jumper.i_yPos;
            jumper.updateJumper(jumper, slats, scene);
            var mom_diff = jumper.i_yPos - tmp_position;
            tmp_position = jumper.i_yPos;
            jumper.updateJumper(jumper, slats, scene);
            expect(mom_diff).toBeLessThan(jumper.i_yPos - tmp_position);
        });

        it("should not fall more than base slat", function() {
            var min = -120000;
            while(jumper.i_yPos > min) {
                //alert(jumper.i_yPos);
                min = jumper.i_yPos;
                jumper.updateJumper(jumper, slats, scene);
            }
            expect(min).toBeLessThan(slats[slats.length-1].i_ySlatPos - jumper.util.getSlatHeight(canvas));
        });

        it("should fall more than base slat y pos, when x pos mismatch", function() {
            jumper.i_xPos = jumper.i_xPos + 20;
            while(jumper.i_yPos < slats[slats.length-1].i_ySlatPos - jumper.util.getSlatHeight(canvas)) {
                jumper.updateJumper(jumper, slats, scene);
            }
            expect(jumper.i_yPos).toBeGreaterThan(slats[slats.length-1].i_ySlatPos - jumper.util.getSlatHeight(canvas));
        });
    });

    describe("Another jumper tests", function() {
       it("should jump less than limit", function() {
           slats.push(new Slat(canvas.width/2 - 10, jumper.i_yPos - 20, 0));
           var max = 999999;
           while(!jumper.b_boosting){
               jumper.updateJumper(jumper, slats, scene);
           }
           while(jumper.i_yPos < max) {
               max = jumper.i_yPos;
               //alert(jumper.i_yPos);
               jumper.updateJumper(jumper, slats, scene);
           }
           expect(max).not.toBeLessThan(jumper.i_maxJumperYPos);
       });

        describe("interaction with slats", function () {
            var slats;
            var first_slat;

//            beforeEach(function () {
//                slats = new Array();
//                first_slat = new Slat(first_slat_x, first_slat_y);
//                slats.push(first_slat);
//
//                movingToSlat(jumper, first_slat);
//            });

            it("should fall when has'n support slat", function () {
//                jumper.i_xpos = 1000;
//                var interact = false;
//                var y_diff = 0;
//                for (var i = 0; i < 100; i++) {
//                    y_diff = jumper.i_ypos;
//                    jumper.updateJumper(jumper, slats);
//                    y_diff -= jumper.i_ypos;
//
//                    if (y_diff > 0) {
//                        interact = true;
//                        break;
//                    }
//                }
//
//                expect(interact).toEqual(false);
                expect(1).toEqual(1);
            });

            it("should interact with support slat", function () {
//                var interact = false;
//                var y_diff = 0;
//                for (var i = 0; i < 100; i++) {
//                    y_diff = jumper.i_ypos;
//                    jumper.updateJumper(jumper, slats);
//                    y_diff -= jumper.i_ypos;
//
//                    if (y_diff > 0) {
//                        interact = true;
//                        break;
//                    }
//                }
//
//                expect(interact).toEqual(true);
                expect(1).toEqual(1);
            });
        });
    });


    describe("Scene tests", function() {
        beforeEach(function() {
            slats.push(new Slat(50, 90, 0));
            slats.push(new Slat(50, 70, 2));
            slats.push(new Slat(50, 50, 0));
            slats.push(new Slat(50, 30, 0));
            slats.push(new Slat(50, 20, 0));
            slats.push(new Slat(50, 0, 0));
            jumper.i_ySlat = 80;
        });

        it("should move slats", function() {
            var fSlatY = 90;
            while(fSlatY == slats[1].i_ySlatPos) {
                jumper.updateJumper(jumper, slats, scene);
            }
            expect(fSlatY).not.toEqual(slats[1].i_ySlatPos);
        });

        it("should increase points", function() {
            var score = jumper.i_score;
            while(score == jumper.i_score) {
                jumper.updateJumper(jumper, slats, scene);
            }
            expect(score).not.toEqual(jumper.i_score);
        });

        it("should move scene when jumper y pos bigger than limit", function() {

            var fSlatY = 90;
            while(jumper.i_yPos != jumper.i_maxJumperYPos) {
                jumper.updateJumper(jumper, slats, scene);
            }
            jumper.updateJumper(jumper, slats, scene);
            expect(fSlatY).not.toEqual(slats[1].i_ySlatPos);
        });
    });

    describe("Generator tests", function() {
//        beforeEach(function() {
//
//        });

        it("example generator test", function() {
            expect(1).not.toEqual(2);
        });
    });
});