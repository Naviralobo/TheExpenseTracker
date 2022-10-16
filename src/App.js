import SignUp from "./components/Profile/SignUp";
import { Route, Redirect } from "react-router-dom";
import Welcome from "./components/Welcome/Welcome";
import VerifyEmail from "./components/Profile/verifyEmail";
import ForgotPassword from "./components/Profile/ForgotPassword";
import ETForm from "./components/ExpenseTracker/ETForm";
import { useSelector, useDispatch } from "react-redux";
import { authActions } from "./Store/AuthRedux";
import { expActions } from "./Store/ExpenseRedux";
import axios from "axios";

function App() {
  const dispatch = useDispatch();
  dispatch(authActions.setIsAuth());
  const isAuth = useSelector((state) => state.auth.isAuthenticated);
  const userId = useSelector((state) => state.auth.userId);
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
  return (
    <>
      {!isAuth && <SignUp />}
      {!isAuth && (
        <Route path="/welcome">
          <Redirect to="/" />
        </Route>
      )}
      {isAuth && <Redirect to="/welcome" />}
      <Route path="/verify">
        <VerifyEmail />
      </Route>
      <Route path="/forgotPassword">
        <ForgotPassword />
      </Route>
      <Route path="/expenseTracker">
        <ETForm />
      </Route>
      <Route path="/welcome" exact>
        <Welcome />
      </Route>
    </>
  );
}

export default App;
