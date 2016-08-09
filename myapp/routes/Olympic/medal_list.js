var request = require('request');
var cherrio = require('cheerio');
var express = require('express');

var router = express.Router();

var options = {
    url: "",
    headers: {
        "User-Agent": "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_11_1) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/48.0.2564.109 Safari/537.36 Query String Parameters view source view URL encoded",
        "Accept-Language": "zh-CN,zh;q=0.8,en;q=0.6"
    }
};

options.url = "http://2016.cctv.com/data/olympic/medal/count.xml";
var olympic = {};

// olympic = {
//     status: "success",
//     countryTotal: "",
//     medalTotal: "",
//     medal_list: [
//         {
//             No: "",
//             country: "",
//             gold: "",
//             silver: "",
//             bronze: "",
//             sum: ""
//         }
//     ]
// };

router.get('/', function (req, res) {

    var _res = res;

    request(options, function (error, req, body) {

        var $ = cherrio.load(body);
        // console.log($.fn._originalRoot.children[2].children[0].next.children[0].next.children[0].data);
        // console.log($.fn._originalRoot.children[2].children[1].children[1].children[0].data);
        // console.log($.fn._originalRoot.children[2].children[1].children[3].children[0].data);
        // console.log($.fn._originalRoot.children[2].children[1].children[5].children[0].data);
        // console.log($.fn._originalRoot.children[2].children[1].children[7].children[0].data);
        // console.log($.fn._originalRoot.children[2].children[1].children[9].children[0].data);
        // console.log($.fn._originalRoot.children[2].children[1].children[11].children[0].data);
        // console.log($.fn._originalRoot.children[2].children.length);

        if (!error && res.statusCode == 200) {
            var medal_list = [];
            olympic.status = 200;
            var medal_sum = 0;
            var medal_country = 0;
            for (var i = 0; i < $.fn._originalRoot.children[2].children.length; i++) {
                var medal = {};
                if (i % 2 != 0) {
                    var msg = $.fn._originalRoot.children[2].children[i];
                    medal.No = msg.children[1].children[0].data;
                    medal.country = msg.children[3].children[0].data;
                    medal.gold = msg.children[5].children[0].data;
                    medal.silver = msg.children[7].children[0].data;
                    medal.bronze = msg.children[9].children[0].data;
                    medal.sum = msg.children[11].children[0].data;
                    medal_sum += Number(medal.sum);
                    medal_list.push(medal);
                    medal_country++;
                }
            }
            olympic.medalTotal = medal_sum;
            olympic.countryTotal = medal_country;
            olympic['medal_list'] = medal_list;
        }

        _res.status(200)
            .jsonp(olympic);
    })

});


module.exports = router;