//current unused

import React from "react";
import { AiOutlineSearch } from "react-icons/ai";
import { web3 } from "../../utils/luksoConfigs";
import ERC725 from "@erc725/erc725.js";
const ProfileSearch = () => {
  const getRecentBlocks = async () => {
    const getTransactions = async () => {
      console.log("getting");
      const startTime = performance.now();
      const latest = await web3.eth.getBlockNumber();
      // const latest = 769365;
      console.log("latest block", latest);
      let blockNumbers = [];
      for (let i = latest; i > latest - 1000; i--) {
        blockNumbers.push(i);
      }
      const batch = new web3.eth.BatchRequest();
      blockNumbers.map(async (blockNumber) => {
        const block = await web3.eth.getBlock(blockNumber);
        block !== null &&
          block.transactions.length > 0 &&
          block.transactions.map(async (transactionAddress) => {
            batch.add(
              await web3.eth.getTransaction.request(
                transactionAddress,
                "latest",
                (err, res) => {
                  console.log(err, res);
                }
              )
            );
          });
      });
      batch.execute();
      console.log(batch.requests);
      setTimeout(() => {
        batch.requests.map((transaction, i) => {
          console.log(i, transaction.params[0]);
        });
      }, 5000);
      const endTime = performance.now();
      console.log(`Last 1000 blocks too ${endTime - startTime} milliseconds`);

      // const block = await web3.eth.getBlock(latestBlock);
      // console.log(block);
      // block.transactions.map(async transactionAddress => {
      //   let t = await web3.eth.getTransaction(transactionAddress);
      //   console.log(t);
    };
    getTransactions();
  };

  const getPastLogs = async () => {
    const latest = await web3.eth.getBlockNumber();
    console.log(latest);
    web3.eth
      .getPastLogs({
        address: "0x0b4685B80F71BDC5787dDeBAfAc44ca63A883466",
        fromBlock: "0x1",
        toBlock: latest,
      })
      .then(console.log);
  };

  return (
    <div className="flex flex-col justify-center text-white">
      <div className="mb-3 xl:w-96">
        <div className="input-group relative mb-4 flex w-full flex-wrap items-stretch">
          <input
            type="search"
            className="relative m-0 w-full min-w-0 flex-auto rounded border-gray-300 bg-white bg-clip-padding  px-3 py-1.5 text-gray-700 transition ease-in-out focus:border-blue-600 focus:bg-white focus:text-gray-700 focus:outline-none"
            placeholder="Search"
          />
          <button
            className="btn flex items-center rounded bg-blue-600 px-6  py-2.5 text-lg text-white shadow-md transition  ease-in-out hover:bg-blue-700 hover:shadow-lg focus:bg-blue-700 focus:shadow-lg focus:outline-none focus:ring-0 active:bg-blue-800 active:shadow-lg"
            type="button"
            onClick={getRecentBlocks}
          >
            <AiOutlineSearch />
          </button>
        </div>
      </div>
      <button onClick={getRecentBlocks}>
        Recent 1000 Block Transaction Hashes
      </button>
      <button onClick={getPastLogs}>past logs by ID</button>
    </div>
  );
};

export default ProfileSearch;
