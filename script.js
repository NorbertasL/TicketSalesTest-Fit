document.addEventListener("DOMContentLoaded", function() {
    const addToCartButtons = document.querySelectorAll(".add-to-cart");
    const cartItems = document.getElementById("cart-items");
    const cartTotal = document.getElementById("cart-total");

    addToCartButtons.forEach(button => {
        button.addEventListener("click", addToCart);
    });

    // Load cart items from local storage
    loadCart();

    function addToCart(event) {
        const ticket = event.target.parentElement;
        const ticketId = ticket.getAttribute("data-id");
        const ticketName = ticket.querySelector("h2").textContent;
        const ticketPrice = parseFloat(ticket.querySelector("p").textContent.slice(8));

        // Create a new cart item
        const cartItem = document.createElement("li");
        cartItem.innerHTML = `${ticketName} - $${ticketPrice}`;
        cartItems.appendChild(cartItem);

        // Update the cart total
        const currentTotal = parseFloat(cartTotal.textContent);
        cartTotal.textContent = (currentTotal + ticketPrice).toFixed(2);

        // Save the cart to local storage
        saveCart(ticketId);
    }
    /*event.target: 
    refers to the element that triggered the event, which is the button with the class "add-to-cart.
    When a user clicks the "Add to Cart" button, event.target will point to that button element.
    
    .parentElement: allows you to access the parent element of the element referred to by event.target. 
    In your code, you expect that the parent element of the "Add to Cart" button is the .ticket element 
    that contains information about the ticket.
    By using event.target.parentElement, you're essentially saying,     "Give me the parent element of the button that was clicked." 
    This allows you to work with the .ticket element that contains details about the ticket, 
    such as the name, price, and data ID, which you then use to add the ticket to the cart with the appropriate information.
    */

    function saveCart(itemId) {
        let cart = JSON.parse(localStorage.getItem("cart")) || {};
        cart[itemId] = (cart[itemId] || 0) + 1;
        localStorage.setItem("cart", JSON.stringify(cart));
    }

    function loadCart() {
        const cart = JSON.parse(localStorage.getItem("cart"));
        if (cart) {
            for (let itemId in cart) {
                const ticket = document.querySelector(`[data-id="${itemId}"]`);
                const ticketName = ticket.querySelector("h2").textContent;
                const ticketPrice = parseFloat(ticket.querySelector("p").textContent.slice(8));
                const quantity = cart[itemId];

                // Create a new cart item
                const cartItem = document.createElement("li");
                cartItem.innerHTML = `${ticketName} - $${ticketPrice} x ${quantity}`;
                cartItems.appendChild(cartItem);

                // Update the cart total
                const currentTotal = parseFloat(cartTotal.textContent);
                cartTotal.textContent = (currentTotal + ticketPrice * quantity).toFixed(2);
            }
        }
    }
});
