import React from "react";
import { useProfileContext } from "../../contexts/ProfileContext";
import { EditText } from "react-edit-text";
import { RiDeleteBackLine, RiAddLine } from "react-icons/ri";

const ProfileLinks = ({ editMode }) => {
  const { pendingProfileJSONMetadata, setPendingProfileJSONMetadata } = useProfileContext();
  return (
    <div className="flex flex-row text-sm mb-4 items-center justify-between text-center gap-2 border-2 rounded-2xl bg-slate-800 bg-opacity-50 py-3 px-2">
      <div className="text-base text-white">
        Links <span className="italic font-semibold">({pendingProfileJSONMetadata.links.length || 0}):</span>
      </div>
      {pendingProfileJSONMetadata.links.length > 0 && (
        <div className="flex flex-col italic text-normal text-white w-[350px]">
          {pendingProfileJSONMetadata.links.map((link, index) => {
            return editMode ? (
              <div className="flex flex-row items-center gap-1" key={link + index}>
                <EditText
                  defaultValue={link.title}
                  inputClassName="bg-success"
                  placeholder="link title"
                  value={pendingProfileJSONMetadata.links[index].title}
                  onChange={e => {
                    const tempLinks = [...pendingProfileJSONMetadata.links];
                    tempLinks.splice(index, 1, { title: e.target.value, url: tempLinks[index].url });
                    setPendingProfileJSONMetadata(current => ({ ...current, links: tempLinks }));
                  }}
                  style={{
                    borderTopLeftRadius: "9999px",
                    borderBottomLeftRadius: "9999px",
                    fontSize: "0.875rem",
                    lineHeight: "0.875rem",
                    width: "6vmax",
                    backgroundColor: "#9ca3af",
                    padding: "0.375rem",
                    textOverflow: "ellipsis",
                    whiteSpace: "nowrap",
                    overflow: "hidden",
                  }}
                />
                <EditText
                  defaultValue={link.url}
                  inputClassName="bg-success"
                  placeholder="link url"
                  value={pendingProfileJSONMetadata.links[index].url}
                  onChange={e => {
                    const tempLinks = [...pendingProfileJSONMetadata.links];
                    tempLinks.splice(index, 1, { title: tempLinks[index].title, url: e.target.value });
                    setPendingProfileJSONMetadata(current => ({ ...current, links: tempLinks }));
                  }}
                  style={{
                    color: "#3b82f6",
                    fontSize: "0.875rem",
                    lineHeight: "0.875rem",
                    width: "10vmax",
                    backgroundColor: "#9ca3af",
                    padding: "0.375rem",
                    textOverflow: "ellipsis",
                    whiteSpace: "nowrap",
                    overflow: "hidden",
                  }}
                />
                <button
                  className="bg-[#9ca3af] p-1.5 rounded-r-full hover:text-red-600"
                  onClick={() => {
                    const tempLinks = [...pendingProfileJSONMetadata.links];
                    tempLinks.splice(index, 1);
                    setPendingProfileJSONMetadata(current => ({ ...current, links: tempLinks }));
                  }}>
                  <RiDeleteBackLine />
                </button>
              </div>
            ) : (
              <a href={pendingProfileJSONMetadata.links[index].url} className="text-lg not-italic z-50 text-left text-blue-500 hover:text-blue-300" rel="noreferrer" target="_blank">{pendingProfileJSONMetadata.links[index].title}</a>
            );
          })}
        </div>
      )}

      {(pendingProfileJSONMetadata.links.length < 5 && editMode) && (
        <button
          className="text-lg bg-[#9ca3af] p-1.5 rounded-full hover:contrast-150"
          onClick={() =>
            setPendingProfileJSONMetadata(current => ({ ...current, links: [...current.links, { title: "new title", url: "new url" }] }))
          }>
          <RiAddLine />
        </button>
      )}
    </div>
  );
};

export default ProfileLinks;
