import classes from "./ETForm.module.css";
import { useRef, useContext, useState } from "react";
import ExpenseList from "./ExpenseList";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { expActions } from "../../Store/ExpenseRedux";
const ETForm = (props) => {
  const amountInputRef = useRef();
  const descriptionInputRef = useRef();
  const categoryInputRef = useRef();
  const [isEditMode, setIsEditMode] = useState(false);
  const [id, setId] = useState("");
  const dispatch = useDispatch();
  const expensesRedux = useSelector((state) => state.exp.expenses);
  const userId = useSelector((state) => state.auth.userId);

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
    if (!isEditMode)
      axios
        .post(
          `https://expensetracker-50239-default-rtdb.firebaseio.com/expenses/${userId}.json`,
          expense
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
    else if (isEditMode)
      axios
        .put(
          `https://expensetracker-50239-default-rtdb.firebaseio.com/expenses/${userId}/${id}.json`,
          expense
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
    setIsEditMode(false);
  };
  const editHandler = (expElement) => {
    amountInputRef.current.value = expElement.amount;
    descriptionInputRef.current.value = expElement.description;
    categoryInputRef.current.value = expElement.category;
    setIsEditMode(true);
    setId(expElement.id);
  };

  const expensee = expensesRedux.map((expElement) => (
    <ExpenseList
      amount={expElement.amount}
      description={expElement.description}
      category={expElement.category}
      id={expElement.id}
      onEdit={() => {
        editHandler(expElement);
      }}
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
              {isEditMode ? "Update" : "Add Expense"}
            </button>
          </div>
        </form>
      </div>
      <ul>{expensee}</ul>
    </>
  );
};
export default ETForm;
