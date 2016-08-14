window.onload = function () {
    waterfall('main', 'box');
    var dataInt = {
        "data": [
            {"src": 'imgres0.jpg'}, {"src": 'imgres1.jpg'}, {"src": 'imgres3.jpg'},
            {"src": 'imgres4.jpg'}, {"src": 'images5.jpg'}, {"src": 'images6.jpg'},
            {"src": 'images7.jpg'}, {"src": 'images8.jpg'}, {"src": 'images9.jpg'},
            {"src": 'images10.jpg'}, {"src": 'images11.jpg'}, {"src": 'images12.jpg'}
        ]
    };
    window.onscroll = function () {
        var check = checkScrollSlider();
        console.log(check);
        if (check == true) {
            var oParent = document.getElementById('main');
            for (var i = 0; i < dataInt.data.length; i++) {
                var oBox = document.createElement('div');
                oBox.className = 'box';
                oParent.appendChild(oBox);
                var oPic = document.createElement('div');
                oPic.className = 'pic';
                oBox.appendChild(oPic);
                var oImg = document.createElement('img');
                oImg.src = "img/" + dataInt.data[i].src;
                oPic.appendChild(oImg);
            }
            waterfall('main', 'box');
        }
    };
}

function waterfall(parent, box) {
    //取出所有class为box的元素
    var oParent = document.getElementById(parent);
    var oBoxs = getByClass(oParent, box);
    //console.log(oBoxs);
    //获取列数
    var oBoxW = oBoxs[0].offsetWidth;
    var cols = Math.floor(document.documentElement.clientWidth / oBoxW);
    // console.log(cols);
    if (cols >= 5) {
        cols = 4;
    }
    oParent.style.cssText = 'width:' + oBoxW * cols + 'px';

    var hArr = [];
    for (var i = 0; i < oBoxs.length; i++) {
        if (i < cols) {
            hArr.push(oBoxs[i].offsetHeight);
        } else {
            var minH = Math.min.apply(null, hArr);
            var index = getMinHIndex(hArr, minH);
            oBoxs[i].style.position = 'absolute';
            oBoxs[i].style.top = minH + 'px';
            oBoxs[i].style.left = oBoxs[index].offsetLeft + 'px';
            hArr[index] += oBoxs[i].offsetHeight;
        }
    }
    // console.log(hArr);
}

function getByClass(parent, className) {
    var boxArry = new Array;
    var oElement = parent.getElementsByTagName('*');
    for (var i = 0; i < oElement.length; i++) {
        if (oElement[i].className == className) {
            boxArry.push(oElement[i]);
        }
    }
    return boxArry;
}

function getMinHIndex(arr, val) {
    for (var i in arr) {
        if (arr[i] == val) {
            return i;
        }
    }
}

function checkScrollSlider() {
    var oParent = document.getElementById('main');
    var oBox = getByClass(oParent, 'box');
    var lastBoxH = oBox[oBox.length - 1].offsetTop + Math.floor(oBox[oBox.length - 1].offsetHeight / 2);
    var scrollTop = document.body.scrollTop || document.documentElement.scrollTop;
    var height = document.body.clientHeight || document.documentElement.clientHeight;
    if (lastBoxH < (scrollTop + height)) {
        return true;
    } else {
        return false;
    }
}