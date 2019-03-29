// Removes all record data from localStorage
$("#btnClearHistory").click(function () {
  localStorage.removeItem("tbRecords");
  listRecords();
  alert("All records have been deleted.");
});

/* The value of the Submit Record button is used
 * to determine which operation should be
 * performed
 */
$("#btnAddRecord").click(function () {
  /*.button("refresh") function forces jQuery
   * Mobile to refresh the text on the button
   */
  $("#btnSubmitRecord").val("Add").button(
    "refresh");
});

$("#frmNewRecordForm").submit(function () {
  var formOperation = $("#btnSubmitRecord").val();

  if (formOperation == "Add") {
    addRecord();
    $.mobile.changePage("#pageRecords");
  } else if (formOperation == "Edit") {
    editRecord($("#btnSubmitRecord").attr(
      "indexToEdit"));
    $.mobile.changePage("#pageRecords");
    $("#btnSubmitRecord").removeAttr(
      "indexToEdit");
  }

  /*Must return false, or else submitting form
   * results in reloading the page
   */
  return false;
});

$("#pageNewRecordForm").on("pageshow", function () {
  //We need to know if we are editing or adding a record everytime we show this page
  //If we are adding a record we show the form with blank inputs
  var formOperation = $("#btnSubmitRecord").val();

  if (formOperation == "Add") {
    clearRecordForm();
  } else if (formOperation == "Edit") {
    //If we are editing a record we load the stored data in the form
    showRecordForm($("#btnSubmitRecord").attr(
      "indexToEdit"));
  }
});

//---------------------------->>
function loadUserInformation() { //changed
  var user = [];
  try {
     user = JSON.parse(localStorage.getItem(
      "user"));
  } catch (e) {
    /* Google browsers use different error
     * constant
     */
    if (window.navigator.vendor ===
      "Google Inc.") {
      if (e == DOMException.QUOTA_EXCEEDED_ERR) {
        alert(
          "Error: Local Storage limit exceeds."
        );
      }
    } else if (e == QUOTA_EXCEEDED_ERR) {
      alert("Error: Saving to local storage.");
    }

    console.log(e);
  }
  if (user != null) {
    $("#divUserSection").empty();

    $("#divUserSection").append("User's Name:" +
      user.FirstName + " " + user.LastName +
      "<br>DOB: " + user.DateOfBirth +
      "<br>Email: " + user.SINNumber +
      "<br>Gender : " + user.Gender
      );
    $("#divUserSection").append(
      "<br><a href='#pageUserInfo' data-mini='true' data-role='button' data-icon='edit' data-iconpos='left' data-inline='true' >Edit Profile</a>"
    );
    $('#divUserSection [data-role="button"]').button(); // 'Refresh' the button
  }
}//end

function clearRecordForm() {
  $('#datExpenseDate').val("");
  $('#txtType').val("");
  $('#txtAmount').val("");
  //$('#txtSynthroidDose').val("");
  return true;
}

function compareDates(a, b) {
  var x = new Date(a.Date);
  var y = new Date(b.Date);

  if (x > y) {
    return 1;
  } else {
    return -1;
  }
}

//------------------------>>
function listRecords() {
  var tbRecords = [];
  try {
    tbRecords = JSON.parse(localStorage.getItem(
      "tbRecords"));
  } catch (e) {
    /* Google browsers use different error
     * constant
     */
    if (window.navigator.vendor ===
      "Google Inc.") {
      if (e == DOMException.QUOTA_EXCEEDED_ERR) {
        alert(
          "Error: Local Storage limit exceeds."
        );
      }
    } else if (e == QUOTA_EXCEEDED_ERR) {
      alert("Error: Saving to local storage.");
    }

    console.log(e);
  }

  //Load previous records, if they exist
  if (tbRecords != null) {
    //Order the records by date
    tbRecords.sort(compareDates);

    //Initializing the table
    $("#tblRecords").html(
      "<thead>" +
      "   <tr>" +
      "     <th>Date</th>" +
      "     <th><abbr title=''>-Learning Type-</abbr></th>" +
      "     <th><abbr title=''>-Hours Spend-</abbr></th>" +
    //  "     <th>Synthroid Dose(ug)</th>" +
      "     <th>Edit / Delete</th>" +
      "   </tr>" +
      "</thead>" +
      "<tbody>" +
      "</tbody>"
    );

    //Loop to insert the each record in the table
    for (var i = 0; i < tbRecords.length; i++) {
      var rec = tbRecords[i];
      $("#tblRecords tbody").append("<tr>" +
        "  <td>"+rec.Date +"</td>" +" "+
        "  <td>"+rec.LT+"</td>" +" "+
        "  <td>"+rec.LH +"</td>" +
      //  "  <td>" + rec.SynthroidDose +
        "</td>" +
        "<td onclick='callEdit(" +
        i +
        ")'><a data-inline='true'  data-mini='true' data-role='button' href='#pageNewRecordForm' data-icon='edit' data-iconpos='notext'></a> </td>" +
        "<td onclick='callDelete(" +
        i +
        ")'>" +
        "<a data-inline='true'  data-mini='true' data-role='button' href='#' data-icon='delete' data-iconpos='notext'></a></td></tr>");
    }

    $('#tblRecords [data-role="button"]').button(); // 'Refresh' the buttons. Without this the delete/edit buttons wont appear
  } else {
    tbRecords = []; //If there is no data,set an empty array
    $("#tblRecords").html("");
  }
  return true;
}

