$(document).ready(loadData());

function loadData() {
    var grn_json = JSON.stringify(sessionStorage.getItem("user"));


    var ajaxConfigVoters = {
        method: "GET",
        data: grn_json,
        url: "http://localhost:8080/avs/api/v1/grama-niladari/grn/voters",
        crossDomain: true,
        async: true
    };

    $.ajax(ajaxConfigVoters).done(function (response) {
        console.log("Lading data to the table");
        console.log(response);
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
            console.log(response);
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
  

        var voter = {};
        voter.username = id;
        voter.name = name;
        voter.title = title;
        voter.email = email;
        voter.mobile = contact;
        voter.address = address;
        voter.gramaNiladari = sessionStorage.getItem("user");
        
        // is_voted field must be set to 0

        return voter;
    
}

$("#btn-add").click(function () {

    var voter = getData();
    // add polling division from grama niladari data saved in session
    console.log(voter);

    var voter_json = JSON.stringify(voter);

    $.ajax({
        type: "POST",
        url: "http://localhost:8080/avs/api/v1/grama-niladari/grn/voters/add",
        data: voter_json,
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

// $("#btn-update").click(function () {
//     var contestant = getData();

//     console.log("update" + contestant);

//     var contestant_json = JSON.stringify(contestant);

//     $.ajax({
//         type: "POST",
//         url: "http://localhost:8080/avs/api/v1/election-commissioner/contestants/" + contestant.contestId,
//         data: contestant_json,
//         contentType: "application/json; charset=utf-8",
//         dataType: "json",
//         success: function () {
//             alert("Successfully update Candidate");
//         },
//         failed: function () {
//             alert("Error in updating the Candidate");
//         }
//     });
// });

