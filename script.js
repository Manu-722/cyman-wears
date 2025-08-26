
// Welcome message function
function welcomeMsg() {
    alert("You have successfully created an account! Press OK to be redirected to the home page.");
    window.location.href = "index.html"; // Replace with your homepage URL
}

// Initialize cart and total amount
let cart = []; // Holds cart items
let total = 0; // Stores total price

// Function to add an item to the cart
function addToCart(brandName, price) {
    cart.push({ brand: brandName, price: price }); // Add item to cart
    total += price; // Update total amount
    updateCartSummary(); // Update UI
    alert(`${brandName} has been added to your cart!`);
}

// Function to update the cart summary safely
function updateCartSummary() {
    // Get necessary UI elements
    const cartItemsList = document.getElementById('cart-items');
    const totalAmount = document.getElementById('total-amount');
    const cartCount = document.getElementById('cart-count');

    // Ensure all elements exist before modifying them
    if (!cartItemsList || !totalAmount || !cartCount) {
        console.error("One or more cart-related elements are missing.");
        return;
    }

    // Clear the existing cart list
    cartItemsList.innerHTML = '';

    // Populate the cart items in the UI
    cart.forEach((item) => {
        const itemDiv = document.createElement('div');
        itemDiv.textContent = `${item.brand}: KSH ${item.price}`;
        cartItemsList.appendChild(itemDiv);
    });

    // Update total amount and cart count
    totalAmount.textContent = `Total: KSH ${total}`;
    cartCount.textContent = cart.length;
    cartCount.style.display = cart.length > 0 ? 'inline' : 'none'; // 
}

// Function to handle checkout
function checkout() {
    const paymentMethod = document.getElementById('payment-method')?.value;

    if (cart.length === 0) {
        alert("Your cart is empty. Please add some items.");
        return;
    }

    alert(`Your total is KSH ${total}. Payment method: ${paymentMethod ? paymentMethod.toUpperCase() : 'N/A'}. Thank you for your purchase!`);

    // Reset cart
    cart = [];
    total = 0;
    updateCartSummary();
}

// Function to display cart summary
function showCartSummary() {
    if (cart.length === 0) {
        alert("Your cart is empty.");
    } else {
        alert(`You have ${cart.length} item(s) in your cart.\nTotal to pay: KSH ${total}`);
    }
}

// Ensure cart summary initializes properly
document.addEventListener("DOMContentLoaded", updateCartSummary);

// Function to render cart from local storage
function renderCart() {
    const cartItemsContainer = document.getElementById('cart-items');
    const totalDisplay = document.getElementById('total');
    const cartCountDisplay = document.getElementById('cart-count');

    let storedCart = JSON.parse(localStorage.getItem('cart')) || [];

    cartItemsContainer.innerHTML = '';
    cartCountDisplay.textContent = storedCart.length;

    if (storedCart.length === 0) {
        cartItemsContainer.innerHTML = '<p class="text-gray-600">Your cart is empty.</p>';
        totalDisplay.textContent = '0';
        return;
    }

    let total = 0;
    storedCart.forEach((item, index) => {
        total += item.price;
        const itemDiv = document.createElement('div');
        itemDiv.className = 'flex justify-between items-center border-b pb-2';

        itemDiv.innerHTML = `
            <div>
                <p class="font-medium">${item.brand}</p>
                <p class="text-gray-600">Ksh ${item.price}</p>
            </div>
            <button onclick="removeItem(${index})" class="text-red-500 hover:text-red-700">
                <i class="fas fa-trash-alt"></i>
            </button>
        `;

        cartItemsContainer.appendChild(itemDiv);
    });

    totalDisplay.textContent = total;
}

// Function to remove item from cart
function removeItem(index) {
    let storedCart = JSON.parse(localStorage.getItem('cart')) || [];
    storedCart.splice(index, 1);
    localStorage.setItem('cart', JSON.stringify(storedCart));
    renderCart();
}

// Load cart items on page load
document.addEventListener("DOMContentLoaded", renderCart);












// --- Welcome Message Function ---
function welcomeMsg() {
    alert("You have successfully created an account! Press OK to be redirected to the home page.");
    window.location.href = "index.html"; // Change to your actual homepage URL
}

// --- Cart Operations ---
function getCart() {
    return JSON.parse(localStorage.getItem('cart')) || [];
}

function setCart(cart) {
    localStorage.setItem('cart', JSON.stringify(cart));
}

// --- Add Item to Cart ---
function addToCart(brandName, price) {
    const cart = getCart();
    cart.push({ brand: brandName, price });
    setCart(cart);
    alert(`${brandName} has been added to your cart!`);
    renderCart(); // Update UI
}

