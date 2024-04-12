var axios = require('axios');
const express = require("express");

const getData = async (req, res) => {
    try {
        const smart_api = req.session.smart_api;
        if (!smart_api) {
            return res.status(401).json({ message: 'Unauthorized' });
        }
        const { exchange, symboltoken, interval, fromdate, todate } = req.body;
        const Params = {
            exchange,
            symboltoken,
            interval,
            fromdate,
            todate
        };
        const response = await smart_api.getCandleData(Params);
        res.status(200).json(response.data);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Internal server error' });
    }
};

module.exports = getData;
