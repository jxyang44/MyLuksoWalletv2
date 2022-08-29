import swal from "sweetalert";

export const enterPrivateKey = (inputMessage,functionCall,successMessage) => {
  swal(
    `Hackathon Note: Manual input of a private key is not safe. \nWe are working to move this feature to the backend. 👷`,
    inputMessage,
    {
      content: "input",
      button: true,
    }
  )
    .then(value => {
      if (value) {
        functionCall.then(res => {
          if (res)
            swal(successMessage, "", "success");
        });
      } else {
        swal("No input detected.");
      }
    })
    .catch(() => {
      swal("Something went wrong.", "Please try again later.", "warning");
    });
};
