const express = require('express');
const router = express.Router();
const { errorHandler } = require('../../../utils/errorHandlers');
const shopify = require('../../../shopifyConfig');

router.post('/', async (req, res, next) => {
    const { phone_number } = req.body;

    try {
        const allCustomers = await shopify.customer.list();
        
        const customers = allCustomers.filter(customer => customer.phone === phone_number);
        
        if (customers.length === 0) {
            return res.status(404).json({ error: 'No customers found with the provided phone number' });
        } else {
            const addresses = customers.map(customer => customer.addresses).flat();
            res.json({ addresses });
        }
    } catch (error) {
        next(error);
    }
});

router.use(errorHandler);

module.exports = router;
