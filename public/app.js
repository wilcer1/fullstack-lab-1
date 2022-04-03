const signUpForm = document.querySelector("#sign-up-form");
const loginForm = document.querySelector("#login-form");

const signUpName = document.querySelector("#sign-up-name");
const signUpEmail = document.querySelector("#sign-up-email");
const signUpPassword = document.querySelector("#sign-up-password");

// const errorMsg = document.querySelector("#error");

signUpForm.addEventListener("submit", e => {
    e.preventDefault();
    const signUpDetails = {
        name: signUpName.value,
        email: signUpEmail.value,
        password: signUpPassword.value
    };

    fetch("/api/user", {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(signUpDetails)
    })
});
