
<br />
<div align="center">
  <a href="https://myluksowallet-hackathon.netlify.app">
    <img src="https://user-images.githubusercontent.com/58372066/186786266-d6c1365e-66ff-46fe-aae2-6ac92156f462.png" alt="Logo" width="80" height="80">
  </a>

  <h1 align="center">MyLuksoWallet</h1>

  <p align="center">
    A Front-End Management Tool for Lukso Standard Proposals
    <br />
    <br />
    Version for the Hackathon: <a href="https://myluksowallet-hackathon.netlify.app"><strong>DApp/Website Link (8/31/22)</strong></a>
    <br />
    <br />
    ·
    <a href="https://www.myluksowallet.com">Working Public Website</a>
    ·
    <a href="https://docs.google.com/presentation/d/1KGlWPiMQu9HsbDDt2WgSXEF9vcHWhigdcR9-jILy12k/edit?usp=sharing">Presentation</a>
    ·
    <a href="https://myluksowallet-hackathon.netlify.app/getstarted">Website Tutorials</a>
    ·
    <a href="https://www.youtube.com/watch?v=Fcii2svh6KY&list=PLFBtxrByZXCQ195uSM921M6CGcAUf3k6O">Youtube Tutorials Playlist</a>
    ·
  </p>
</div>


<!-- TABLE OF CONTENTS -->
<details>
  <summary>Table of Contents</summary>
  <ol>
    <li><a href="#about-the-project">About The Project</a></li>
    <li><a href="#getting-started">Getting Started</a></li>
    <li><a href="#usage">Usage</a></li>
    <li><a href="#judging">Judging</a></li>
    <li><a href="#contributing">Contributing</a></li>
    <li><a href="#contact">Contact</a></li>
  
  </ol>
</details>



<!-- ABOUT THE PROJECT -->
## About The Project

Link to video submission for the hackathon: https://www.youtube.com/watch?v=nronIM7Lgxc

MyLuksoWallet is a front-end asset management tool. The ultimate goal is to be the main platform new users visit when looking to interact with Universal Profiles, LSP7 Tokens, LSP8 NFTs, and LSP9 Vaults. In the future, we also hope to incorporate a relay service, marketplace, more Lukso learning and other sensible additions.

At a high level, functionality includes:
<ul>
  <li>Universal Profiles - Create a profile, manage standard profile metadata, choose profile themes (stored as metadata), manage permissions, transfer tokens</li>
  <li>LSP7 Tokens - Deploy a contract, mint, or transfer to UP or vault</li>
  <li>LSP8 NFTs - Deploy a contract, mint, or transfer to UP or vault</li>
  <li>LSP9 Vaults - Deploy a vault/URD, add a vault to a UP, manage vault permissions, manage allowed addresses, transfer assets in and out of a vault, apply metadata settings to a vault </li>
</ul>
A more comprehensive list of functions can be found in this document.
<br />
<br />
This readme file is intentionally sparse. More detailed documentation can be found at:
<ul>  
  <li><a href="https://myluksowallet-hackathon.netlify.app/getstarted">Tutorials from the Website</a></li>
  <li><a href="https://docs.google.com/presentation/d/1KGlWPiMQu9HsbDDt2WgSXEF9vcHWhigdcR9-jILy12k/edit?usp=sharing">Presentation Slides</a></li>
  <li><a href="https://www.youtube.com/watch?v=Fcii2svh6KY&list=PLFBtxrByZXCQ195uSM921M6CGcAUf3k6O">Youtube Tutorial Playlist</a> - please note that additional functionality has been added since the videos were created. A full list of features is provided in this document.</li>
</ul>



<p align="right">(<a href="#readme-top">back to top</a>)</p>


<!-- GETTING STARTED -->
## Getting Started

To get a local copy up and running follow these steps.

### Prerequisites

* npm
  ```sh
  npm install npm@latest -g
  ```

