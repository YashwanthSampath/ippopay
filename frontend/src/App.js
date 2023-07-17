import React, { useState } from "react";
import "./App.css";
function App() {
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [passwordStrength, setPasswordStrength] = useState("");
  const [message, setMessage] = useState("");

  function hasRepeatingCharacters(value) {
    for (let i = 0; i < value.length - 2; i++) {
      if (value[i] === value[i + 1] && value[i] === value[i + 2]) {
        return true;
      }
    }
    return false;
  }

  function checkPasswordStrength(event) {
    const { value } = event.target;
    setPassword(value);
    if (!value) {
      setError("Password is required");
      setPasswordStrength("");
    } else if (value.length < 6) {
      // setError("Password must be at least 6 characters long");
      setPasswordStrength(
        `Minimum ${6 - value.length} steps to make a password strong`
      );
    } else if (value.length > 20) {
      setError("Password must not exceed 20 characters");
      setPasswordStrength(
        `${value.length - 20} removing 1 steps to make a password strong`
      );
    } else if (!/[a-z]/.test(value)) {
      setError("Password must contain at least one lowercase letter");
      setPasswordStrength("");
    } else if (!/[A-Z]/.test(value)) {
      setError("Password must contain at least one uppercase letter");
      setPasswordStrength("");
    } else if (!/\d/.test(value)) {
      setError("Password must contain at least one digit");
      setPasswordStrength("");
    } else if (hasRepeatingCharacters(value)) {
      setError("Password is weak: Repeating characters");
      setPasswordStrength("");
    } else {
      setError("");
      setPasswordStrength(`Strong password`);
    }
  }

  function handleSubmit(event) {
    event.preventDefault();

    if (!password) {
      setError("Password is required");
    } else {
      // Create the payload object with the password value
      const payload = {
        password: password,
      };

      fetch("http://localhost:3001/passwords", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
      })
        .then((response) => {
          if (response.ok) {
            setMessage("Form submitted successfully!");
          } else {
            throw new Error("Failed to submit form");
          }
        })
        .catch((error) => {
          console.error("Error submitting form:", error);
        });
    }
  }

  console.log("password", password);
  console.log("error", error);

  function handleReset() {
    setMessage("");
    setPassword("");
    setError("");
    setPasswordStrength("");
  }

  return (
    <>
      <div className="container">
        <div className="row justify-content-center my-5">
          <div className="col-md-5">
            {message && (
              <h3 className="text-center text-success my-5">{message}</h3>
            )}
            <div className="card shadow mt-4">
              <div className="card-body p-4">
                <h5 className="card-title mb-4">Password Strength Checker</h5>
                <form onSubmit={handleSubmit}>
                  <div className="mb-3">
                    <label htmlFor="password" className="form-label">
                      Password
                    </label>
                    <input
                      type="password"
                      className={`form-control ${error && "is-invalid"}`}
                      id="password"
                      value={password}
                      onChange={checkPasswordStrength}
                    />
                    {error && <div className="invalid-feedback">{error}</div>}
                    {passwordStrength && (
                      <div
                        className={`text-${
                          passwordStrength === "Strong password"
                            ? "success"
                            : "danger"
                        }`}
                      >
                        {passwordStrength}
                      </div>
                    )}
                  </div>
                  <div className="d-flex justify-content-center">
                    <button type="submit" className="btn btn-primary me-2">
                      Submit
                    </button>
                    <button
                      type="button"
                      className="btn btn-secondary"
                      onClick={handleReset}
                    >
                      Reset
                    </button>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default App;
