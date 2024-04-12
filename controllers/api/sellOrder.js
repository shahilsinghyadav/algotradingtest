var axios = require('axios');
const express = require("express");

const sellOrder = async (req, res) => {
    try {
        const smart_api = req.session.smart_api;

        // Ensure smart_api instance exists in session
        if (!smart_api) {
            return res.status(401).json({ message: 'Unauthorized' });
        }
        
        const orderParams = {
            "variety": req.body.variety,
            "tradingsymbol": req.body.tradingsymbol,
            "symboltoken": req.body.symboltoken,
            "transactiontype": req.body.transactiontype,
            "exchange": req.body.exchange,
            "ordertype": req.body.ordertype,
            "producttype": req.body.producttype,
            "duration": req.body.duration,
            "price": req.body.price,
            "squareoff": req.body.squareoff,
            "stoploss": req.body.stoploss, 
            "quantity": req.body.quantity
        };

        const response = await smart_api.modifyOrder(orderParams);
        res.status(200).json(response.data);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Internal server error' });
    }
};

module.exports = sellOrder;
