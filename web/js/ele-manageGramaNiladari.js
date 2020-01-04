$(document).ready(function () {
    loadGramaNiladari();
    // enableTableRowSelection();
    loadData();
});

function loadGramaNiladari() {
    var ajaxConfigContestants = {
        method: "GET",
        url: "http://localhost:8080/avs/api/v1/election-commissioner/grn",
        crossDomain: true,
        async: true
    };

    $.ajax(ajaxConfigContestants).done(function (response) {
        response.forEach(function (grn) {
            var tableRow = "<tr>" +
                "<td>" + grn.username + "</td>" +
                "<td>" + grn.name + "</td>" +
                "<td>" + grn.gnProvision + "</td>" +
                "<td>" + grn.district + "</td>" +
                "<td class='recycle' style='text-align: center;'><i style='color: #0D0A0A' class='fa fa-window-close'></i></td></tr>";

            $("#tbl-grn tbody").append(tableRow);

            $(".recycle").off();
            $(".recycle").click(function () {
                var username = ($(this).parents("tr").find("td:first-child").text());
                if (confirm("Are you sure that you want to delete?")) {
                    $.ajax({
                        method: "DELETE",
                        url: "http://localhost:8080/avs/api/v1/election-commissioner/grn/" + username,
                        async: true
                    }).done(function (response) {
                        alert("Grama Niladaro has been successfully removed");
                        $("#tbl-grn tbody tr").remove();
                        // loadGramaNiladari();
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

// function enableTableRowSelection() {
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

// }

function getData() {
    var username = $("#txt-username").val();
    var name = $("#txt-name").val();
    var title = $("#cmb-title option:selected").val();
    var pollDiv = $("#cmb-pollDiv option:selected").val();
    var district = $("#cmb-district option:selected").val();
    var province = $("#cmb-province option:selected").val();
    var gnProvision = $("#txt-gnProvision").val();
    var email = $("#txt-email").val();
    var contact = $("#txt-contact").val();
    if ($("#txt-pass").val() === $("#txt-confirmPass").val()) {
        var password = $("#txt-contact").val();

        var grn = {};
        grn.username = username;
        grn.password= password;
        grn.name = name;
        grn.title = title;
        grn.email = email;
        grn.mobile = contact;
        grn.province = province;
        grn.district = district;
        grn.pollDiv = pollDiv;
        grn.gnProvision = gnProvision;

        return grn;
    }
    else {
        alert("Password doesn't match!");
    }
}

$("#btn-add").click(function () {

    var grn = getData();
    console.log("save" + grn);

    var grn_json = JSON.stringify(grn);

    $.ajax({
        type: "PUT",
        url: "http://localhost:8080/avs/api/v1/election-commissioner/grn/"+$("#txt-username").val(),
        data: grn_json,
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        success: function () {
            alert("Successfully added Grama Niladari");
        },
        failed: function () {
            alert("Error in adding the Grama Niladari");
        }
    });
});

$("#btn-update").click(function () {
    var grn = getData();

    console.log("update" + grn);

    var grn_json = JSON.stringify(grn);

    $.ajax({
        type: "POST",
        url: "http://localhost:8080/avs/api/v1/election-commissioner/grn/" + $("#txt-username").val(),
        data: grn_json,
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        success: function () {
            alert("Successfully updated Grama Niladari");
        },
        failed: function () {
            alert("Error in updating the Grama Niladari");
        }
    });
});

