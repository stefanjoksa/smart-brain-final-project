import React from "react";
import Navigation from "./components/Navigation/Navigation";
import Logo from "./components/Logo/Logo";
import ImageLinkForm from "./components/ImageLinkForm/ImageLinkForm";
import Rank from "./components/Rank/Rank";
import FaceRecognition from "./components/FaceRecognition/FaceRecognition";
import Particles from "./components/Particles/Particles";
import Signin from "./components/Signin/Signin";
import Register from "./components/Register/Register";
import "./App.css";
import "tachyons";
import { useState } from "react";

function App() {
  const [input, setInput] = useState();
  const [imageUrl, setImageUrl] = useState();
  const [box, setBox] = useState({});
  const [route, setRoute] = useState("signin");
  const [isSignedIn, setIsSignedIn] = useState(false);
  const [user, setUser] = useState({
    id: "",
    name: "",
    email: "",
    entries: 0,
    joined: new Date(),
  });

  const loadUser = (data) => {
    setUser({
      id: data.id,
      name: data.name,
      email: data.email,
      entries: data.entries,
      joined: data.joined,
    });
  };

  const logUserOut = () => {
    setUser({});
    setInput();
    setImageUrl();
  };

  const onInputChange = (event) => {
    setInput(event.target.value);
  };

  const onButtonSubmit = () => {
    if (!input) {
      setImageUrl();
      return;
    }
    const image = document.getElementById("inputImage");
    const width = Number(image.width);
    const height = Number(image.height);
    setImageUrl(input);

    fetch("http://localhost:3000/imageurl", {
      method: "post",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        input: input,
      }),
    })
      .then((response) => response.json())
      .then((result) => {
        if (result) {
          fetch("http://localhost:3000/image", {
            method: "put",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
              id: user.id,
            }),
          })
            .then((response) => response.json())
            .then((count) => {
              setUser((prevUser) => ({
                ...prevUser,
                entries: count.entries,
              }));
            });
        }
        const regions = result.outputs[0].data.regions;
        // console.log(result);

        regions.forEach((region) => {
          // Accessing and rounding the bounding box values
          const boundingBox = region.region_info.bounding_box;
          const topRow = boundingBox.top_row * height;
          const leftCol = boundingBox.left_col * width;
          const bottomRow = height - boundingBox.bottom_row * height;
          const rightCol = width - boundingBox.right_col * width;

          setBox({
            topRow,
            leftCol,
            bottomRow,
            rightCol,
          });
        });
      })
      .catch((error) => console.log("error", error));
    // console.log("click");
  };

  const onRouteChange = (route) => {
    if (route === "signin") {
      setIsSignedIn(false);
    } else if (route === "home") {
      setIsSignedIn(true);
    }
    setRoute(route);
  };

  return (
    <div className="App">
      <Particles className="particles" />
      <Navigation
        logUserOut={logUserOut}
        isSignedIn={isSignedIn}
        onRouteChange={onRouteChange}
      />
      {route === "signin" ? (
        <Signin loadUser={loadUser} onRouteChange={onRouteChange} />
      ) : route === "home" ? (
        <div>
          <Logo />
          <Rank name={user.name} entries={user.entries} />
          <ImageLinkForm
            onInputChange={onInputChange}
            onButtonSubmit={onButtonSubmit}
          />
          <FaceRecognition box={box} setBox={setBox} imageUrlProp={imageUrl} />
        </div>
      ) : (
        <Register loadUser={loadUser} onRouteChange={onRouteChange} />
      )}
    </div>
  );
}

export default App;
