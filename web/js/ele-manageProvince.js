$(document).ready(loadData());

// load data onto provinces table when page is loaded
function loadData() {
    $("#tbl-provinces tbody").empty();

    var ajaxConfigProvince2 = {
        method: "GET",
        url: "http://localhost:8080/avs/api/v1/election-commissioner/provinces",
        crossDomain: true,
        async: true
    };


    $.ajax(ajaxConfigProvince2).done(function (response) {
        console.log("got provinces");
        response.forEach(function (province) {
            var tableRow = "<tr>" +
                "<td>" + province.id + "</td>" +
                "<td class='i'>" + province.name + "</td>" +
                "<td class='recycle-1'><button type='button' class='btn btn-danger'>X</button> </td></tr>";
            $("#tbl-provinces tbody").append(tableRow);
        });

        $(".recycle-1").off();
        $(".recycle-1").click(function () {
            if (confirm("Are you sure that you want to remove this Province?")) {
                let tr = $(this).closest('tr');
                let id = tr.first().val();
                console.log(id);
                var ajaxProvinceDelete = {
                    method: "DELETE",
                    url: "http://localhost:8080/avs/api/v1/election-commissioner/provinces/"+id,
                    crossDomain: true,
                    async: true
                };
                $(this).closest('tr').remove();
                console.log("removed row");
            }
        });

        // $(document).on("click","#tbl-provinces button.recycle-1",function() {
        //     let tr = $(this).closest('tr');
        //     let id = tr.find('td:eq(1)').val();
        //
        //     alert('Table 1: ' + id);
        // });

    });




    // getting all districts
    var ajaxConfigDistrict = {
        method: "GET",
        url: "http://localhost:8080/avs/api/v1/election-commissioner/districts",
        crossDomain: true,
        async: true
    };

    $.ajax(ajaxConfigDistrict).done(function (response) {
        response.forEach(function (district) {
            var tableRow = "<tr>" +
                "<td>" + district.id + "</td>" +
                "<td>" + district.name + "</td>" +
                "<td class='recycle-2' style='text-align: center;'><i style='color: #0D0A0A' class='fa fa-window-close'></i></td></tr>";
            $("#tbl-districts tbody").append(tableRow);
        });

        $(".recycle-2").off();
        $(".recycle-2").click(function () {
            if (confirm("Are you sure that you want to remove this District?")) {
                $("#tbl-districts tbody tr").remove();
            }
        });
    });

    var ajaxConfigPollingDivision = {
        method: "GET",
        url: "http://localhost:8080/avs/api/v1/election-commissioner/pollDivs",
        crossDomain: true,
        async: true
    };

    $.ajax(ajaxConfigPollingDivision).done(function (response) {
        response.forEach(function (pollDiv) {
            var tableRow = "<tr>" +
                "<td>" + pollDiv.pollId + "</td>" +
                "<td>" + pollDiv.pollName + "</td>" +
                "<td class='recycle-3' style='text-align: center;'><i style='color: #0D0A0A' class='fa fa-window-close'></i></td></tr>";
            $("#tbl-pollDivs tbody").append(tableRow);
        });

        $(".recycle-3").off();
        $(".recycle-3").click(function () {
            if (confirm("Are you sure that you want to remove this Polling Division?")) {
                $("#tbl-pollDivs tbody tr").remove();
            }
        });
    });

}

// from here below - things are not working.. therefore, all the districts and poll divs are just loaded in loadData() function

