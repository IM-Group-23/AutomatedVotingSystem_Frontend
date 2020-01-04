$(document).ready(loadData());

function loadData() {
    var ajaxConfig = {
        method: "GET",
        url: "http://localhost:8080/avs/api/v1/election-commissioner/grn",
        crossDomain: true,
        async: true
    };

    $.ajax(ajaxConfig).done(function (response) {
        console.log(response);
        if (null === response) {
            var tableRow = "<tr><td colspan=5>No Data to Display</td></tr>";
            $("#tbl-voters tbody").append(tableRow);
        } else {
            var i = 1;
            response.forEach(function (grn) {
                var voterCount = 0;
                console.log(grn.voters);
                if (null != grn.voters)
                    voterCount = Object.keys(grn.voters).length;
                var tableRow = "<tr>" +
                    "<td>" + i + "</td>" +
                    "<td>" + voterCount + "</td>" +
                    "<td>" + grn.gnProvision + "</td>" +
                    "<td>" + grn.pollDiv + "</td>" +
                    "<td>" + grn.district + "</td>" +
                    "</tr>";
                i++;
                $("#tbl-voters tbody").append(tableRow);
            });
        }
    });

    var ajaxConfigVoter = {
        method: "GET",
        url: "http://localhost:8080/avs/api/v1/election-commissioner/voters?action=count",
        crossDomain: true,
        async: true
    };

    $.ajax(ajaxConfigVoter).done(function (response) {
        $("#span-voters").text(response);
    });
}