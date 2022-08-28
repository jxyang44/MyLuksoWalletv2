
<br />
<div align="center">
  <a href="https://myluksowallet-hackathon.netlify.app">
    <img src="https://user-images.githubusercontent.com/58372066/186786266-d6c1365e-66ff-46fe-aae2-6ac92156f462.png" alt="Logo" width="80" height="80">
  </a>

  <h1 align="center">MyLuksoWallet</h1>

  <p align="center">
    A front-end management tool for Lukso Standard Proposals.
    <br />
    Submission for LUKSO Build UP! #1
    <br />
    <br />
    <a href="https://myluksowallet-hackathon.netlify.app"><strong>Hackathon Submission Link (8/31/22)</strong></a>
    <br />
    <br />
    ·
    <a href="https://www.myluksowallet.com">Working Public Website</a>
    ·
    <a href="https://docs.google.com/presentation/d/1KGlWPiMQu9HsbDDt2WgSXEF9vcHWhigdcR9-jILy12k/edit?usp=sharing">Presentation</a>
    ·
    <a href="https://myluksowallet-hackathon.netlify.app/getstarted">Tutorials from Website</a>
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
    <li><a href="#fundamentals">Judging</a></li>
    <li><a href="#contributing">Contributing</a></li>
    <li><a href="#contact">Contact</a></li>
  
  </ol>
</details>



<!-- ABOUT THE PROJECT -->
## About The Project

MyLuksoWallet is a front-end asset management tool. The ultimate goal is to be one of the main platforms new users visit when interacting with Universal Profiles, LSP7 Tokens, LSP8 NFTs, and LSP9 Vaults. In the future, we also hope to incorporate a relay service, marketplace, and other sensible additions.

Functionality includes:
<ul>
  <li>Universal Profiles - Create a profile, manage standard profile metadata, choose profile themes (stored as metadata), manage permissions, transfer tokens</li>
  <li>LSP7 Tokens - Deploy a contract, mint, or transfer to UP or vault</li>
  <li>LSP8 NFTs - Deploy a contract, mint, or transfer to UP or vault</li>
  <li>LSP9 Vaults - Deploy a vault (w/ universal receiver delegate), add vault to UP, manage vault permissions, transfer assets to vault, apply metadata settings to vault </li>
</ul>

Link to the required video submission: https://www.youtube.com/watch?v=nronIM7Lgxc&t=57s

This readme file is intentionally sparse. More detailed documentation can be found at:
<ul>  
  <li><a href="https://myluksowallet-hackathon.netlify.app/getstarted">Tutorials from the Website</a></li>
  <li><a href="https://docs.google.com/presentation/d/1KGlWPiMQu9HsbDDt2WgSXEF9vcHWhigdcR9-jILy12k/edit?usp=sharing">Presentation Slides</a></li>
  <li><a href="https://www.youtube.com/watch?v=Fcii2svh6KY&list=PLFBtxrByZXCQ195uSM921M6CGcAUf3k6O">Youtube Tutorial Playlist</a></li>
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
3. Enter your private key in `.env`. The private key is only used to deploy LSP7/LSP8 contracts using LSPFactory in `CreateLSPForm.js`. Unfortunately, I was not able to get LSPFactory to work using the window in time, but this should be a quick change in the future. The private key is not used for anything else.
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

