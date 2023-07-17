const readline = require("readline-sync");

function hasRepeatingCharacters(value) {
  for (let i = 0; i < value.length - 2; i++) {
    if (value[i] === value[i + 1] && value[i] === value[i + 2]) {
      return true;
    }
  }
  return false;
}

function handleChangePassword() {
  const value = readline.question("Enter password: ", {
    hideEchoBack: true,
  });
  let passwordError = "";
  let passwordStrength = "";

  if (!value) {
    passwordError = "Password is required";
  } else if (value.length < 6) {
    passwordError = "Password must be at least 6 characters long";
    passwordStrength = `${
      6 - value.length
    } Minimum steps to make a password strong`;
  } else if (value.length > 20) {
    passwordError = "Password must not exceed 20 characters";
    passwordStrength = `${
      value.length - 20
    } removing 1 steps to make a password strong`;
  } else if (!/[a-z]/.test(value)) {
    passwordError = "Password must contain at least one lowercase letter";
  } else if (!/[A-Z]/.test(value)) {
    passwordError = "Password must contain at least one uppercase letter";
  } else if (!/\d/.test(value)) {
    passwordError = "Password must contain at least one digit";
  } else if (hasRepeatingCharacters(value)) {
    passwordError = "Password is weak: Repeating characters";
  } else {
    passwordStrength = "Strong password";
  }

  console.log("Password Error:", passwordError);
  console.log("Password Strength:", passwordStrength);
}

handleChangePassword();
