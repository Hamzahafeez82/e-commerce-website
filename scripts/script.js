const products = {
    quail: {
        img: "assets/products/quail meat.jpeg",
        title: "Quail Meat",
        desc: "Quail meat is highly nutritious and delicious. It is a great source of protein and minerals...",
        blogLink: "/blogs/Quail_meat.html",
        price: 100
    },
    amla: {
        img: "assets/products/amla powder.jpeg",
        title: "Amla powder",
        desc: "Amla powder is rich in Vitamin C and antioxidants, great for health and wellness.",
        blogLink: "/blogs/amlaPowder_blog.html",
        price: 100
    },
    bajra: {
        img: "assets/products/bajra-flour.jpeg",
        title: "Bajra flour",
        desc: "Bajra flour is a gluten-free, nutrient-rich option for healthy baking.",
        blogLink: "/blogs/bajraFloor_blog.html",
        price: 100
    },
    honey: {
        img: "assets/products/honey.jpeg",
        title: "Honey",
        desc: "Pure, natural honey with numerous health benefits.",
        blogLink: "/blogs/honey_blog.html",
        price: 100
    },
    tea: {
        img: "assets/products/hunza-tea.jpeg",
        title: "Hunza Tea",
        desc: "A unique blend of herbs from the Hunza valley, refreshing and healthy.",
        blogLink: "/blogs/hunzaTea_blog.html",
        price: 100
    },
    mustard_oil: {
        img: "assets/products/mustard oil.jpeg",
        title: "Mustard oil",
        desc: "Cold-pressed mustard oil, perfect for cooking and skincare.",
        blogLink: "/blogs/mustard_blog.html",
        price: 100
    },
    olive_oil: {
        img: "assets/products/olive oil.jpeg",
        title: "Olive oil",
        desc: "Extra virgin olive oil, ideal for cooking and dressings.",
        blogLink: "/blogs/oliveOil_blog.html",
        price: 100
    },
    pumpkin: {
        img: "assets/products/pumpkin seeds.jpeg",
        title: "Pumpkin seeds",
        desc: "Nutritious pumpkin seeds, rich in minerals and healthy fats.",
        blogLink: "/blogs/pumpkinSeeds_blog.html",
        price: 100
    },
    buckwheat: {
        img: "/assets/products/buckwheat.jpeg",
        title: "Buckwheat seeds",
        desc: "Nutritious buckwheat seeds, rich in minerals and healthy fats.",
        blogLink: "/blogs/buckwheat_blog.html",
        price: 100
    },
    turmaric: {
        img: "/assets/products/turmaric.jpeg",
        title: "Turmaric powder",
        desc: "Nutritious turmeric, rich in minerals.",
        blogLink: "/blogs/turmeric_blog.html",
        price: 100
    },
};

// Tap on the product and a popup appears
function openModal(product) {
    let productData = products[product];

    if (!productData) return;

    document.getElementById("modalImg").src = productData.img;
    document.getElementById("modalTitle").innerText = productData.title;
    document.getElementById("modalDesc").innerText = productData.desc;
    document.getElementById("modalBlogLink").href = productData.blogLink;

    document.getElementById("productModal").style.display = "flex";
}

function closeModal() {
    document.getElementById("productModal").style.display = "none";
}

function shopNow() {
    window.location.href = "shop.html";
}

// Add to cart with confetti and mini cart preview
function addToCart() {
    const title = document.getElementById("modalTitle").innerText;
    const product = Object.values(products).find(p => p.title === title);

    if (!product) return;

    // Update cart in localStorage
    let cart = JSON.parse(localStorage.getItem('cart')) || [];
    const existingItem = cart.find(item => item.title === title);
    if (existingItem) {
        existingItem.quantity += 1;
    } else {
        cart.push({
            title: product.title,
            price: product.price,
            image: product.img,
            quantity: 1
        });
    }
    localStorage.setItem('cart', JSON.stringify(cart));

    // Close the modal
    closeModal();

    // Trigger confetti animation
    confetti({
        particleCount: 100,
        spread: 70,
        origin: { y: 0.6 }
    });

    // Show mini cart preview
    showMiniCart(cart);
}

function showMiniCart(cart) {
    let miniCart = document.getElementById('mini-cart');
    if (!miniCart) {
        miniCart = document.createElement('div');
        miniCart.id = 'mini-cart';
        document.body.appendChild(miniCart);
    }

    // Calculate total items and amount
    const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);
    const totalAmount = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);

    miniCart.innerHTML = `
        <h4>Cart Preview (${totalItems} items)</h4>
        <ul>${cart.map(item => `<li>${item.title} (x${item.quantity}) - ${item.price * item.quantity}Rs</li>`).join('')}</ul>
        <p>Total: ${totalAmount}Rs</p>
        <a href="cart.html">View Cart</a>
    `;
    miniCart.classList.add('show');

    // Hide after 7 seconds
    setTimeout(() => miniCart.classList.remove('show'), 7000);
}

// // Profile dropdown
// document.addEventListener("DOMContentLoaded", function () {
//     const userIcon = document.querySelector("#lg-bag a[href='profile.html'] i.far.fa-user");
//     if (userIcon) {
//         const dropdown = document.createElement("div");
//         dropdown.classList.add("dropdown-menu");
//         dropdown.innerHTML = `
//             <button onclick="profile()">Profile</button>
//             <button onclick="logout()">Logout</button>
//         `;
        
//         userIcon.parentElement.appendChild(dropdown);
        
//         userIcon.addEventListener("click", function (event) {
//             event.preventDefault();
//             event.stopPropagation();
//             dropdown.classList.toggle("show");
//         });
        
//         document.addEventListener("click", function () {
//             dropdown.classList.remove("show");
//         });
//     }
// });


// Add event listeners for mobile menu
const menuIcon = document.getElementById('bar');
const navbar = document.getElementById('navbar');
const closeIcon = document.getElementById('close');

if (menuIcon) {
    menuIcon.addEventListener('click', () => {
        navbar.classList.add('active');
    });
}

if (closeIcon) {
    closeIcon.addEventListener('click', (e) => {
        e.preventDefault(); // Prevent the <a> tag from navigating
        navbar.classList.remove('active');
    });
}

function profile() {
    window.location.href = "profile.html";
}

function logout() {
    window.location.href = "auth.html";
}

//----------------------------------------------------------------//
document.addEventListener('DOMContentLoaded', () => {
    const profileIcons = document.querySelectorAll('.profile-icon');
    const profilePopup = document.querySelector('.profile-popup');

    console.log('Number of profile icons found:', profileIcons.length);

    profileIcons.forEach((icon, index) => {
        icon.addEventListener('click', (e) => {
            e.preventDefault();
            console.log(`Profile icon ${index} clicked`);
            profilePopup.classList.toggle('active');
        });
    });

    document.addEventListener('click', (e) => {
        const isClickInsideIcon = Array.from(profileIcons).some(icon => icon.contains(e.target));
        if (!isClickInsideIcon && !profilePopup.contains(e.target)) {
            console.log('Clicked outside, closing popup');
            profilePopup.classList.remove('active');
        }
    });
});
profileIcons.forEach((icon, index) => {
    icon.addEventListener('click', (e) => {
        e.preventDefault();
        console.log(`Profile icon ${index} clicked`);
        profilePopup.classList.toggle('active');
    });
    icon.addEventListener('touchstart', (e) => {
        e.preventDefault();
        console.log(`Profile icon ${index} touched`);
        profilePopup.classList.toggle('active');
    });
});