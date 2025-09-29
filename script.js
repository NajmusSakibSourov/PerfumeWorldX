// Product Data
const products = [
    {
        id: 1,
        name: "Mystic Rose",
        description: "Floral scent with rose & jasmine notes",
        price: 59,
        image: "Mystic Rose.jpeg"
    },
    {
        id: 2,
        name: "Ocean Breeze",
        description: "Fresh aqua perfume with citrus",
        price: 49,
        image: "Ocean Breez.....jpg"
    },
    {
        id: 3,
        name: "Amber Night",
        description: "Warm amber & vanilla",
        price: 65,
        image: "Amber night.......jpg"
    },
    {
        id: 4,
        name: "Citrus Bloom",
        description: "Sweet citrus with fruity top notes",
        price: 39,
        image: "Citrus Bloom.jpg"
    },
    {
        id: 5,
        name: "Royal Oud",
        description: "Luxury oud & sandalwood",
        price: 79,
        image: "Royal Oud....jpg"
    },
    {
        id: 6,
        name: "Velvet Musk",
        description: "Soft musk with powdery finish",
        price: 55,
        image: "-velvet-musk-1.jpeg"
    }
];

// DOM Elements
const productGrid = document.getElementById('product-grid');
const cartBtn = document.getElementById('cart-btn');
const cartCount = document.getElementById('cart-count');
const cartModal = document.getElementById('cart-modal');
const cartItems = document.getElementById('cart-items');
const cartTotalPrice = document.getElementById('cart-total-price');
const checkoutBtn = document.getElementById('checkout-btn');
const checkoutModal = document.getElementById('checkout-modal');
const checkoutForm = document.getElementById('checkout-form');
const orderConfirmation = document.getElementById('order-confirmation');
const continueShoppingBtn = document.getElementById('continue-shopping');

// Close buttons for modals
const closeButtons = document.querySelectorAll('.close');

// Cart data
let cart = [];

// Display Products
function displayProducts() {
    productGrid.innerHTML = '';
    
    products.forEach(product => {
        const productCard = document.createElement('div');
        productCard.classList.add('product-card');
        
        productCard.innerHTML = `
            <div class="product-image">
                <img src="${product.image}" alt="${product.name}">
            </div>
            <div class="product-info">
                <h3 class="product-name">${product.name}</h3>
                <p class="product-description">${product.description}</p>
                <p class="product-price">$${product.price}</p>
                <button class="btn add-to-cart" data-id="${product.id}">Add to Cart</button>
            </div>
        `;
        
        productGrid.appendChild(productCard);
    });
    
    // Add event listeners to "Add to Cart" buttons
    const addToCartButtons = document.querySelectorAll('.add-to-cart');
    addToCartButtons.forEach(button => {
        button.addEventListener('click', addToCart);
    });
}

// Add to Cart
function addToCart(e) {
    const productId = parseInt(e.target.getAttribute('data-id'));
    const product = products.find(p => p.id === productId);
    
    // Check if product is already in cart
    const existingItem = cart.find(item => item.id === productId);
    
    if (existingItem) {
        existingItem.quantity++;
    } else {
        cart.push({
            id: product.id,
            name: product.name,
            price: product.price,
            image: product.image,
            quantity: 1
        });
    }
    
    updateCartCount();
    
    // Show confirmation message
    const confirmMessage = document.createElement('div');
    confirmMessage.classList.add('add-confirmation');
    confirmMessage.textContent = `${product.name} added to cart!`;
    document.body.appendChild(confirmMessage);
    
    setTimeout(() => {
        confirmMessage.remove();
    }, 2000);
}

// Update Cart Count
function updateCartCount() {
    const totalItems = cart.reduce((total, item) => total + item.quantity, 0);
    cartCount.textContent = totalItems;
}

