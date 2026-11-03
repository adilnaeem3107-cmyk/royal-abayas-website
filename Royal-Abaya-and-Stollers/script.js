
let cart = [];

let selectedAbaya = {
    name: "",
    price: 0
};

let selectedAbayaColor = "";


function openProduct(name, price, image) {
    selectedAbaya.name = name;
    selectedAbaya.price = price;
    selectedAbaya.image = image;

    document.getElementById("productName").innerText = name;
    document.getElementById("productPrice").innerText =
        "Rs. " + price.toLocaleString();

    document.getElementById("productMenu").style.display = "flex";
}


// Close Product Menu
function closeProduct() {
    document.getElementById("productMenu").style.display = "none";
}
function addSelectedAbaya() {
    addToCart(
        selectedAbaya.name,
        selectedAbaya.price,
        selectedAbaya.image
    );

    closeProduct();
}

function addToCart(name, price, image) {

    let existingItem = cart.find(item => item.name === name);

    if (existingItem) {
        existingItem.quantity++;
    } else {
        cart.push({
            name: name,
            price: price,
            image: image,
            quantity: 1
        });
    }

    alert("Product added to cart!");
}




let exclusiveDesignList = [];

function openMultiProduct(title, designs) {
    exclusiveDesignList = designs;

    let designHTML = "";

    designs.forEach((item, index) => {
        designHTML += `
            <div class="exclusive-design">
                <h3>${index + 1}. ${item.name}</h3>
                <p>Price: Rs. ${item.price.toLocaleString()}</p>
                <button onclick="addExclusiveDesign(${index})">
                    Add to Cart
                </button>
            </div>
        `;
    });

    document.getElementById("exclusiveDesigns").innerHTML = designHTML;
    document.querySelector(".exclusive-popup-box h2").innerText = title;
    document.getElementById("exclusivePopup").style.display = "flex";
}

function addExclusiveDesign(index) {
    let item = exclusiveDesignList[index];

    if (!item) return;
addToCart(item.name, item.price, "images/abaya 8.jpg.jpg");
    alert(item.name + " added to cart!");
}

function closeExclusivePopup() {
    document.getElementById("exclusivePopup").style.display = "none";
}

function viewExclusiveCart() {
    closeExclusivePopup();
    viewCart();
}



// Georgette Stoller
function selectGeorgetteStoller() {

    let color = prompt("Choose your Georgette Stoller colour:");

    if (color === null || color.trim() === "") {
        return;
    }

    openProduct("Georgette Stoller - " + color.trim(), 400);
}

// Open Shopping Cart
function viewCart() {

    let cartSection = document.getElementById("cartSection");
    let cartItems = document.getElementById("cartItems");
    let cartTotal = document.getElementById("cartTotal");

    cartItems.innerHTML = "";

    let total = 0;

    if (cart.length === 0) {
        cartItems.innerHTML = "<p>Your cart is empty!</p>";
    }

    cart.forEach((item, index) => {

        let itemTotal = item.price * item.quantity;
        total += itemTotal;

        cartItems.innerHTML += `
            <div class="cart-item">
            <img src="${item.image}" class="cart-product-image">
                <p><b>${item.name}</b></p>

                <p>Price: Rs. ${item.price.toLocaleString()}</p>

                <button onclick="changeQuantity(${index}, -1)">−</button>

                <span>${item.quantity}</span>

                <button onclick="changeQuantity(${index}, 1)">+</button>

                <button onclick="removeItem(${index})">Remove</button>

                <p>Subtotal: Rs. ${itemTotal.toLocaleString()}</p>
            </div>
        `;
    });

    cartTotal.innerText = "Total: Rs. " + total.toLocaleString();

    closeProduct();

    cartSection.style.display = "flex";
}

// Change Quantity
function changeQuantity(index, amount) {

    cart[index].quantity += amount;

    if (cart[index].quantity <= 0) {
        cart.splice(index, 1);
    }

    viewCart();
}

// Remove Product
function removeItem(index) {
    cart.splice(index, 1);
    viewCart();
}

// Close Shopping Cart
function closeCart() {
    document.getElementById("cartSection").style.display = "none";
}

// Continue Shopping
function continueShopping() {
    closeCart();

    document.getElementById("products").scrollIntoView({
        behavior: "smooth"
    });
}

// WhatsApp Checkout
function checkoutWhatsApp() {

    if (cart.length === 0) {
        alert("Your cart is empty!");
        return;
    }

    let message = "Assalam o Alaikum! I want to order:\n\n";
    let total = 0;

    cart.forEach((item, index) => {

        let subtotal = item.price * item.quantity;

        message +=
            (index + 1) + ". " + item.name +
            "\nQuantity: " + item.quantity +
            "\nPrice: Rs. " + item.price.toLocaleString() +
            "\nSubtotal: Rs. " + subtotal.toLocaleString() +
            "\n\n";

        total += subtotal;
    });

    message += "Total: Rs. " + total.toLocaleString();

    window.open(
        "https://wa.me/923144140833?text=" +
        encodeURIComponent(message),
        "_blank"
    );
}

// Image Popup
function openImage(imageSrc) {
    document.getElementById("imagePopup").style.display = "flex";
    document.getElementById("popupImage").src = imageSrc;
}

function closeImage() {
    document.getElementById("imagePopup").style.display = "none";
}

// Abaya 11 Color Selection
function openColorSelection() {

    selectedAbayaColor = "";

    document.getElementById("selectedColorText").innerText =
        "Please select your color";

    document.querySelectorAll(".color-options button").forEach(button => {
        button.classList.remove("selected");
    });

    document.getElementById("colorPopup").style.display = "flex";
}

// Select Color
function selectAbayaColor(color) {

    selectedAbayaColor = color;

    document.getElementById("selectedColorText").innerText =
        "Selected Color: " + color;

    document.querySelectorAll(".color-options button").forEach(button => {

        button.classList.remove("selected");

        if (button.innerText.toLowerCase().includes(color.toLowerCase())) {
            button.classList.add("selected");
        }
    });
}

// Add Abaya 11 with Selected Color to Cart
function addColorAbayaToCart() {

    if (selectedAbayaColor === "") {
        alert("Please select a color first!");
        return;
    }

    let productName =
        "Simple Full Flare Abaya - " + selectedAbayaColor;

  addToCart(productName, 2800, "images/abaya 11.jpg.jpg");

    closeColorPopup();
}

// Close Color Popup
function closeColorPopup() {
    document.getElementById("colorPopup").style.display = "none";
}
