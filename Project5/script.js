/* =========================================
   PRODUCT DATA
========================================= */

const products = [

    {
        id: 1,
        name: "Wireless Headphones",
        category: "electronics",
        price: 2499,
        rating: 4.5,
        image:
            "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?auto=format&fit=crop&w=600&q=80"
    },

    {
        id: 2,
        name: "Smart Watch",
        category: "electronics",
        price: 3999,
        rating: 4.3,
        image:
            "https://images.unsplash.com/photo-1523275335684-37898b6baf30?auto=format&fit=crop&w=600&q=80"
    },

    {
        id: 3,
        name: "Laptop",
        category: "electronics",
        price: 49999,
        rating: 4.8,
        image:
            "https://images.unsplash.com/photo-1496181133206-80ce9b88a853?auto=format&fit=crop&w=600&q=80"
    },

    {
        id: 4,
        name: "Wireless Keyboard",
        category: "accessories",
        price: 899,
        rating: 4.2,
        image:
            "https://images.unsplash.com/photo-1587829741301-dc798b83add3?auto=format&fit=crop&w=600&q=80"
    },

    {
        id: 5,
        name: "Wireless Mouse",
        category: "accessories",
        price: 699,
        rating: 4.4,
        image:
            "https://images.unsplash.com/photo-1527814050087-3793815479db?auto=format&fit=crop&w=600&q=80"
    },

    {
        id: 6,
        name: "Study Lamp",
        category: "study",
        price: 1299,
        rating: 4.6,
        image:
            "https://images.unsplash.com/photo-1507473885765-e6ed057f782c?auto=format&fit=crop&w=600&q=80"
    },

    {
        id: 7,
        name: "Notebook",
        category: "study",
        price: 299,
        rating: 4.3,
        image:
            "https://images.unsplash.com/photo-1531346878377-a5be20888e57?auto=format&fit=crop&w=600&q=80"
    },

    {
        id: 8,
        name: "Camera",
        category: "electronics",
        price: 32999,
        rating: 4.7,
        image:
            "https://images.unsplash.com/photo-1516035069371-29a1b244cc32?auto=format&fit=crop&w=600&q=80"
    }

];


/* =========================================
   DOM ELEMENTS
========================================= */

const productList =
    document.getElementById("productList");

const searchInput =
    document.getElementById("searchInput");

const categoryFilter =
    document.getElementById("categoryFilter");

const sortFilter =
    document.getElementById("sortFilter");

const productCount =
    document.getElementById("productCount");

const noProducts =
    document.getElementById("noProducts");



/* =========================================
   CART
========================================= */

let cart =
    JSON.parse(
        localStorage.getItem("cart")
    ) || [];


/* =========================================
   DISPLAY PRODUCTS
========================================= */

function displayProducts(list) {

    productList.innerHTML = "";

    productCount.textContent =
        `${list.length} product${list.length !== 1 ? "s" : ""} found`;


    if (list.length === 0) {

        noProducts.style.display =
            "block";

        return;

    }


    noProducts.style.display =
        "none";


    const fragment =
        document.createDocumentFragment();


    list.forEach(product => {

        const card =
            document.createElement("article");

        card.className =
            "product-card";


        card.innerHTML = `

            <img
                class="product-image"
                src="${product.image}"
                alt="${product.name}"
                loading="lazy"
                width="600"
                height="400"
            >

            <div class="product-info">

                <span class="product-category">
                    ${product.category}
                </span>

                <h3>
                    ${product.name}
                </h3>

                <div class="rating">
                    ⭐ ${product.rating}
                </div>

                <div class="price">
                    ₹${product.price.toLocaleString("en-IN")}
                </div>

                <button
                    class="add-cart"
                    data-id="${product.id}"
                >
                    Add to Cart
                </button>

            </div>
        `;


        fragment.appendChild(card);

    });


    productList.appendChild(fragment);

}


/* =========================================
   FILTER + SORT
========================================= */

function updateProducts() {

    const search =
        searchInput.value
            .toLowerCase()
            .trim();


    const category =
        categoryFilter.value;


    const sort =
        sortFilter.value;


    let filtered =
        products.filter(product => {


            const matchesSearch =
                product.name
                    .toLowerCase()
                    .includes(search);


            const matchesCategory =
                category === "all" ||
                product.category === category;


            return (
                matchesSearch &&
                matchesCategory
            );

        });


    /* Sorting */

    if (sort === "priceLow") {

        filtered.sort(
            (a, b) =>
                a.price - b.price
        );

    }


    if (sort === "priceHigh") {

        filtered.sort(
            (a, b) =>
                b.price - a.price
        );

    }


    if (sort === "rating") {

        filtered.sort(
            (a, b) =>
                b.rating - a.rating
        );

    }


    displayProducts(filtered);

}


/* =========================================
   FILTER EVENTS
========================================= */

searchInput.addEventListener(
    "input",
    updateProducts
);

categoryFilter.addEventListener(
    "change",
    updateProducts
);

sortFilter.addEventListener(
    "change",
    updateProducts
);


/* =========================================
   ADD TO CART
========================================= */

productList.addEventListener(
    "click",
    function(event) {

        if (
            !event.target.classList.contains(
                "add-cart"
            )
        ) {

            return;

        }


        const id =
            Number(
                event.target.dataset.id
            );


        const existing =
            cart.find(
                item => item.id === id
            );


        if (existing) {

            existing.quantity++;

        } else {

            cart.push({
                id: id,
                quantity: 1
            });

        }


        saveCart();

        updateCartUI();

        showToast(
            "Product added to cart!"
        );

    }
);


