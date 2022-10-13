import { useContext } from "react";
import ExpenseContext from "../../Store/ExpenseContext";
import classes from "./ExpenseList.module.css";
const ExpenseList = (props) => {
  const expCntxt = useContext(ExpenseContext);
  return (
    <div className={classes.div}>
      <div className={classes.amount}>{props.amount}</div>
      <div className={classes.desc}>{props.description}</div>
      <div className={classes.cat}>{props.category}</div>
      <div className={classes.actions}>
        <button className={classes.edit} onClick={props.onEdit}>
          Edit
        </button>
        <button
          className={classes.delete}
          onClick={() => expCntxt.removeExpense(props.id)}
        >
          Delete
        </button>
      </div>
    </div>
  );
};

export default ExpenseList;
