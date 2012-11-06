describe("Slats generation", function() {
    it ("should be generate more than 20 slats", function() {
        var minSlats = 0;
        for(var i = 0; i < 100; i++) {
            var slats = new Array();
            slats.push(new Slat(300, 300));
            var tmp_slats = slatsGenerate(slats, 1000, false);
            if(minSlats > tmp_slats.length) {
                minSlats = tmp_slats.length;
            }
        }
        expect(minSlats).toBeGreaterThan(20);
    });
});