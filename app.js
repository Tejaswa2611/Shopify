require('dotenv').config();
const express = require('express');
const app = express();
const addressesRouter = require('./app/api/address/route');
const updateAddressRouter = require('./app/api/addresses/update/route');
const ordersRouter = require('./app/api/orders/route'); 
const orderRouter = require('./app/api/order/route');
const orderCancelRouter = require('./app/api/order/cancel/route');
const { errorHandler } = require('./utils/errorHandlers');


app.use(express.json());

// Routes
app.use('/app/api/addresses', addressesRouter);
app.use('/app/api/address/update', updateAddressRouter);
app.use('/app/api/orders', ordersRouter); 
app.use('/app/api/order', orderRouter);
app.use('/app/api/order/cancel', orderCancelRouter);

// Error handler
app.use(errorHandler);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
