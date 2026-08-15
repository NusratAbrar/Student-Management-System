/* =========================================================
   STUDENT MANAGEMENT SYSTEM
   ICT726 Web Development - Assignment 3
   JavaScript Functionality
   ========================================================= */


/* =========================================================
   1. STUDENT SEARCH
   ========================================================= */

const studentSearch = document.getElementById("studentSearch");
const studentTableBody = document.getElementById("studentTableBody");
const noResults = document.getElementById("noResults");

if (studentSearch && studentTableBody) {

    studentSearch.addEventListener("input", function () {

        const searchText = studentSearch.value.toLowerCase().trim();

        const rows = studentTableBody.querySelectorAll("tr");

        let visibleRows = 0;

        rows.forEach(function (row) {

            const rowText = row.textContent.toLowerCase();

            if (rowText.includes(searchText)) {

                row.style.display = "";
                visibleRows++;

            } else {

                row.style.display = "none";

            }

        });


        if (noResults) {

            if (visibleRows === 0) {

                noResults.style.display = "block";

            } else {

                noResults.style.display = "none";

            }

        }

    });

}


/* =========================================================
   2. COURSE MESSAGE
   ========================================================= */

function showCourseMessage(courseName) {

    const courseMessage =
        document.getElementById("courseMessage");

    if (!courseMessage) {
        return;
    }

    courseMessage.textContent =
        "You selected: " + courseName +
        ". Course details are shown as sample content for this prototype.";

    courseMessage.classList.add("show");

    setTimeout(function () {

        courseMessage.classList.remove("show");

    }, 4000);
}


/* =========================================================
   3. IMAGE GALLERY
   ========================================================= */

function openGalleryImage(imageSource, imageDescription) {

    const modal =
        document.getElementById("galleryModal");

    const largeImage =
        document.getElementById("largeGalleryImage");

    const modalTitle =
        document.getElementById("galleryModalTitle");

    if (!modal || !largeImage) {
        return;
    }

    largeImage.src = imageSource;

    largeImage.alt = imageDescription;

    if (modalTitle) {

        modalTitle.textContent =
            imageDescription;

    }

    modal.classList.add("show");

    modal.setAttribute("aria-hidden", "false");

    document.body.style.overflow = "hidden";

    const closeButton =
        modal.querySelector(".modal-close");

    if (closeButton) {

        closeButton.focus();

    }
}


function closeGalleryImage() {

    const modal =
        document.getElementById("galleryModal");

    const largeImage =
        document.getElementById("largeGalleryImage");

    if (!modal) {
        return;
    }

    modal.classList.remove("show");

    modal.setAttribute("aria-hidden", "true");

    document.body.style.overflow = "";

    if (largeImage) {

        largeImage.src = "";

        largeImage.alt = "";

    }

}


/* Close gallery by clicking outside image */

const galleryModal =
    document.getElementById("galleryModal");

if (galleryModal) {

    galleryModal.addEventListener("click", function (event) {

        if (event.target === galleryModal) {

            closeGalleryImage();

        }

    });

}


/* Close gallery using Escape key */

document.addEventListener("keydown", function (event) {

    if (event.key === "Escape") {

        const modal =
            document.getElementById("galleryModal");

        if (modal && modal.classList.contains("show")) {

            closeGalleryImage();

        }

    }

});


/* =========================================================
   4. CONTACT FORM VALIDATION
   ========================================================= */

const contactForm =
    document.getElementById("contactForm");


