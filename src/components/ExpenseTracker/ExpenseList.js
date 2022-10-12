import classes from "./ExpenseList.module.css";
const ExpenseList = (props) => {
  return (
    <div className={classes.div}>
      <div className={classes.amount}>{props.amount}</div>
      <div className={classes.desc}>{props.description}</div>
      <div className={classes.cat}>{props.category}</div>
    </div>
  );
};

export default ExpenseList;
