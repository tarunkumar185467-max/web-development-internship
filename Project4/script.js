/* =====================================
   TODO LIST + LOCAL STORAGE
===================================== */

const taskInput =
    document.getElementById("taskInput");

const addTaskBtn =
    document.getElementById("addTaskBtn");

const taskList =
    document.getElementById("taskList");


/* Get saved tasks */

let tasks =
    JSON.parse(localStorage.getItem("tasks")) || [];


/* Display Tasks */

function displayTasks() {

    taskList.innerHTML = "";

    tasks.forEach((task, index) => {

        const li =
            document.createElement("li");


        const span =
            document.createElement("span");

        span.textContent = task;


        const deleteButton =
            document.createElement("button");

        deleteButton.textContent = "Delete";

        deleteButton.classList.add(
            "delete-btn"
        );


        deleteButton.addEventListener(
            "click",
            function () {

                deleteTask(index);

            }
        );


        li.appendChild(span);

        li.appendChild(deleteButton);

        taskList.appendChild(li);

    });

}


/* Add Task */

function addTask() {

    const task =
        taskInput.value.trim();


    if (task === "") {

        alert("Please enter a task.");

        return;
    }


    tasks.push(task);


    /* Save to Local Storage */

    localStorage.setItem(
        "tasks",
        JSON.stringify(tasks)
    );


    taskInput.value = "";


    displayTasks();

}


/* Delete Task */

function deleteTask(index) {

    tasks.splice(index, 1);


    localStorage.setItem(
        "tasks",
        JSON.stringify(tasks)
    );


    displayTasks();

}


addTaskBtn.addEventListener(
    "click",
    addTask
);


/* Enter key */

taskInput.addEventListener(
    "keydown",
    function (event) {

        if (event.key === "Enter") {

            addTask();

        }

    }
);


/* Display saved tasks when page opens */

displayTasks();



/* =====================================
   PRODUCT DATA
===================================== */

const products = [

    {
        name: "Wireless Headphones",

        category: "electronics",

        price: 2500,

        rating: 4.5,

        icon: "🎧"
    },

    {
        name: "Smart Watch",

        category: "electronics",

        price: 4500,

        rating: 4.2,

        icon: "⌚"
    },

    {
        name: "Laptop",

        category: "electronics",

        price: 45000,

        rating: 4.8,

        icon: "💻"
    },

    {
        name: "USB Keyboard",

        category: "accessories",

        price: 800,

        rating: 4.1,

        icon: "⌨️"
    },

    {
        name: "Wireless Mouse",

        category: "accessories",

        price: 700,

        rating: 4.4,

        icon: "🖱️"
    },

    {
        name: "Study Lamp",

        category: "study",

        price: 1200,

        rating: 4.6,

        icon: "💡"
    },

    {
        name: "Notebook",

        category: "study",

        price: 250,

        rating: 4.3,

        icon: "📓"
    },

    {
        name: "Calculator",

        category: "study",

        price: 900,

        rating: 4.5,

        icon: "🧮"
    }

];


/* =====================================
   PRODUCT ELEMENTS
===================================== */

const productList =
    document.getElementById("productList");

const categoryFilter =
    document.getElementById(
        "categoryFilter"
    );

const priceFilter =
    document.getElementById(
        "priceFilter"
    );

const sortFilter =
    document.getElementById(
        "sortFilter"
    );



/* =====================================
   DISPLAY PRODUCTS
===================================== */

function displayProducts(productArray) {

    productList.innerHTML = "";


    if (productArray.length === 0) {

        productList.innerHTML =
            "<p>No products found.</p>";

        return;
    }


    productArray.forEach(product => {

        const card =
            document.createElement("div");


        card.classList.add(
            "product-card"
        );


        card.innerHTML = `

            <div class="product-icon">
                ${product.icon}
            </div>

            <h3>
                ${product.name}
            </h3>

            <p class="product-category">
                Category:
                ${product.category}
            </p>

            <p class="product-price">
                ₹${product.price.toLocaleString("en-IN")}
            </p>

            <p class="product-rating">
                ⭐ ${product.rating}
            </p>

        `;


        productList.appendChild(card);

    });

}


/* =====================================
   FILTER + SORT
===================================== */

function updateProducts() {

    let filteredProducts =
        [...products];


    /* Category */

    const category =
        categoryFilter.value;


    if (category !== "all") {

        filteredProducts =
            filteredProducts.filter(
                product =>
                    product.category === category
            );

    }


    /* Price */

    const price =
        priceFilter.value;


    if (price === "low") {

        filteredProducts =
            filteredProducts.filter(
                product =>
                    product.price < 1000
            );

    }

    else if (price === "medium") {

        filteredProducts =
            filteredProducts.filter(
                product =>
                    product.price >= 1000 &&
                    product.price <= 5000
            );

    }

    else if (price === "high") {

        filteredProducts =
            filteredProducts.filter(
                product =>
                    product.price > 5000
            );

    }


    /* Sorting */

    const sort =
        sortFilter.value;


    if (sort === "priceLow") {

        filteredProducts.sort(
            (a, b) =>
                a.price - b.price
        );

    }

    else if (sort === "priceHigh") {

        filteredProducts.sort(
            (a, b) =>
                b.price - a.price
        );

    }

    else if (sort === "rating") {

        filteredProducts.sort(
            (a, b) =>
                b.rating - a.rating
        );

    }


    displayProducts(
        filteredProducts
    );

}


/* Filter events */

categoryFilter.addEventListener(
    "change",
    updateProducts
);

priceFilter.addEventListener(
    "change",
    updateProducts
);

sortFilter.addEventListener(
    "change",
    updateProducts
);


/* Initial products */

displayProducts(products);



/* =====================================
   CONTACT FORM
===================================== */

const contactForm =
    document.getElementById(
        "contactForm"
    );

const formMessage =
    document.getElementById(
        "formMessage"
    );


contactForm.addEventListener(
    "submit",
    function (event) {

        event.preventDefault();


        const name =
            document.getElementById(
                "name"
            ).value.trim();


        const email =
            document.getElementById(
                "email"
            ).value.trim();


        const message =
            document.getElementById(
                "message"
            ).value.trim();


        if (
            name === "" ||
            email === "" ||
            message === ""
        ) {

            formMessage.textContent =
                "Please fill in all fields.";

            return;
        }


        formMessage.textContent =
            "Thank you! Your message has been submitted.";


        contactForm.reset();

    }
);