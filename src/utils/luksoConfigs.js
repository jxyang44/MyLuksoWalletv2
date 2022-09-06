//main configurations

import Web3 from "web3";
const { LSPFactory } = require("@lukso/lsp-factory.js");
const { ERC725 } = require("@erc725/erc725.js");

//----- endpoints and gateways -----
export const RPC_ENDPOINT = "https://rpc.l16.lukso.network";
export const IPFS_GATEWAY = "https://2eff.lukso.dev/ipfs/";
export const IPFS_GATEWAY_CLOUDFLARE = "https://cloudflare-ipfs.com/ipfs/";
export const IPFS_GATEWAY_INFURA = "https://ipfs.infura.io";
export const chainId = 2828; //L16 chain id

//----- configs -----
export const provider = new Web3.providers.HttpProvider(RPC_ENDPOINT);
export const config = { ipfsGateway: IPFS_GATEWAY };
export const web3 = new Web3(RPC_ENDPOINT);
export const web3Provider = new Web3(RPC_ENDPOINT);
export const web3Window = new Web3(window.ethereum);

//----- keys -----
export const MM_PublicKey = "0xA0Ffd0fFa4e115f6AC1B7b0461e0b6450161c448"; //metamask public address - dev account; currently unused for hackathon

//NOTE --- if you just cloned this project, create .env file in the main directory and paste in: REACT_APP_METAMASK_MY_DEV_PRIVATE_KEY="enter your private key"
export const MM_PrivateKey = process.env.REACT_APP_METAMASK_MY_DEV_PRIVATE_KEY; //metamask private key - dev account - used for lspfactory private deployment (LSP7 and LSP8 contract deployment only)

export const createLSPFactoryWindowInstance = () =>
  new LSPFactory(window.ethereum, { chainId: chainId });

export const createLSPFactoryPrivateKeyInstance = () =>
  new LSPFactory(RPC_ENDPOINT, { deployKey: MM_PrivateKey, chainId: chainId });

export const standardDeployOptions = {
  // ipfsGateway: IPFS_GATEWAY_INFURA,
  onDeployEvents: {
    next: (deploymentEvent) => {
      console.log(deploymentEvent);
    },
    error: (error) => {
      console.log(error);
    },
    complete: async (contracts) => {
      console.log("Deployment Complete");
      console.log(contracts);
    },
  },
};

//----- ERC725 configs -----
export const createErc725Instance = (schema, account) =>
  new ERC725(schema, account, provider, config);

//----- schemas -----
export const LSP1Schema = require("@erc725/erc725.js/schemas/LSP1UniversalReceiverDelegate.json");
export const LSP3Schema = require("@erc725/erc725.js/schemas/LSP3UniversalProfileMetadata.json");
export const LSP4Schema = require("@erc725/erc725.js/schemas/LSP4DigitalAsset.json");
export const LSP5Schema = require("@erc725/erc725.js/schemas/LSP5ReceivedAssets.json");
export const LSP6Schema = require("@erc725/erc725.js/schemas/LSP6KeyManager.json");
export const LSP8Schema = {
  name: "LSP8MetadataJSON:<bytes32>",
  key: "0x9a26b4060ae7f7d5e3cd0000<bytes32>",
  keyType: "Mapping",
  valueType: "bytes",
  valueContent: "JSONURL",
};
export const LSP9Schema = require("@erc725/erc725.js/schemas/LSP9Vault.json");
export const LSP10Schema = require("@erc725/erc725.js/schemas/LSP10ReceivedVaults.json");
export const LSP12Schema = require("@erc725/erc725.js/schemas/LSP12IssuedAssets.json");

//----- for contract ABIs -----
export const UniversalProfileContract = require("@lukso/lsp-smart-contracts/artifacts/UniversalProfile.json");

export const LSP4Contract = require("@lukso/lsp-smart-contracts/artifacts/LSP4DigitalAssetMetadata.json");
export const LSP6Contract = require("@lukso/lsp-smart-contracts/artifacts/LSP6KeyManager.json");
export const LSP7Contract = require("@lukso/lsp-smart-contracts/artifacts/LSP7DigitalAsset.json");
export const LSP7MintableContract = require("@lukso/lsp-smart-contracts/artifacts/LSP7Mintable.json");
export const LSP8Contract = require("@lukso/lsp-smart-contracts/artifacts/LSP8IdentifiableDigitalAsset.json");
export const LSP8MintableContract = require("@lukso/lsp-smart-contracts/artifacts/LSP8Mintable.json");
export const LSP9Contract = require("@lukso/lsp-smart-contracts/artifacts/LSP9Vault.json");
export const LSP1VaultContract = require("@lukso/lsp-smart-contracts/artifacts/LSP1UniversalReceiverDelegateVault.json");

export const {
  ERC725Y_INTERFACE_IDS,
} = require("@erc725/erc725.js/build/main/src/lib/constants");
export const {
  INTERFACE_IDS,
} = require("@lukso/lsp-smart-contracts/constants.js");
export const constants = require("@lukso/lsp-smart-contracts/constants.js");

//----- custom mappings -----
export const LSPMapping = {
  LSP7: {
    shortName: "Tokens",
    contract: "LSP7DigitalAsset",
    // bannerColor: "from-green-700",
    // buttonColor: "bg-green-600",
  },

  LSP8: {
    shortName: "NFTs",
    contract: "LSP8IdentifiableDigitalAsset",
    // bannerColor: "from-blue-700",
    // buttonColor: "bg-blue-600",
  },

  LSP9: {
    shortName: "Vaults",
    contract: "LSP9Vault",
    // bannerColor: "from-slate-700",
    // buttonColor: "bg-slate-600",
  },

  LSP5: {
    name: "LSP5ReceivedAssets[]",
  },

  LSP10: {
    name: "LSP10Vaults[]",
  },

  LSP12: {
    name: "LSP12IssuedAssets[]",
  },
};
