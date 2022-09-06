//component to upload banner image
//TO-DO allow for url as well as drive

import React, { useState } from "react";
import defaultImage from "../../assets/Logos/MLWlogocolor500.png";
import { useProfileContext } from "../../contexts/ProfileContext";

const UploadBannerImage = ({ id, currentImage }) => {
  const { setPendingProfileJSONMetadata } = useProfileContext();
  const [image, setImage] = useState({ preview: "", raw: "" });

  const handleChange = (e) => {
    // swal({
    //   title: "Upload from drive or URL?",
    //   buttons: {
    //     cancel: true,
    //     drive: {
    //       text: "Drive",
    //       value: "drive",
    //     },
    //     url: {
    //       text: "URL",
    //       value: "url",
    //     }
    //   },
    // })
    // .then((value) => {
    //   if(value==="drive") {

    //   }
    // })

    if (e.target.files.length) {
      setImage({
        preview: URL.createObjectURL(e.target.files[0]),
        raw: e.target.files[0],
      });
      setPendingProfileJSONMetadata((current) => ({
        ...current,
        backgroundImage: e.target.files[0],
      })); //temporarily set background image to actual file - lspfactory formats when user commits change
    }
  };

  return (
    <div className="flex flex-row justify-center">
      <label htmlFor={id}>
        {!image.preview && //if no metadata, then use current uploaded image, or lukso logo if no current image
          (currentImage ? (
            <img
              src={currentImage || defaultImage}
              className="max-h-full cursor-pointer"
              alt="Banner Image"
            />
          ) : (
            //if current image is not passed in props, use default text
            <div className="flex flex-col items-center p-4 text-center text-7xl brightness-200">
              <div className="text-base">Upload Banner Image</div>
            </div>
          ))}
        {image.preview && (
          <img
            src={image.preview}
            className="max-h-full cursor-pointer"
            alt="Banner Image"
          />
        )}{" "}
        {/* metadata found use this image */}
      </label>
      <input
        id={id}
        type="file"
        className="hidden h-0"
        onChange={handleChange}
      />
    </div>
  );
};

export default UploadBannerImage;
