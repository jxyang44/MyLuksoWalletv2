//component to manage user website/links

import React from "react";
import { useProfileContext } from "../../contexts/ProfileContext";
import { EditText } from "react-edit-text";
import { RiDeleteBackLine, RiAddLine } from "react-icons/ri";

//@param editMode toggles between edit and view mode
const ProfileLinks = ({ editMode }) => {
  const { pendingProfileJSONMetadata, setPendingProfileJSONMetadata } =
    useProfileContext();
  return (
    <div className="mb-4 flex flex-row items-center justify-between gap-2 rounded-2xl border-2 bg-slate-800 bg-opacity-50 py-3 px-2 text-center text-sm">
      <div className="text-base text-white">
        Links{" "}
        <span className="font-semibold italic">
          ({pendingProfileJSONMetadata.links.length || 0}):
        </span>
      </div>
      {pendingProfileJSONMetadata.links.length > 0 && (
        <div className="text-normal flex w-[350px] flex-col italic text-white">
          {pendingProfileJSONMetadata.links.map((link, index) => {
            return editMode ? ( //edit mode is enabled
              <div
                className="flex flex-row items-center gap-1"
                key={link + index}
              >
                <EditText //enable edit box for link title
                  defaultValue={link.title}
                  inputClassName="bg-success"
                  placeholder="link title"
                  value={pendingProfileJSONMetadata.links[index].title}
                  onChange={(e) => {
                    const tempLinks = [...pendingProfileJSONMetadata.links];
                    tempLinks.splice(index, 1, {
                      title: e.target.value,
                      url: tempLinks[index].url,
                    });
                    setPendingProfileJSONMetadata((current) => ({
                      ...current,
                      links: tempLinks,
                    }));
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
                <EditText //enable edit box for link url
                  defaultValue={link.url}
                  inputClassName="bg-success"
                  placeholder="link url"
                  value={pendingProfileJSONMetadata.links[index].url}
                  onChange={(e) => {
                    const tempLinks = [...pendingProfileJSONMetadata.links];
                    tempLinks.splice(index, 1, {
                      title: tempLinks[index].title,
                      url: e.target.value,
                    });
                    setPendingProfileJSONMetadata((current) => ({
                      ...current,
                      links: tempLinks,
                    }));
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
                <button //button to remove the link
                  className="rounded-r-full bg-[#9ca3af] p-1.5 hover:text-red-600"
                  onClick={() => {
                    const tempLinks = [...pendingProfileJSONMetadata.links];
                    tempLinks.splice(index, 1);
                    setPendingProfileJSONMetadata((current) => ({
                      ...current,
                      links: tempLinks,
                    }));
                  }}
                >
                  <RiDeleteBackLine />
                </button>
              </div>
            ) : (
              <a //edit mode is disabled - just show title and href to url
                key={link + index}
                href={pendingProfileJSONMetadata.links[index].url}
                className="z-50 text-left text-lg not-italic text-blue-500 hover:text-blue-300"
                rel="noreferrer"
                target="_blank"
              >
                {pendingProfileJSONMetadata.links[index].title}
              </a>
            );
          })}
        </div>
      )}

      {pendingProfileJSONMetadata.links.length < 5 &&
        editMode && ( //add new link; cap at 5
          <button
            className="rounded-full bg-[#9ca3af] p-1.5 text-lg hover:contrast-150"
            onClick={() =>
              setPendingProfileJSONMetadata((current) => ({
                ...current,
                links: [
                  ...current.links,
                  { title: "new title", url: "new url" },
                ],
              }))
            }
          >
            <RiAddLine />
          </button>
        )}
    </div>
  );
};

export default ProfileLinks;
