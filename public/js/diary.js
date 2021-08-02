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
    new_button += ".png'></button>";
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
                    dMonth = result[i].date.substr(5,2);
                    dDate = result[i].date.substr(8,2);
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
                    dMonth = result[i].date.substr(5,2);
                    dDate = result[i].date.substr(8,2);
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
                    dMonth = result[i].date.substr(5,2);
                    dDate = result[i].date.substr(8,2);
                    dEmotion = String(result[i].emotion);
                    new_button();
                }
            }
        }
    });
    reverse_month();
});

//일기 선택시 팝업 뜨면서 상세보기
$(".memo").on("click", function() {
    $.ajax({
        url: '/diary_check',
        dataType: 'json',
        type: 'POST',
        data: {'data':date},
        success: function(result) {
            if (result) {
                console.log("완료");
            }
        }
    });
    window.open('/popup','팝업', "height=700, width=700");
});

//팝업 구현만 하면 끝 !!!!!!