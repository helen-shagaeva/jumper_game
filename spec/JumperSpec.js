describe("Jumper", function() {
    var jumper;

    beforeEach(function() {
        jumper = new Jumper();
    });

    it ("should be moving bo OY automatically", function() {
        var ypos = jumper.i_ypos;
        expect(ypos).toEqual(jumper.i_ypos);
    });
});
