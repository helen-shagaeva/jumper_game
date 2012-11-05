describe("Jumper", function() {
    var jumper;

    beforeEach(function() {
        jumper = new Jumper();
    });

    it ("should be moving bo OY automatically", function() {
        var ypos = jumper.i_ypos;
        jumper.updateJumper(jumper, null);
        expect(ypos).toNotEqual(jumper.i_ypos);
    });
});
