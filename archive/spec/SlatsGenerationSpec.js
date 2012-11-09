describe("Slats generation", function () {
    it("should be generate more than 20 slats", function () {
        var lenSlats = 1000;
        var generator = new Generator();
        for (var i = 0; i < 100; i++) {
            var slats = new Array();
            slats.push(new Slat(300, 300));
            var tmp_slats = generator.slatsGenerate(slats, 1000, false);

            if (lenSlats > tmp_slats.length) {
                lenSlats = tmp_slats.length;
            }
        }
        expect(lenSlats).toBeGreaterThan(20);
    });

    it("should be generate less than 100 slats", function () {
        var lenSlats = 0;
        var generator = new Generator();
        for (var i = 0; i < 100; i++) {
            var slats = new Array();
            slats.push(new Slat(300, 300));
            var tmp_slats = generator.slatsGenerate(slats, 1000, false);

            if (lenSlats < tmp_slats.length) {
                lenSlats = tmp_slats.length;
            }
        }
        expect(lenSlats).toBeLessThan(100);
    });

    it("should be a way for jumper", function () {
        var generator = new Generator();
        var slats = new Array();
        slats.push(new Slat(300, 300));
        var tmp_slats = generator.slatsGenerate(slats, 1000, false);
        var tmp_slat = slats[0];
        for (var i = 0; i < tmp_slats.length; i++) {
            for (var j = 0; j < tmp_slats.length; j++) {
                if ((tmp_slat.ypos - tmp_slats[j].ypos) < 290) {
                    tmp_slat = tmp_slats[i];
                }
            }
        }

        expect(tmp_slat.ypos).toEqual(slats[slats.length - 1].ypos);
    });
});