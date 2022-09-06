//UP permissioned addresses and vault/UP generic address information
import React, { useState, useEffect } from "react";
import { Address, GetPermissions } from "../../components";
import { FiSettings } from "react-icons/fi";
import { useProfileContext } from "../../contexts/ProfileContext";
import walletTexture from "../../assets/MyLuksoWalletVisual/Wallet Texture/black-linen.png";
import { useNavigate } from "react-router-dom";
import {
  web3Provider,
  UniversalProfileContract,
} from "../../utils/luksoConfigs";

const tokenPurse = `mb-2 w-full h-5/6 bg-slate-500 border-2 border-black rounded-b-3xl shadow-lg custom-shadow text-white text-left p-1 font-normal overflow-y-auto xl:text-sm text-xs`;

const WalletPermissions = ({ walletAddress, walletMetadata }) => {
  const navigate = useNavigate();
  const { accountAddresses, currentAccount } = useProfileContext();
  const [vaultOwner, setVaultOwner] = useState("");
  const [vaultBalance, setVaultBalance] = useState("");

  useEffect(() => {
    getVaultOwner();
    getBalance();
  }, []);

  const getVaultOwner = () => {
    const getOwner = async () => {
      const universalProfileContract = new web3Provider.eth.Contract(
        UniversalProfileContract.abi,
        walletAddress
      );
      return await universalProfileContract.methods.owner().call();
    };
    getOwner().then((res) => setVaultOwner(res));
  };

  const getBalance = () => {
    const getBal = async () => {
      return web3Provider.utils.fromWei(
        await web3Provider.eth.getBalance(walletAddress)
      );
    };
    getBal().then((res) => setVaultBalance(res));
  };

  return (
    <div className="m-2 flex h-1/2 w-full flex-row justify-center gap-2">
      <div className="relative w-1/2 text-sm font-bold text-black xl:text-lg">
        Universal Profile
        <div
          className={tokenPurse}
          style={{ backgroundImage: `url(${walletTexture})` }}
        >
          <p className="underline ">Vaults</p>
          {accountAddresses.vaults.map((vault, index) => {
            return (
              <div className="ml-2 flex flex-row gap-2" key={index}>
                <Address key={vault} address={vault} left={8} right={4} />
              </div>
            );
          })}
          <p className="mt-1 underline">Permissioned Addresses</p>
          {accountAddresses.permissions.map((permission, index) => {
            return (
              <div className="ml-2 flex flex-row gap-1" key={index}>
                <Address
                  key={permission}
                  address={permission}
                  left={8}
                  right={4}
                />{" "}
                <GetPermissions address={permission} />
                {permission === accountAddresses.URD && " (URD)"}
              </div>
            );
          })}
          <p className="mt-1 underline">Key Manager</p>
          <div className="ml-2 flex flex-row gap-2">
            <Address address={accountAddresses.KM} left={8} right={4} />
          </div>
          <div
            className="absolute top-1 right-0 rounded-full border border-black bg-slate-800 p-1 text-blue-400 hover:text-blue-50"
            onClick={() => navigate("../myuniversalprofile")}
          >
            <FiSettings />
          </div>
        </div>
      </div>
      <div className="relative w-1/2 text-sm font-bold text-black xl:text-lg">
        {walletMetadata?.vaultName
          ? walletMetadata?.vaultName
          : "Unnamed Vault"}{" "}
        - {walletAddress.substring(0, 2)}...{walletAddress.substring(38)}
        <div
          className={tokenPurse}
          style={{ backgroundImage: `url(${walletTexture})` }}
        >
          <div className="flex flex-row gap-1">
            <u>Balance:</u>{" "}
            <span className="font-normal">{vaultBalance} LYX</span>
          </div>
          <div className="mt-1 flex flex-row gap-1">
            <u>Address:</u>{" "}
            <Address address={walletAddress} left={8} right={4} />
          </div>
          <div className="mt-1 flex flex-row gap-1">
            <u>Owner:</u> <Address address={vaultOwner} left={8} right={4} />
          </div>
          {vaultOwner === currentAccount
            ? "✅ Your UP is the owner of this account."
            : "❌ Your UP is not the owner of this account."}
          <div className="mt-1 flex flex-row gap-1">
            <GetPermissions address={currentAccount} addressOf={walletAddress}>
              Your Permissions
            </GetPermissions>
          </div>
          <div className="mt-1">
            <u>Allowed addresses 👷</u> {/* TO-DO - add allowed addresses */}
          </div>
          <div
            className="absolute top-1 right-0 rounded-full border border-black bg-slate-800 p-1 text-blue-400 hover:text-blue-50"
            onClick={() => navigate("../myvaults")}
          >
            <FiSettings />
          </div>
        </div>
      </div>
    </div>
  );
};

export default WalletPermissions;
