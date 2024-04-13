// app/api/orders/route.js

const express = require('express');
const router = express.Router();
const { errorHandler } = require('../../../utils/errorHandlers');
const shopify = require('../../../shopifyConfig');

router.get('/', async (req, res) => {
    let phone_number = req.query.phone_number;
    phone_number = phone_number.trim();
    if (!phone_number.startsWith('+')) {
        phone_number = '+' + phone_number;
    }
    // console.log(phone_number);

    try {
        const allCustomers = await shopify.customer.list();
        const customer = allCustomers.find(c => c.phone === phone_number);

        if (!customer) {
            return res.status(404).json({ error: 'No customer found with the provided phone number' });
        }

        const orders = await shopify.order.list({ customer_id: customer.id });
        res.json({ orders });
    } catch (error) {
        console.error('Error fetching orders:', error);
        res.status(500).json({ error: 'Failed to fetch orders' });
    }
});

router.use(errorHandler);

module.exports = router;