// ----------------------------------------------------------------------------------------------------------------------------------
// once a row in provinces table is clicked, fill the districts table with the relevant districts of that selected province
$("#tbl-provinces tbody tr").click(function () {

    //get row contents into an array

    // var tableData = $(this).children("td").map(function () {
    //     return $(this).text();
    // }).get();
    // console.log(tableData);

    var province = $('.i',this).html();
    $("#span-province").text(province);

    console.log("province selected!");
    console.log(province);
    var ajaxConfigDistrict = {
        method: "GET",
        url: "http://localhost:8080/avs/api/v1/election-commissioner/districts?action=like&name=" + province,
        crossDomain: true,
        async: true
    };

    $.ajax(ajaxConfigDistrict).done(function (response) {
        response.forEach(function (district) {
            var tableRow = "<tr>" +
                "<td>" + district.id + "</td>" +
                "<td>" + district.name + "</td></tr>" +
                "<td class='recycle-2' style='text-align: center;'><i style='color: #0D0A0A' class='fa fa-window-close'></i></td></tr>";
            $("#tbl-districts tbody").append(tableRow);
        });

        $(".recycle-2").off();
        $(".recycle-2").click(function () {
            if (confirm("Are you sure that you want to remove this District?")) {
                $("#tbl-districts tbody tr").remove();
            }
        });
    });
});

// ----------------------------------------------------------------------------------------------------------------------------------
// once a row in districts table is clicked, fill the polling divisions table with the relevant polling divisions of that selected district
$("#tbl-districts tbody tr").click(function () {
    //get row contents into an array
    var tableData = $(this).children("td").map(function () {
        return $(this).text();
    }).get();
    console.log(tableData);

    var district = val(tableData[1]);
    console.log("district selected!");

    console.log(district);

    $("#span-district").text(district);
    var ajaxConfigPollingDivision = {
        method: "GET",
        url: "http://localhost:8080/avs/api/v1/election-commissioner/pollDivs?action=like&name=" + district,
        crossDomain: true,
        async: true
    };

    $.ajax(ajaxConfigPollingDivision).done(function (response) {
        response.forEach(function (pollDiv) {
            var tableRow = "<tr>" +
                "<td>" + pollDiv.pollId + "</td>" +
                "<td>" + pollDiv.pollName + "</td></tr>" +
                "<td class='recycle-3' style='text-align: center;'><i style='color: #0D0A0A' class='fa fa-window-close'></i></td></tr>";
            $("#tbl-pollDivs tbody").append(tableRow);
        });

        $(".recycle-3").off();
        $(".recycle-3").click(function () {
            if (confirm("Are you sure that you want to remove this Polling Division?")) {
                $("#tbl-pollDivs tbody tr").remove();
            }
        });
    });
});

// ----------------------------------------------------------------------------------------------------------------------------------
// click event for adding a new province
$("#btn-addProvince").click(function () {

    var province = {};
    province.name = $("#txt-province").val();
    console.log("save" + province);

    var province_json = JSON.stringify(province);
    console.log(province_json);

    $.ajax({
        type: "PUT",
        url: "http://localhost:8080/avs/api/v1/election-commissioner/provinces/0a",
        data: province_json,
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        success: function () {
            loadData();
            alert("Successfully added Province");
        },
        failed: function () {
            alert("Error in adding the Province");
        }
    });
});

// ----------------------------------------------------------------------------------------------------------------------------------
// click event for adding a new district for a selected province
$("#btn-addDistrict").click(function () {

    var district = {};
    district.name = $("#txt-district").val();
    district.province = $("#txt-province").val();

    var district_json = JSON.stringify(district);
    console.log(district_json);

    $.ajax({
        type: "POST",
        url: "http://localhost:8080/avs/api/v1/election-commissioner/districts/add",
        data: district_json,
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        success: function () {
            alert("Successfully added District");
        },
        failed: function () {
            alert("Error in adding the District");
        }
    });
});

// ----------------------------------------------------------------------------------------------------------------------------------
// click event for adding a polling division for a selected district of a selected province
$("#btn-addPollDiv").click(function () {

    var pollDiv = {};
    pollDiv.name = $("#txt-pollDiv").val();
    pollDiv.province = $("#txt-province").val();
    pollDiv.electoralDistrict = $("#txt-district").val();

    var pollDiv_json = JSON.stringify(pollDiv);
    console.log(pollDiv_json);

    $.ajax({
        type: "POST",
        url: "http://localhost:8080/avs/api/v1/election-commissioner/pollDivs/add",
        data: pollDiv_json,
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        success: function () {
            alert("Successfully added Polling Division");
        },
        failed: function () {
            alert("Error in adding the Polling Division");
        }
    });
});

