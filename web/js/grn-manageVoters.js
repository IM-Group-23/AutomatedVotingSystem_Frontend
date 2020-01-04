$(document).ready(loadData());

function loadData() {
    var ajaxConfigVoters = {
        method: "GET",
        url: "http://localhost:8080/avs/api/v1/election-commissioner/voters",
        crossDomain: true,
        async: true
    };

    $.ajax(ajaxConfigVoters).done(function (response) {
        response.forEach(function (voter) {
            var tableRow = "<tr>" +
                "<td>" + voter.username + "</td>" +
                "<td>" + voter.name + "</td>" +
                "<td>" + voter.email + "</td>" +
                "<td><i class=\"fa fa-window-close\"></i></td></tr>";

            $("#tbl-Voters tbody").append(tableRow);
        });
    });

    enableTableRowSelection();
}

function enableTableRowSelection() {
    $("#tbl-Voters tbody tr").click(function () {
        //get row contents into an array
        var tableData = $(this).children("td").map(function () {
            return $(this).text();
        }).get();

        $("#txt-id").val(tableData[0]);
        $("#txt-name").val(tableData[1]);
        $("#txt-email").val(tableData[2]);

        var ajaxConfigVoter = {
            method: "GET",
            url: "http://localhost:8080/avs/api/v1/election-commissioner/voters/" + tableData[0],
            crossDomain: true,
            async: true
        };

        $.ajax(ajaxConfigVoter).done(function (response) {
            response.forEach(function (voter) {
                $("#cmb-title").select(voter.title);
                $("#txt-address").val(voter.address);
                $("#txt-contact").select(voter.mobile);
            });
        });
    });
}

function getData() {
    var id = $("#txt-id").val();
    var name = $("#txt-name").val();
    var title = $("#cmb-title option:selected").val();
    var email = $("#txt-email").val();
    var address = $("#txt-address").val();
    var contact = $("#txt-contact").val();
    if ($("#txt-pass").val() === $("#txt-confirmPass").val()) {
        var password = $("#txt-contact").val();

        var voter = {};
        voter.username = id;
        voter.password = password;
        voter.name = name;
        voter.title = title;
        voter.email = email;
        voter.mobile = contact;
        voter.address = address;

        return voter;
    }else {
        alert("Password doesn't match");
    }
}

$("#btn-add").click(function () {

    var voter = getData();
    console.log("save" + voter);

    var contestant_json = JSON.stringify(voter);

    $.ajax({
        type: "PUT",
        url: "http://localhost:8080/avs/api/v1/election-commissioner/voters/0a",
        data: contestant_json,
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        success: function () {
            alert("Successfully added Candidate");
        },
        failed: function () {
            alert("Error in adding the Candidate");
        }
    });
});

$("#btn-update").click(function () {
    var contestant = getData();

    console.log("update" + contestant);

    var contestant_json = JSON.stringify(contestant);

    $.ajax({
        type: "POST",
        url: "http://localhost:8080/avs/api/v1/election-commissioner/contestants/" + contestant.contestId,
        data: contestant_json,
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        success: function () {
            alert("Successfully update Candidate");
        },
        failed: function () {
            alert("Error in updating the Candidate");
        }
    });
});

