import React, { useState, useEffect } from "react";
import { Address, GetPermissions } from "..";
import { FiSettings } from "react-icons/fi";
import { useProfileContext } from "../../contexts/ProfileContext";
import walletTexture from "../../assets/MyLuksoWalletVisual/Wallet Texture/black-linen.png";
import { useNavigate } from "react-router-dom";
import { web3Provider, UniversalProfileContract } from "../../utils/ERC725Config";

const tokenPurse = `mb-2 w-full h-5/6 bg-slate-500 border-2 border-black rounded-b-3xl shadow-lg envelope text-white text-left p-1 font-normal overflow-y-auto lg:text-sm text-xs`;

const WalletPermissions = ({ walletAddress }) => {
  const navigate = useNavigate();
  const { accountAddresses, currentAccount, pendingProfileJSONMetadata} = useProfileContext();
  const [vaultOwner, setVaultOwner] = useState("");
  const [vaultBalance, setVaultBalance] = useState("");
  const [vaultName, setVaultName] = useState("");
  useEffect(() => {
    getVaultOwner();
    getBalance();
   
  }, []);

  const getVaultOwner = () => {
    const getOwner = async () => {
      const universalProfileContract = new web3Provider.eth.Contract(UniversalProfileContract.abi, walletAddress);
      return await universalProfileContract.methods.owner().call();
    };
    getOwner().then(res => setVaultOwner(res));
  };

  const getBalance = () => {
    const getBal = async () => {
      return web3Provider.utils.fromWei(await web3Provider.eth.getBalance(walletAddress));
    };
    getBal().then(res => setVaultBalance(res));
  };
  return (
    <div className="flex flex-row m-2 justify-center gap-2 w-full h-1/2">
      <div className="w-1/2 font-bold text-black lg:text-lg text-base relative">
        Universal Profile
        <div className={tokenPurse} style={{ backgroundImage: `url(${walletTexture})` }}>
          <p className="underline ">Vaults</p>
          {accountAddresses.vaults.map(vault => {
            return (
              <div className="ml-2 flex flex-row gap-2" key={vault}>
                <Address key={vault} address={vault} left={8} right={4} />
              </div>
            );
          })}
          <p className="underline mt-1">Permissioned Addresses</p>
          {accountAddresses.permissions.map(permission => {
            return (
              <div className="ml-2 flex flex-row gap-2" key={permission}>
                <Address key={permission} address={permission} left={8} right={4} /> <GetPermissions address={permission} />
                {permission === accountAddresses.URD && " (URD)"}
              </div>
            );
          })}
          <p className="underline mt-1">Key Manager</p>
          <div className="ml-2 flex flex-row gap-2">
            <Address address={accountAddresses.KM} left={8} right={4} />
          </div>
          <div
            className="absolute top-1 right-0 p-1 rounded-full bg-slate-800 text-blue-400 hover:text-blue-50 border-black border"
            onClick={() => navigate("../myuniversalprofile")}>
            <FiSettings />
          </div>
        </div>
      </div>
      <div className="w-1/2 font-bold text-black lg:text-lg text-base relative">
        {walletAddress.substring(0,8)}...{walletAddress.substring(36)} 
        <div className={tokenPurse} style={{ backgroundImage: `url(${walletTexture})` }}>
          <div className="flex flex-row gap-1">
            <u>Vault Balance:</u> <span className="font-normal">{vaultBalance} LYX</span>
          </div>
          <div className="flex flex-row gap-1 mt-1">
            <u>Vault Address:</u> <Address address={walletAddress} left={8} right={4} />
          </div>
          <div className="flex flex-row gap-1 mt-1">
            <u>Vault Owner:</u> <Address address={vaultOwner} left={8} right={4} />
          </div>
          {vaultOwner === currentAccount ? "✅ You are the owner of this vault." : "❌ You are not the owner of this vault. "}
          <div className="flex flex-row gap-1 mt-1">
            <GetPermissions address={currentAccount} addressOf={walletAddress}>
              Your Vault Permissions
            </GetPermissions>
          </div>

          <div className="mt-1">
            <u>Allowed addresses</u>
          </div>

          <div
            className="absolute top-1 right-0 p-1 rounded-full bg-slate-800 text-blue-400 hover:text-blue-50 border-black border"
            onClick={() => navigate("../myvaults")}>
            <FiSettings />
          </div>
        </div>
      </div>
    </div>
  );
};

export default WalletPermissions;
