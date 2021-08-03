$(function() {
    var result = JSON.parse(localStorage.getItem("readdiary"));

    //요일 구하기
    var weekend = ['일요일', '월요일', '화요일', '수요일', '목요일', '금요일', '토요일'];
    var day = new Date(result[0]).getDay();
    day = weekend[day];
    //날짜 월, 일 형식으로 바꾸기
    var date = result[0].split('-',3);
    date.shift();
    for(i in date) {
        if(date[i].charAt(0) == '0')
        date[i] = date[i]-'0';
    }
    var inputdate = date[0] + '월 ' + date[1] + '일 ' + day;
    $("#date p").text(inputdate);

    var appemotion = "<img src='/img/";
    appemotion += result[1].emotion;
    appemotion += ".png'>"
    $("#emotion").append(appemotion);

    $("#sentence").append(result[1].sentence);
    $("#happy").append(result[1].happy);
    $("#hard").append(result[1].hard);
    $("#tomorrow").append(result[1].tomorrow);
});