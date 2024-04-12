const express = require('express');
const router = express.Router();
const Shopify = require('shopify-api-node');
const { errorHandler } = require('../../../../utils/errorHandlers');
const shopify = require('../../../../shopifyConfig');

router.post('/', async (req, res) => {
    const { order_number } = req.body;

    try {
        const orders = await shopify.order.list({ name: order_number });

        if (orders.length === 0) {
            return res.status(404).json({ error: 'No order found with the provided order number' });
        }

        const order_id = orders[0].id;
        const cancelledOrder = await shopify.order.cancel(order_id);

        if (cancelledOrder.cancelled_at) {
            res.json({ message: 'Order successfully cancelled', cancelledOrder });
        } else {
            res.status(500).json({ error: 'Failed to cancel order' });
        }
    } catch (error) {
        console.error('Error cancelling order:', error);
        res.status(500).json({ error: 'Failed to cancel order', details: error });
    }
});

router.use(errorHandler);

module.exports = router;
