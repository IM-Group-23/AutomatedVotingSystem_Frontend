$(document).ready(function () {
    checkForElections();
});

function checkForElections() {
    var ajaxConfigParty = {
        method: "GET",
        url: "http://localhost:8080/avs/api/v1/voter/election",
        crossDomain: true,
        async: true
    };

    $.ajax(ajaxConfigParty).done(function (response) {
        if (null == response) {
            $("#div-main").empty();
            $("#div-main").append("<h4>There is no Election for you to Vote today!</h4>");
        } else {
            $("#span-year").text(response.electionType);
            countDown(response);
        }

    });
}

function countDown(response) {
    var countDownTime = response.endTime;
    console.log(countDownTime);

// Update the count down every 1 second
    var x = setInterval(function () {

        // Get todays date and time
        var now = new Date().toTimeString();
        console.log(now);

        // Find the distance between now an the count down date
        var distance = countDownTime - now;

        // Time calculations for days, hours, minutes and seconds
        // var days = Math.floor(distance / (1000 * 60 * 60 * 24));
        var hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        var minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
        var seconds = Math.floor((distance % (1000 * 60)) / 1000);

        // Display the result in an element with id="demo"
        document.getElementById("span-countdown").innerHTML = hours + "h "
            + minutes + "m " + seconds + "s ";

        // If the count down is finished, write some text
        if (distance < 0) {
            clearInterval(x);
            document.getElementById("span-countdown").innerHTML = "EXPIRED";
        }
    }, 1000);
}