### Installation

1. Clone the repo
   ```sh
   git clone https://github.com/jxyang44/MyLuksoWallet.git
   ```
2. Install NPM packages
   ```sh
   npm install
   ```
3. Enter your private key in `.env`. The private key is only used to deploy LSP7 or LSP8 contracts using LSPFactory in `CreateLSPForm.js`. Unfortunately, I was not able to get LSPFactory to work using the window in time, but this should be a quick change in the future. The private key is not used for anything else. This step can be skipped if you don't intend to deploy LSP7 or LSP8 contracts.
   ```js
   const REACT_APP_METAMASK_MY_DEV_PRIVATE_KEY= 'ENTER YOUR PRIVATE KEY';
   ```
   
### Start
   
1. Start (react-app-rewired is used to bypass package dependency errors)
   ```sh
   npm run start
   ```
<p align="right">(<a href="#readme-top">back to top</a>)</p>

<!-- USAGE EXAMPLES -->
## Usage
A comprehensive list of currently implemented features:

<ul>
  <li><b>LSP9, LSP10 - Vaults</b></li>
    <ul>
      <li>Aesthetic Visualization of Vaults in the MyLuksoWallet DApp</li>
      <li>Deploy a Vault with a Universal Receiver Delegate</li>
      <li>Add the Vault to a Universal Profile (LSP10)</li>
      <li>Transfer a LSP7 or LSP8 Token In and Out of a Permissioned Vault</li>
    </ul>
 
  <li><b>LSP4, LSP7, LSP8 - Tokens</b></li>
    <ul>
      <li>Front-End to Visualize and Design Tokens and NFTs</li>
      <li>Deploy a LSP7 or LSP8 Token</li>
      <li>Mint a  LSP7 or LSP8 Token to a Universal Profile</li>
      <li>Mint a  LSP7 or LSP8 Token to a Vault</li>
      <li>Transfer a LSP7 or LSP8 Token In and Out of a Universal Profile</li>
    </ul>

  <li><b>LSP5/LSP12 - Received/Issued Assets</b></li>
    <ul>
      <li>Toggle Between Received and Issued Assets in the MLW DApp</li>
      <li>Checkbox to Deploy a Contract as a Creator</li>
    </ul>

  <li><b>LSP0, LSP1, LSP2, LSP3 - Universal Profile Standards</b></li>
    <ul>
      <li>Front-End to Visualize and Design Universal Profiles</li>
      <li>Add/Edit Standard Profile Metadata</li>
      <li>Add/Edit Additional Profile Metadata (browser themes)</li>
      <li>Add/Edit Vault Metadata (stored with the profile)</li>
      <li>Create a Universal Profile via LSPFactory (the code is in RelayService.js, but the feature is currently disabled)</li>
    </ul>
  
  <li><b>LSP6 - Key Manager</b></li>
    <ul>
      <li>Easy-to-Use Forms to Manage and View Permissions</li>
      <li>Add a New Permissioned Account to a Universal Profile</li>
      <li>Update Specific Permissions for a Permissioned Account on a Universal Profile</li>
      <li>Add a New Permissioned Account to a Vault</li>
      <li>Update Specific Permissions for a Permissioned Account on a Vault</li>
      <li>Manage Allowed Addresses for a User</li>
    </ul>
</ul>



