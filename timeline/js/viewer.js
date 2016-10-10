// build items array
function getItems() {
    var items = [];

    for (var i = 1; i < 8; i++) {
        items.push({
            src: 'image/sep/' + i + '.jpg',
            w: 0,
            h: 0
        });
    }

    for (var i = 1; i < 8; i++) {
        items.push({
            src: 'image/oct/' + i + '.jpg',
            w: 0,
            h: 0
        });
    }

    return items;
}

$(document).ready(function () {
    var items = getItems();
    var pswpElement = document.querySelectorAll('.pswp')[0];

    var openPhotoSwipe = function (index) {
        //create options
        var options = {
            index: index
        };

        // Initializes and opens PhotoSwipe
        var gallery = new PhotoSwipe(pswpElement, PhotoSwipeUI_Default, items, options);
        gallery.listen('gettingData', function (index, item) {
            if (item.w < 1 || item.h < 1) { // unknown size
                var img = new Image();
                img.onload = function () { // will get size after load
                    item.w = this.width; // set image width
                    item.h = this.height; // set image height
                    gallery.invalidateCurrItems(); // reinit Items
                    gallery.updateSize(true); // reinit Items
                }
                img.src = item.src; // let's download image
            }
        });
        gallery.init();
    }

    $("img").on("click", function (event) {
        var src = $(event.target).attr("src");
        var index = _.findIndex(items, function (item) {
            return item.src == src;
        });
        if (index >= 0) {
            openPhotoSwipe(index);
        }
    });
});