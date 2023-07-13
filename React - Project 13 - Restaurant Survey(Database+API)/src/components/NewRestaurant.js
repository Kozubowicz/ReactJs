import React, { useRef, useState } from "react";

export default function NewRestaurant() {
  const rerestaurantRef = useRef();
  const logoURLRef = useRef();
  const [successFlag, setSuccessFlag] = useState("");

  const prepareRestaurant = () => {
    if (rerestaurantRef.current.value.length > 2 && logoURLRef.current.value.length > 2) {
      const restaurant = {
        restaurantName: rerestaurantRef.current.value,
        logoURL: logoURLRef.current.value,
      };
      console.log(restaurant);
      sendData(restaurant);
    } else {
      console.log("Enter fields values");
    }
  };

  const sendData = async (surveyData) => {
    try {
      const response = await fetch(
        "https://us-east-1.aws.data.mongodb-api.com/app/application-0-atwfg/endpoint/api/NewRestaurant",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(surveyData),
        }
      );

      if (response.ok) {
        const data = await response.json();
        console.log("Success:", data);

        logoURLRef.current.value = "";
        rerestaurantRef.current.value = "";
        setSuccessFlag(true);
      } else {
        setSuccessFlag(false);
        throw new Error("Request failed");
      }
    } catch (error) {
      console.error("Error:", error.message);
    }
  };

  return (
    <div>
      <div className="newRestaurantContainer">
        <div className="newRestaurantSecondaryContainer">
          <label>Restaurant Name:</label>
          <input type="text" ref={rerestaurantRef}></input>
        </div>
        <div className="newRestaurantSecondaryContainer">
          <label>logoURL:</label>
          <input type="text" ref={logoURLRef}></input>
        </div>
        <div className="sendButtonContainer">
          {successFlag === true ? (
            <p className="successSending">Sucess</p>
          ) : successFlag === false ? (
            <p className="failureSending">Failure</p>
          ) : (
            <div></div>
          )}
          <button className="sendButton" onClick={() => prepareRestaurant()}>
            Add restaurant
          </button>
        </div>
      </div>
    </div>
  );
}
