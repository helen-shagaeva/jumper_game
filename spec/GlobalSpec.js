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

    it("should automatically change position", function() {
        //expect(canvas.height).toEqual(120);
        alert(jumper.i_yPos);
        jumper.updateJumper(jumper, slats, scene);
        alert(jumper.i_yPos);

    });

    describe("Jumper tests", function() {
//        beforeEach(function() {
//
//        });

        it("example jumper test", function() {
            expect(1).not.toEqual(2);
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