import React from "react";

const QAList = {
  Q1: {
    question: "When was MyLuksoWallet founded?",
    answer: `The idea for MyLuksoWallet was inspired by the first Lukso hackathon, which started in July 2022. MyLuksoWallet was submitted under the "Universal Profile Tools - Token & NFT Wallet With Vault Manager" category.`,
  },
  Q2: {
    question: "How can I contribute to the project?",
    answer:
      "We always welcome feedback from the community! Please contact us at any of our socials or e-mail us at myluksowallet@gmail.com.",
  },
  Q3: {
    question: "Is MyLuksoWallet mobile-responsive?",
    answer:
      "MyLuksoWallet was designed to interact with the desktop browser extension. Currently, it should not be used on mobile devices. When a mobile extension is released, we will work on a mobile-responsive version of MyLuksoWallet.",
  },
  Q4: {
    question: "Want to join the team?",
    answer:
      "Please contact us at any of our socials or e-mail us at myluksowallet@gmail.com.",
  },
  Q5: {
    question: "Who created MyLuksoWallet?",
    answer: `Jeff Yang (Twitter: @jxyang, Discord: jxyang#6165) is the developer and founder of MyLuksoWallet. He is an active member of the Lukso community.`,
  },
  Q0: {
    question: "How do I get started?",
    answer: `Follow our step-by-step guide to get started with MyLuksoWallet. Just select "Get Started" from the sidebar.`,
  },
  Q0A: {
    question: "What can I do with MyLuksoWallet?",
    answer: `MyLuksoWallet offers many core profile-related services built using the Lukso Network, including: deploying and customizing Universal Profiles, deploying and minting tokens, deploying and minting NFTs, and deploying and customizing vaults. We are currently working on a relay service and a marketplace.`,
  },
};

const QandA = ({ question, answer }) => {
  return (
    <details className="group border-l-4 border-l-sky-500 bg-gray-900 p-6" close="true">
      <summary className="flex cursor-pointer items-center justify-between">
        <h5 className="text-lg font-medium text-slate-300">{question}</h5>

        <span className="ml-1.5 flex-shrink-0 rounded-full bg-white p-1.5 text-gray-900 sm:p-3">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-5 w-5 flex-shrink-0 transition duration-300 group-open:-rotate-45"
            viewBox="0 0 20 20"
            fill="currentColor"
          >
            <path
              fillRule="evenodd"
              d="M10 3a1 1 0 011 1v5h5a1 1 0 110 2h-5v5a1 1 0 11-2 0v-5H4a1 1 0 110-2h5V4a1 1 0 011-1z"
              clipRule="evenodd"
            />
          </svg>
        </span>
      </summary>

      <p className="mt-4 leading-relaxed text-white">{answer}</p>
    </details>
  );
};

const AboutUs = () => {
  return (
    <section className="mx-8 flex w-5/6 flex-col gap-1 xl:mx-32" id="aboutus">
      <div className="mb-8 text-center text-4xl xl:text-5xl text-sky-500">
        About the Project
      </div>
      <QandA question={QAList.Q0.question} answer={QAList.Q0.answer} />
      <QandA question={QAList.Q0A.question} answer={QAList.Q0A.answer} />
      <QandA question={QAList.Q1.question} answer={QAList.Q1.answer} />
      <QandA question={QAList.Q2.question} answer={QAList.Q2.answer} />
      <QandA question={QAList.Q3.question} answer={QAList.Q3.answer} />
      <QandA question={QAList.Q4.question} answer={QAList.Q4.answer} />
      <QandA question={QAList.Q5.question} answer={QAList.Q5.answer} />
    </section>
  );
};

export default AboutUs;
