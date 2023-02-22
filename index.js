let myForm = {};

let myValidator = {

    applyInputStyle: function(input, style) {
        input.classList.remove("input_is_valid", "input_is_not_valid", "input_neutral");
        input.classList.add(style);
        let overlay = document.getElementById(input.dataset.error);
        overlay.style.opacity = 1;
        overlay.getElementsByClassName('img-error')[0].src = style == "input_is_valid" ? 'image/success.svg' : 'image/error.svg';
        overlay.getElementsByClassName('text-error')[0].style.opacity = style == "input_is_valid" ? 0 : 1; 
    },

    validateInRealTime: function() {

        let changeInputValidationStatus = (isValid, input) => {
            myValidator.applyInputStyle(input, isValid ? "input_is_valid" : "input_is_not_valid");
            input.dataset.valid = isValid ? 1 : 0;
        };
    
        myForm.nameInput.addEventListener('change', () => {
            changeInputValidationStatus(myForm.nameInput.value != '', myForm.nameInput);
        });
    
        myForm.emailInput.addEventListener('change', () => {
            let isValid = String(myForm.emailInput.value)
                .toLowerCase()
                .match(/^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/);

            changeInputValidationStatus(isValid, myForm.emailInput);
        });
    
        myForm.passwordInput.addEventListener('change', () => {
            changeInputValidationStatus(myForm.passwordInput.value.length <= 8, myForm.passwordInput);
            changeInputValidationStatus(myForm.password2Input.value == myForm.passwordInput.value, myForm.password2Input);
        });
    
        myForm.password2Input.addEventListener('change', () => {
            changeInputValidationStatus(myForm.password2Input.value == myForm.passwordInput.value, myForm.password2Input);
        });
    
    },

    validateOnSubmit: function() {
        let flag = true;
        Array.prototype.forEach.call(document.getElementsByClassName("validate_this"), function(input) {
            if(input.dataset.valid != 1){
                flag = false;
                myValidator.applyInputStyle(input, "input_is_not_valid");
            }
        });
        if(flag){
            alert("Todo bien");
        }
        
    }

};

window.addEventListener("load", (event) => {

    myForm = {
        nameInput: document.getElementById("name_input"),
        emailInput: document.getElementById("email_input"),
        passwordInput: document.getElementById("password_input"),
        password2Input: document.getElementById("password_2_input"),
        submitButton: document.getElementById("form_submit_btn"),
    };

    myForm.submitButton.addEventListener('click', (event) => {
        myValidator.validateOnSubmit();
    });

    myValidator.validateInRealTime();

});