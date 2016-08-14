window.onload = function () {
    getMedal();
}

function getMedal() {
    url = "http://localhost:3000/olympic/medal_list";
    jQuery(document).ready(function () {
        $.ajax({
            type: "get",
            async: false,
            url: url,
            dataType: "jsonp",
            jsonp: "callback",//传递给请求处理程序或页面的，用以获得jsonp回调函数名的参数名(一般默认为:callback)
            jsonpCallback: "flightHandler",//自定义的jsonp回调函数名称，默认为jQuery自动生成的随机函数名，也可以写"?"，jQuery会自动为你处理数据
            success: function (json) {
                html = '';
                for (var i = 0; i <= json.medal_list.length - 1; i++) {
                    // $("#medal_list").append("<tr class = \"list_tr\"></tr>");       
                    //  $(".list_tr").append("<th>" + json.medal_list[i].No + "</th>");
                    //  $(".list_tr").append("<th>" + json.medal_list[i].country + "</th>");
                    //  $(".list_tr").append("<th>" + json.medal_list[i].gold + "</th>");
                    //  $(".list_tr").append("<th>" + json.medal_list[i].silver + "</th>");
                    //  $(".list_tr").append("<th>" + json.medal_list[i].bronze + "</th>");
                    //  $(".list_tr").append("<th>" + json.medal_list[i].sum + "</th>");

                    html += '<tr><td width="55" class="td_01">' + json.medal_list[i].No + '</td><td width="371"><a href="#" >' + json.medal_list[i].country + '</a></td><td width="145"><a href="#" >' + json.medal_list[i].gold + '</a></td><td width="122"><a href="#" >' + json.medal_list[i].silver + '</a></td><td width="117"><a href="#" >' + json.medal_list[i].bronze + '</a></td><td width="188" class="last"><a href="#" >' + json.medal_list[i].sum + '</a></td></tr>'
                }
                $("#medal_list").append(html);
            },
            error: function () {
                alert('fail');
            }
        });
    });
}
