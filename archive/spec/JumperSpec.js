describe("Jumper", function () {
    var jumper;

    beforeEach(function () {
        jumper = new Jumper();
    });

    movingToSlat = function (jumperObj, slat) {
        jumperObj.i_ypos = slat.ypos - 50;
        jumperObj.i_xpos = slat.xpos + 20;
    };

    it("should be moving to OY automatically", function () {
        var ypos = jumper.i_ypos;
        jumper.updateJumper(jumper, null);
        expect(ypos).not.toEqual(jumper.i_ypos);
    });

    it("should fall with increasing speed", function () {
        var first_speed = jumper.i_ypos;
        jumper.updateJumper(jumper, null);
        first_speed -= jumper.i_ypos;

        var second_speed = jumper.i_ypos;
        jumper.updateJumper(jumper, null);
        second_speed -= jumper.i_ypos;

        expect(first_speed).toBeGreaterThan(second_speed);
    });

    describe("interaction with slats", function () {
        var slats;
        var first_slat;

        beforeEach(function () {
            slats = new Array();
            first_slat = new Slat(first_slat_x, first_slat_y);
            slats.push(first_slat);

            movingToSlat(jumper, first_slat);
        });

        it("should fall when has'n support slat", function () {
            jumper.i_xpos = 1000;
            var interact = false;
            var y_diff = 0;
            for (var i = 0; i < 100; i++) {
                y_diff = jumper.i_ypos;
                jumper.updateJumper(jumper, slats);
                y_diff -= jumper.i_ypos;

                if (y_diff > 0) {
                    interact = true;
                    break;
                }
            }

            expect(interact).toEqual(false);
        });

        it("should interact with support slat", function () {
            var interact = false;
            var y_diff = 0;
            for (var i = 0; i < 100; i++) {
                y_diff = jumper.i_ypos;
                jumper.updateJumper(jumper, slats);
                y_diff -= jumper.i_ypos;

                if (y_diff > 0) {
                    interact = true;
                    break;
                }
            }

            expect(interact).toEqual(true);

        });

        it("y position should be upper than support slat's y position", function () {
            var max_y_pos = jumper.i_ypos;
            var incr_speed = 0;

            do {
                incr_speed = jumper.i_ypos;
                jumper.updateJumper(jumper, slats);
                incr_speed -= jumper.i_ypos;

                if (jumper.i_ypos > max_y_pos) {
                    max_y_pos = jumper.i_ypos;
                }
            } while (incr_speed < 0);

            expect(max_y_pos).toBeLessThan(first_slat.ypos);
        });
    });

    describe("jumper scene logic", function () {
        var slats;
        var first_slat;

        beforeEach(function () {
            slats = new Array();
            first_slat = new Slat(240, 400);
            slats.push(first_slat);

            movingToSlat(jumper, first_slat);
        });

        it("jumper displaying should be greater than 300px by OY", function () {
            var min_y_pos = 500;
            for (var i = 0; i < 100; i++) {

                jumper.updateJumper(jumper, slats);

                //alert(jumper.i_ypos);

                if (min_y_pos > jumper.i_ypos) {
                    min_y_pos = jumper.i_ypos;
                }
            }
            expect(min_y_pos).not.toBeLessThan(300);
        });

        it("slats move down when jumper move greater than 300px by OY", function () {
            var slats_moving_fail = true;

            var last_slat_position = 0;
            for (var i = 0; i < 100; i++) {

                last_slat_position = first_slat.ypos;
                jumper.updateJumper(jumper, slats);
                if (jumper.i_ypos == 300 && last_slat_position < first_slat.ypos) {
                    slats_moving_fail = false;
                }
            }
            expect(slats_moving_fail).toEqual(false);

        });

    });

});
