import React, { useEffect } from "react";
import { ButtonShadow, UpdateProfile, FormContainer } from "../../components";
import { useProfileContext } from "../../contexts/ProfileContext";
import { useStateContext } from "../../contexts/StateContext";

const ProfileThemesForm = () => {
  const { setPendingProfileJSONMetadata } = useProfileContext();
  const { theme, setTheme, UPColor, setUPColor, UPTextColor, setUPTextColor } = useStateContext();
  
  useEffect(() => {
    setPendingProfileJSONMetadata(current => ({ ...current, MLWTheme: theme, MLWUPColor: UPColor, MLWUPTextColor: UPTextColor }));
  }, [theme, UPColor, UPTextColor]);

  const setToDefault = async () => {
    setTheme("slate");
    setUPColor("#FFFFFF");
    setUPTextColor("#000000");
  };

  return (
    <FormContainer title={"Profile Themes"} subtitle={"Settings will be uploaded to the blockchain"} mainOverride={"w-[50vw]"}>
      <div className="flex flex-row items-center mb-4 justify-between h-8">
        <div className=" text-white font-semibold">Theme Settings</div> 
        <select
          value={theme}
          onChange={e => setTheme(e.target.value)}
          className={`shadow appearance-none border rounded py-2 px-3 bg-transparent text-white leading-tight focus:outline-none focus:shadow-outline mb-4`}>
          <option className="bg-slate-600" value="slate">
            slate
          </option>
          <option className="bg-gray-600" value="gray">
            gray
          </option>
          <option className="bg-zinc-600" value="zinc">
            zinc
          </option>
          <option className="bg-neutral-600" value="neutral">
            neutral
          </option>
          <option className="bg-stone-600" value="stone">
            stone
          </option>
          <option className="bg-red-600" value="red">
            red
          </option>
          <option className="bg-orange-600" value="orange">
            orange
          </option>
          <option className="bg-amber-600" value="amber">
            amber
          </option>
          <option className="bg-yellow-600" value="yellow">
            yellow
          </option>
          <option className="bg-lime-600" value="lime">
            lime
          </option>
          <option className="bg-green-600" value="green">
            green
          </option>
          <option className="bg-emerald-600" value="emerald">
            emerald
          </option>
          <option className="bg-teal-600" value="teal">
            teal
          </option>
          <option className="bg-cyan-600" value="cyan">
            cyan
          </option>
          <option className="bg-sky-600" value="sky">
            sky
          </option>
          <option className="bg-indigo-600" value="indigo">
            indigo
          </option>
          <option className="bg-violet-600" value="violet">
            violet
          </option>
          <option className="bg-purple-600" value="purple">
            purple
          </option>
          <option className="bg-pink-600" value="pink">
            pink
          </option>
          <option className="bg-rose-600" value="rose">
            rose
          </option>
        </select>
      </div>
      <div className="flex flex-row items-center mb-4 justify-between h-8">
        <div className=" text-white font-semibold">Universal Profile Color</div>
        <input type="color" value={UPColor} onChange={e => setUPColor(e.target.value)} className="h-9 w-20 rounded bg-transparent"></input>
      </div>
      <div className="flex flex-row items-center mb-4 justify-between h-8">
        <div className=" text-white font-semibold">Universal Profile Text Color</div>
        <input type="color" value={UPTextColor} onChange={e => setUPTextColor(e.target.value)} className="h-9 w-20 rounded bg-transparent"></input>
      </div>

      <div className="flex items-center justify-between mt-8">
        <ButtonShadow buttonText={"Reset"} buttonFunc={setToDefault} buttonColor={"bg-gray-700"} buttonTextColor={"white"} />
        <UpdateProfile />
      </div>
    </FormContainer>
  );
};

export default ProfileThemesForm;