if (contactForm) {


    const fullName =
        document.getElementById("fullName");

    const email =
        document.getElementById("email");

    const phone =
        document.getElementById("phone");

    const subject =
        document.getElementById("subject");

    const message =
        document.getElementById("message");

    const privacy =
        document.getElementById("privacy");

    const formFeedback =
        document.getElementById("formFeedback");


    function setError(input, errorElement, messageText) {

        if (input) {

            input.classList.add("error");

            input.classList.remove("valid");

        }

        if (errorElement) {

            errorElement.textContent = messageText;

        }

    }


    function setValid(input, errorElement) {

        if (input) {

            input.classList.remove("error");

            input.classList.add("valid");

        }

        if (errorElement) {

            errorElement.textContent = "";

        }

    }


    function validateName() {

        const error =
            document.getElementById("nameError");

        const value =
            fullName.value.trim();

        if (value === "") {

            setError(
                fullName,
                error,
                "Please enter your full name."
            );

            return false;

        }

        if (value.length < 2) {

            setError(
                fullName,
                error,
                "Name must contain at least 2 characters."
            );

            return false;

        }

        setValid(fullName, error);

        return true;

    }


    function validateEmail() {

        const error =
            document.getElementById("emailError");

        const value =
            email.value.trim();

        const emailPattern =
            /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

        if (value === "") {

            setError(
                email,
                error,
                "Please enter your email address."
            );

            return false;

        }

        if (!emailPattern.test(value)) {

            setError(
                email,
                error,
                "Please enter a valid email address."
            );

            return false;

        }

        setValid(email, error);

        return true;

    }


    function validatePhone() {

        const error =
            document.getElementById("phoneError");

        const value =
            phone.value.trim();

        if (value === "") {

            phone.classList.remove("error");

            phone.classList.remove("valid");

            error.textContent = "";

            return true;

        }

        const phonePattern =
            /^[0-9+\s()\-]{8,20}$/;

        if (!phonePattern.test(value)) {

            setError(
                phone,
                error,
                "Please enter a valid phone number."
            );

            return false;

        }

        setValid(phone, error);

        return true;

    }


    function validateSubject() {

        const error =
            document.getElementById("subjectError");

        if (subject.value === "") {

            setError(
                subject,
                error,
                "Please select a subject."
            );

            return false;

        }

        setValid(subject, error);

        return true;

    }


    function validateMessage() {

        const error =
            document.getElementById("messageError");

        const value =
            message.value.trim();

        if (value === "") {

            setError(
                message,
                error,
                "Please enter your message."
            );

            return false;

        }

        if (value.length < 10) {

            setError(
                message,
                error,
                "Message must contain at least 10 characters."
            );

            return false;

        }

        setValid(message, error);

        return true;

    }


    function validatePrivacy() {

        const error =
            document.getElementById("privacyError");

        if (!privacy.checked) {

            setError(
                privacy,
                error,
                "Please confirm the privacy notice."
            );

            return false;

        }

        privacy.classList.remove("error");

        error.textContent = "";

        return true;

    }


    /* Individual field validation */

    fullName.addEventListener("blur", validateName);

    email.addEventListener("blur", validateEmail);

    phone.addEventListener("blur", validatePhone);

    subject.addEventListener("change", validateSubject);

    message.addEventListener("blur", validateMessage);

    privacy.addEventListener("change", validatePrivacy);


    /* Form submission */

    contactForm.addEventListener("submit", function (event) {

        event.preventDefault();


        const validName =
            validateName();

        const validEmail =
            validateEmail();

        const validPhone =
            validatePhone();

        const validSubject =
            validateSubject();

        const validMessage =
            validateMessage();

        const validPrivacy =
            validatePrivacy();


        const formIsValid =
            validName &&
            validEmail &&
            validPhone &&
            validSubject &&
            validMessage &&
            validPrivacy;


        if (!formIsValid) {

            formFeedback.className =
                "form-feedback error";

            formFeedback.textContent =
                "Please correct the errors above before submitting the form.";

            formFeedback.focus();

            return;

        }


        /*
         * This is a static website.
         * No real information is sent to a server.
         */

        formFeedback.className =
            "form-feedback success";

        formFeedback.textContent =
            "Thank you! Your message has been submitted successfully in this prototype. No real personal information has been stored.";


        contactForm.reset();


        /* Remove validation styles */

        const inputs =
            contactForm.querySelectorAll(
                "input, select, textarea"
            );

        inputs.forEach(function (input) {

            input.classList.remove("valid");

            input.classList.remove("error");

        });


        /* Clear error messages */

        const errors =
            contactForm.querySelectorAll(
                ".error-message"
            );

        errors.forEach(function (error) {

            error.textContent = "";

        });


        formFeedback.focus();

    });

}


/* =========================================================
   5. CURRENT YEAR
   ========================================================= */

const yearElements =
    document.querySelectorAll(".current-year");

yearElements.forEach(function (element) {

    element.textContent =
        new Date().getFullYear();

});