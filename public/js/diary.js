var now = new Date();
var month = now.getMonth()+1;
var date = $(".memo p").text();

$(function() {
    //년도, 달 현재로 띄움
    $("#date span").text(now.getFullYear()+"년 "+month+"월");
});

//햄버거 메뉴 슬라이드
$("#gnb button").on("click", function() {
    $("#ham_gnb").slideToggle();
});

//이전 달, 다음 달로 이동 (아마 ajax로 목록 업데이트 해야할 듯?)
$("#left").on("click", function() {
    month -= 1;
    $("#date span").text(now.getFullYear()+"년 "+month+"월");
});
$("#right").on("click", function() {
    month += 1;
    $("#date span").text(now.getFullYear()+"년 "+month+"월");
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
    }); //서버에 날짜 보내서 서버에서 날짜에 따른 내용 찾고 다시 여기로 보내주고 그걸 팝업페이지에 넘기는거 구현하기
    window.open('/popup','팝업', "height=700, width=700");
});