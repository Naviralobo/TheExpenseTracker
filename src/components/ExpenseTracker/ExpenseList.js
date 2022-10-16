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
        <tr className={classes.row}>
          <td className={classes.amount}>Rs.{props.amount}</td>
          <td className={classes.desc}>{props.description}</td>
          <td className={classes.cat}>{props.category}</td>
          <td className={classes.actions}>
            <button className={classes.edit} onClick={props.onEdit}>
              Edit
            </button>
            <button className={classes.delete} onClick={deleteExpenseHandler}>
              Delete
            </button>
          </td>
        </tr>
      </div>
    </div>
  );
};

export default ExpenseList;
