// =====================================================
// PIXLEORA - MAIN JAVASCRIPT
// =====================================================


// ================= CURRENT YEAR =================

const footerText = document.querySelector("footer p");

if (footerText) {
    footerText.innerHTML =
        `© ${new Date().getFullYear()} Pixleora. All rights reserved.`;
}


// ================= NAVBAR SHADOW =================

const navbar = document.querySelector(".navbar");

if (navbar) {
    window.addEventListener("scroll", () => {

        if (window.scrollY > 20) {
            navbar.style.boxShadow =
                "0 5px 20px rgba(0, 0, 0, 0.05)";
        } else {
            navbar.style.boxShadow = "none";
        }

    });
}


// =====================================================
// CLIENT FORM → GOOGLE SHEETS
// =====================================================

const clientForm = document.getElementById("clientForm");
const formStatus = document.getElementById("formStatus");


// YOUR GOOGLE APPS SCRIPT WEB APP URL
const GOOGLE_SHEET_URL =
    "https://script.google.com/macros/s/AKfycbxSaHiTqLrn-Sc3X9vjQ-PjPCk20CqhcH65C8w4VyTMVPqzTWhLrGwApdCo-rXwR0nI/exec";


if (clientForm) {

    clientForm.addEventListener("submit", async function (event) {

        event.preventDefault();

        const submitButton =
            clientForm.querySelector(".form-btn");

        if (submitButton) {
            submitButton.disabled = true;
            submitButton.textContent = "Sending...";
        }


        // Collect form information
        const formData = {

            name:
                document.getElementById("name")?.value || "",

            business:
                document.getElementById("business")?.value || "",

            email:
                document.getElementById("email")?.value || "",

            phone:
                document.getElementById("phone")?.value || "",

            service:
                document.getElementById("service")?.value || "",

            budget:
                document.getElementById("budget")?.value || "",

            message:
                document.getElementById("message")?.value || ""

        };


        console.log("Sending enquiry:", formData);


        try {

            await fetch(GOOGLE_SHEET_URL, {

                method: "POST",

                mode: "no-cors",

                headers: {
                    "Content-Type":
                        "text/plain;charset=utf-8"
                },

                body: JSON.stringify(formData)

            });


            // IMPORTANT:
            // no-cors doesn't allow JavaScript to read
            // the Google response, but the request is sent.

            if (formStatus) {

                formStatus.textContent =
                    "✓ Thanks! Your enquiry has been received.";

                formStatus.style.color = "#2563eb";

            }


            clientForm.reset();


            if (submitButton) {

                submitButton.textContent =
                    "Enquiry Sent ✓";

            }


        } catch (error) {

            console.error(
                "Google Sheet submission error:",
                error
            );


            if (formStatus) {

                formStatus.textContent =
                    "Something went wrong. Please try again.";

                formStatus.style.color = "#dc2626";

            }


            if (submitButton) {

                submitButton.textContent =
                    "Send Project Enquiry →";

            }

        }


        // Enable button again
        setTimeout(() => {

            if (submitButton) {

                submitButton.disabled = false;

                submitButton.textContent =
                    "Send Project Enquiry →";

            }

        }, 3000);

    });

}


// =====================================================
// CONTACT POPUP
// =====================================================

document.addEventListener("DOMContentLoaded", function () {

    const openContact =
        document.getElementById("openContact");

    const closeContact =
        document.getElementById("closeContact");

    const contactOverlay =
        document.getElementById("contactOverlay");


    if (!openContact || !closeContact || !contactOverlay) {

        console.log(
            "Contact popup elements not found."
        );

        return;

    }


    // OPEN POPUP

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

// ================= MOBILE HAMBURGER MENU =================

document.addEventListener("DOMContentLoaded", function () {

    const hamburger = document.getElementById("hamburger");
    const navLinks = document.querySelector(".nav-links");

    if (!hamburger || !navLinks) return;

    hamburger.addEventListener("click", function () {
        hamburger.classList.toggle("active");
        navLinks.classList.toggle("show");
    });

    navLinks.querySelectorAll("a").forEach(function (link) {
        link.addEventListener("click", function () {
            hamburger.classList.remove("active");
            navLinks.classList.remove("show");
        });
    });

});

