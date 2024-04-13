// Task 1: Get List of Saved Addresses
function handleAddressLookup() {
    const lookupBtn = document.getElementById('lookupBtn');
    const phoneInput = document.getElementById('phone');
    const addressResults = document.getElementById('addressResults');

    lookupBtn.addEventListener('click', async () => {
        const phoneNumber = phoneInput.value.trim();

        try {
            const response = await fetch(`https://shopify-adu6.onrender.com/app/api/addresses?phone_number=${phoneNumber}`);
            const data = await response.json();

            addressResults.innerHTML = JSON.stringify(data, null, 2);
        } catch (error) {
            addressResults.innerHTML = '<p>Error fetching data. Please try again later.</p>';
            console.error('Error fetching data:', error);
        }
    });
}

// Task 3: Get Order List
function handleFetchCustomerOrders() {
    const fetchOrdersBtn = document.getElementById('fetchOrdersBtn');
    const phoneNumberInput = document.getElementById('phoneNumber');
    const customerOrderDetailsDiv = document.getElementById('customerOrderDetails'); // Changed to customerOrderDetails

    fetchOrdersBtn.addEventListener('click', async () => {
        const phoneNumber = phoneNumberInput.value.trim();

        try {
            const response = await fetch(`https://shopify-adu6.onrender.com/app/api/orders/?phone_number=${phoneNumber}`);
            const data = await response.json();

            customerOrderDetailsDiv.innerHTML = JSON.stringify(data, null, 2); // Update customerOrderDetailsDiv
        } catch (error) {
            customerOrderDetailsDiv.innerHTML = '<p>Error fetching customer orders. Please try again later.</p>';
            console.error('Error fetching customer orders:', error);
        }
    });
}

// Task 4: Get Order Details
function handleFetchOrderDetails() {
    const fetchOrderDetailsBtn = document.getElementById('fetchOrderDetailsBtn');
    const orderNumberInput = document.getElementById('orderNumber');
    const orderDetailsDiv = document.getElementById('orderDetails');

    fetchOrderDetailsBtn.addEventListener('click', async () => {
        const orderNumber = orderNumberInput.value.trim();

        try {
            const response = await fetch(`https://shopify-adu6.onrender.com/app/api/order?order_number=${orderNumber}`);
            const data = await response.json();

            orderDetailsDiv.innerHTML = JSON.stringify(data, null, 2); // Update orderDetailsDiv
        } catch (error) {
            orderDetailsDiv.innerHTML = '<p>Error fetching order details. Please try again later.</p>';
            console.error('Error fetching order details:', error);
        }
    });
}

// Task 5: Cancel Order
function handleCancelOrder() {
    const cancelBtn = document.getElementById('cancelBtn');
    const orderNumberInput = document.getElementById('cancelOrderNumber');
    const cancelResult = document.getElementById('cancelResult');

    cancelBtn.addEventListener('click', async () => {
        const orderNumber = orderNumberInput.value.trim();

        // Send POST request to Express route
        try {
            const response = await fetch('https://shopify-adu6.onrender.com/app/api/order/cancel', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ order_number: orderNumber })
            });
            const data = await response.json();

            if (response.ok) {
                cancelResult.innerHTML = `<p>${data.message}</p>`;
            } else {
                cancelResult.innerHTML = `<p>Error: ${data.error}</p>`;
            }
        } catch (error) {
            cancelResult.innerHTML = '<p>Error cancelling order. Please try again later.</p>';
            console.error('Error cancelling order:', error);
        }
    });
}

// Task 2: Update Address

function updateCustomerAddress() {
    const customerId = document.getElementById('customerId').value;
    const addressId = document.getElementById('addressId').value;
    const fieldToUpdate = document.getElementById('fieldToUpdate').value;
    const fieldValue = document.getElementById('fieldValue').value;

    // Construct the update object
    const updateData = {};
    updateData[fieldToUpdate] = fieldValue;

    fetch(`https://shopify-adu6.onrender.com/app/api/address/update/${customerId}/${addressId}`, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(updateData)
    })
    .then(response => response.json())
    .then(data => {
        // Display the whole response
        document.getElementById('message').innerText = JSON.stringify(data, null, 2);
    })
    .catch(error => {
        console.error('Error updating address:', error);
        document.getElementById('message').innerText = 'Error updating address. Please try again later.';
    });
}



// Event Listeners
document.addEventListener('DOMContentLoaded', () => {
    handleAddressLookup();
    handleFetchCustomerOrders();
    handleFetchOrderDetails();
    handleCancelOrder();
    updateCustomerAddress()
});