// Display Cart Items
function displayCartItems() {
    cartItems.innerHTML = '';
    
    if (cart.length === 0) {
        cartItems.innerHTML = '<p>Your cart is empty</p>';
        cartTotalPrice.textContent = '$0';
        return;
    }
    
    cart.forEach(item => {
        const cartItem = document.createElement('div');
        cartItem.classList.add('cart-item');
        
        cartItem.innerHTML = `
            <div class="cart-item-image">
                <img src="${item.image}" alt="${item.name}">
            </div>
            <div class="cart-item-details">
                <h4 class="cart-item-name">${item.name}</h4>
                <p class="cart-item-price">$${item.price}</p>
                <div class="cart-item-quantity">
                    <button class="quantity-btn decrease" data-id="${item.id}">-</button>
                    <span class="quantity-value">${item.quantity}</span>
                    <button class="quantity-btn increase" data-id="${item.id}">+</button>
                    <button class="cart-item-remove" data-id="${item.id}">Remove</button>
                </div>
            </div>
        `;
        
        cartItems.appendChild(cartItem);
    });
    
    // Calculate total price
    const totalPrice = cart.reduce((total, item) => total + (item.price * item.quantity), 0);
    cartTotalPrice.textContent = `$${totalPrice}`;
    
    // Add event listeners to quantity buttons
    const decreaseButtons = document.querySelectorAll('.decrease');
    const increaseButtons = document.querySelectorAll('.increase');
    const removeButtons = document.querySelectorAll('.cart-item-remove');
    
    decreaseButtons.forEach(button => {
        button.addEventListener('click', decreaseQuantity);
    });
    
    increaseButtons.forEach(button => {
        button.addEventListener('click', increaseQuantity);
    });
    
    removeButtons.forEach(button => {
        button.addEventListener('click', removeItem);
    });
}

// Decrease Quantity
function decreaseQuantity(e) {
    const productId = parseInt(e.target.getAttribute('data-id'));
    const item = cart.find(item => item.id === productId);
    
    if (item.quantity > 1) {
        item.quantity--;
    } else {
        cart = cart.filter(item => item.id !== productId);
    }
    
    updateCartCount();
    displayCartItems();
}

// Increase Quantity
function increaseQuantity(e) {
    const productId = parseInt(e.target.getAttribute('data-id'));
    const item = cart.find(item => item.id === productId);
    
    item.quantity++;
    
    updateCartCount();
    displayCartItems();
}

// Remove Item
function removeItem(e) {
    const productId = parseInt(e.target.getAttribute('data-id'));
    cart = cart.filter(item => item.id !== productId);
    
    updateCartCount();
    displayCartItems();
}

// Open Cart Modal
cartBtn.addEventListener('click', () => {
    displayCartItems();
    cartModal.style.display = 'block';
});

// Close Modals
closeButtons.forEach(button => {
    button.addEventListener('click', (e) => {
        const modal = e.target.closest('.modal');
        modal.style.display = 'none';
    });
});

// Close modal when clicking outside
window.addEventListener('click', (e) => {
    if (e.target.classList.contains('modal')) {
        e.target.style.display = 'none';
    }
});

// Proceed to Checkout
checkoutBtn.addEventListener('click', () => {
    if (cart.length === 0) {
        alert('Your cart is empty!');
        return;
    }
    
    cartModal.style.display = 'none';
    checkoutModal.style.display = 'block';
});

// Submit Order
checkoutForm.addEventListener('submit', async (e) => {
    e.preventDefault();
    
    const formData = new FormData(checkoutForm);
    const customerData = {
        customerName: formData.get('name'),
        email: formData.get('email'),
        phone: formData.get('phone'),
        address: formData.get('address'),
        paymentMethod: formData.get('payment')
    };
    
    const orderData = {
        ...customerData,
        products: cart.map(item => ({
            id: item.id,
            name: item.name,
            price: item.price,
            quantity: item.quantity
        })),
        totalPrice: cart.reduce((total, item) => total + (item.price * item.quantity), 0)
    };
    
    try {
        // Send order to backend API
        const response = await fetch('https://your-backend-url.com/api/orders', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(orderData)
        });
        
        if (response.ok) {
            // Clear cart and show confirmation
            cart = [];
            updateCartCount();
            checkoutForm.reset();
            checkoutModal.style.display = 'none';
            orderConfirmation.style.display = 'block';
        } else {
            throw new Error('Failed to place order');
        }
    } catch (error) {
        console.error('Error placing order:', error);
        // For demo purposes, still show confirmation
        cart = [];
        updateCartCount();
        checkoutForm.reset();
        checkoutModal.style.display = 'none';
        orderConfirmation.style.display = 'block';
    }
});

// Continue Shopping
continueShoppingBtn.addEventListener('click', () => {
    orderConfirmation.style.display = 'none';
});

// Initialize
displayProducts();