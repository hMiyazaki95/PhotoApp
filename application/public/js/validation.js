//when we submit the form, this function will be called.


function myValidation() {

    
    var username = document.getElementById("username").value; //value is from the name in the  html div input 
    //var email = document.getElementById("email").value;
    var password = document.getElementById("pass").value;
    var passValidation = document.getElementById("repass").value;
    //var message = document.getElementById("message");
    var error_message = "";
    console.log("You clicked on submit.");
  
    var passwordCheck = true;
    var usernameCheck = false;
  
    // check if username not begins with [a-zA-Z]
    var re_alphanum = /^[A-Za-z][A-Za-z0-9]+$/;
    if (!(("a" <= username[0] && username[0] <= "z") || 
          ("A" <= username[0] && username[0] <= "Z")))
    {
      error_message += "Username must start with a-z or A-Z.<br>";
    }
    //check length and alphanumeric charaters of username
    if (username.length < 3 || !re_alphanum.test(username)) {
      error_message +=
        "Username must begin with a Letter, have at least three characters and only consist of Letters and Numbers";
    } else {
      usernameCheck = true;
    }
  
    //check passsword validation one by one
    var re_num = /[0-9]/;
    var re_uppercase = /[A-Z]/;
    var re_specialchar = /[/*-+!@#$^&*]/;

    // check password length
    if (password.length < 8) {
      console.log("I am in length test");
      error_message += "Password must be 8 or more characters.<br>";
      passwordCheck = false;
    }
    // check at least one number
    if ((!re_num.test(password)) ||
             (!re_uppercase.test(password)) ||
             (!re_specialchar.test(password))) {
      console.log("I am in at least one number test");
      error_message += "Password must contain at least one number, and one Uppercase Letter and one special character. (/*-+!@#$^&*) <br>";
      passwordCheck = false;
    }
    // check at least one Uppercase letter
    else if (!re_uppercase.test(password)) {
      error_message += "Password must contain at least one Uppercase Letter.";
    }
    // check at least one special char
    else if (!re_specialchar.test(password)) {
      error_message +=
        "Password must contain one special character.(/*-+!@#$^&*).<br>";
    }
    // check both password fields are equal or not
    
    if (password !== passValidation) {
      error_message += "Both Passwords must be same!";
      passwordCheck = false;
    }
  
    if (passwordCheck && usernameCheck) {
      // successful form submission
      document.getElementById("registration").submit();
    } else {
      //show error message
      //message.innerHTML = error_message;
      //message.style.color = "red";
      window.alert(error_message);
    }
  }