_For examples on usage, please refer to the [Website Tutorials](https://myluksowallet-hackathon.netlify.app/getstarted)._

<p align="right">(<a href="#readme-top">back to top</a>)</p>


<!-- Fundamentals -->
## Fundamentals
Below are the driving forces in designing MyLuksoWallet.

### Criteria
<ul>
<li><b>Potential Contribution: How will this project contribute to the growth of the LUKSO ecosystem?</b></li>
  <ul><li>This criterion is the core driver behind MyLuksoWallet. The goal is for the platform to be user-friendly so newcomers to Lukso can instantly interact with Universal Profiles and LSPs. The eventual plan is not only to provide services around LSPs, but also to help share technical knowledge in a non-technical way via tutorials, instructions, articles, social media, etc. </li></ul>
<li><b>Originality & Creativity: How novel and innovative is the idea?</b></li>
  <ul><li>MyLuksoWallet's initial directive is to be one of the first-to-market platforms for allowing the community to interact with Universal Profiles and LSPs. I'm not sure how original or creative that idea as opposed to early mover advantage. In terms of innovation, I think the idea of standardizing common web/(phone) settings (e.g. color themes (bg, border, shadow, text), fonts, other stylings) to profile metadata has traction, because these elements can significantly increase the level of personalization and immersion with any DApp. Because it's early in the process, standardizing these could enable developers to integrate these settings into their DApps.  </li></ul>
<li><b>Technical Excellence: Is the code well-written, well-documented, and/or technically innovative?</b></li>
  <ul><li>The project is primarily a front-end visual using examples from the Lukso tutorial documents. I don't think it is partically technically innovative at this point. And as a new web developer, I imagine the code isn't the most well-written or documented to industry standards. I did try to document as much as I could. At this point, I would prefer to keep the code closed source, but certainly anticipate opening it up at a future point.</li></ul>
<li><b>User Experience & Design: Does the design of the project make the user experience easy?</b></li>
  <ul><li>The core application of MyLuksoWallet is to take the technical architecture from the LSPs and create something user friendly and visually pleasing. If this has not been done, then I will need to re-visit the drawing board.</li></ul>
<li><b>Usage of LUKSO’s new standards and tools: To what extent are the available standards and tools leveraged?</b></li>
  <ul><li>I would say the tools are heavily leveraged. This project was designed with the LSPs as the foundation. I went through almost all the documentation and utilized all LSPs 0-12 (except LSP11), lsp-factory.js, and erc725.js. I also actively engage in Q&A on Discord around these standards and tools. </li></ul>
</ul>

### Suggestions

Were all suggestions followed?
<ul>
<li>Start building the next generation of dApps on Universal Profiles and have fun!</li>
  <ul><li>[✔️] This was a great experience in learning about the innovative tools from the Lukso team!</li></ul>
<li>Build on the LUKSO L16 Public Testnet</li>
  <ul><li>[✔️] Yes.</li></ul>
<li>Use the Universal Profile browser extension as the user interface</li>
  <ul><li>[✔️–] I was not able to use the extension to get LSPFactory working to deploy LSP7 and LSP8 contracts, but used the extension for everything else.</li></ul>
<li>Experiment and build with LUKSO’s Universal Profiles, new smart contract standards and tools</li>
  <ul><li>[✔️] Yes.</li></ul>
<li>You are encouraged to use the following libraries: lsp-factory.js, erc725.js and the relayer API </li>
  <ul><li>[✔️–] I used lsp-factory.js and erc725.js, and contributed actively on Discord on discussion surrounding these libraries. I have not used the relayer API yet. </li></ul>
<li>Submit your project via Gitcoin by August 31st, 5pm CEST</li>
  <ul><li>[✔️] Yes.</li></ul>
</ul>


<p align="right">(<a href="#fundamentals">back to top</a>)</p>

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

Jeff Yang - Twitter: [@jxyang](https://twitter.com/jxyang) - Discord: jxyang#6165 - E-mail: jxyang@gmail.com

Reward payout address: 0xeBf5E8bD8ab301b90355d421282B4ad89DB32651

Project Link (current working version beyond the hackathon): [https://www.myluksowallet.com](https://www.myluksowallet.com)

<p align="right">(<a href="#readme-top">back to top</a>)</p>



<!-- MARKDOWN LINKS & IMAGES -->
<!-- https://www.markdownguide.org/basic-syntax/#reference-style-links -->
[contributors-shield]: https://img.shields.io/github/contributors/othneildrew/Best-README-Template.svg?style=for-the-badge
