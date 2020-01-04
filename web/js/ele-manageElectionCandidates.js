$(document).ready(function () {
    loadContestants();
    enableTableRowSelection();
    loadData();
});

function loadContestants() {
    var ajaxConfigContestants = {
        method: "GET",
        url: "http://localhost:8080/avs/api/v1/election-commissioner/contestants",
        crossDomain: true,
        async: true
    };

    $.ajax(ajaxConfigContestants).done(function (response) {
        response.forEach(function (contestant) {
            var tableRow = "<tr>" +
                "<td>" + contestant.contestId + "</td>" +
                "<td>" + contestant.name + "</td>" +
                "<td>" + contestant.party + "</td>" +
                "<td class='recycle' style='text-align: center;'><i style='color: #0D0A0A' class='fa fa-window-close'></i></td></tr>";

            $("#tbl-Candidates tbody").append(tableRow);

            $(".recycle").off();
            $(".recycle").click(function () {
                var candidateID = ($(this).parents("tr").find("td:first-child").text());
                if (confirm("Are you sure that you want to delete?")) {
                    $.ajax({
                        method: "DELETE",
                        url: "http://localhost:8080/avs/api/v1/election-commissioner/contestants/" + candidateID,
                        async: true
                    }).done(function (response) {
                        alert("Candidate has been successfully deleted");
                        $("#tbl-Candidates tbody tr").remove();
                        loadContestants();
                    });
                }
            });
        });
    });
}

function loadData() {
    var ajaxConfigProvince = {
        method: "GET",
        url: "http://localhost:8080/avs/api/v1/election-commissioner/provinces",
        crossDomain: true,
        async: true
    };

    $.ajax(ajaxConfigProvince).done(function (response) {
        console.log("got provinces");
        $("#cmb-provinces").empty();
        $("#cmb-provinces").append("<option>--Select--</option>");
        response.forEach(function (province) {
            var provinces = "<option>" +
                province.name +
                "</option>";
            $("#cmb-provinces").append(provinces);
        });
    });

    var ajaxConfigParty = {
        method: "GET",
        url: "http://localhost:8080/avs/api/v1/election-commissioner/parties",
        crossDomain: true,
        async: true
    };

    $.ajax(ajaxConfigParty).done(function (response) {
        $("#cmb-parties").empty();
        $("#cmb-parties").append("<option>--Select--</option>");
        response.forEach(function (party) {
            var parties = "<option>" +
                party.partyInitials +
                "</option>";
            $("#cmb-parties").append(parties);
        });
    });
}

$("#cmb-provinces").change(function () {
    console.log("province changed!");
    var province = $("#cmb-provinces option:selected").val();
    console.log(province);
    var ajaxConfigDistrict = {
        method: "GET",
        url: "http://localhost:8080/avs/api/v1/election-commissioner/districts?action=like&name=" + province,
        crossDomain: true,
        async: true
    };

    $.ajax(ajaxConfigDistrict).done(function (response) {
        $("#cmb-districts").empty();
        $("#cmb-districts").append("<option>--Select--</option>");
        response.forEach(function (district) {
            var districts = "<option>" +
                district.name +
                "</option>";
            $("#cmb-districts").append(districts);
        });
    });
});

$("#cmb-districts").change(function () {
    console.log("district changed!");
    var district = $("#cmb-districts option:selected").val();
    console.log(district);
    var ajaxConfigPollingDivision = {
        method: "GET",
        url: "http://localhost:8080/avs/api/v1/election-commissioner/pollDivs?action=like&name=" + district,
        crossDomain: true,
        async: true
    };

    $.ajax(ajaxConfigPollingDivision).done(function (response) {
        $("#cmb-pollDivs").empty();
        $("#cmb-pollDivs").append("<option>--Select--</option>");
        response.forEach(function (pollDiv) {
            var pollDivs = "<option>" +
                pollDiv.pollName +
                "</option>";
            $("#cmb-pollDivs").append(pollDivs);
        });
    });
});

function enableTableRowSelection() {
    $("#tbl-Candidates tbody tr").click(function () {
        //get row contents into an array
        var tableData = $(this).children("td").map(function () {
            return $(this).text();
        }).get();
        console.log(tableData);
        $("#txt-id").val(tableData[0]);
        $("#txt-name").val(tableData[1]);
        $("#cmb-parties").select(tableData[2]);

        var ajaxConfigContestant = {
            method: "GET",
            url: "http://localhost:8080/avs/api/v1/election-commissioner/contestants/" + tableData[0],
            crossDomain: true,
            async: true
        };

        $.ajax(ajaxConfigContestant).done(function (response) {
            response.forEach(function (contestant) {
                $("#cmb-provinces").select(contestant.province);
                $("#cmb-districts").select(contestant.district);
                $("#cmb-pollDivs").select(contestant.pollDiv);
            });
        });
    });
}

function getData() {
    var id = $("#txt-id").val();
    var name = $("#txt-name").val();
    var party = $("#cmb-party option:selected").val();
    var pollDiv = $("#cmb-pollDiv option:selected").val();
    var district = $("#cmb-district option:selected").val();
    var province = $("#cmb-province option:selected").val();

    var contestant = {};
    contestant.contestId = id;
    contestant.name = name;
    contestant.province = province;
    contestant.district = district;
    contestant.pollDiv = pollDiv;
    contestant.party = party;

    return contestant;
}

$("#btn-add").click(function () {

    var contestant = getData();
    console.log("save" + contestant);

    var contestant_json = JSON.stringify(contestant);

    $.ajax({
        type: "PUT",
        url: "http://localhost:8080/avs/api/v1/election-commissioner/contestants/0a",
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

