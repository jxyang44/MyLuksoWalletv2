import React from "react";
import { AiOutlineSearch } from "react-icons/ai";
import { web3 } from "../../utils/luksoConfigs";

const ProfileSearch = () => {

  const getRecentBlocks = async () => {
    // const getTransactions = async () => {
    //   console.log("getting");
    //   const startTime = performance.now();
    //   const latest = await web3.eth.getBlockNumber();
    //   // const latest = 769365;
    //   console.log("latest block", latest);
    //   let blockNumbers = [];
    //   for (let i = latest; i > latest - 1000; i--) {
    //     blockNumbers.push(i);
    //   }
    //   const batch = new web3.eth.BatchRequest();
    //   blockNumbers.map(async blockNumber => {
    //     const block = await web3.eth.getBlock(blockNumber);
    //     block!==null && block.transactions.length >0 && block.transactions.map(async transactionAddress => {
    //       batch.add(await web3.eth.getTransaction.request(transactionAddress, "latest", (err,res) => {console.log(err,res)}));
    //     });
    //   });
    //   batch.execute();
    //   console.log(batch.requests);
    //   setTimeout(()=>{
    //     batch.requests.map((transaction, i) => {
    //       console.log(i,transaction.params[0]);
    //     })
    //   },5000
    //   )
    //   const endTime = performance.now();
    //   console.log(`Last 1000 blocks too ${endTime - startTime} milliseconds`);
    //   web3.eth.getPastLogs({address: "0xC7d7315A1DDBbf92aBD068588bBA1e864F20F0f5", fromBlock:latest-2000 , toBlock: latest}).then(console.log)
    //   // const block = await web3.eth.getBlock(latestBlock);
    //   // console.log(block);
    //   // block.transactions.map(async transactionAddress => {
    //   //   let t = await web3.eth.getTransaction(transactionAddress);
    //   //   console.log(t);
    // };
    // getTransactions();
  };

  return (
    <div className="flex justify-center">
      <div className="mb-3 xl:w-96">
        <div className="input-group relative flex flex-wrap items-stretch w-full mb-4">
          <input
            type="search"
            className="relative flex-auto min-w-0 w-full px-3 py-1.5 text-gray-700 bg-white bg-clip-padding  border-gray-300 rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none"
            placeholder="Search"
          />
          <button
            className="btn px-6 py-2.5 bg-blue-600 text-white text-lg  rounded shadow-md hover:bg-blue-700 hover:shadow-lg focus:bg-blue-700  focus:shadow-lg focus:outline-none focus:ring-0 active:bg-blue-800 active:shadow-lg transition ease-in-out flex items-center"
            type="button"
            onClick={getRecentBlocks}>
            <AiOutlineSearch />
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProfileSearch;
