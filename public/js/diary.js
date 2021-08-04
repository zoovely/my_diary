var now = new Date();
var month = now.getMonth()+1;
var year = now.getFullYear();

function convert_month() {
    if(String(month).length == 1) {
        month = '0'+ String(month);
    } else {
        month = String(month);
    }
}
function reverse_month() {
    String(month).replace("0","");
    month = Number(month);
}

var dMonth, dDate, dEmotion;
function new_button() {
    var new_button = "<button class='memo'><p>";
    new_button += dMonth;
    new_button += "월 ";
    new_button += dDate;
    new_button += "일</p><img src='/img/";
    new_button += dEmotion;
    new_button += ".png' alt='emotion'></button>";
    $("#list").append(new_button);
}

$(function() {
    //년도, 달 현재로 띄움
    $("#date span").text(year+"년 "+month+"월");

    //일기 목록 가져오기
    $.ajax({
        url: '/diary_list',
        dataType: 'json',
        type: 'POST',
        success: function(result) {
            if(result == '0') {
                $("#list").text("작성한 일기가 없습니다.");
            }
            else {
                for(i in result) {
                    dMonth = Number(result[i].date.substr(5,2));
                    dDate = Number(result[i].date.substr(8,2));
                    dEmotion = String(result[i].emotion);
                    convert_month();
                    if(dMonth == month) {
                        new_button();
                    }
                }
            }
        }
    });
});

//햄버거 메뉴 슬라이드
$("#gnb button").on("click", function() {
    $("#ham_gnb").slideToggle();
});

//이전 달, 다음 달로 이동
$("#left").on("click", function() {
    --month;

    if(month == 0) {
        month = 12;
        year--;
    }
    $("#date span").text(year+"년 "+month+"월");
    
    convert_month();
    var date = String(year)+'-'+month;

    $("#list").children().remove();
    $("#list").text('');
    
    $.ajax({
        url: '/diary_update',
        dataType: 'json',
        type: 'POST',
        data: {'data': date},
        success: function(result) {
            if (result == '0') {
                $("#list").text("작성한 일기가 없습니다.");
            } else {
                for(i in result) {
                    console.log(result);
                    dMonth = Number(result[i].date.substr(5,2));
                    dDate = Number(result[i].date.substr(8,2));
                    dEmotion = String(result[i].emotion);
                    new_button();
                }
            }
        }
    });
    reverse_month();
});

$("#right").on("click", function() {
    ++month;

    if(month == 13) {
        month = 1;
        ++year;
    }
    $("#date span").text(year+"년 "+month+"월");

    convert_month();
    var date = String(year)+'-'+month;

    $("#list").children().remove();
    $("#list").text('');

    $.ajax({
        url: '/diary_update',
        dataType: 'json',
        type: 'POST',
        data: {'data': date},
        success: function(result) {
            if (result == '0') {
                $("#list").text("작성한 일기가 없습니다.");
            } else {
                for(i in result) {
                    console.log(result);
                    dMonth = Number(result[i].date.substr(5,2));
                    dDate = Number(result[i].date.substr(8,2));
                    dEmotion = String(result[i].emotion);
                    new_button();
                }
            }
        }
    });
    reverse_month();
});

//일기 선택시 상세보기로 넘어감
$(document).on("click", ".memo", function() {
    var memodate = $(this).children('p').text();
    memodate = memodate.split('일', 1);
    memodate = memodate[0].replace(/ /gi, '')
    memodate = memodate.split('월');
    for(i in memodate) {
        if(memodate[i].length==1) {
            memodate[i] = '0'+memodate[i];
        }
    }

    var memoyear = $("#date span").text();
    memoyear = memoyear.split('년',1);

    var clickdate = memoyear + '-' + memodate[0] + '-' + memodate[1];

    $.ajax({
        url: '/diary_check',
        dataType: 'json',
        type: 'POST',
        data: {'data':clickdate},
        success: function(result) {
            if (result) {
                localStorage.setItem("readdiary", JSON.stringify(result));
                location.href="/read_diary";
            }
        }
    });
});