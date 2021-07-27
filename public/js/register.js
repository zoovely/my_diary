$("input[type=submit]").on("click", function() {
    var pw = $("#pw").val();
    var pw_check = $("#pw_check").val();

    if(!(pw===pw_check)) {
        $("#pw_warn").css("display","block");
    }
});