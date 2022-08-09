const Web3 = require("web3");

export const RPC_ENDPOINT = "https://rpc.l16.lukso.network";
export const IPFS_GATEWAY = "https://2eff.lukso.dev/ipfs/";

export const erc725schema = require("@erc725/erc725.js/schemas/LSP3UniversalProfileMetadata.json");
export const provider = new Web3.providers.HttpProvider(RPC_ENDPOINT);
export const config = { ipfsGateway: IPFS_GATEWAY };
