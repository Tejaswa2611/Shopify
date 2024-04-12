// page.js

async function getAddresses() {
    const phoneNumber = document.getElementById('phoneNumber').value;
    const requestBody = {
        phone_number: phoneNumber
    };

    try {
        const response = await fetch('https://shopify-adu6.onrender.com/app/api/addresses', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(requestBody)
        });

        const data = await response.json();
        document.getElementById('response').innerText = JSON.stringify(data);
    } catch (error) {
        console.error('Error fetching addresses:', error);
        document.getElementById('response').innerText = 'Failed to fetch addresses';
    }
}


async function updateAddress() {
    const addressId = document.getElementById('addressId').value;
    // Implement API call to update address using addressId
    // Display response in the response area
}

async function getOrders() {
    const phoneNumber = document.getElementById('phoneNumber').value;
    try {
        const response = await fetch(`https://shopify-adu6.onrender.com/app/api/orders?phone_number=${phoneNumber}`);
        const data = await response.json();
        document.getElementById('response').innerText = JSON.stringify(data);
    } catch (error) {
        console.error('Error fetching orders:', error);
        document.getElementById('response').innerText = 'Failed to fetch orders';
    }
}

async function getOrderDetails() {
    const orderNumber = document.getElementById('orderNumber').value;
    try {
        const response = await fetch(`https://shopify-adu6.onrender.com/app/api/order?order_number=${orderNumber}`);
        const data = await response.json();
        document.getElementById('response').innerText = JSON.stringify(data);
    } catch (error) {
        console.error('Error fetching order details:', error);
        document.getElementById('response').innerText = 'Failed to fetch order details';
    }
}

async function cancelOrder() {
    const orderNumber = document.getElementById('orderNumber').value;
    try {
        const response = await fetch(`https://shopify-adu6.onrender.com/app/api/order/cancel`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ order_number: orderNumber })
        });
        const data = await response.json();
        document.getElementById('response').innerText = JSON.stringify(data);
    } catch (error) {
        console.error('Error cancelling order:', error);
        document.getElementById('response').innerText = 'Failed to cancel order';
    }
}
