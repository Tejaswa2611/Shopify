const express = require('express');
const router = express.Router();
const Shopify = require('shopify-api-node');
const { errorHandler } = require('../../../../utils/errorHandlers');
const shopify = require('../../../../shopifyConfig');


router.put('/:customerId/:addressId', async (req, res) => {
    const customerId = Number(req.params.customerId);
    const addressId = Number(req.params.addressId);
    const updatedAddressData = req.body;

    try {
        const customer = await shopify.customer.get(customerId);
        const address = customer.addresses.find(address => address.id === addressId);

        if (!address) {
            return res.status(404).json({ error: 'Address not found' });
        }

        const updatedAddress = await shopify.customerAddress.update(customerId, addressId, updatedAddressData);
        res.json({ message: 'Address updated successfully', updatedAddress });
    } catch (error) {
        next(error);
    }
});

router.use(errorHandler);

module.exports = router;
