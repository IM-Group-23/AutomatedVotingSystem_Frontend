$(document).ready(loadData());

function loadData() {
    //province
    var ajaxConfigProvince1 = {
        method: "GET",
        url: "http://localhost:8080/avs/api/v1/election-commissioner/provinces?action=count",
        crossDomain: true,
        async: true
    };

    var ajaxConfigProvince2 = {
        method: "GET",
        url: "http://localhost:8080/avs/api/v1/election-commissioner/provinces",
        crossDomain: true,
        async: true
    };

    $.ajax(ajaxConfigProvince1).done(function (response) {
        $("#span-provinces").text(response);
    });

    $.ajax(ajaxConfigProvince2).done(function (response) {
        response.forEach(function (province) {
            var tableRow = "<tr>" +
                "<td>" + province.id + "</td>" +
                "<td>" + province.name + "</td></tr>";
            $("#tbl-provinces tbody").append(tableRow);
        });
    });
    //districts
    var ajaxConfigDistrict1 = {
        method: "GET",
        url: "http://localhost:8080/avs/api/v1/election-commissioner/districts?action=count",
        crossDomain: true,
        async: true
    };

    var ajaxConfigDistrict2 = {
        method: "GET",
        url: "http://localhost:8080/avs/api/v1/election-commissioner/districts",
        crossDomain: true,
        async: true
    };

    $.ajax(ajaxConfigDistrict1).done(function (response) {
        $("#span-districts").text(response);
    });

    $.ajax(ajaxConfigDistrict2).done(function (response) {
        response.forEach(function (district) {
            var tableRow = "<tr>" +
                "<td>" + district.id + "</td>" +
                "<td>" + district.name + "</td></tr>";
            $("#tbl-districts tbody").append(tableRow);
        });
    });
    //pollDivs
    var ajaxConfigPollDiv1 = {
        method: "GET",
        url: "http://localhost:8080/avs/api/v1/election-commissioner/pollDivs?action=count",
        crossDomain: true,
        async: true
    };

    var ajaxConfigPollDiv2 = {
        method: "GET",
        url: "http://localhost:8080/avs/api/v1/election-commissioner/pollDivs",
        crossDomain: true,
        async: true
    };

    $.ajax(ajaxConfigPollDiv1).done(function (response) {
        $("#span-pollDivs").text(response);
    });

    $.ajax(ajaxConfigPollDiv2).done(function (response) {
        response.forEach(function (pollDiv) {
            var tableRow = "<tr>" +
                "<td>" + pollDiv.pollId + "</td>" +
                "<td>" + pollDiv.pollName + "</td></tr>";
            $("#tbl-pollDivs tbody").append(tableRow);
        });
    });
    //party
    var ajaxConfigParty = {
        method: "GET",
        url: "http://localhost:8080/avs/api/v1/election-commissioner/parties?action=count",
        crossDomain: true,
        async: true
    };

    $.ajax(ajaxConfigParty).done(function (response) {
        $("#span-parties").text(response);
    });
    //elections
    var ajaxConfigElection = {
        method: "GET",
        url: "http://localhost:8080/avs/api/v1/election-commissioner/elections?action=count",
        crossDomain: true,
        async: true
    };

    $.ajax(ajaxConfigElection).done(function (response) {
        $("#span-elections").text(response);
    });

    //candidates
    var ajaxConfigCandidate = {
        method: "GET",
        url: "http://localhost:8080/avs/api/v1/election-commissioner/contestants?action=count",
        crossDomain: true,
        async: true
    };

    $.ajax(ajaxConfigCandidate).done(function (response) {
        $("#span-candidates").text(response);
    });

    //voters
    var ajaxConfigVoter = {
        method: "GET",
        url: "http://localhost:8080/avs/api/v1/election-commissioner/voters?action=count",
        crossDomain: true,
        async: true
    };

    $.ajax(ajaxConfigVoter).done(function (response) {
        $("#span-voters").text(response);
    });

    //grn
    var employees = 0;
    var ajaxConfigGrn = {
        method: "GET",
        url: "http://localhost:8080/avs/api/v1/election-commissioner/grn?action=count",
        crossDomain: true,
        async: true
    };
    $.ajax(ajaxConfigGrn).done(function (response) {
        console.log("grn count = "+response);
        employees = employees + response;
        console.log(employees);
        $("#span-employees").text(employees);
    });
    console.log(employees);

}
