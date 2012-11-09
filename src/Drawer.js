function Drawer(canvas) {
    this.canvas = canvas;

    this.drawBackground = function (backgroundImg) {
        var context = this.canvas.getContext('2d');
        for (var i = 0; i * backgroundImg.height < this.canvas.height; i++) {

            for (var j = 0; j * backgroundImg.width < this.canvas.width; j++) {
                context.drawImage(backgroundImg, j * backgroundImg.width, i * backgroundImg.height,
                    backgroundImg.width, backgroundImg.height);

                //context.drawImage(backgroundImg, 0, 0, backgroundImg.width, backgroundImg.height);

            }
        }

    };
}