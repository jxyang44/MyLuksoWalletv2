//component to manage tags

import React from "react";
import { useProfileContext } from "../../contexts/ProfileContext";
import { EditText } from "react-edit-text";
import { RiDeleteBackLine, RiAddLine } from "react-icons/ri";

//@param editMode toggles between edit and view mode
const ProfileTags = ({ editMode }) => {
  const { pendingProfileJSONMetadata, setPendingProfileJSONMetadata } = useProfileContext();
  return (
    <div className="flex flex-row text-sm mb-4 items-center justify-between text-center gap-1 border-2 rounded-2xl bg-slate-800 bg-opacity-50 py-3 px-2">
      <div className={`text-base text-white`}>
        Tags <span className="italic font-semibold">({pendingProfileJSONMetadata.tags.length || 0}):</span>
      </div>
      {pendingProfileJSONMetadata.tags.length > 0 && (
        <div className="flex flex-row flex-wrap justify-start gap-2 italic text-normal text-white w-[350px]">
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
                    setPendingProfileJSONMetadata(current => ({ ...current, tags: tempTags }));
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
                  className="bg-[#9ca3af] p-1.5 rounded-r-full hover:text-red-600"
                  onClick={() => {
                    const tempTags = [...pendingProfileJSONMetadata.tags];
                    tempTags.splice(index, 1);
                    setPendingProfileJSONMetadata(current => ({ ...current, tags: tempTags }));
                  }}>
                  <RiDeleteBackLine />
                </button>
              </div>
            ) : (
              //edit mode is disabled - just show the tags
              <div key={tag + index} className="text-lg text-left z-50">
                #{pendingProfileJSONMetadata.tags[index]}
              </div>
            );
          })}
        </div>
      )}

      {pendingProfileJSONMetadata.tags.length < 12 &&
        editMode && ( //add new tag; cap at 12
          <button
            className="text-lg bg-[#9ca3af] p-1.5 rounded-full hover:contrast-150"
            onClick={() => setPendingProfileJSONMetadata(current => ({ ...current, tags: [...current.tags, "new tag"] }))}>
            <RiAddLine />
          </button>
        )}
    </div>
  );
};

export default ProfileTags;
