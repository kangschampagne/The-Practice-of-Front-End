$(window).on('load',function () {
    watherfall();
    var dataInt = {
        "data": [
            {"src": 'imgres0.jpg'}, {"src": 'imgres1.jpg'}, {"src": 'imgres3.jpg'},
            {"src": 'imgres4.jpg'}, {"src": 'images5.jpg'}, {"src": 'images6.jpg'},
            {"src": 'images7.jpg'}, {"src": 'images8.jpg'}, {"src": 'images9.jpg'},
            {"src": 'images10.jpg'}, {"src": 'images11.jpg'}, {"src": 'images12.jpg'}
        ]
    };
    $(window).on('scroll',function () {
        var check = checkScrollSlider();
        if(check == true) {
            $.each(dataInt.data, function (key, value) {
                var oBox = $('<div>').addClass('box').appendTo($('#main'));
                var oPic = $('<div>').addClass('pic').appendTo($(oBox));
                var oImg = $('<img>').attr('src', 'img/' + $(value).attr('src')).appendTo($(oPic));
                // console.log(dataInt.data[key].src);
            })
            watherfall();
        }
    })
})

function watherfall() {
    var $boxs = $('#main>div');
    var w = $boxs.eq(0).outerWidth();
    var cols = Math.floor($(window).width()/w);
    if (cols>=5){cols=4;}
    $('#main').width(w*cols).css('margin','auto');
    var hArr = [];
    $boxs.each(function (index, value) {
        var h = $boxs.eq(index).outerHeight();
        if (index < cols){
            hArr[index] = h;
        }else {
            var minH = Math.min.apply(null,hArr);
            var minHIndex = $.inArray(minH, hArr);
            $(value).css({
                'position': 'absolute',
                'top': minH + 'px',
                'left' : minHIndex * w + 'px'
            })
            hArr[minHIndex] += $boxs.eq(index).outerHeight();
        }
    })
}

function checkScrollSlider() {
    var $lastbox = $('#main>div').last();
    var lastboxDis = $lastbox.offset().top + Math.floor($lastbox.outerHeight()/2);
    var scrollTop = $(window).scrollTop();
    var documentH = $(window).height();
    if (lastboxDis < (scrollTop+documentH)) {
        return true;
    }else {
        return false;
    }
}