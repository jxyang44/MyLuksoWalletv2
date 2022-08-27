//component to upload profile image
//TO-DO allow for url as well as drive

import React, { useEffect, useState } from "react";
import { RiUserSearchLine } from "react-icons/ri";
import defaultImage from "../../assets/Logos/MLWlogocolor500.png";
import { useProfileContext } from "../../contexts/ProfileContext";
import swal from "sweetalert";
const UploadProfileImage = ({ id, currentImage }) => {
  const { setPendingProfileJSONMetadata } = useProfileContext();

  const [image, setImage] = useState({ preview: "", raw: "" });

  useEffect(() => {}, []);

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
      setPendingProfileJSONMetadata(current => ({ ...current, profileImage: e.target.files[0] })); //temporarily set profile image to actual file - handle metadata formatting when user commits change
    }
  };

  return (
    <div>
      <label htmlFor={id}>
        {!image.preview &&
          (currentImage ? (
            <img src={currentImage || defaultImage} className="rounded-full  cursor-pointer" alt="Profile Image" />
          ) : (
            <div className="flex flex-col items-center text-center text-7xl text-blue-500 p-4">
              <RiUserSearchLine />
              <div className="text-sm">Upload Profile Image</div>
            </div>
          ))}
        {image.preview && <img src={image.preview} className="rounded-full  cursor-pointer" alt="Profile Image" />}
      </label>
      <input id={id} type="file" className="hidden h-0" onChange={handleChange} />
    </div>
  );
};

export default UploadProfileImage;