function showRecordForm(index) {
  try {
    var tbRecords = JSON.parse(localStorage.getItem(
      "tbRecords"));
    var rec = tbRecords[index];
    $('#datExpenseDate').val(rec.Date);
    $('#txtType').val(rec.LT);
    $('#txtAmount').val(rec.LH);
    //$('#txtSynthroidDose').val(rec.SynthroidDose);
  } catch (e) {
    /* Google browsers use different error
     * constant
     */
    if (window.navigator.vendor ===
      "Google Inc.") {
      if (e == DOMException.QUOTA_EXCEEDED_ERR) {
        alert(
          "Error: Local Storage limit exceeds."
        );
      }
    } else if (e == QUOTA_EXCEEDED_ERR) {
      alert("Error: Saving to local storage.");
    }

    console.log(e);
  }
}

/* Checks that users have entered all valid info
 * and that the date they have entered is not in
 * the future
 */
 //>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>
function checkRecordForm() {

  if (($("#txtType").val() != "") &&
    ($("#datExpenseDate").val() != "") &&
    ($("#txtAmount").val() != "") ) {
    return true;
  } else {
    return false;
  }
}

function callEdit(index) {
  $.mobile.changePage("#pageNewRecordForm");
  $("#btnSubmitRecord").val("Edit").button("refresh");
  showRecordForm(index);
  //$("#btnSubmitRecord").attr("indexToEdit",
  //  index);
  /*.button("refresh") function forces jQuery
   * Mobile to refresh the text on the button
   */
//  $("#btnSubmitRecord").val("Edit").button(
  //  "refresh");
}

// Delete the given index and re-display the table
function callDelete(index) {
  deleteRecord(index);
  listRecords();
}

//.>>>>>>>>>>>>>>
function addRecord() {
  if (checkRecordForm()) {
    var record = {
      "Date": $('#datExpenseDate').val(),
      "LT": $('#txtType').val(),
      "LH": $('#txtAmount').val(),
      //"SynthroidDose": $('#txtSynthroidDose')
      //  .val()
    };

    try {
      var tbRecords = JSON.parse(localStorage.getItem(
        "tbRecords"));
      if (tbRecords == null) {
        tbRecords = [];
      }
      tbRecords.push(record);
      tbRecords.sort(compareDates);
      localStorage.setItem("tbRecords", JSON.stringify(
        tbRecords));
      alert("Saving Information");
      clearRecordForm();
      listRecords();
      window.location.reload();
    } catch (e) {
      /* Google browsers use different error
       * constant
       */
      if (window.navigator.vendor ===
        "Google Inc.") {
        if (e == DOMException.QUOTA_EXCEEDED_ERR) {
          alert(
            "Error: Local Storage limit exceeds."
          );
        }
      } else if (e == QUOTA_EXCEEDED_ERR) {
        alert("Error: Saving to local storage.");
      }

      console.log(e);
    }
  } else {
    alert("Please complete the form properly.");
  }

  return true;
}

//------------------------>>
function deleteRecord(index) {
  try {
    var tbRecords = JSON.parse(localStorage.getItem(
      "tbRecords"));

    tbRecords.splice(index, 1);

    if (tbRecords.length == 0) {
      /* No items left in records, remove entire
       * array from localStorage
       */
      localStorage.removeItem("tbRecords");
    } else {
      localStorage.setItem("tbRecords", JSON.stringify(
        tbRecords));
    }
  } catch (e) {
    /* Google browsers use different error
     * constant
     */
    if (window.navigator.vendor ===
      "Google Inc.") {
      if (e == DOMException.QUOTA_EXCEEDED_ERR) {
        alert(
          "Error: Local Storage limit exceeds."
        );
      }
    } else if (e == QUOTA_EXCEEDED_ERR) {
      alert("Error: Saving to local storage.");
    }

    console.log(e);
  }
}

//---------------------------->>
function editRecord(index) {
  if (checkRecordForm()) {
    try {
      var tbRecords = JSON.parse(localStorage.getItem(
        "tbRecords"));
      tbRecords[index] = {
        "Date": $('#datExpenseDate').val(),
        "LT": $('#txtType').val(),
        "LH": $('#txtAmount').val(),
        //"SynthroidDose": $(
          //'#txtSynthroidDose').val()
      }; //Alter the selected item in the array
      tbRecords.sort(compareDates);
      localStorage.setItem("tbRecords", JSON.stringify(
        tbRecords)); //Saving array to local storage
      alert("Saving Information");
      clearRecordForm();
      listRecords();
      window.location.reload();
    } catch (e) {
      /* Google browsers use different error
       * constant
       */
      if (window.navigator.vendor ===
        "Google Inc.") {
        if (e == DOMException.QUOTA_EXCEEDED_ERR) {
          alert(
            "Error: Local Storage limit exceeds."
          );
        }
      } else if (e == QUOTA_EXCEEDED_ERR) {
        alert("Error: Saving to local storage.");
      }

      console.log(e);
    }
  } else {
    alert("Please complete the form properly.");
  }
}
