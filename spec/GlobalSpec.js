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

    describe("Scene tests", function() {
//        beforeEach(function() {
//
//        });

        it("example scene test", function() {
            expect(1).not.toEqual(2);
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