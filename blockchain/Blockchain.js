const crypto = require('crypto');
const Block = require("./Block");
const Transaction = require("./Transaction");

class BlockChain {
    constructor() {
        this.chain = [];
        this.currentTransactions = [];

        // Mine genesis block
        console.log("Mining genesis block...");
        let validProof = this.doProofOfWork();
        this.addBlock(validProof, 0);
    }

    addTransaction(sender, receiver, amount) {
        let t = new Transaction(sender, receiver, amount);
        this.currentTransactions.push(t);
        return t;
    }

    addBlock(proof, prevHash) {
        let b = new Block(this.chain.length + 1, this.currentTransactions, proof, prevHash);
        this.currentTransactions = [];
        this.chain.push(b);
        return b;
    }

    getLastBlock() {
        return this.chain.slice(-1)[0]
    }

    mineBlock() {
        let validProof = this.doProofOfWork();
        let prevHash = this.getLastBlock().hash;
        return this.addBlock(validProof, prevHash);
    }

    doProofOfWork() {        
        // Setup base string to be hashed.
        let salt = crypto.randomBytes(16).toString('hex');
        let secret = process.env.CRYPTO_SECRET;
        let baseString = salt + secret;

        // Hash base string with nonce and attempt to match our resolution hash
        let nonce = 0;
        let found = false;
        let result = "";
        while (!found) {
            let attempt = baseString + nonce;
            result = crypto.createHash(process.env.HASH_TYPE).update(attempt).digest('hex');
            found = result.substr(0, process.env.RESOLUTION_HASH.length) === process.env.RESOLUTION_HASH;
            //console.log("attempt=" + attempt + "|result=" + result + "|found=" + found);
            nonce++;
        }
        return result;
    }        

    isValid() { 
        for (var i = 0; i < this.chain.length; i++) {
            if (this.chain[i].hash !== this.chain[i].calcHash())
                return false;
            if (i > 0 && this.chain[i].prevHash !== this.chain[i - 1].hash)
                return false;
        }
        return true;
    }
}

module.exports = BlockChain;