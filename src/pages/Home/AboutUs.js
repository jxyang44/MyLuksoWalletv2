import React from "react";

const QAList = {
  Q1: {
    question: "When was MyLuksoWallet founded?",
    answer:
      `The idea for MyLuksoWallet was inspired by the first Lukso hackathon, which started in July 2022. MyLuksoWallet was submitted under the "Universal Profile Tools - Token & NFT Wallet With Vault Manager" category.`,
  },
  Q2: {
    question: "How can I contribute to the project?",
    answer: "We always welcome feedback from the community! Please contact us at any of our socials or e-mail us at myluksowallet@gmail.com."
  },
  Q3: {
    question: "Is MyLuksoWallet mobile-responsive?",
    answer: "MyLuksoWallet was designed to interact with the browser extension. Currently, it should not be used on mobile devices. When a mobile extension is released, we will work on a mobile-responsive version of MyLuksoWallet.",
  },
  Q4: {
    question: "Want to join the team?",
    answer: "Please contact us at any of our socials or e-mail us at myluksowallet@gmail.com."
  },
  Q5: {
    question: "Who created MyLuksoWallet?",
    answer:
      `"Jxyang" is the developer and founder of MyLuksoWallet. He is an active member of the Lukso community.`,
  },
};

const QandA = ({ question, answer }) => {
  return (
    <details className="p-6 border-l-4 border-l-sky-500 bg-gray-900 group" open>
      <summary className="flex items-center justify-between cursor-pointer">
        <h5 className="text-lg font-medium text-slate-300">{question}</h5>

        <span className="flex-shrink-0 ml-1.5 p-1.5 text-gray-900 bg-white rounded-full sm:p-3">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="flex-shrink-0 w-5 h-5 transition duration-300 group-open:-rotate-45"
            viewBox="0 0 20 20"
            fill="currentColor">
            <path fillRule="evenodd" d="M10 3a1 1 0 011 1v5h5a1 1 0 110 2h-5v5a1 1 0 11-2 0v-5H4a1 1 0 110-2h5V4a1 1 0 011-1z" clipRule="evenodd" />
          </svg>
        </span>
      </summary>

      <p className="mt-4 leading-relaxed text-white">{answer}</p>
    </details>
  );
};

const AboutUs = () => {
  return (
    <section className="w-5/6 xl:mx-32 mx-8 flex flex-col gap-1" id="aboutus">
      <div className="text-center text-5xl mb-8 text-sky-500">About the Project</div>
      <QandA question={QAList.Q1.question} answer={QAList.Q1.answer} />
      <QandA question={QAList.Q2.question} answer={QAList.Q2.answer} />
      <QandA question={QAList.Q3.question} answer={QAList.Q3.answer} />
      <QandA question={QAList.Q4.question} answer={QAList.Q4.answer} />
      <QandA question={QAList.Q5.question} answer={QAList.Q5.answer} />
    </section>
  );
};

export default AboutUs;
