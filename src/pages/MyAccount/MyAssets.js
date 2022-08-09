import React, { useState, useEffect } from "react";
import { useAssetsContext } from "../../contexts/AssetsContext";
import { useProfileContext } from "../../contexts/ProfileContext";
import {
  Button_Shadow,
  NFTCard,
  TokenCardFull,
  Loading,
  Banner,
  LoginGraphic,
} from "../../components";

const LSPMapping = {
  LSP7: {
    shortName: "Tokens",
    contract: "LSP7DigitalAsset",
    bannerColor: "from-green-700",
    buttonColor: "bg-green-600",
  },

  LSP8: {
    shortName: "NFTs",
    contract: "LSP8IdentifiableDigitalAsset",
    bannerColor: "from-blue-700",
    buttonColor: "bg-blue-600",
  },

  LSP9: {
    shortName: "Vaults",
    contract: "LSP9Vault",
    bannerColor: "from-slate-700",
    buttonColor: "bg-slate-600",
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

const MyAssets = ({ LSP_7_8_or_9, LSP_5_10_or_12 }) => {
  const { currentAccount } = useProfileContext();
  const {
    receivedAssets,
    ownedAssets,
    fetchAllAssets,
    fetchOwnedAssets,
    supportsInterface,
  } = useAssetsContext();
  const [assets, setAssets] = useState([]);
  const [assetsLoaded, setAssetsLoaded] = useState(false);

  useEffect(() => {
    handleLoadAssets();
  }, []);

  useEffect(() => {
    handleLoadAssets();
  }, [currentAccount]);

  useEffect(() => {
    setAssets([]);
  }, LSP_7_8_or_9);

  const handleLoadAssets = () => {
    //fetchAllAssets("0xa907c1904c22DFd37FF56c1f3c3d795682539196", "LSP5ReceivedAssets[]");

    fetchAllAssets(currentAccount, LSPMapping[LSP_5_10_or_12].name).then(() => {
      setAssets([]);
      receivedAssets.length &&
        receivedAssets.forEach((asset) => {
          supportsInterface(asset, LSPMapping[LSP_7_8_or_9].contract).then(
            (res) => {
              if (res == true) setAssets((assets) => [...assets, asset]);
            }
          );
        });

      setAssetsLoaded(true);

      console.log(assets);
    });
  };

  return (
    <>
      <Banner
        colorFrom={LSPMapping[LSP_7_8_or_9].bannerColor}
        title={`My ${LSPMapping[LSP_7_8_or_9].shortName}`}
        subtitle={`${
          currentAccount
            ? `UP Address: ${currentAccount}`
            : "No Universal Profile address detected."
        }`}
        buttonText={"Load My Assets"}
        buttonFunc={handleLoadAssets}
        buttonColor={LSPMapping[LSP_7_8_or_9].buttonColor}
      />
      {!currentAccount ? (
        <LoginGraphic />
      ) : (
        <>
          {assetsLoaded ? (
            <div className="flex flex-wrap basis-1/3 gap-4 grid-cols-3">
              {assets.length ? (
                <>
                  {assets.map((asset, index) => {
                    return (
                      <>
                        {LSP_7_8_or_9 === "LSP7" && (
                          <TokenCardFull key={index} assetAddress={asset} />
                        )}
                        {LSP_7_8_or_9 === "LSP8" && (
                          <NFTCard key={index} assetAddress={asset} />
                        )}
                      </>
                    );
                  })}
                </>
              ) : (
                <div className="text-white">You got no assets brah ;(</div>
              )}
            </div>
          ) : (
            <Loading />
          )}
        </>
      )}
    </>
  );
};

export default MyAssets;
