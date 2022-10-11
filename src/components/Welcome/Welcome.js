import classes from "./Welcome.module.css";
import InputForm from "./InputForm";
import AuthContext from "../../Store/AuthContext";

import { useState, useContext } from "react";
let collectedData = {
  email: "",
  name: "",
  image: "",
};
const Welcome = () => {
  const [isUpdate, setIsUpdate] = useState(false);
  const authCntxt = useContext(AuthContext);
  const idToken = localStorage.getItem("tokenET");

  const profileUpdateHandler = () => {
    fetch(
      "https://identitytoolkit.googleapis.com/v1/accounts:update?key=AIzaSyDBDNLlgXE3aUD1Tkn4aG-tSIbGYJlUEjc",
      {
        method: "POST",
        body: JSON.stringify({
          idToken: idToken,
          displayName: "Navira",
          photoUrl:
            "https://drive.google.com/file/d/0BzVIASLRqKJoU3VuOGk5bFhMcFdHdWw3a2xWY29IMnFfaWpJ/view?usp=sharing&resourcekey=0-Dh5bKCEM7cnoanW_umVK9g",
          returnSecureToken: true,
        }),
        headers: {
          "Content-Type": "application/json",
        },
      }
    )
      .then((res) => {
        if (res.ok) {
          return res.json();
        } else {
          return res.json().then((data) => {
            let errorMessage = "Authentication Failed";
            if (data && data.error && data.message)
              errorMessage = data.error.message;

            throw new Error(errorMessage);
          });
        }
      })
      .then((data) => {
        console.log(data);
        setIsUpdate(true);
      })
      .catch((err) => {
        alert(err.message);
      });
  };

  if (authCntxt.isLoggedIn) {
    fetch(
      "https://identitytoolkit.googleapis.com/v1/accounts:lookup?key=AIzaSyDBDNLlgXE3aUD1Tkn4aG-tSIbGYJlUEjc",
      {
        method: "POST",
        body: JSON.stringify({
          idToken: idToken,
        }),
        headers: {
          "Content-Type": "application/json",
        },
      }
    )
      .then((res) => {
        if (res.ok) {
          return res.json();
        } else {
          return res.json().then((data) => {
            let errorMessage = "Authentication Failed";
            if (data && data.error && data.message)
              errorMessage = data.error.message;

            throw new Error(errorMessage);
          });
        }
      })
      .then((data) => {
        console.log(data.users[0]);
        setIsUpdate(true);
        collectedData.email = data.users[0].email;
        collectedData.name = data.users[0].displayName;
        collectedData.image = data.users[0].photoUrl;
      })
      .catch((err) => {
        alert(err.message);
      });
  }
  return (
    <>
      <div className={classes.welcomeDiv}>
        <p> Welcome to ExpenseTracker Page!!</p>

        <p className={classes.welcomeP2}>
          Your profile is incomplete.
          <button
            className={classes.updateButton}
            onClick={profileUpdateHandler}
          >
            Complete now
          </button>
        </p>
      </div>
      <InputForm data={collectedData} />
    </>
  );
};
export default Welcome;
