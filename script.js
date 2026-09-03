const form = document.getElementById("studentForm");

form.addEventListener("submit", function (event) {
    event.preventDefault();

    document.querySelectorAll(".error-message").forEach(function (message) {
        message.remove();
    });

    let isValid = true;

    const name = document.getElementById("studentName").value.trim();
    const email = document.getElementById("email").value.trim();
    const phone = document.getElementById("phone").value.trim();
    const dob = document.getElementById("dob").value;
    const gender = document.querySelector('input[name="gender"]:checked');
    const course = document.getElementById("course").value;
    const skills = document.querySelectorAll('input[name="skills"]:checked');
    const about = document.getElementById("about").value.trim();
    const photo = document.getElementById("photo").files[0];

    function showError(element, message) {
        const error = document.createElement("div");
        error.className = "error-message";
        error.textContent = message;
        element.parentElement.appendChild(error);
        isValid = false;
    }

    const nameRegex = /^[A-Za-z ]+$/;
    const phoneRegex = /^[0-9]{10}$/;
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (name === "") {
        showError(document.getElementById("studentName"), "Name is required");
    } else if (name.length < 3) {
        showError(document.getElementById("studentName"), "Name must be at least 3 characters");
    } else if (!nameRegex.test(name)) {
        showError(
            document.getElementById("studentName"),
            "Name can contain only letters and spaces"
        );
    }

    if (email === "") {
        showError(document.getElementById("email"), "Email is required");
    } else if (!emailRegex.test(email)) {
        showError(document.getElementById("email"), "Enter a valid email");
    }

    if (phone === "") {
        showError(document.getElementById("phone"), "Phone is required");
    } else if (!phoneRegex.test(phone)) {
        showError(
            document.getElementById("phone"),
            "Phone must contain exactly 10 digits"
        );
    }

    if (dob === "") {
        showError(document.getElementById("dob"), "Date of birth is required");
    } else {
        const today = new Date().toISOString().split("T")[0];

        if (dob > today) {
            showError(
                document.getElementById("dob"),
                "Date of birth cannot be in the future"
            );
        }
    }

    if (!gender) {
        const genderGroup = document.querySelector('input[name="gender"]').parentElement;
        showError(genderGroup, "Please select gender");
    }

    if (course === "") {
        showError(document.getElementById("course"), "Please select a course");
    }

    if (skills.length === 0) {
        const skillsGroup = document.querySelector('input[name="skills"]').parentElement;
        showError(skillsGroup, "Please select at least one skill");
    }

    if (about === "") {
        showError(document.getElementById("about"), "About is required");
    }

    if (!photo) {
        showError(document.getElementById("photo"), "Profile photo is required");
    }

    if (isValid) {
        alert("Form submitted successfully");
    }
});