function SlatGenerator(canvas, util) {
    this.canvas = canvas;
    this.util = util;

    this.generateSlats = function(slats, generatedHeight, score) {
        slats.push(new Slat(300, 300, 0));
        slats.push(new Slat(300, 400, 0));
        slats.push(new Slat(300, 500, 0));
    }
}