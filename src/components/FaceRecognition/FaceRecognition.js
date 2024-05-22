import React from "react";
import "./FaceRecognition.css";

const FaceRecognition = ({ imageUrlProp, box, setBox }) => {
  // const onImageLoad = () => {
  //   const image = document.getElementById("inputImage");
  //   const width = Number(image.width);
  //   const height = Number(image.height);

  //   const updatedBox = {
  //     topRow: box.topRow * height,
  //     leftCol: box.leftCol * width,
  //     bottomRow: height - box.bottomRow * height,
  //     rightCol: width - box.rightCol * width,
  //   };

  //   setBox(updatedBox);
  // };
  return (
    <div className="center ma">
      <div className="absolute mt2">
        <img
          id="inputImage"
          src={imageUrlProp}
          alt=""
          width="500px"
          height="auto"
          // onLoad={onImageLoad}
        />

        <div
          className="faceBox"
          style={{
            top: box.topRow,
            left: box.leftCol,
            bottom: box.bottomRow,
            right: box.rightCol,
          }}
        ></div>
      </div>
    </div>
  );
};

export default FaceRecognition;
