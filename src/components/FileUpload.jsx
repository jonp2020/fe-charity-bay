// import React, { Component } from "react";
// import axios from "axios";
// import Resizer from "react-image-file-resizer";
// class FileUpload extends Component {
//   state = {
//     file: null,
//     thumbnailImage: {},
//     fullsizeImage: {},
//     imagesSent: false,
//   };
//   resizeThumbnailFile = (file) =>
//     new Promise((resolve) => {
//       Resizer.imageFileResizer(
//         file,
//         300,
//         300,
//         "JPEG",
//         80,
//         0,
//         (uri) => {
//           resolve(uri);
//         },
//         "base64"
//       );
//     });
//   dataURLtoFile(dataurl, filename) {
//     var arr = dataurl.split(","),
//       mime = arr[0].match(/:(.*?);/)[1],
//       bstr = atob(arr[1]),
//       n = bstr.length,
//       u8arr = new Uint8Array(n);

//     while (n--) {
//       u8arr[n] = bstr.charCodeAt(n);
//     }

//     return new File([u8arr], filename, { type: mime });
//   }
//   render() {
//     return (
//       <>
//         const {(imagesSent, thumbnailImage, fullsizeImage)} = this.state;
       
//           <label>Upload file</label>
//           <input
//             type="file"
//             onChange={(event) => {
//               this.setState({ file: event.target.files });
//             }}
//           />
//       </>
//     );
//   }
// }

// export default FileUpload;
