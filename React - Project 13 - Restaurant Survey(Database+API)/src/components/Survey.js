import React, { useState, useEffect } from "react";
import { FaStar } from "react-icons/fa";
import NewRestaurant from "./NewRestaurant";

export default function Survey() {
  const [data, setData] = useState("");

  const [restaurant, setRestaurant] = useState("");

  const [rating, setRating] = useState(0);

  const [starFlag, setStarFlag] = useState("");
  const stars = [1, 2, 3, 4, 5, 6];
  const [review, setReview] = useState("");

  const [successFlag, setSuccessFlag] = useState("");

  useEffect(() => {
    const fetchRestaurantsList = async () => {
      try {
        const response = await fetch(
          "https://us-east-1.aws.data.mongodb-api.com/app/application-0-atwfg/endpoint/api/RestaurantsList"
        );
        if (response.ok) {
          const d = await response.json();
          setData(d);
          console.log(d);
        } else {
          console.error("Request failed");
        }
      } catch (error) {
        console.error("Error:", error.message);
      }
    };

    fetchRestaurantsList();
  }, []);

  const prepareSurvey = () => {
    if (rating > 0) {
      if (restaurant) {
        let survey;
        if (review.length > 0) {
          survey = { restaurant: restaurant, rating: rating, review: review };
        } else {
          survey = { restaurant: restaurant, rating: rating };
        }
        setStarFlag(false);
        console.log(survey);
        sendData(survey);
      }
    } else {
      setStarFlag(true);
    }
  };

  const sendData = async (surveyData) => {
    try {
      const response = await fetch(
        "https://us-east-1.aws.data.mongodb-api.com/app/application-0-atwfg/endpoint/api/NewSurvey",
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
        setReview("");
        setRating(0);
        setRestaurant("");
        setStarFlag("");
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
    <div className="surveyContainer">
      <select value={restaurant} onChange={(e) => setRestaurant(e.target.value)}>
        <option value="" disabled>
          Select restaurant...
        </option>
        {data &&
          data.map((e) => (
            <option key={e.restaurantName} value={e.restaurantName}>
              {e.restaurantName}
            </option>
          ))}
      </select>

      <div className="ratingContainer">
        <label>Rating:</label>
        {stars.map((e) => {
          return (
            <button
              className="starsButton"
              key={e}
              value={e}
              onClick={() => {
                setRating(e);
                setStarFlag(false);
              }}
            >
              <FaStar color={rating < e ? "grey" : "rgb(0, 255, 0)"} size={22} />
            </button>
          );
        })}
      </div>
      <label>Review:</label>
      <textarea value={review} onChange={(e) => setReview(e.target.value)} maxLength={500} />
      <span className="characterCount">{review.length}/500</span>

      <div className="sendButtonContainer">
        {successFlag === true ? (
          <p className="successSending">Sucess</p>
        ) : successFlag === false ? (
          <p className="failureSending">Failure</p>
        ) : (
          <div></div>
        )}
        <button className="sendButton" onClick={() => prepareSurvey()}>
          Send
        </button>
      </div>

      {starFlag !== true ? (
        <></>
      ) : (
        <div style={{ fontWeight: "bold", color: "red" }}>You have to set star rating!</div>
      )}

      {(starFlag === true || starFlag === false) && restaurant.length < 1 ? (
        <div style={{ fontWeight: "bold", color: "red" }}>You have to select restaurant</div>
      ) : (
        <></>
      )}

      <div className="restaurantsContainer">
        {data &&
          data.map((e) => {
            return (
              <img key={e.restaurantName} src={e.logoURL} alt={e} className="restaurantLogo" />
            );
          })}
      </div>
      <NewRestaurant />
    </div>
  );
}