_For examples on usage, please refer to the [Website Tutorials](https://myluksowallet-hackathon.netlify.app/getstarted)._

<p align="right">(<a href="#readme-top">back to top</a>)</p>


<!-- Judging -->
## Judging
Below are the driving forces in designing MyLuksoWallet. 

### Criteria
<ul>
<li><b>Potential Contribution: How will this project contribute to the growth of the LUKSO ecosystem?</b></li>
  <ul><li>This criterion is the core driver behind MyLuksoWallet. The goal is for the platform to be user-friendly so newcomers to Lukso can instantly interact with Universal Profiles, digital assets and vaults. The eventual plan is not only to provide services around LSPs, but also to help share technical knowledge in a non-technical way via tutorials, instructions, articles, social media, etc. </li></ul>
<li><b>Originality & Creativity: How novel and innovative is the idea?</b></li>
  <ul><li>MyLuksoWallet's initial directive is to be one of the first-to-market platforms for allowing the community to interact with Universal Profiles and LSPs. The overwhelming majority of the design decisions are original, including the idea of assigning LSPs to dematerialized real-world items (e.g. a wallet, coin, card, and more in the future). Inspiration was also drawn from universal.page.</li>
    <li>In terms of innovation, there are perhaps two pieces that set MyLuksoWallet apart: 
    <ol>
      <li>Visually representing the interaction between UPs and LSPs as phygital assets could make it easier for visually-inclined newcomers to understand how the pieces work together. Even within the technical documents, flow charts are provided to help visualize how everything is weaved together. If users take to this idea, different aesthetic models could be implemented in the future depending on the users' preferences. </li>
    <li>I think the idea of standardizing common browser settings (e.g. color themes - [bg, border, shadow, text], fonts, other stylings) to profile/vault metadata has traction, because these elements can significantly increase the level of personalization and immersion with any DApp. This also further bolsters the concept of decentralization, since it mitigates the branding impact from the DApp. Because it's early in the process, standardizing these could enable developers to integrate these settings into their DApps. This could be done as part of LSP3, or perhaps a new standard. </li></ol></li></ul>
<li><b>Technical Excellence: Is the code well-written, well-documented, and/or technically innovative?</b></li>
  <ul><li>The project is primarily a front-end visual using examples from the Lukso tutorial documents. I don't think it is partically technically innovative at this point - there is still much to be done. And as a newer web developer, I imagine the code isn't the most well-written or documented to industry standards, but that should improve over time, especially if this is made open-source in the future. I did try to document as much as I could.</li></ul>
<li><b>User Experience & Design: Does the design of the project make the user experience easy?</b></li>
  <ul><li>The core application of MyLuksoWallet is to take the technical architecture from the LSPs and create something user friendly and visually pleasing. There are also a collection of tutorials, both written and in video form, to guide newcomers through the process. Creative feedback and collaboration with the community would also be immensely helpful in the future.</li></ul>
<li><b>Usage of LUKSO’s new standards and tools: To what extent are the available standards and tools leveraged?</b></li>
  <ul><li>I would say the tools are heavily leveraged. This project was designed with the LSPs as the foundation. I went through almost all the documentation and utilized all LSPs (except LSP11), lsp-factory.js, and erc725.js. I also actively engage in Q&A on Discord and contribute to the documents around these standards and tools. </li></ul>
</ul>

### Challenge Criteria
Were the criteria listed in the challenge followed?
<ul>
<li>That can display tokens (LSP7) and NFTs (LSP8), as well as potentially legacy ERC20 and ERC721 assets (would require a token API to know if a user holds any).</li>
  <ul><li>[✔️] The DApp currently only displays LSP7 and LSP8 tokens, but could easily be expanded to include ERC20 and ERC721. As noted in the criteria, it should simply be a matter of allowing the ERC20 and ERC721 APIs in the code, so this feature could be added if there is demand for it. </li></ul>
<li>Should display owned assets using LSP5 Received Assets metadata and also created assets using LSP12 Issued Assets metadata.</li>
  <ul><li>[✔️] There is a toggle in the MLW DApp to switch between received and issued assets. There is also a button to switch between these on the "My Assets" page.</li></ul>
<li>The wallet should contain a vault manager based on LSP9 - Vaults to create vaults and move assets between vaults, which help to separate tokens and NFTs for better separation or vaults holding funds or information related to permissioned dApps.</li>
  <ul><li>[✔️] In the MLW DApp, the user may transfer assets in and out of vaults using a drag and drop feature. As noted earlier, the user must paste in their private key to transfer assets OUT of a vault. This should be corrected in the future. </li></ul>
</ul>

### Pending Implementation
Below are a list of high-priority features that are pending implementation:
<ul>
  <li>Operating from a vault address currently requires the user to paste in a private key (e.g. adding URD to vault, managing vault permissions, transferring OUT of vault). The code is implemented in the "executeViaKeyManager" function in "ProfileContext.js".</li>
  <li>Deploying a LSP7 or LSP8 asset with LSPFactory currently uses a private key instance. The code works, but ideally, this should be done with the extension, not a private key instance. </li>
  <li>Add logic to add deployed asset to LSP12 - Issued Assets. </li>
  </ul>


### Suggestions
Were all suggestions followed?
<ul>
<li>Start building the next generation of dApps on Universal Profiles and have fun!</li>
  <ul><li>[✔️] This was a great experience in learning about the innovative tools from the Lukso team!</li></ul>
<li>Build on the LUKSO L16 Public Testnet</li>
  <ul><li>[✔️] Yes.</li></ul>
<li>Use the Universal Profile browser extension as the user interface</li>
  <ul><li>[✔️–] MLW was designed to be compatible with the extension. Aside from the items mentioned above (which will be extension-compatible in the future), all other features use the extension.</li></ul>
<li>Experiment and build with LUKSO’s Universal Profiles, new smart contract standards and tools</li>
  <ul><li>[✔️] Yes.</li></ul>
<li>You are encouraged to use the following libraries: lsp-factory.js, erc725.js and the relayer API </li>
  <ul><li>[✔️–] I used lsp-factory.js and erc725.js, and contributed actively on Discord on discussion surrounding these libraries. I have not used the relayer API yet. </li></ul>
<li>Submit your project via Gitcoin by August 31st, 5pm CEST</li>
  <ul><li>[✔️] Yes.</li></ul>
</ul>

As a relevant and personal aside, I recently left a decade-long career in an unrelated industry to pursue my own passions in gaming, web development and web3, which is why my GitHub account has only recently started turning green. I have also been a very strong supporter of Lukso for over a year now, for many reasons. This hackathon presented a perfect opportunity to capitalize on these passions, so this truly is a full-time project for me now, extending beyond the hackathon. I look forward to working alongside the Lukso team in the foreseeable future!

<p align="right">(<a href="#judging">back to top</a>)</p>

<!-- CONTRIBUTING -->
## Contributing

Contributions are what make the open source community such an amazing place to learn, inspire, and create. Any contributions you make are **greatly appreciated**.

If you have a suggestion that would make this better, please fork the repo and create a pull request. You can also simply open an issue with the tag "enhancement".
Don't forget to give the project a star! Thanks again!

1. Fork the Project
2. Create your Feature Branch (`git checkout -b feature/AmazingFeature`)
3. Commit your Changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the Branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

<p align="right">(<a href="#readme-top">back to top</a>)</p>



<!-- CONTACT -->
## Contact

Jeff Yang - LinkedIn: [Jeff Yang, FSA, MAAA](https://www.linkedin.com/in/jeff-yang-fsa-maaa/) - Discord: jxyang#6165 - E-mail: jxyang@gmail.com - Twitter: [@jxyang](https://twitter.com/jxyang)

Payout Address: 0xeBf5E8bD8ab301b90355d421282B4ad89DB32651

Project Link (current working version beyond the hackathon): [https://www.myluksowallet.com](https://www.myluksowallet.com)

<p align="right">(<a href="#readme-top">back to top</a>)</p>



<!-- MARKDOWN LINKS & IMAGES -->
<!-- https://www.markdownguide.org/basic-syntax/#reference-style-links -->
[contributors-shield]: https://img.shields.io/github/contributors/othneildrew/Best-README-Template.svg?style=for-the-badge
