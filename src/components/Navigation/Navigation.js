import React from "react";

const Navigation = ({ onRouteChange, isSignedIn, logUserOut }) => {
  if (isSignedIn) {
    return (
      <nav style={{ display: "flex", justifyContent: "flex-end" }}>
        <p
          onClick={() => {
            onRouteChange("signin");
            logUserOut();
          }}
          className="pointer underline pa3"
        >
          Sign Out
        </p>
      </nav>
    );
  } else {
    return (
      <nav style={{ display: "flex", justifyContent: "flex-end" }}>
        <p
          onClick={() => onRouteChange("signin")}
          className="pointer underline pa3"
        >
          Sign In
        </p>
        <p
          onClick={() => onRouteChange("register")}
          className="pointer underline pa3"
        >
          Register
        </p>
      </nav>
    );
  }
};

export default Navigation;
