
// Results Configurations

var ajaxConfigResults = {
    method: "POST",
    url: "http://localhost:8080/avs/api/v1/election-commissioner/election/results",
    crossDomain: true,
    async: true
};

// $.ajax(ajaxConfigResults).done(function (response) {
//     $("#span-districts").text(response);
// });



$.ajax(ajaxConfigResults).done(function (response) {
    console.log("Results received are as below");
    console.log(response);


    var winner = response.winner;
    var winner_string = "&nbsp;&nbsp;&nbsp; " + winner.candidateNO + ". " + winner.contestName + " &nbsp;&nbsp;&nbsp; with " + winner.noOfVotes + " votes";
    $("#winner").append(winner_string);

    var this_string = "" + response.electionType + " on " + response.date + "<br />" + response.startTime + " - " + response.endTime;
    $("#electionDetails").append(this_string);

    var candidates = response.candidates;

    candidates.forEach(function (candidate) {
        var tableRow = "<tr>" +
            "<td>" + candidate.candidateNO + "</td>" +
            "<td>" + candidate.contestName + "</td>" +
            "<td>" + district.noOfVotes + "</td></tr>";
        $("#tbl-districts tbody").append(tableRow);
    });
});


