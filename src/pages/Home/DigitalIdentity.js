import React, { useState, useEffect, useRef } from "react";
import fingerprint from "../../assets/Home/fingerprint.png";
import { useStateContext } from "../../contexts/StateContext";
import { animateOnEntry } from "../../utils/animations";
const DigitalIdentity = () => {
  const { scrollHeight } = useStateContext();
  const imgRef = useRef(null);
  const [persAnimation, setPersAnimation] = useState(false);

  useEffect(() => {
    animateOnEntry(imgRef, setPersAnimation, 0.5);
  }, [scrollHeight]);

  return (
    <div
      className="relative flex w-full md:flex-row flex-col-reverse justify-between gap-10 md:px-32 px-8"
      id="digitalidentity"
    >
      <div className="-z-5 absolute inset-0 rounded-lg bg-gradient-to-br from-black via-sky-500 to-black opacity-25 blur-xl"></div>
      <div className="z-10 flex md:w-1/2 flex-col justify-center gap-2">
        <div className="text-4xl font-semibold text-sky-500 xl:text-5xl">
          Digital Identity
        </div>

        <div className="md:mt-8 tracking-wide md:mr-12 md:text-base xl:mr-24 xl:text-xl">
          <p>
            As technology advances, the eventual dematerialization of plastic
            IDs, leather wallets, paper contracts and other physical vessels for
            digitizable information is inevitable. In the coming years, we ought
            to consider the protocols that can best represent our digital
            identity in a trusted, decentralized, interoperable, secure,
            accessible, and easy-to-use manner. This is where{" "}
            <a
              className="font-semibold italic text-blue-500 hover:text-blue-300"
              href="https://lukso.network/faq"
              rel="noreferrer"
              target="_blank"
            >
              {" "}
              Lukso{" "}
            </a>{" "}
            comes in.
          </p>
          <br></br>
          <p>
            Using next generation EVM blockchain technology, Lukso provides
            developers, downstream creators, and consumers with the building
            blocks necessary to standardize digital identity and asset
            representation. These building blocks are known as Lukso Standard
            Proposals (LSPs).
          </p>
        </div>
      </div>

      <div
        ref={imgRef}
        className={`perspective-l flex md:w-1/2 items-center justify-center ${
          persAnimation && "perspective-l-animation"
        }`}
      >
        <img
          className="py-2 md:py-10 px-2"
          src={fingerprint}
          alt="Digital Fingerprint"
        />
      </div>
    </div>
  );
};

export default DigitalIdentity;
