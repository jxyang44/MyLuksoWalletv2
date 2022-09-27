//component to manage tags

import React from "react";
import { useProfileContext } from "../../contexts/ProfileContext";
import { EditText } from "react-edit-text";
import { RiDeleteBackLine, RiAddLine } from "react-icons/ri";
import { useStateContext } from "../../contexts/StateContext";
//@param editMode toggles between edit and view mode
const ProfileTags = ({ editMode }) => {
  const { UPTextColor } = useStateContext();
  const { pendingProfileJSONMetadata, setPendingProfileJSONMetadata } = useProfileContext();
  const borderStyle = {
    borderColor: UPTextColor ?? "#DDDDDD",
    boxShadow: `0px 2px 4px -1px ${UPTextColor ?? "#000000"}`,
  };
  return (
    <div
      className={`mb-4 flex flex-row items-center ${
        editMode ? "justify-between gap-1" : "justify-start gap-6"
      } rounded-2xl border-2 bg-slate-800 bg-opacity-50 py-3 px-2 text-center text-sm`}
      style={borderStyle}>
      <div className={`text-base text-white`}>
        Tags <span className="font-semibold italic">({pendingProfileJSONMetadata.tags.length || 0}):</span>
      </div>
      {pendingProfileJSONMetadata.tags.length > 0 && (
        <div className="text-normal flex w-[350px] flex-row flex-wrap justify-start gap-2 italic text-white">
          {pendingProfileJSONMetadata.tags.map((tag, index) => {
            return editMode ? ( //edit mode is enabled
              <div className="flex flex-row items-center gap-1" key={tag + index}>
                <EditText //enable edit box for tags
                  defaultValue={tag}
                  inputClassName="bg-success"
                  placeholder="#tag"
                  onSave={e => {
                    console.log(e);
                    const tempTags = [...pendingProfileJSONMetadata.tags];
                    tempTags[index] = e.value;
                    setPendingProfileJSONMetadata(current => ({
                      ...current,
                      tags: tempTags,
                    }));
                  }}
                  style={{
                    borderTopLeftRadius: "9999px",
                    borderBottomLeftRadius: "9999px",
                    fontSize: "0.875rem",
                    lineHeight: "0.875rem",
                    minWidth: "1.25vmax",
                    maxWidth: "16vmax",
                    backgroundColor: "#9ca3af",
                    padding: "0.375rem",
                  }}
                />
                <button //button to remove the tag
                  className="rounded-r-full bg-[#9ca3af] p-1.5 hover:text-red-600"
                  onClick={() => {
                    const tempTags = [...pendingProfileJSONMetadata.tags];
                    tempTags.splice(index, 1);
                    setPendingProfileJSONMetadata(current => ({
                      ...current,
                      tags: tempTags,
                    }));
                  }}>
                  <RiDeleteBackLine />
                </button>
              </div>
            ) : (
              //edit mode is disabled - just show the tags
              <div key={tag + index} className="z-50 text-left text-lg">
                #{pendingProfileJSONMetadata.tags[index]}
              </div>
            );
          })}
        </div>
      )}

      {pendingProfileJSONMetadata.tags.length < 12 &&
        editMode && ( //add new tag; cap at 12
          <button
            className="rounded-full bg-[#9ca3af] p-1.5 text-lg hover:contrast-150"
            onClick={() =>
              setPendingProfileJSONMetadata(current => ({
                ...current,
                tags: [...current.tags, "new tag"],
              }))
            }>
            <RiAddLine />
          </button>
        )}
    </div>
  );
};

export default ProfileTags;
