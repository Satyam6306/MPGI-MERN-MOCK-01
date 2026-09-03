const form = document.getElementById("studentForm");
const studentContainer = document.getElementById("studentContainer");
const studentCount = document.getElementById("studentCount");

const students = [];

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
        showError(
            document.querySelector('input[name="gender"]'),
            "Please select gender"
        );
    }

    if (course === "") {
        showError(document.getElementById("course"), "Please select a course");
    }

    if (skills.length === 0) {
        showError(
            document.querySelector('input[name="skills"]'),
            "Please select at least one skill"
        );
    }

    if (about === "") {
        showError(document.getElementById("about"), "About is required");
    }

    if (!photo) {
        showError(document.getElementById("photo"), "Profile photo is required");
    }

    if (!isValid) {
        return;
    }

    const student = {
        id: Date.now(),
        name: name,
        email: email,
        phone: phone,
        dob: dob,
        gender: gender.value,
        course: course,
        skills: Array.from(skills).map(function (skill) {
            return skill.value;
        }),
        about: about,
        photo: URL.createObjectURL(photo)
    };

    students.push(student);

    const card = document.createElement("div");
    card.className = "student-card";
    card.dataset.id = student.id;

    const image = document.createElement("img");
    image.src = student.photo;
    image.alt = student.name;

    const studentName = document.createElement("h3");
    studentName.textContent = student.name;

    const emailElement = document.createElement("p");
    emailElement.textContent = "Email: " + student.email;

    const phoneElement = document.createElement("p");
    phoneElement.textContent = "Phone: " + student.phone;

    const dobElement = document.createElement("p");
    dobElement.textContent = "DOB: " + student.dob;

    const genderElement = document.createElement("p");
    genderElement.textContent = "Gender: " + student.gender;

    const courseElement = document.createElement("p");
    courseElement.textContent = "Course: " + student.course;

    const skillsElement = document.createElement("p");
    skillsElement.textContent = "Skills: " + student.skills.join(", ");

    const aboutElement = document.createElement("p");
    aboutElement.textContent = "About: " + student.about;

    const deleteButton = document.createElement("button");
    deleteButton.type = "button";
    deleteButton.textContent = "Delete";

    card.appendChild(image);
    card.appendChild(studentName);
    card.appendChild(emailElement);
    card.appendChild(phoneElement);
    card.appendChild(dobElement);
    card.appendChild(genderElement);
    card.appendChild(courseElement);
    card.appendChild(skillsElement);
    card.appendChild(aboutElement);
    card.appendChild(deleteButton);

    studentContainer.appendChild(card);

    studentCount.textContent = "Total Students: " + students.length;

    form.reset();
});