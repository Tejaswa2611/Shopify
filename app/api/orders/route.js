// app/api/orders/route.js

const express = require('express');
const router = express.Router();
const Shopify = require('shopify-api-node');
const { errorHandler } = require('../../../utils/errorHandlers');
const shopify = require('../../../shopifyConfig');
router.get('/', async (req, res) => {
    const { phone_number } = req.body;

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
