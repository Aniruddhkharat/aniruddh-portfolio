// ================= CURRENT YEAR =================

const footerText = document.querySelector("footer p");

if (footerText) {
    footerText.innerHTML =
        `© ${new Date().getFullYear()} Aniruddh Kharat. All rights reserved.`;
}


// ================= NAVBAR SHADOW =================

const navbar = document.querySelector(".navbar");

window.addEventListener("scroll", () => {

    if (window.scrollY > 20) {
        navbar.style.boxShadow =
            "0 5px 20px rgba(0, 0, 0, 0.05)";
    } else {
        navbar.style.boxShadow = "none";
    }

});

// ================= CLIENT FORM =================

// ================= CLIENT FORM =================

const clientForm = document.getElementById("clientForm");
const formStatus = document.getElementById("formStatus");

const GOOGLE_SHEET_URL =
    "https://script.google.com/macros/s/AKfycbxSaHiTqLrn-Sc3X9vjQ-PjPCk20CqhcH65C8w4VyTMVPqzTWhLrGwApdCo-rXwR0nI/exec";


if (clientForm) {

    clientForm.addEventListener("submit", async function (event) {

        event.preventDefault();

        const submitButton =
            clientForm.querySelector(".form-btn");

        submitButton.disabled = true;
        submitButton.textContent = "Sending...";

        const formData = {

            name: document.getElementById("name").value,

            business:
                document.getElementById("business").value,

            email:
                document.getElementById("email").value,

            phone:
                document.getElementById("phone").value,

            service:
                document.getElementById("service").value,

            budget:
                document.getElementById("budget").value,

            message:
                document.getElementById("message").value
        };


        try {

            await fetch(GOOGLE_SHEET_URL, {

                method: "POST",

                mode: "no-cors",

                headers: {
                    "Content-Type": "text/plain;charset=utf-8"
                },

                body: JSON.stringify(formData)

            });

            formStatus.textContent =
                "✓ Thanks! Your enquiry has been received.";

            clientForm.reset();

            submitButton.textContent =
                "Enquiry Sent ✓";

        } catch (error) {

            console.error(error);

            formStatus.textContent =
                "Something went wrong. Please try again.";

            submitButton.textContent =
                "Send Project Enquiry →";
        }

        submitButton.disabled = false;

    });

}

// ================= CONTACT POPUP =================

document.addEventListener("DOMContentLoaded", function () {

    const openContact = document.getElementById("openContact");
    const closeContact = document.getElementById("closeContact");
    const contactOverlay = document.getElementById("contactOverlay");


    // Check that elements exist
    if (!openContact || !closeContact || !contactOverlay) {
        console.error("Contact popup elements not found.");
        return;
    }


    // OPEN
    openContact.addEventListener("click", function () {

        contactOverlay.classList.add("active");

        document.body.style.overflow = "hidden";

    });


    // CLOSE BUTTON
    closeContact.addEventListener("click", function () {

        contactOverlay.classList.remove("active");

        document.body.style.overflow = "";

    });


    // CLICK OUTSIDE CARD
    contactOverlay.addEventListener("click", function (event) {

        if (event.target === contactOverlay) {

            contactOverlay.classList.remove("active");

            document.body.style.overflow = "";

        }

    });


    // ESC KEY
    document.addEventListener("keydown", function (event) {

        if (event.key === "Escape") {

            contactOverlay.classList.remove("active");

            document.body.style.overflow = "";

        }

    });

});