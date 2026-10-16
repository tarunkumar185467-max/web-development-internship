/* =========================
   CONTACT FORM VALIDATION
========================= */

const contactForm = document.getElementById("contactForm");

const nameInput = document.getElementById("name");

const emailInput = document.getElementById("email");

const messageInput = document.getElementById("message");

const nameError = document.getElementById("nameError");

const emailError = document.getElementById("emailError");

const messageError = document.getElementById("messageError");

const successMessage = document.getElementById("successMessage");


contactForm.addEventListener("submit", function (event) {

    event.preventDefault();

    // Clear previous messages
    nameError.textContent = "";
    emailError.textContent = "";
    messageError.textContent = "";
    successMessage.textContent = "";

    let isValid = true;


    /* Name Validation */

    if (nameInput.value.trim() === "") {

        nameError.textContent =
            "Please enter your name.";

        isValid = false;
    }


    /* Email Validation */

    const emailPattern =
        /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (emailInput.value.trim() === "") {

        emailError.textContent =
            "Please enter your email.";

        isValid = false;

    } else if (!emailPattern.test(emailInput.value.trim())) {

        emailError.textContent =
            "Please enter a valid email address.";

        isValid = false;
    }


    /* Message Validation */

    if (messageInput.value.trim() === "") {

        messageError.textContent =
            "Please enter your message.";

        isValid = false;
    }


    /* Successful Form Submission */

    if (isValid) {

        successMessage.textContent =
            "Message submitted successfully!";

        contactForm.reset();
    }

});


/* =========================
   DYNAMIC TO-DO LIST
========================= */

const taskInput =
    document.getElementById("taskInput");

const addTaskBtn =
    document.getElementById("addTaskBtn");

const taskList =
    document.getElementById("taskList");


/* Add Task */

addTaskBtn.addEventListener("click", addTask);


/* Allow Enter key */

taskInput.addEventListener("keydown", function (event) {

    if (event.key === "Enter") {

        addTask();
    }

});


function addTask() {

    const taskText =
        taskInput.value.trim();


    // Don't add empty task

    if (taskText === "") {

        alert("Please enter a task.");

        return;
    }


    /* Create list item */

    const listItem =
        document.createElement("li");


    /* Create task text */

    const taskSpan =
        document.createElement("span");

    taskSpan.textContent = taskText;


    /* Create delete button */

    const deleteButton =
        document.createElement("button");

    deleteButton.textContent = "Delete";

    deleteButton.classList.add("delete-btn");


    /* Delete task */

    deleteButton.addEventListener("click", function () {

        listItem.remove();

    });


    /* Add elements to list item */

    listItem.appendChild(taskSpan);

    listItem.appendChild(deleteButton);


    /* Add list item to task list */

    taskList.appendChild(listItem);


    /* Clear input */

    taskInput.value = "";

    taskInput.focus();
}