document.addEventListener('DOMContentLoaded', () => {
    const lookupBtn = document.getElementById('lookupBtn');
    const phoneInput = document.getElementById('phone');
    const addressResults = document.getElementById('addressResults');

    lookupBtn.addEventListener('click', async () => {
        const phoneNumber = phoneInput.value.trim();

        // Send GET request to Express route
        try {
            const response = await fetch(`/customer-addresses?phone_number=${phoneNumber}`);
            const data = await response.json();

            if (response.ok) {
                displayAddresses(data.addresses);
            } else {
                addressResults.innerHTML = `<p>Error: ${data.error}</p>`;
            }
        } catch (error) {
            addressResults.innerHTML = '<p>Error fetching data. Please try again later.</p>';
            console.error('Error fetching data:', error);
        }
    });

    function displayAddresses(addresses) {
        if (addresses.length === 0) {
            addressResults.innerHTML = '<p>No addresses found for the provided phone number.</p>';
            return;
        }

        const addressList = addresses.map(address => {
            return `<p>${address.address1}, ${address.city}, ${address.province}, ${address.country}</p>`;
        }).join('');

        addressResults.innerHTML = addressList;
    }
});
