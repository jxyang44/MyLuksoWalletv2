import React from "react";

const FeaturedVaults = ({ title, featuredItems }) => {
  return (
    <div className="flex w-full flex-col justify-start gap-4">
      <div className="text-2xl font-bold xl:text-3xl">{title}</div>
      <div>
        <div className="flex flex-wrap justify-start gap-12">
          {featuredItems.map((vault, i) => {
            return <FeaturedVaultCard name={vault.name} description={vault.description} vaultId={vault.vaultId} image={vault.image} />;
          })}
        </div>
      </div>
    </div>
  );
};

const FeaturedVaultCard = ({ name, description, vaultId, image }) => {
  return (
    <button className="flex aspect-[9/11] w-[400px] flex-col items-center rounded-xl shadow-xl transition hover:border-sky-500/10 hover:shadow-sky-500/10 hover:scale-105">
      <img src={image} className="h-3/4 w-full rounded-t-xl  object-cover" />
      <div className="p-2 w-full bg-gradient-to-b from-slate-700 to-slate-800 hover:bg-gradient-to-br rounded-b-xl flex-grow">
        <div className="font my-4 mt-2 text-2xl font-semibold">{name}</div>
        <div className="text-lg text-slate-400">{description}</div>
      </div>
    </button>
  );
};

export default FeaturedVaults;
