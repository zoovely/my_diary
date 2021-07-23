$("button a").on("click", function() {
    var name = $("#name").val();
    var pw = $("#pw").val();
    var pw_check = $("#pw_check").val();

    if(name=='' || pw=='' || pw_check=='') {
        alert("빈칸을 모두 작성해주세요.");
    } else {
        if(!(pw===pw_check)) {
            $("#pw_warn").css("display","block");
        } else {
            $("#pw_warn").css("display","none");
            alert(name+"님 환영합니다! 로그인 페이지에서 로그인해주세요.");
            location.href = "/";
        }
    }
});