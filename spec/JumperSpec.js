describe("Jumper", function() {
    var jumper;
//    var slats;

    beforeEach(function() {
        jumper = new Jumper();
//        slats = new Array();
//        slats.push(new Slat(100, 100));
    });

    it ("should be moving to OY automatically", function() {
        var ypos = jumper.i_ypos;
        jumper.updateJumper(jumper, null);
        expect(ypos).not.toEqual(jumper.i_ypos);
    });

    it("should fall with increasing speed", function() {
        var first_speed = jumper.i_ypos;
        jumper.updateJumper(jumper, null);
        first_speed -= jumper.i_ypos;

        var second_speed = jumper.i_ypos;
        jumper.updateJumper(jumper, null);
        second_speed -= jumper.i_ypos;

        expect(first_speed).toBeGreaterThan(second_speed);
    });

    describe("interaction with slats", function() {
        var slats;
        var first_slat;

        beforeEach(function() {
            slats = new Array();
            first_slat = new Slat(300, 570);
            slats.push(first_slat);
        });

        it("y position should be upper than support slat's y position", function() {
            var max_y_pos = jumper.i_ypos;
            var incr_speed = 0;
            do {
//                alert(jumper.i_ypos);
//
//                alert(incr_speed);

                incr_speed = jumper.i_ypos;
                jumper.updateJumper(jumper, slats);
                incr_speed -= jumper.i_ypos;

                if(jumper.i_ypos > max_y_pos) {
                    max_y_pos = jumper.i_ypos;
                }
            } while(incr_speed < 0);

            expect(max_y_pos).toBeLessThan(first_slat.ypos);
        });
    });


});
