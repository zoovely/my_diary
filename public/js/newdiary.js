var now = new Date();
var month = now.getMonth()+1;
var weekend = ['일요일', '월요일', '화요일', '수요일', '목요일', '금요일', '토요일'];
var rest = [];

//오늘 날짜 띄우기
$(function() {
    $("#date p").text(month+"월 "+now.getDate()+"일 "+weekend[now.getDay()]);
    //일요일은 빨간색, 토요일은 파란색으로 출력
    if(weekend[now.getDay()]=='일요일') {
        $("#date p").css("color","tomato");
    } else if(weekend[now.getDay()]=='토요일') {
        $("#date p").css("color","cornflowerblue");
    }

    $.ajax({
        type: "POST",
        url: '/api',
        dataType: "xml",
        success: function(data) {
            $(data).find("locdate").each(function() {
                rest.push($(this).text());
            });
        }
    });

    var today = String(now.getFullYear());
    if(String(month).length==1) {
        today += '0' + String(month);
    } else {
        today += String(month);
    }
    today += String(now.getDate());

    for(i in rest) {
        if(today == rest[i]) {
            $("#date p").css("color","tomato");
        }
    }
});

//햄버거 메뉴 슬라이드
$("#gnb button").on("click", function() {
    $("#ham_gnb").slideToggle();
});


