function welcomeMsg() {
    // Display pop-up message
    alert("You have successfully created an account! Press OK to be redirected to the home page.");
    alert("You have successfully created an account!");
    // Redirect to the home page
            window.location.href = "index.html"; // Replace 'home.html' with the URL of your home page.
        }

       // Store cart items and total amount
let cart = []; // Array to hold items in the cart
let total = 0; // Variable to store the total amount

// Function to add an item to the cart
function addToCart(brandName, price) {
    // Add item to the cart array with brand name and price
    cart.push({ brand: brandName, price: price });
    // Update total by adding the item's price
    total += price;
    // Update the cart summary in the UI
    updateCartSummary();
    // Show confirmation message to the user
    alert(`${brandName} has been added to your cart!`);
}

// Function to update the cart summary and cart icon
function updateCartSummary() {
    // Get HTML elements to update cart summary and cart icon
    const cartItemsList = document.getElementById('cart-items');
    const totalAmount = document.getElementById('total-amount');
    const cartCount = document.getElementById('cart-count');

    // Clear the current list of cart items
    cartItemsList.innerHTML = '';

    // Iterate through cart items and display them in the UI
    cart.forEach((item) => {
        const itemDiv = document.createElement('div'); // Create a div for each item
        itemDiv.textContent = `${item.brand}: KSH ${item.price}`; // Set item details
        cartItemsList.appendChild(itemDiv); // Append item to the cart list
    });

    // Update total amount in the UI
    totalAmount.textContent = `Total: KSH ${total}`;

    // Update the cart count and toggle its visibility
    cartCount.textContent = cart.length; // Number of items in the cart
    cartCount.style.display = cart.length > 0 ? 'block' : 'none'; // Show only if cart has items
}

// Function to handle checkout
function checkout() {
    // Get the selected payment method from the dropdown menu
    const paymentMethod = document.getElementById('payment-method').value;

    // Check if the cart is empty
    if (cart.length === 0) {
        alert("Your cart is empty. Please add some items."); // Show warning if cart is empty
        return; // Exit the function
    }

    // Display the total amount and payment method to the user
    alert(`Your total is KSH ${total}. Payment method: ${paymentMethod.toUpperCase()}. Thank you for your purchase!`);

    // Reset cart after checkout
    cart = []; // Clear cart array
    total = 0; // Reset total amount
    updateCartSummary(); // Update the UI to reflect the empty cart
}

// Function to show cart summary when the cart icon is clicked
function showCartSummary() {
    // Check if the cart is empty
    if (cart.length === 0) {
        alert("Your cart is empty."); // Show message if cart is empty
    } else {
        // Display the number of items and total amount in the cart
        alert(`You have ${cart.length} item(s) in your cart.\nTotal to pay: KSH ${total}`);
    }
}

// Initialize cart summary on page load
document.addEventListener("DOMContentLoaded", () => {
    updateCartSummary(); // Set up initial cart summary in the UI
});

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


  function renderCart() {
    const cartItemsContainer = document.getElementById('cart-items');
    const totalDisplay = document.getElementById('total');
    const cartCountDisplay = document.getElementById('cart-count'); // Get the cart count display element

    let cart = JSON.parse(localStorage.getItem('cart')) || [];  
    cartItemsContainer.innerHTML = ''; 

    // Update the cart count
    cartCountDisplay.textContent = cart.length;  

    if (cart.length === 0) {
        cartItemsContainer.innerHTML = '<p class="text-gray-600">Your cart is empty.</p>';
        totalDisplay.textContent = '0';
        return;
    }

    let total = 0;
    cart.forEach((item, index) => {
        total += item.price;
        const itemDiv = document.createElement('div');
        itemDiv.className = 'flex justify-between items-center border-b pb-2';

        itemDiv.innerHTML = `
            <div>
                <p class="font-medium">${item.name}</p>
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
