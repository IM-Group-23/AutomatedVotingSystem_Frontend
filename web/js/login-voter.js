$(document).ready(
    $("#btn-login").click(function () {
        console.log("btn clicked");
        var username = $("#txt-username").val();
        var password = $("#txt-password").val();

        var user = {};
        user.username = username;
        user.password = password;

        console.log(user);
        var user_json = JSON.stringify(user);
        console.log(user_json);

        var ajaxConfig = {
            type: "POST",
            url: "http://localhost:8080/avs/api/v1/voter/login",
            data: user_json,
            contentType: "application/json; charset=utf-8",
            dataType: "json",
            async: true
        };

        $.ajax(ajaxConfig).done(function (response) {
            if (true === response) {
                window.location = "voter/voter-homepage.html";
            } else {
                alert("Wrong Credentials or some other Error occurred");
            }
        });
    })
);
