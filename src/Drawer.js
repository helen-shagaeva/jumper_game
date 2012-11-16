function Drawer(canvas) {
    this.canvas = canvas;
    this.context = this.canvas.getContext('2d');

    this.drawBackground = function (backgroundImg) {
        for (var i = 0; i * backgroundImg.height < this.canvas.height; i++) {

            for (var j = 0; j * backgroundImg.width < this.canvas.width; j++) {
                this.context.drawImage(backgroundImg, j * backgroundImg.width, i * backgroundImg.height,
                    backgroundImg.width, backgroundImg.height);

                //context.drawImage(backgroundImg, 0, 0, backgroundImg.width, backgroundImg.height);

            }
        }

    };

    this.drawJumper = function (jumper) {
      this.context.drawImage(jumper.image, jumper.i_xPos, jumper.i_yPos, jumper.image.width, jumper.image.height);
    };
}