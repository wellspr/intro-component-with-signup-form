const form = document.querySelector("form")

form.addEventListener("submit", e => {
    e.preventDefault();

    console.log("Submited form");

    const {
        first_name,
        last_name,
        email,
        password
    } = e.target;

    const user = {
        first_name: first_name.value,
        last_name: last_name.value,
        email: email.value,
        password: password.value,
    };

    const isValidEmail = (email) => {
        // https://stackoverflow.com/a/9204568
        const regExp = /\S+@\S+\.\S+/;
        return regExp.test(email);
    };
    
    Object.entries(user).map(entry => {
        console.log(entry[0], "=", entry[1]);
        
        const inputNode = document.querySelector(`input[name=${entry[0]}]`);
        const errorIcon = document.querySelector(`.icon-error.${entry[0]}`);
        const fieldName = document.querySelector(`label[for=${entry[0]}]`).innerHTML;
        const feedbackNode = document.querySelector(`.feedback.${entry[0]}`)

        // test 1 -> empty?
        if (!entry[1]) {
            inputNode.classList.add("error");
            errorIcon.classList.add("visible");
            feedbackNode.innerHTML = `${fieldName} cannot be empty`
        }

        // test 2 -> wrong values?
        if (entry[1] && entry[0] === "email") {
            if (!isValidEmail(entry[1])) {
                inputNode.classList.add("error");
                errorIcon.classList.add("visible");
                feedbackNode.innerHTML = `Looks like this is not an email`
            }
        }

        // Reset on focus
        inputNode.addEventListener("focus", () => {
            inputNode.classList.remove("error");
            errorIcon.classList.remove("visible");
            feedbackNode.innerHTML = "";
        });
    });


    
});

const tryItButton = document.getElementById("try-it-btn");