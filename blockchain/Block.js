const crypto = require('crypto');

class Block {
    constructor(index, transactions, proof, prevHash) {
        this.index = index;
        this.timestamp = Math.floor(Date.now() / 1000);
        this.transactions = transactions;
        this.proof = proof;
        this.prevHash = prevHash;
        this.hash = this.calcHash();
    }

    calcHash() {
        const hash = crypto.createHash(process.env.HASH_TYPE);
        hash.update(this.index + this.timestamp + JSON.stringify(this.transactions) + this.proof + this.prevHash);
        return hash.digest('hex');
    }
}

module.exports = Block;