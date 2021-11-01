// import React, { useState, useEffect } from "react";
// import {
//   getFirestore,
//   collection,
//   getDocs,
//   getDoc,
//   doc,
//   setDoc,
// } from "firebase/firestore";
// import uniqid from "uniqid";

// const db = getFirestore();

// const storeFetchAsArray = (relativeImgData) => {
//   const dataHelper = [];
//   relativeImgData.forEach((doc) => {
//     dataHelper.push([doc.id, doc.data()]);
//   });
//   return dataHelper;
// };

// const HandleLocationData = async () => {
//   const id = uniqid();
//   const imgCollage = document.querySelector(`#img-collage`);
//   const getRelativeImgLocations = await getDocs(
//     collection(db, "relative-img-locations")
//   );
//   const relativeImgLocationArray = await storeFetchAsArray(
//     getRelativeImgLocations
//   );
//   const absoluteLocationData = await relativeImgLocationArray.map((target) => {
//     return {
//       park: target[0],
//       minX: target[1].offsetLeft * imgCollage.width + imgCollage.offsetLeft,
//       minY: target[1].offsetTop * imgCollage.height + imgCollage.offsetTop,
//       maxX:
//         target[1].offsetLeft * imgCollage.width +
//         imgCollage.offsetLeft +
//         target[1].width * imgCollage.width,
//       maxY:
//         target[1].offsetTop * imgCollage.height +
//         imgCollage.offsetTop +
//         target[1].height * imgCollage.height,
//     };
//   });
//   await setDoc(doc(db, "absolute-img-locations", id), { absoluteLocationData });
// };

// // const setAbsoluteTargetLocations = async () => {
// //   console.log(`firestore: set absolute locations`);
// //   const imgCollage = document.querySelector(`#img-collage`);

// //   // BEGIN - restructured data with a uniqid to identify each user's unique absoluteLocationData
// //   const id = uniqid();
// //   const absoluteData = await relativeLocationData.map((target) => {
// //     return {
// //       park: target[0],
// //       minX: target[1].offsetLeft * imgCollage.width + imgCollage.offsetLeft,
// //       minY: target[1].offsetTop * imgCollage.height + imgCollage.offsetTop,
// //       maxX:
// //         target[1].offsetLeft * imgCollage.width +
// //         imgCollage.offsetLeft +
// //         target[1].width * imgCollage.width,
// //       maxY:
// //         target[1].offsetTop * imgCollage.height +
// //         imgCollage.offsetTop +
// //         target[1].height * imgCollage.height,
// //     };
// //   });
// //   await setDoc(doc(db, "absolute-img-locations", id), { absoluteData });
// // };

// export default HandleLocationData;
