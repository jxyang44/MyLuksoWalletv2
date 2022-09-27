import React from "react";
import { Search } from "./";
import { FeaturedMain, FeaturedSub, Ranking } from "./FrontPage";

//move this data to separate file
const featuredVaults = [
  {
    name: "Doodles Vault",
    description: "Doodles",
    vaultId: "0xabcd1234...",
    image: "https://media.giphy.com/media/E3y79zUo2V4v8AFG2V/giphy.gif",
  },
  {
    name: "This is item 2",
    description: `Lorem ipsum dolor sit amet, consectetur adipiscing elit.`,
    vaultId: "Button 2",
    image: "https://giphy.com/clips/justin-MEdRTaYvZBlVMEjwZ3",
  },
];

const featuredProfiles = [
  {
    name: "Fabian Vogelsteller",
    description: "Co-Founder of LUKSO Author of ERC20 and web3.js",
    vaultId: "0xabcd1234...",
    image: "https://uploads-ssl.webflow.com/629f44560745074760731ba4/62c57c7cdb3b14d97412a355_judge-01.png",
  },
  {
    name: "Marjorie Hernandez",
    description: `Co-Founder of LUKSO and The Dematerialised`,
    vaultId: "0xabcd1234...",
    image: "https://uploads-ssl.webflow.com/629f44560745074760731ba4/62c57c8042041e91b669ec55_judge-02.png",
  },
];

const MarketplaceHome = () => {
  return (
    <div className="mt-10 flex flex-col items-center gap-12 px-8 pb-32 text-white md:px-32">
      <div className="text-4xl xl:text-5xl">MyLuksoWallet Marketplace</div>
      <Search />
      <FeaturedMain />
      <FeaturedSub title="Featured Vaults" featuredItems={featuredVaults} />
      <FeaturedSub title="Featured Profiles" featuredItems={featuredProfiles} />
      <Ranking />
    </div>
  );
};

export default MarketplaceHome;
