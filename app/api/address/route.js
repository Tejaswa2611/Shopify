const express = require('express');
const router = express.Router();
const { errorHandler } = require('../../../utils/errorHandlers');
const shopify = require('../../../shopifyConfig');

router.get('/', async (req, res, next) => {
    let phone_number = req.query.phone_number;
    phone_number = phone_number.trim();
    if (!phone_number.startsWith('+')) {
        phone_number = '+' + phone_number;
    }
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
