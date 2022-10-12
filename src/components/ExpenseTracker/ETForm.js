import classes from "./ETForm.module.css";
import { useRef, useContext } from "react";
import ExpenseContext from "../../Store/ExpenseContext";
import ExpenseList from "./ExpenseList";
const ETForm = (props) => {
  const expCntxt = useContext(ExpenseContext);
  const amountInputRef = useRef();
  const descriptionInputRef = useRef();
  const categoryInputRef = useRef();
  // const submitHandler = () => {};
  const submitHandler = (event) => {
    event.preventDefault();
    const amount = amountInputRef.current.value;
    const description = descriptionInputRef.current.value;
    const category = categoryInputRef.current.value;
    const expense = {
      amount: amount,
      description: description,
      category: category,
    };
    expCntxt.addExpense(expense);
  };
  const expensee = expCntxt.expenses.map((expElement) => (
    <ExpenseList
      amount={expElement.amount}
      description={expElement.description}
      category={expElement.category}
    />
  ));

  return (
    <>
      <div className={classes.div}>
        <h1 className={classes.h1}>$ Your Expenses $</h1>
        <form onSubmit={submitHandler}>
          <div className={classes.form}>
            <div className={classes.money}>
              <div>
                <label htmlFor="money">Amount</label>
              </div>
              <input type="text" id="money" ref={amountInputRef} />
            </div>
            <div className={classes.description}>
              <div>
                <label htmlFor="description">Description</label>
              </div>
              <input type="text" id="decsription" ref={descriptionInputRef} />
            </div>
            <div className={classes.category}>
              <div>
                <label htmlFor="category">Category</label>
              </div>
              <select id="category" ref={categoryInputRef}>
                <option value="food">food</option>
                <option value="petrol">petrol</option>
                <option value="salary">salary</option>
                <option value="home appliance">home appliance</option>
                <option value="education">education</option>
                <option value="food">movies</option>
                <option value="food">others....</option>
              </select>
            </div>
          </div>
          <div>
            <button className={classes.actions} type="submit">
              Add Expense
            </button>
          </div>
        </form>
      </div>
      <ul>{expensee}</ul>
    </>
  );
};
export default ETForm;