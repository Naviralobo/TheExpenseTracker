import classes from "./InputForm.module.css";
// import { useRef } from "react";
const InputForm = (props) => {
  console.log(props.data);
  //   const emailInputRef = useRef();
  //   const nameInputRef = useRef();

  return (
    <form className={classes.div}>
      {/* <img src={props.data.image} alt="userImage" /> */}
      <label htmlFor="userName">Name</label>
      <input type="text" id="userName" defaultValue={props.data.displayName} />

      <label htmlFor="emailInput">Email</label>
      <input type="text" id="emailInput" defaultValue={props.data.email} />
      <div className={classes.actions}>
        <button>update</button>
      </div>
    </form>
  );
};

export default InputForm;
