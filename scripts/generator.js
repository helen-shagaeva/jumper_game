function Generator(width_, height_) {
    this.width = width_;
    this.height = height_;

    this.getRandomInt = function(min, max) {
        return Math.floor(Math.random() * (max - min + 1)) + min;
    };
    this.slatsGenerate = function(slats, need_height, first) {
        need_height = need_height * (-1);
        var count = 25;
        var id = slats[slats.length -1].id;
        var y_step = this.height;
        var x_step = slats[slats.length -1].width * 3;
        var tmp_xpos = slats[slats.length -1].xpos;
        var tmp_ypos = slats[slats.length -1].ypos;
        var temp = slats.length - 1;

        while(tmp_ypos > need_height) {       // путь

            var current_slat = new Slat();
            current_slat.ypos = this.getRandomInt(tmp_ypos, tmp_ypos - 240); // jumpers step OY (290) - 50
            if((current_slat.ypos - tmp_ypos) > 240) { current_slat.ypos = current_slat.ypos - ((current_slat.ypos - tmp_ypos) - 240);}

            var direction = this.getRandomInt(0, 10);
            if((current_slat.xpos + 50) > (this.width - 10)) { direction = 8; }   // to left

            if(direction < 5) {    // right
                current_slat.xpos = this.getRandomInt(tmp_xpos, (tmp_xpos + 200));
            } else {    // left
                current_slat.xpos = this.getRandomInt((tmp_xpos - 200), tmp_xpos);
                if(current_slat.xpos < 0) {current_slat.xpos = current_slat.xpos * (-1);}
            }

            current_slat.id = id;
            slats.push(current_slat);
            id++;

            tmp_ypos = current_slat.ypos;
            tmp_xpos = current_slat.xpos;

            current_slat.color = "red";
        }
        var last_slat = slats.pop();    // запоминаю последнюю
        var floor;
        if(first) {
            floor = this.height;
        } else {
            floor = 0;
        }

        for (var i = 0; i < count; i++) {       // мусор
            var current_slat = new Slat();
            current_slat.ypos = this.getRandomInt((need_height - 10), floor);
            current_slat.xpos = this.getRandomInt(0, (this.width - current_slat.width));
            current_slat.id = id;
            slats.push(current_slat);
            id++;
            current_slat.color = "green";
        }

        slats.push(last_slat);

        if(typeof winSizes !== "undefined") {
            for(var a = temp; a < slats.length; a++) {
                slats[a].addToDom(slats[a].id, slats[a].xpos, slats[a].ypos);
            }
        }

        return slats;
    };
}