import React from "react";
import { Banner, Footer } from "../components";
import { Introduction, Socials, QuoteBox, LSPs } from "./Lukso";

import luksoBanner from "../assets/Logos/Lukso_Original/LUKSO_2022_WORDMARK-01.png";

const information = {
  aboutLukso: {
    title: "About Lukso",
    quote:
      "LUKSO is a next generation EVM blockchain based on Casper PoS that will revolutionize the way brands, creators and users interact in Web3 and with blockchain technology in the New Creative Economy. LUKSO was founded by Fabian Vogelsteller and Marjorie Hernandez. Fabian is a former Lead DApp Developer at Ethereum and author of ERC20 and web3.js - both of which are the foundation for today’s DeFi and NFT protocols. Marjorie Hernandez is an innovation and product expert who previously created and managed EY's Digital Innovation Lab in Berlin.",
    source: "https://lukso.network/faq",
    image: luksoBanner,
  },
  aboutLSPs: {
    title: "What are LSPs?",
    quote:
      "The initial 12 LUKSO Standards Proposals (LSPs) represent the core building blocks of the LUKSO ecosystem. LSPs aim to increase functionality and user-friendliness within the blockchain ecosystem and to standardize identity, asset representation and smart contract interaction. The core LSPs are extremely extensible, allowing for many new use cases, while simplifying the developer and user experience. These standards are ‘unbiased’ - meaning they are generic enough to enable new use cases that have not yet been conceived.",
    source: "https://lukso.network/faq",
    image: "https://docs.lukso.tech/assets/images/erc725-owner-e86a9ea416588a766ffea10783680167.jpeg",
  },
  aboutUPs: {
    title: "What is a Universal Profile?",
    quote:
      "Universal Profiles are interoperable blockchain-based profiles which enable verifiable identities in the digital world. They allow for universal logins that make remembering usernames and passwords a thing of the past, while also giving you full control of all your virtual assets and identity. Universal Profiles simplify the onboarding process to Web3 for users, brands and creators, while also improving accessibility, security and functionality.",
    source: "https://lukso.network/faq",
    image: "https://docs.lukso.tech/assets/images/standard-detection-dafe387cab476e81d7a9858e19b9c88a.jpeg",
  },
  aboutAssets: {
    title: "What are the NFT and tokens standards on LUKSO?",
    quote:
      "With LSP8 Identifiable Digital Asset as well as LSP7 Digital Asset, NFT and token metadata inputs are very extensible and smart contract readable. The metadata inputs could also be changed over time, allowing NFTs to evolve post-minting. NFTs and tokens on LUKSO can have multiple creators and inform receivers of assets, making complex smart contract automation possible.",
    source: "https://lukso.network/faq",
    image: "https://docs.lukso.tech/assets/images/lsp4-digital-asset-metadata-diagram-c8e6b8df1fe281e29fbaad86c21526fe.png",
  },
};

const AboutLukso = () => {
  return (
    <>
      <Banner
        colorFrom={"from-sky-500"}
        title={`About Lukso`}
        subtitle={"Learn More About Lukso"}
        buttonText={"Hackathon info"}
        buttonFunc={() => window.open("https://lukso.network/hackathon?utm_source=docs&utm_medium=docs&utm_campaign=banner")}
      />

      <div className="flex flex-col text-white items-center">
        <div className=" border-y-gray-500 border-y my-10 py-10 text-center flex flex-col gap-4">
          <p>- Below are some of the most frequently asked questions about Lukso. -</p>
          <p>- If you want to learn more, feel free to check out the resources at the bottom of the page. -</p>
          <p>- All quotes and images are sourced from Lukso's websites. -</p>
        </div>
        <div className="flex flex-col gap-32 mt-12">
          <QuoteBox
            title={information.aboutLukso.title}
            quote={information.aboutLukso.quote}
            source={information.aboutLukso.source}
            image={information.aboutLukso.image}
          />
          <QuoteBox
            title={information.aboutLSPs.title}
            quote={information.aboutLSPs.quote}
            source={information.aboutLSPs.source}
            image={information.aboutLSPs.image}
          />
          <QuoteBox
            title={information.aboutUPs.title}
            quote={information.aboutUPs.quote}
            source={information.aboutUPs.source}
            image={information.aboutUPs.image}
          />
          <QuoteBox
            title={information.aboutAssets.title}
            quote={information.aboutAssets.quote}
            source={information.aboutAssets.source}
            image={information.aboutAssets.image}
          />
        </div>
        <Introduction />
      </div>
      <Footer />
    </>
  );
};

export default AboutLukso;
