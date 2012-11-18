function getWinSize() {
    var sizes = {
        'myWidth':'0',
        'myHeight':'0'
    };
    if (typeof( window.innerWidth ) == 'number') {

        // not IE
        sizes.myWidth = window.innerWidth;
        sizes.myHeight = window.innerHeight;
    } else if (document.documentElement && ( document.documentElement.clientWidth || document.documentElement.clientHeight )) {

        // IE 6+
        sizes.myWidth = document.documentElement.clientWidth;
        sizes.myHeight = document.documentElement.clientHeight;
    } else if (document.body && ( document.body.clientWidth || document.body.clientHeight )) {

        // IE 4
        sizes.myWidth = document.body.clientWidth;
        sizes.myHeight = document.body.clientHeight;
    }
    return sizes;
}

// Todo utill must choose from different resources
function Util() {
    this.i_typesOfImages = 1;
    this.images = new Array();

    this.loadImage = function(funcAfterLoad) {

        var loadedImages = 0;
        for (var i=0; i<util.i_typesOfImages; i++) {
            this.images[i] = new Image();
            this.images[i].onload = function() {
                if(++loadedImages >= this.i_typesOfImages) {
                    funcAfterLoad();
                    //func2();
                    //alert("after load");
                }
            };
            this.images[i].src = "../img/slat_type_" + i + ".png";
        }
    };


    //This method can change
    this.getSlatWidth = function(slat) {
        return this.images[slat.slatType].width;
    };

    this.getSlatHeight = function(slat) {
        return this.images[slat.slatType].height;
    };

    //this.getSlatHeight(slat);
    //this.getSlatWidth(slat);
}