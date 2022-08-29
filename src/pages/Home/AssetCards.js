import React from "react";
import LSP7_example from "../../assets/Home/LSP7_example.png";
import LSP8_example from "../../assets/Home/LSP8_example.png";
import LSP9_example from "../../assets/Home/LSP9_example.png";
import UP_example from "../../assets/Home/UP_example.png";
import { Link } from "react-router-dom";

const LSPInfo = {
  LSP7: {
    p1: "LSP7 - Digital Asset (Token)",
    p2: "Based on ERC20",
    p3: "Functionality: Mint or Transfer to EOA, UP or Vault. More functionality to come.",
    image: LSP7_example,
    p4: "A LSP7 fungible token is a token that has the same metadata as another token.",
    p5: "A fungible token is visually represented by a coin in MyLuksoWallet.",
  },
  LSP8: {
    p1: "LSP8 - Identifiable Digital Asset (NFT)",
    p2: "Based on ERC721",
    p3: "Mint or Transfer to EOA, UP or Vault. More functionality to come.",
    image: LSP8_example,
    p4: "A LSP8 non-fungible token (NFT) is a token that has different metadata from another token.",
    p5: "A NFT is visually represented by a card in MyLuksoWallet.",
  },
  LSP9: {
    p1: "LSP9 - Vault",
    p2: "New Lukso Standard",
    p3: "Deploy vault, add vault to your profile, manage vault permissions. More functionality to come.",
    image: LSP9_example,
    p4: "A vault allows the user to store and organize other assets (e.g. tokens, NFTs, smart contracts).",
    p5: "Each vault is visually represented by a wallet in MyLuksoWallet.",
  },
  LSP0: {
    p1: "Universal Profile",
    p2: "New Lukso Account System",
    p3: "Functionality: Store metadata (profile settings, MLW themes, vault settings), manage permissions, transfer native token, store LSP7&LSP8 assets, hold LSP9 vaults",
    image: UP_example,
    p4: "A Universal Profile is essential for operating in the Lukso ecosystem.",
    p5: "The Universal Profile is visually represented by an ID card in MyLuksoWallet.",
  },
};

const AssetCard = ({ LSP }) => {
  return (
    <div className="flex flex-col w-full h-[70vh] rounded-lg p-2 LSP-card-home justify-between">
      <div className="flex flex-col border-2 rounded-2xl">
        <div className="p-4 bg-gray-900 rounded-t-2xl">
          <p className="xl:text-xl text-lg">{LSP.p1}</p>
          <p className="xl:text-lg text-base text-gray-500">{LSP.p2}</p>
        </div>
        <div className="flex flex-col justify-evenly bg-gradient-to-br from-sky-500 py-4">
          <img className="rounded-lg mx-8 my-16" src={LSP.image} />
          <div className="xl:text-base text-sm text-white px-4">{LSP.p3}</div>
        </div>

        <div className="p-4 bg-gray-900 rounded-b-2xl">
          <p className="xl:text-base text-sm text-white">{LSP.p4}</p>
        </div>
      </div>
      <div className="my-3 xl:text-lg text-base text-white bg-[#17141d] p-2 rounded-t-sm rounded-b-lg"> {LSP.p5} </div>
    </div>
  );
};

const AssetCards = () => {
  return (
    <div className="flex flex-col justify-center w-full xl:px-32 px-8" id="assetcards">
      <div className="xl:text-5xl text-4xl text-center text-sky-500">
        Visualize Digital Assets with the {""}
        <Link to="/myluksowallet" className="text-blue-500 font-semibold italic hover:text-white">
          MyLuksoWallet DApp
        </Link>
      </div>
      <div className="xl:text-2xl text-xl mt-2 mb-6 text-center">Tokens, NFT 2.0 and Vaults</div>

      <div className="flex flex-row justify-between items-center">
        <div className="xl:text-xl text-base mt-2 mb-6 text-left w-1/2">
          {/* <p>
            In the physical world, wallets, bags, and purses are used to store important pieces of information. This could include IDs, credit cards,
            concert tickets, insurance information, receipts, cash, photos of loved ones, or even stickers of your favorite superhero. Each of these
            items is the physical embodiment of a utility whose value is not tied to the physical good itself. As such, these utilities are ripe
            targets for digital adoption via smart contracts.
          </p>
          <br></br> */}
          <div>
            Lukso Standard Proposal 9 (LSP9) introduces the concept of Vaults. Vaults can be used in conjunction with other LSPs to restrict
            permissions to specific smart contracts and interactions. This is not only useful for organizing assets, but also for security purposes.
            &nbsp;
            <a href="https://docs.lukso.tech/standards/universal-profile/lsp9-vault" className="text-blue-500 hover:text-blue-300" target="_blank">
              Learn more about Vaults here.
            </a>
            &nbsp;
          </div>
          <br></br>
          <div>
            Building on the idea of LSP9, the{" "}
            <Link to="/myluksowallet" className="text-blue-500 hover:text-blue-300 italic font-semibold">
              MyLuksoWallet DApp
            </Link>{" "}
            allows you to visualize blockchain concepts using their real-world physical counterparts.
            <ul className="list-disc list-inside ml-6">
              <li>Vaults (LSP9) as "wallets"</li>
              <li>Universal Profile (LSP0) as an "ID card"</li>
              <li>Tokens (LSP7) as "coins"</li>
              <li>NFTs (LSP8) as "cards"</li>
            </ul>
            The dynamic between vaults, assets, UP and the surrounding permissions can be difficult to manage and understand. Our goal at MLW is to
            provide an interactive tool to help newcomers understand how LSPs work. We hope you have fun along the way!
          </div>
          <br></br>
          <div>
            The concept of a visualized wallet is merely a prototype. In future iterations of MLW, this idea will be expanded to other representations depending on the context of the profile (e.g.
            purses, bank vaults, etc.). We look forward to working with other creators to build a robust collection of visualizations to fit your needs.
          </div>
        </div>

        <div className="flex flex-row justify-center w-1/2 ml-20 my-10 items-center">
          <AssetCard LSP={LSPInfo.LSP8} />
          <AssetCard LSP={LSPInfo.LSP7} />
          <AssetCard LSP={LSPInfo.LSP0} />
          <AssetCard LSP={LSPInfo.LSP9} />
        </div>
      </div>
    </div>
  );
};

export default AssetCards;
