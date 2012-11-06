describe("Slats generation", function() {
    it ("should be generate more than 20 slats", function() {
        var lenSlats = 1000;
        var generator = new Generator();
        for(var i = 0; i < 100; i++) {
            var slats = new Array();
            slats.push(new Slat(300, 300));
            var tmp_slats = generator.slatsGenerate(slats, 1000, false);

            if(lenSlats > tmp_slats.length) {
                lenSlats = tmp_slats.length;
            }
        }
        expect(lenSlats).toBeGreaterThan(20);
    });

    it ("should be generate less than 100 slats", function() {
        var lenSlats = 0;
        var generator = new Generator();
        for(var i = 0; i < 100; i++) {
            var slats = new Array();
            slats.push(new Slat(300, 300));
            var tmp_slats = generator.slatsGenerate(slats, 1000, false);

            if(lenSlats < tmp_slats.length) {
                lenSlats = tmp_slats.length;
            }
        }
        expect(lenSlats).toBeLessThan(100);
    });
});