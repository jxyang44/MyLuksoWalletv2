const Web3 = require("web3");
const web3 = new Web3("https://rpc.l16.lukso.network");

// const myEOA = web3.eth.accounts.create();
// console.log(myEOA);

const getAccount = async () => {
    var account0;
    await window.ethereum.enable()
   web3.eth.getAccounts().then(function(result){
     account0 = result[0];
   })
   console.log(account0)
}

getAccount()
//node src/utils/playground.js