$(document).ready(
    $("#btn-login").click(function () {
        console.log("btn clicked");
        var username = $("#txt-username").val();
        var password = $("#txt-password").val();
        var radioValue = $("input[name='admin']:checked").val();
        console.log(radioValue);

        var user = {};
        user.username = username;
        user.password = password;

        console.log(user);
        var user_json = JSON.stringify(user);
        console.log(user_json);

        var ajaxConfig = {
            type: "POST",
            url: "http://localhost:8080/avs/api/v1/general/" + radioValue,
            data: user_json,
            contentType: "application/json; charset=utf-8",
            dataType: "json",
            async: true
        };

        $.ajax(ajaxConfig).done(function (response) {
            if (true === response) {
                if ("ele".localeCompare(radioValue)) {
                    window.location = "grama_niladari/grn-dashboard.html";
                } else if ("grn".localeCompare(radioValue)) {
                    window.location = "election_commisioner/ele-dashboard.html";

                }
            } else {
                alert("Wrong Credentials or some other Error occurred");
            }
        });
    })
);
