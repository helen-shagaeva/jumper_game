winSizes = getWinSize();

function Scene(slatGenerator) {
    this.slatGenerator = slatGenerator;
    this.regenerateLimit = getWinSize().myHeight;
    this.moveScene = function (i_heightToMove, a_slats, is_need_toRegenerate, score) {
        // TODO find out where view points
//            if (typeof winSizes !== "undefined") {
//                sPoint(jumperObj.i_score);
//            }

            if (is_need_toRegenerate) {
                //alert("Go away " + a_slats.length);
                slatGenerator.generateSlats(a_slats, winSizes.myHeight * 2, score, false);
                //this.i_redraw_height = 0;
                //alert("after " + a_slats.length);
            }

            for (var i = 0; i < a_slats.length; i++) {
                a_slats[i].shiftSlat(i_heightToMove);
                if (typeof winSizes !== "undefined" && a_slats[i].ypos > winSizes.myHeight) {
                    a_slats.splice(i, 1);
                }
                //    a_slats[i].ypos -= i_heightToMove;
                //    var cur_div = document.getElementById("slat" + a_slats[i].id);
                //    cur_div.style.top = a_slats[i].ypos;
            }
        }

}