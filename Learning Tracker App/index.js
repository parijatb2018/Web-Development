function addValueToPassword(button) {
  var currVal = $("#passcode").val();
  if (button === "bksp") {
    $("#passcode").val(currVal.substring(0, currVal.length - 1));
  } else {
    $("#passcode").val(currVal.concat(button));
  }
}



function redirectPage() {

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

  console.log(user);

  if (document.getElementById("passcode").value === user.Password1 && document.getElementById("username").value === user.LastName) {
    //if not agreed yet
    if (localStorage.getItem("agreedToLegal") === null) {
      $("#btnEnter").attr("href", "#legalNotice").button();
    } else if (localStorage.getItem("agreedToLegal") === "true") {
      {
    if (localStorage.getItem("user") ==
      null) {
      /* User has not been created, direct user
       * to User Creation page
       */
      $("#btnEnter").attr("href",
        "#pageUserInfo").button();
    } else {
      $("#btnEnter").attr("href",
        "#pageMenu").button();
    }
  }
    }
  } else {
    alert("Incorrect username/password, please try again.");
  }

}



function saveSignUpUser() {
  var user = {
    "FirstName": $("#signupFirstName").val(),
    "LastName": $("#signupLastName").val(),
    "DateOfBirth": $("#dateOfBirth").val(),
    "SINNumber": $("#signupsinNumber").val(),
    "Password1": $("#addPassword").val(),
    "NewPassword": $("#confirmPassword").val(),
    "Gender": $("#signgenderType option:selected").val()

  };

  if (user.Password1 === user.NewPassword) {

    try {
      localStorage.setItem("user", JSON.stringify(user));
      alert("Saving Information");
      $.mobile.changePage("#legalNotice");
      window.location.reload();
    } catch (e) {
      if (window.navigator.vendor === "Google Inc.") {
        if (e === DOMException.QUOTA_EXCEEDED_ERR) {
          alert("Error: Local Storage Limit Exceeded");
        } else if (e === QUOTA_EXCEEDED_ERR) {
          alert("Error: Saving to Local Storage");
        }
      }
      console.log(e);
    }
  } else {
    alert("Password Missmatch");
  }
} //end of signup function

function saveDisclaimer() {

  localStorage.setItem("agreedToLegal", "true");
  $.mobile.changePage("#pageMenu");
  window.location.reload();
} // end of Disclaimer function

function saveUserForm() {

var user = {
    "FirstName": $("#userFirstName").val(),
    "LastName": $("#userLastName").val(),
    "DateOfBirth": $("#userdateOfBirth").val(),
    "SINNumber": $("#usersinNumber").val(),
    "Password1": $("#useraddPassword").val(),
    //"NewPassword": $("#confirmPassword").val(),
    "Gender": $("#usergenderType option:selected").val()

  };

  //if (user.Password1 === user.NewPassword) {

    try {
      localStorage.setItem("user", JSON.stringify(user));
      alert("Saving Information");
      $.mobile.changePage("#pageMenu");
      window.location.reload();
    } catch (e) {
      if (window.navigator.vendor === "Google Inc.") {
        if (e === DOMException.QUOTA_EXCEEDED_ERR) {
          alert("Error: Local Storage Limit Exceeded");
        } else if (e === QUOTA_EXCEEDED_ERR) {
          alert("Error: Saving to Local Storage");
        }
      }
      console.log(e);
    }
  }




function showUserForm() { //Load the stored values in the form
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
  console.log(user);

  if (user != null) {
    $("#userFirstName").val(user.FirstName);
    $("#userLastName").val(user.LastName);
    //$("#txtHealthCardNumber").val(user.HealthCardNumber);
    $("#useraddPassword").val(user.Password1);
    $("#userdateOfBirth").val(user.DateOfBirth);
    $("#usergenderType").val(user.Gender);
    $("#usersinNumber").val(user.SINNumber);
    $('#usergenderType').selectmenu('refresh',true);
  /*

    $("#slcTSHRange option:selected").val(user.TSHRange);
    $('#slcTSHRange').selectmenu('refresh',
      true);*/
  }
}
// $(document).ready(function() {
//      $("#pageUserInfo").click(function() {
//      showUserForm();
//      });
//  });
