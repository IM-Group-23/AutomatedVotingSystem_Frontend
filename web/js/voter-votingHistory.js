$(document).ready(loadData());

function loadData() {
    var ajaxConfigVotes = {
        method: "GET",
        url: "http://localhost:8080/avs/api/v1/voter/election/history",
        crossDomain: true,
        async: true
    };

    $.ajax(ajaxConfigVotes).done(function (response) {
        console.log(response);
        var i = 1;
        response.forEach(function (vote) {
            var tableRow = "<tr>" +
                "<td>" + i + "</td>" +
                "<td>" + vote.election.electionType + "</td>" +
                "<td>" + vote.election.date + "</td>" +
                "<td>" + vote.contestant.party + "</td>" +
                "<td>" + vote.contestant.name + "</td>" +
                "</tr>";
            i++;
            $("#tbl-history tbody").append(tableRow);
        });
    });
}