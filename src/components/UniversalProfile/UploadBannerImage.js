import React, { useEffect, useState } from "react";
import defaultImage from "../../assets/lukso_main.png";
import { useProfileContext } from "../../contexts/ProfileContext";

const UploadBannerImage = ({ id, currentImage }) => {
  const { setPendingProfileJSONMetadata } = useProfileContext();
  const [image, setImage] = useState({ preview: "", raw: "" });

  const handleChange = e => {
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
      setPendingProfileJSONMetadata(current => ({ ...current, backgroundImage: e.target.files[0] })); //temporarily set background image to actual file - handle metadata formatting when user commits change
    }
  };

  return (
    <div className="flex flex-row justify-center">
      <label htmlFor={id}>
        {!image.preview &&
          (currentImage ? (
            <img src={currentImage || defaultImage} className="max-h-full cursor-pointer" alt="Banner Image" />
          ) : (
            <div className="flex flex-col items-center text-center text-7xl text-blue-500 p-4">
              <div className="text-sm">Upload Banner Image</div>
            </div>
          ))}
        {image.preview && <img src={image.preview} className="max-h-full cursor-pointer" alt="Banner Image" />}
      </label>
      <input id={id} type="file" className="hidden h-0" onChange={handleChange} />
    </div>
  );
};

export default UploadBannerImage;
