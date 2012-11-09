function Drawer(canvas) {
    this.canvas = canvas;

    this.drawBackground = function (backgroundImg) {
        var context = this.canvas.getContext('2d');
        context.drawImage(backgroundImg, 0, 0, backgroundImg.width, backgroundImg.height);
    };
}