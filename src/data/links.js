import { AiFillHome, AiFillQuestionCircle, AiFillPlayCircle, AiTwotoneStar } from "react-icons/ai";
import { BsFillPersonLinesFill } from "react-icons/bs";
import { GiCube, GiTwoCoins } from "react-icons/gi";
import { BsSafeFill } from "react-icons/bs";

export const links = [
  {
    title: "About",
    links: [
      {
        name: "Home",
        page: "home",
        icon: <AiFillHome />,
      },
      {
        name: "LUKSO Build UP!",
        page: "hackathon",
        icon: <GiCube />,
      },
      {
        name: "Get Started",
        page: "getstarted",
        icon: <AiFillPlayCircle />,
      },
      {
        name: "About LUKSO",
        page: "about",
        icon: <AiFillQuestionCircle />,
      },
    ],
  },

  {
    title: "My Account",
    links: [
      {
        name: "My Universal Profile",
        page: "myuniversalprofile",
        icon: <BsFillPersonLinesFill />,
      },
      {
        name: "My Tokens",
        page: "mytokens",
        icon: <GiTwoCoins />,
      },
      {
        name: "My NFTs",
        page: "mynfts",
        icon: <AiTwotoneStar />,
      },
      {
        name: "My Vaults",
        page: "myvaults",
        icon: <BsSafeFill />,
      },
    ],
  },

  {
    title: "Create",
    links: [
      {
        name: "Create Universal Profile",
        page: "createprofile",
        icon: <BsFillPersonLinesFill />,
      },
      {
        name: "Create Token",
        page: "createtoken",
        icon: <GiTwoCoins />,
      },
      {
        name: "Create NFT",
        page: "createnft",
        icon: <AiTwotoneStar />,
      },
      {
        name: "Create Vault",
        page: "createvault",
        icon: <BsSafeFill />,
      },
    ],
  },

  {
    title: "Search",
    links: [
      {
        name: "Universal Profile Search",
        page: "profilesearch",
        icon: <BsFillPersonLinesFill />,
      },
      {
        name: "Token Token",
        page: "tokensearch",
        icon: <GiTwoCoins />,
      },
      {
        name: "NFT Search",
        page: "nftsearch",
        icon: <AiTwotoneStar />,
      },
      {
        name: "Vault Search",
        page: "vaultsearch",
        icon: <BsSafeFill />,
      },
    ],
  },
];
