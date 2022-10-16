// import { useContext } from "react";
// import ExpenseContext from "../../Store/ExpenseContext";
import { useSelector, useDispatch } from "react-redux";
import { expActions } from "../../Store/ExpenseRedux";
import classes from "./ExpenseList.module.css";
import axios from "axios";
const ExpenseList = (props) => {
  const userId = useSelector((state) => state.auth.userId);
  const dispatch = useDispatch();
  const deleteExpenseHandler = () => {
    axios
      .delete(
        ` https://expensetracker-50239-default-rtdb.firebaseio.com/expenses/${userId}/${props.id}.json`
      )
      .then((res) => {
        axios
          .get(
            `https://expensetracker-50239-default-rtdb.firebaseio.com/expenses/${userId}.json`
          )
          .then((res) => {
            let datas = res.data;
            let expArray = [];
            for (let id in datas) {
              let expenses = datas[id];
              expenses.id = id;
              expArray.push(expenses);
            }
            dispatch(expActions.addExpense(expArray));
          });
      });
  };
  return (
    <div className={classes.list}>
      <div className={classes.div}>
        <div className={classes.amount}>Rs.{props.amount}</div>
        <div className={classes.desc}>{props.description}</div>
        <div className={classes.cat}>{props.category}</div>
        <div className={classes.actions}>
          <button className={classes.edit} onClick={props.onEdit}>
            Edit
          </button>
          <button className={classes.delete} onClick={deleteExpenseHandler}>
            Delete
          </button>
        </div>
      </div>
    </div>
  );
};

export default ExpenseList;
