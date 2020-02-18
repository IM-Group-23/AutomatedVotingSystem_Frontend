$(document).ready(loadData());

function loadData() {
    var ajaxConfigProvince = {
        method: "GET",
        url: "http://localhost:8080/avs/api/v1/election-commissioner/provinces",
        crossDomain: true,
        async: true
    };

    $.ajax(ajaxConfigProvince).done(function (response) {
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

    // buttonClickFuncs();
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

$("#btn-getCandidates").click(function () {
    console.log("btn clicked");
    var pollDiv = $("#cmb-pollDivs option:selected").val();
    var party = $("#cmb-parties option:selected").val();
    console.log(pollDiv + "-" + party);
    var ajaxConfigContestants = {
        method: "GET",
        url: "http://localhost:8080/avs/api/v1/election-commissioner/contestants?action=like&details=" + pollDiv + "," + party,
        crossDomain: true,
        async: true
    };

    $.ajax(ajaxConfigContestants).done(function (response) {
        $("#cmb-candidates").empty();
        $("#cmb-candidates").append("<option>--Select--</option>");
        response.forEach(function (contestant) {
            var contestants = "<option>" +
                contestant.name +
                "</option>";
            $("#cmb-candidates").append(contestants);
        });
    });
});

var tbl_rowCount = 0;

$("#btn-enrollCandidate").click(function () {
    console.log("btn clicked");
    var candidateNo = $("#txt-candidateNo").val();
    var candidate = $("#cmb-candidates option:selected").val();
    var party = $("#cmb-parties option:selected").val();
    var pollDiv = $("#cmb-pollDivs option:selected").val();
    var district = $("#cmb-districts option:selected").val();
    var province = $("#cmb-provinces option:selected").val();

    var tableRow = "<tr id='" + tbl_rowCount + "'>" +
        "<td>" + candidateNo + "</td>" +
        "<td>" + candidate + "</td>" +
        "<td>" + party + "</td>" +
        "<td>" + pollDiv + "</td>" +
        "<td>" + district + "</td>" +
        "<td>" + province + "</td>" +
        "<td class='recycle' id="+tbl_rowCount+"  style='text-align: center;'> <i style='color: #0D0A0A' class='fa fa-window-close'></i></td></tr>";

    $("#tbl-Candidates tbody").append(tableRow);
    tbl_rowCount++;
    $(".recycle").off();
    $(".recycle").click(function (event) {
        console.log(this);
        if (confirm("Are you sure that you want to remove this Candidate?")) {
            $("#"+event.target.id).remove();
        }
    });
});

$("#btn-declareElection").click(function () {
    var election = {};
    election.date = $("#txt-date").val();
    election.startTime = $("#txt-startTime").val();
    election.endTime = $("#txt-endTime").val();
    election.electionType = $("#cmb-electionType option:selected").val();

    var contestantDetails = [];


    /*******************************Dilini's Code****************************************** */
    // var j = 0;
    // $("#tbl-Candidates table tbody").find('tr').each(function () {
    //     console.log("going throw table rows");
    //     var $tds = $(this).find('td'),
    //         candidateNum = $tds.eq(0).text(),
    //         candidateName = $tds.eq(2).text();
    //         contestantDetails[j] = [candidateName,candidateNum];
    //         j++;
    // });
    /******************************************************************************************* */
    /****************************Udith 's Code ************************************************* */


    var myTab = document.getElementById('tbl-Candidates');

    // LOOP THROUGH EACH ROW OF THE TABLE AFTER HEADER.
    for (i = 1; i < myTab.rows.length; i++) {

        // GET THE CELLS COLLECTION OF THE CURRENT ROW.
        var objCells = myTab.rows.item(i).cells;

        candidateNum = objCells.item(0).innerHTML;
        candidateName = objCells.item(1).innerHTML;

        var candidate = {};
        candidate.contestName=candidateName;
        candidate.candidateNO=candidateNum;
        
        contestantDetails[i - 1] = candidate;

    }




    /****************************************************************************************** */


    election.candidates = contestantDetails;

    console.log("Below is the form");
    console.log(election);

    var election_json = JSON.stringify(election);
    console.log(election_json);



    var ajaxConfigElection = {
        method: "POST",
        url: "http://localhost:8080/avs/api/v1/election-commissioner/elections/add",
        crossDomain: true,
        async: true,
        data: election_json,
        contentType: "application/json; charset=utf-8",
        dataType: "json",
    };

    $.ajax(ajaxConfigElection).done(function (response) {
        if (response === true) {
            alert("Election Successfully Declared!");
        }
    });

});




