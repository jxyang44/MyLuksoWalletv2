import React from "react";
import { useProfileContext } from "../../contexts/ProfileContext";
import { EditText } from "react-edit-text";
import { RiDeleteBackLine, RiAddLine } from "react-icons/ri";

const ProfileTags = () => {
  const { pendingProfileJSONMetadata, setPendingProfileJSONMetadata } = useProfileContext();
  return (
    <div className="flex flex-row text-sm mb-4 items-center justify-between text-center gap-1 border-2 rounded-2xl bg-slate-800 bg-opacity-50 py-3 px-2">
      <div className="text-base  w-22">
        Tags <span className="italic font-semibold">({pendingProfileJSONMetadata.tags.length || 0}):</span>
      </div>
      {pendingProfileJSONMetadata.tags.length > 0 && (
        <div className="flex flex-row flex-wrap justify-start gap-2 italic text-normal text-white w-[350px]">
          {pendingProfileJSONMetadata.tags.map((tag, index) => {
            return (
              <div className="flex flex-row items-center gap-1" key={tag + index}>
                <EditText //TO-DO why is this only allowing 1 letter a time...
                  defaultValue={tag}
                  inputClassName="bg-success"
                  placeholder="#tag"
                  value={pendingProfileJSONMetadata.tags[index]}
                  onChange={e => {
                    const tempTags = [...pendingProfileJSONMetadata.tags];
                    tempTags[index] = e.target.value;
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
                <button
                  className="bg-[#9ca3af] p-1.5 rounded-r-full hover:text-red-600"
                  onClick={() => {
                    const tempTags = [...pendingProfileJSONMetadata.tags];
                    tempTags.splice(index, 1);
                    setPendingProfileJSONMetadata(current => ({ ...current, tags: tempTags }));
                  }}>
                  <RiDeleteBackLine />
                </button>
              </div>
            );
          })}
        </div>
      )}

      {pendingProfileJSONMetadata.tags.length < 12 && (
        <button
          className="text-lg bg-[#9ca3af] p-1.5 rounded-full hover:text-blue-400"
          onClick={() => setPendingProfileJSONMetadata(current => ({ ...current, tags: [...current.tags, "new tag"] }))}>
          <RiAddLine />
        </button>
      )}
    </div>
  );
};

export default ProfileTags;
