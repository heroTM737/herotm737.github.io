$(document).ready(function() {
    var tick = 3;
    var speed = 1; //pixel per tick
    var sw = $(window).width();
    var sh = $(window).height();
    var bw = bh = 60;

    $(window).on("resize", function(){
        sw = $(window).width();
        sh = $(window).height();
    });

    var angles = [];
    $(".bubble").each(function( index ) {
        var randomAngle = Math.random() * Math.PI * 2;
        angles.push(randomAngle);
        $(this).css("top", sh / 2 - bh / 2);
        $(this).css("left", sw / 2 - bw / 2);
    });

    var top, left, difx, dify;
    setInterval(function() {
        $(".bubble").each(function(i) {
            top = parseFloat($(this).css("top"));
            left = parseFloat($(this).css("left"));

            dify = speed * Math.sin(angles[i]);
            difx = speed * Math.cos(angles[i]);

            top += dify;
            left += difx;
            
            $(this).css("top", top);
            $(this).css("left", left);

            if (top <= 0 || top + bh >= sh) {
                angles[i] = -angles[i];
            }

            if (left <= 0 || left + bw >= sw) {
                angles[i] = Math.PI - angles[i];
                angles[i] = angles[i] % (Math.PI * 2);
            }
        });
    }, tick);
});