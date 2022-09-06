import React from "react";

const LearnIcon = () => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      className="h-10 w-10 text-sky-300"
      fill="none"
      viewBox="0 0 24 24"
      stroke="currentColor"
    >
      <path d="M12 14l9-5-9-5-9 5 9 5z" />
      <path d="M12 14l6.16-3.422a12.083 12.083 0 01.665 6.479A11.952 11.952 0 0012 20.055a11.952 11.952 0 00-6.824-2.998 12.078 12.078 0 01.665-6.479L12 14z" />
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="2"
        d="M12 14l9-5-9-5-9 5 9 5zm0 0l6.16-3.422a12.083 12.083 0 01.665 6.479A11.952 11.952 0 0012 20.055a11.952 11.952 0 00-6.824-2.998 12.078 12.078 0 01.665-6.479L12 14zm-4 6v-7.5l4-2.222"
      />
    </svg>
  );
};

const Roadmap = () => {
  return (
    <section className="bg-gray-900 text-white" id="roadmap">
      <div className="mx-auto max-w-screen-xl px-8 py-16 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-2xl text-center">
          <h2 className="text-3xl font-bold text-sky-500 sm:text-4xl">
            What's in Store for MyLuksoWallet
          </h2>

          <p className="mt-4 text-gray-300">
            MyLuksoWallet was started as part of the Build-Up Hackathon. It is
            very much a work in progress. Please contact us at{" "}
            <a
              href="mailto:myluksowallet@gmail.com"
              className="font-bold text-blue-500 hover:text-blue-300"
            >
              MyLuksoWallet@gmail.com
            </a>{" "}
            or at any of our socials if you have cool ideas, functionality you
            would like to see implemented, or general feedback - we'll add it to
            the list below.
          </p>
          <br></br>
          <p className="text-gray-300">
            Thank you for trying our DApp, and we appreciate your patience in
            helping us build together! For now, here is a roadmap of where we
            are and what we hope to achieve.
          </p>
        </div>

        <div className="mt-8 grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
          <div className="block rounded-xl border border-gray-800 p-8 shadow-xl transition hover:border-sky-500/10 hover:shadow-sky-500/10">
            <LearnIcon />
            <h3 className="mt-4 text-xl font-bold text-sky-500">
              Universal Profiles
            </h3>

            <p className="white mt-1 text-sm">
              Implemented: Frontend to view profile, interact with the browser
              extension, update profile metadata settings, update MLW themes,
              update vault themes, transfer native token
            </p>
            <p className="mt-1 text-sm text-gray-400">
              To-do: More profile customization, clone existing metadata, allow
              for NFT profile pictures, view transaction history
            </p>
          </div>

          <div className="block rounded-xl border border-gray-800 p-8 shadow-xl transition hover:border-sky-500/10 hover:shadow-sky-500/10">
            <LearnIcon />
            <h3 className="mt-4 text-xl font-bold text-sky-500">
              LSP7 & LSP8 Assets
            </h3>

            <p className="white mt-1 text-sm">
              Implemented: Frontend to view LSP7 (LSP8 is currently a
              prototype), deploy LSP7 or LSP8 contracts, mint to a UP or vault,
              transfer to and from a UP or vault
            </p>
            <p className="mt-1 text-sm text-gray-400">
              To-do: More LSP7 & LSP8 visual customization, view more images
              (current max is 1 icon and 2 images), mint from a permissioned
              vault, allow for functionality that extends from LSP7 and LSP8
              contracts
            </p>
          </div>

          <div className="block rounded-xl border border-gray-800 p-8 shadow-xl transition hover:border-sky-500/10 hover:shadow-sky-500/10">
            <LearnIcon />
            <h3 className="mt-4 text-xl font-bold text-sky-500">
              LSP9 & LSP10 Vaults
            </h3>

            <p className="white mt-1 text-sm">
              Implemented: Frontend to view vaults, deploy a vault and URD, add
              vault to profile, custom vault metadata (stored with UP), manage
              vault permissions and allowed addresses
            </p>
            <p className="mt-1 text-sm text-gray-400">
              To-do: More visual customization (e.g. a purse, a bank vault, a
              tote bag, etc.), store metadata in the vault (LSP3), transfer
              vault
            </p>
          </div>

          <div className="block rounded-xl border border-gray-800 p-8 shadow-xl transition hover:border-sky-500/10 hover:shadow-sky-500/10">
            <LearnIcon />
            <h3 className="mt-4 text-xl font-bold text-sky-500">Key Manager</h3>

            <p className="white mt-1 text-sm">
              Implemented: Execute via key manager by entering private key,
              add/modify permissioned accounts
            </p>
            <p className="mt-1 text-sm text-gray-400">
              To-do: Browser compatability with key manager, implement relay
              service
            </p>
          </div>

          <div className="block rounded-xl border border-gray-800 p-8 shadow-xl transition hover:border-sky-500/10 hover:shadow-sky-500/10">
            <LearnIcon />
            <h3 className="mt-4 text-xl font-bold text-sky-500">Marketplace</h3>
            <p className="white mt-1 text-sm">Implemented: Work in progress</p>
            <p className="mt-1 text-sm text-gray-400">
              To-do: Create and share UP designs, trade tokens, NFTs or vaults
            </p>
          </div>

          <div className="block rounded-xl border border-gray-800 p-8 shadow-xl transition hover:border-sky-500/10 hover:shadow-sky-500/10">
            <LearnIcon />
            <h3 className="mt-4 text-xl font-bold text-sky-500">
              Expanded Services
            </h3>

            <p className="white mt-1 text-sm">Implemented: Work in progress</p>
            <p className="mt-1 text-sm text-gray-400">
              To-do: Implement real world use cases for digital identity
              (socials, digital wallet, etc.), educate the general public about
              Lukso, other suggestions from the community
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Roadmap;
