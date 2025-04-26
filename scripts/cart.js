// Function to load and display cart items
function loadCart() {
    const cartTableBody = document.getElementById('cartTableBody');
    const cartSubtotal = document.getElementById('cartSubtotal');
    const shippingCost = document.getElementById('shippingCost');
    const cartTotal = document.getElementById('cartTotal');

    // Get cart from localStorage
    let cart = JSON.parse(localStorage.getItem('cart')) || [];
    cartTableBody.innerHTML = ''; // Clear table

    let subtotal = 0;

    // Populate cart table
    cart.forEach((item, index) => {
        const row = document.createElement('tr');
        row.innerHTML = `
            <td><a href="#" onclick="removeItem(${index}); return false;"><i class="far fa-times-circle"></i></a></td>
            <td><img src="${item.image}" alt="${item.title}" style="width: 50px;"></td>
            <td>${item.title}</td>
            <td>${item.price}Rs</td>
            <td>${item.quantity}</td>
            <td>${item.price * item.quantity}Rs</td>
        `;
        cartTableBody.appendChild(row);
        subtotal += item.price * item.quantity;
    });

    // Update totals
    const shipping = 100; // Hardcoded shipping cost
    cartSubtotal.textContent = `${subtotal}Rs`;
    shippingCost.textContent = `${shipping}Rs`;
    cartTotal.textContent = `${subtotal + shipping}Rs`;
}

// Function to remove item from cart
function removeItem(index) {
    let cart = JSON.parse(localStorage.getItem('cart')) || [];
    cart.splice(index, 1); // Remove item at index
    localStorage.setItem('cart', JSON.stringify(cart)); // Update localStorage
    loadCart(); // Refresh cart display
}

// Load cart when page loads
window.onload = loadCart;

//----------------------------------coupons-------------------------------//

// Define available coupons
const coupons = {
    "DAWAR": 10,  // 10Rs discount
    "HAROON": 50,      // 50Rs discount
    "HAMZA": "free" // Free shipping
};

function applyCoupon() {
    let couponInput = document.querySelector(".coupon input").value.trim().toUpperCase();
    
    let subtotalText = document.getElementById("cartSubtotal").innerText;
    let shippingText = document.getElementById("shippingCost").innerText;

    // Convert "100Rs" to 100
    let subtotal = parseInt(subtotalText.replace("Rs", "").trim());
    let shipping = parseInt(shippingText.replace("Rs", "").trim());
    let discount = 0;

    if (coupons[couponInput]) {
        if (coupons[couponInput] === "free") {
            shipping = 0;  // Apply free shipping
        } else {
            discount = coupons[couponInput];  // Apply discount
        }
    } else {
        alert("Invalid Coupon Code!");
        return;
    }

    let total = subtotal + shipping - discount;
    
    // Update the UI
    document.getElementById("shippingCost").innerText = shipping + "Rs";
    document.getElementById("cartTotal").innerHTML = `<strong>${total}Rs</strong>`;
    // alert("Coupon Applied Successfully!");
}

