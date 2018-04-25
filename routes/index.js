'use strict';
const fooChain = require('../app');
const express = require('express');
const router = express.Router();

const handleResponse = (req, res, next) => {
    return res.json(req.responseValue)
}

/*  GET: /chain
 *  Returns the contents of the blockchain.     */
router.get('/chain', function (req, res) {
    res.send(fooChain.chain);
});

/*  GET: /chain/last
 *  Returns the contents of the last block in the blockchain.     */
router.get('/chain/last', function (req, res) {
    res.send(fooChain.getLastBlock());
});

/*  POST: /chain/mine
 *  Mines a new block with current tranactions on the blockchain.     */
router.post('/chain/mine', function (req, res) {
    res.send(fooChain.mineBlock());
});

/*  GET: /chain/isValid
 *  Returns the contents of the blockchain.     */
router.get('/chain/isValid', function (req, res) {
    res.send(fooChain.isValid());
});

/*  GET: /transactions
 *  Returns the contents of currentTransactions on the blockchain.     */
router.get('/transactions', function (req, res) {
    res.send(fooChain.currentTransactions);
});

/*  POST: /transactions
 *  Adds a new transaction to be included in the next block.    */
router.post('/transactions', function (req, res) {
    // Validate params
    let sender = req.body.sender;
    let recipient = req.body.recipient;
    let amount = req.body.amount;
    if (!sender || !recipient || !amount) { res.status(400).send('Invalid parameters'); }

    // Add the transaction
    res.send(fooChain.addTransaction(sender, recipient, amount));    
});

module.exports = router;