//information for the sidebar

import { AiFillHome, AiFillPlayCircle, AiTwotoneStar } from "react-icons/ai";
import { BsFillPersonLinesFill } from "react-icons/bs";
import { GiCube, GiTwoCoins, GiAirplaneDeparture } from "react-icons/gi";
import { BsSafeFill } from "react-icons/bs";
import { MdPersonSearch } from "react-icons/md";

export const links = [
  {
    title: "About",
    links: [
      {
        name: "MLW Homepage",
        page: "home",
        icon: <AiFillHome />,
      },
      {
        name: "Get Started",
        page: "getstarted",
        icon: <AiFillPlayCircle />,
      },
      {
        name: "Payment Relay Service",
        page: "relayservice",
        icon: <GiAirplaneDeparture />,
      },
      {
        name: "About LUKSO",
        page: "aboutlukso",
        icon: <GiCube />,
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
        name: "My Assets",
        page: "myassets",
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
    title: "Marketplace",
    links: [
      {
        name: "Marketplace",
        page: "marketplace",
        icon: <MdPersonSearch />,
      },
      {
        name: "Launchpad",
        page: "launchpad",
        icon: <GiTwoCoins />,
      },
      {
        name: "Vault Listings",
        page: "vaultlistings",
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
