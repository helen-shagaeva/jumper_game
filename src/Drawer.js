/**
 * Created with JetBrains WebStorm.
 * User: sanino
 * Date: 11/9/12
 * Time: 5:25 PM
 * To change this template use File | Settings | File Templates.
 */
function Drawer(context) {
    this.context = context;

    this.drawBackground = function (backgroundImg) {
        this.context.drawImage(backgroundImg, 0, 0, backgroundImg.width, backgroundImg.height);
    };
}