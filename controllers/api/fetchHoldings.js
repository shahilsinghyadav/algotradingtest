var axios = require('axios');
const express= require ("express");
const fetchHoldings = async (req, res) => {
    try {
        const smart_api = req.session.smart_api;
        if (!smart_api) {
            return res.status(401).json({ message: 'Unauthorized' });
        }
        const allHoldings = smart_api.getHolding();

        // Send response back to client
        res.status(200).send({ message: allHoldings });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Internal server error' });
    }
};

module.exports=fetchHoldings;

