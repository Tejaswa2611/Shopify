const express = require('express');
const router = express.Router();
const Shopify = require('shopify-api-node');
const { errorHandler } = require('../../../utils/errorHandlers');
const shopify = require('../../../shopifyConfig');

router.get('/', async (req, res) => {
    const { order_number } = req.body;

    try {
        const orders = await shopify.order.list({ name: order_number });

        if (orders.length === 0) {
            return res.status(404).json({ error: 'No order found with the provided order number' });
        }

        const order_id = orders[0].id;
        const order = await shopify.order.get(order_id);

        const status = order.status;
        const products = order.line_items.map(item => ({
            title: item.title,
            quantity: item.quantity,
            price: item.price,
        }));

        res.json({ status, products });
    } catch (error) {
        console.error('Error fetching order details:', error);
        res.status(500).json({ error: 'Failed to fetch order details' });
    }
});

router.use(errorHandler);

module.exports = router;