/* =========================================
   SAVE CART
========================================= */

function saveCart() {

    localStorage.setItem(
        "cart",
        JSON.stringify(cart)
    );

}


/* =========================================
   CART UI
========================================= */

const cartPanel =
    document.getElementById("cartPanel");

const cartItems =
    document.getElementById("cartItems");

const cartTotal =
    document.getElementById("cartTotal");

const cartCount =
    document.getElementById("cartCount");


function updateCartUI() {

    cartItems.innerHTML = "";


    let total = 0;

    let count = 0;


    if (cart.length === 0) {

        cartItems.innerHTML = `
            <p class="empty-cart">
                Your cart is empty.
            </p>
        `;

    }


    cart.forEach(item => {

        const product =
            products.find(
                p => p.id === item.id
            );


        if (!product) {
            return;
        }


        total +=
            product.price *
            item.quantity;


        count +=
            item.quantity;


        const cartItem =
            document.createElement("div");

        cartItem.className =
            "cart-item";


        cartItem.innerHTML = `

            <img
                src="${product.image}"
                alt="${product.name}"
                loading="lazy"
                width="65"
                height="65"
            >

            <div>

                <h4>
                    ${product.name}
                </h4>

                <div class="cart-item-price">
                    ₹${product.price.toLocaleString("en-IN")}
                </div>

                <div class="quantity">

                    <button
                        data-action="decrease"
                        data-id="${product.id}"
                    >
                        −
                    </button>

                    <span>
                        ${item.quantity}
                    </span>

                    <button
                        data-action="increase"
                        data-id="${product.id}"
                    >
                        +
                    </button>

                    <button
                        class="remove-item"
                        data-action="remove"
                        data-id="${product.id}"
                    >
                        Remove
                    </button>

                </div>

            </div>

        `;


        cartItems.appendChild(cartItem);

    });


    cartCount.textContent = count;

    cartTotal.textContent =
        `₹${total.toLocaleString("en-IN")}`;

}


/* =========================================
   CART ACTIONS
========================================= */

cartItems.addEventListener(
    "click",
    function(event) {

        const action =
            event.target.dataset.action;


        const id =
            Number(
                event.target.dataset.id
            );


        if (!action) {
            return;
        }


        const item =
            cart.find(
                product => product.id === id
            );


        if (!item) {
            return;
        }


        if (action === "increase") {

            item.quantity++;

        }


        if (action === "decrease") {

            item.quantity--;

            if (item.quantity <= 0) {

                cart =
                    cart.filter(
                        product =>
                            product.id !== id
                    );

            }

        }


        if (action === "remove") {

            cart =
                cart.filter(
                    product =>
                        product.id !== id
                );

        }


        saveCart();

        updateCartUI();

    }
);


/* =========================================
   CART OPEN/CLOSE
========================================= */

const cartBtn =
    document.getElementById("cartBtn");

const closeCart =
    document.getElementById("closeCart");

const overlay =
    document.getElementById("overlay");


function openCart() {

    cartPanel.classList.add("open");

    overlay.classList.add("active");

}


function closeCartPanel() {

    cartPanel.classList.remove("open");

    overlay.classList.remove("active");

}


cartBtn.addEventListener(
    "click",
    openCart
);

closeCart.addEventListener(
    "click",
    closeCartPanel
);

overlay.addEventListener(
    "click",
    closeCartPanel
);


/* =========================================
   CHECKOUT
========================================= */

const checkoutBtn =
    document.getElementById(
        "checkoutBtn"
    );


checkoutBtn.addEventListener(
    "click",
    function() {

        if (cart.length === 0) {

            showToast(
                "Your cart is empty."
            );

            return;

        }


        showToast(
            "Checkout feature is ready for integration!"
        );

    }
);


/* =========================================
   TOAST
========================================= */

const toast =
    document.getElementById("toast");


let toastTimer;


function showToast(message) {

    toast.textContent =
        message;

    toast.classList.add("show");


    clearTimeout(toastTimer);


    toastTimer =
        setTimeout(
            function() {

                toast.classList.remove(
                    "show"
                );

            },
            2500
        );

}


/* =========================================
   DARK MODE
========================================= */

const themeBtn =
    document.getElementById(
        "themeBtn"
    );


const savedTheme =
    localStorage.getItem(
        "theme"
    );


if (savedTheme === "dark") {

    document.body.classList.add(
        "dark"
    );

    themeBtn.textContent = "☀️";

}


themeBtn.addEventListener(
    "click",
    function() {

        document.body.classList.toggle(
            "dark"
        );


        const isDark =
            document.body.classList.contains(
                "dark"
            );


        themeBtn.textContent =
            isDark ? "☀️" : "🌙";


        localStorage.setItem(
            "theme",
            isDark ? "dark" : "light"
        );

    }
);


/* =========================================
   CONTACT FORM
========================================= */

const contactForm =
    document.getElementById(
        "contactForm"
    );

const contactStatus =
    document.getElementById(
        "contactStatus"
    );


contactForm.addEventListener(
    "submit",
    function(event) {

        event.preventDefault();


        contactStatus.textContent =
            "Thank you! Your message has been submitted.";


        contactForm.reset();

    }
);


/* =========================================
   INITIAL LOAD
========================================= */

displayProducts(products);

updateCartUI();