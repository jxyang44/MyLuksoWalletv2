import { AiOutlineShoppingCart, AiOutlineHome} from 'react-icons/ai';
import { FiHelpCircle , FiCreditCard} from 'react-icons/fi';
import {BsCurrencyDollar, BsShield} from 'react-icons/bs';
import { IoMdContacts } from 'react-icons/io';


//change icons to data types
export const links = [
    {
      title: 'About',
      links: [
        {
            name: 'LUKSO Build UP!',
            page: 'hackathon',
            icon: <AiOutlineHome />,
        },
        {
            name: 'Get Started',
            page: 'get-started',
            icon: <AiOutlineHome />,
        },
        {
            name: 'About MyLuksoVault',
            page: 'about',
            icon: <AiOutlineHome />,
        },
        {
            name: 'coffee (test ethers)',
            page: 'coffee',
            icon: <AiOutlineHome />,
        },
      ],
    },
  
    {
      title: 'Account Summary',
      links: [
        {
            name: 'profile details (redundant?)',
            icon: <FiHelpCircle />,
          },
        {
          name: 'vault summary',
          icon: <FiHelpCircle />,
        },
        {
          name: 'tokens',
          icon: <AiOutlineShoppingCart />,
        },
        {
          name: 'NFTs',
          icon: <IoMdContacts />,
        },
      ],
    },
  
    {
      title: 'Vault 1: 0x...abcd',
      links: [
        {
          name: 'Knuts (LSP7)',
          icon: <FiHelpCircle />,
        },
        {
          name: 'Sickles (LSP7)',
          icon: <AiOutlineShoppingCart />,
        },
        {
          name: 'Galleons (LSP7)',
          icon: <IoMdContacts />,
        },
      ],
    },

    {
        title: 'Vault 2: 0x...efgh',
        links: [
          {
            name: 'Knuts (LSP7)',
            icon: <FiHelpCircle />,
          },
          {
            name: 'Sickles (LSP7)',
            icon: <AiOutlineShoppingCart />,
          },
          {
            name: 'Galleons (LSP7)',
            icon: <IoMdContacts />,
          },
        ],
      },
  
   
  
  ];


  
export const themeColors = [
    {
      name: 'blue-theme',
      color: '#1A97F5',
    },
    {
      name: 'green-theme',
      color: '#03C9D7',
    },
    {
      name: 'purple-theme',
      color: '#7352FF',
    },
    {
      name: 'red-theme',
      color: '#FF5C8E',
    },
    {
      name: 'indigo-theme',
      color: '#1E4DB7',
    },
    {
      color: '#FB9678',
      name: 'orange-theme',
    },
  ];


export const userProfileData = [
  {
    icon: <BsCurrencyDollar />,
    title: 'My Profile',
    desc: 'Account Settings',
    iconColor: '#03C9D7',
    iconBg: '#E5FAFB',
  },
  {
    icon: <BsShield />,
    title: 'My Inbox',
    desc: 'Messages & Emails',
    iconColor: 'rgb(0, 194, 146)',
    iconBg: 'rgb(235, 250, 242)',
  },
  {
    icon: <FiCreditCard />,
    title: 'My Tasks',
    desc: 'To-do and Daily Tasks',
    iconColor: 'rgb(255, 244, 229)',
    iconBg: 'rgb(254, 201, 15)',
  },
];