// --- Remove Item from Cart ---
function removeItem(index) {
    const cart = getCart();
    if (cart[index]) {
        cart.splice(index, 1);
        setCart(cart);
        renderCart(); // Refresh UI
    }
}

// --- Clear Cart ---
function clearCart() {
    localStorage.removeItem('cart');
    renderCart();
}

// --- Calculate Total ---
function calculateTotal(cart) {
    return cart.reduce((sum, item) => sum + item.price, 0);
}

// --- Render Cart in UI ---
function renderCart() {
    const cart = getCart();
    const cartItemsContainer = document.getElementById('cart-items');
    const totalDisplay = document.getElementById('total-amount'); // Updated ID
    const cartCountDisplay = document.getElementById('cart-count');

    // Check if required elements exist
    if (!cartItemsContainer || !totalDisplay || !cartCountDisplay) {
        console.error("Missing cart UI elements");
        return;
    }

    // Update cart item count
    cartCountDisplay.textContent = cart.length;
    cartCountDisplay.style.display = cart.length > 0 ? 'inline' : 'none';

    // Clear cart display
    cartItemsContainer.innerHTML = '';

    // If cart is empty
    if (cart.length === 0) {
        cartItemsContainer.innerHTML = '<p class="text-gray-600">Your cart is empty.</p>';
        totalDisplay.textContent = 'Total: KSH 0';
        return;
    }

    // Render each cart item
    let total = 0;
    cart.forEach((item, index) => {
        total += item.price;
        const itemDiv = document.createElement('div');
        itemDiv.className = 'flex justify-between items-center border-b pb-2';

        itemDiv.innerHTML = `
            <div>
                <p class="font-medium">${item.brand}</p>
                <p class="text-gray-600">KSH ${item.price}</p>
            </div>
            <button onclick="removeItem(${index})" class="text-red-500 hover:text-red-700">
                <i class="fas fa-trash-alt"></i>
            </button>
        `;
        cartItemsContainer.appendChild(itemDiv);
    });

    // Show total
    totalDisplay.textContent = `Total: KSH ${total}`;
}

// --- Show Cart Summary Alert ---
function showCartSummary() {
    const cart = getCart();
    const total = calculateTotal(cart);

    if (cart.length === 0) {
        alert("Your cart is empty.");
    } else {
        alert(`You have ${cart.length} item(s) in your cart.\nTotal to pay: KSH ${total}`);
    }
}

// --- Checkout Function ---
function checkout() {
    const cart = getCart();
    const total = calculateTotal(cart);
    const paymentMethod = document.getElementById('payment-method')?.value || 'N/A';

    if (cart.length === 0) {
        alert("Your cart is empty. Please add some items.");
        return;
    }

    alert(`Your total is KSH ${total}. Payment method: ${paymentMethod.toUpperCase()}. Thank you for your purchase!`);
    clearCart(); // Reset cart
}

// --- Initialize on Page Load ---
document.addEventListener("DOMContentLoaded", renderCart);
// Function to add a product to the cart
   function addToCart(productName, price) {
    // Get the current cart from localStorage, or initialize an empty array if no cart exists
    let cart = JSON.parse(localStorage.getItem('cart')) || [];
    // Add the product to the cart
    cart.push({ name: productName, price: price });
    // Save the updated cart back to localStorage
    localStorage.setItem('cart', JSON.stringify(cart));
    // Update the cart count displayed on the icon
    updateCartCount();
    // Show an alert that the item has been added to the cart
    alert(`${productName} has been added to your cart for Ksh ${price}!`);
  }
  // Function to update the cart count on the icon
  function updateCartCount() {
    // Get the cart from localStorage
    const cart = JSON.parse(localStorage.getItem('cart')) || [];
    // Get the element where the cart count is displayed
    const cartCountElement = document.getElementById('cart-count');
    // Update the text content of the cart count element
    if (cartCountElement) {
      cartCountElement.textContent = cart.length; // Set the count to the length of the cart
    }
  }
  // Call the updateCartCount function when the page loads to ensure the cart count is updated
  window.addEventListener('DOMContentLoaded', updateCartCount);


  // Function to apply a discount code
function applyDiscount() {
    const discountCode = prompt("Enter discount code:");
    const validCodes = {
        SAVE10: 0.10, // 10% discount
        SAVE20: 0.20  // 20% discount
    };

    if (validCodes[discountCode]) {
        const discount = validCodes[discountCode];
        const discountAmount = total * discount;
        total -= discountAmount;
        alert(`Discount applied! You saved KSH ${discountAmount.toFixed(2)}.`);
        updateCartSummary();
    } else {
        alert("Invalid discount code.");
    }
}


















   