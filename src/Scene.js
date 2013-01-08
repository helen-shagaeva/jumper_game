winSizes = getWinSize();

function Scene(slatGenerator) {
    this.slatGenerator = slatGenerator;
    this.regenerateLimit = getWinSize().myHeight;
    this.moveScene = function (i_heightToMove, a_slats, is_need_toRegenerate, score) {

            if (is_need_toRegenerate) {
                slatGenerator.slatsGenerate(a_slats, winSizes.myHeight * 2, score, false);
            }

            for (var i = 0; i < a_slats.length; i++) {
                a_slats[i].shiftSlat(i_heightToMove);
                if (typeof winSizes !== "undefined" && a_slats[i].ypos > winSizes.myHeight) {
                    a_slats.splice(i, 1);
                }

            }
        }

}