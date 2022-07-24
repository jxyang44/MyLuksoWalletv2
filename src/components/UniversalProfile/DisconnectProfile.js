import React from 'react'
import swal from 'sweetalert';
import {Button_Shadow} from '..'
import {useProfileContext} from '../../contexts/ProfileContext';
import {useStateContext} from '../../contexts/StateContext';
import {toast} from 'react-toastify';

const DisconnectProfile = () => {
    const {setActiveProfile} = useStateContext();
    const {disconnectUPExtension, profileJSONMetadata, pendingProfileJSONMetadata} = useProfileContext();
    const handleDisconnect = () => {
        if(JSON.stringify(pendingProfileJSONMetadata)!==JSON.stringify(profileJSONMetadata)){
          swal({
            title: "You have unsaved edits to your Universal Profile. Are you sure you want to disconnect?",
            buttons: [true, "Yes"],
            dangerMode: true,
          })
          .then((value) => {
            if(value){
              disconnectUPExtension();
              setActiveProfile(false);
              toast("Hello")
              swal(
                {title:"Goodbye👋",
                  text: "You have disconnected from MyLuksoWallet.",
                timer: 2000})
            }
          });
        }
        else{
            disconnectUPExtension();
            setActiveProfile(false);
            swal(
              {
                title:"Goodbye👋",
                text: "You have disconnected from MyLuksoWallet.",
                buttons: false,
              timer: 2000})
        } 
      }
    return (
      <Button_Shadow buttonText={"Disconnect Profile"} buttonFunc={handleDisconnect} buttonColor={"bg-slate-500"} buttonTextColor ={"text-red-500"}/>
    )
}

export default DisconnectProfile