import React from "react";
import { ButtonColor } from "../../components";
import welcomeBG from "../../assets/Marketplace/LaunchpadWelcome.jpg";
import { motion } from "framer-motion";
const Title = () => {
  return (
    <motion.div
      className="my-10 flex h-1/2 w-full xl:mx-96 mx-32 flex-col items-center gap-20 rounded-xl bg-slate-600 bg-fixed px-32 py-48 text-center bg-blend-multiply bg-top"
      style={{ backgroundImage: `url(${welcomeBG})` }}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{
        duration: 0.8,
      }}>
      <div className="text-4xl xl:text-5xl">MyLuksoWallet Launchpad</div>
      <div className="text-2xl text-slate-200 xl:text-3xl">Create and Share Your Vaults, NFTs and Universal Profiles </div>
      <ButtonColor buttonText={"Apply for Launchpad"} buttonFunc={() => {}} customStyle={"w-1/3 hover:scale-110 bg-sky-700 hover:bg-sky-900"} />
    </motion.div>
  );
};

export default Title;
