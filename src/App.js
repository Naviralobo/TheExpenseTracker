import { useContext } from "react";
import SignUp from "./components/Profile/SignUp";
import { Route, Redirect } from "react-router-dom";
import Welcome from "./components/Welcome/Welcome";
import AuthContext from "./Store/AuthContext";
import VerifyEmail from "./components/Profile/verifyEmail";
import ForgotPassword from "./components/Profile/ForgotPassword";
import ETForm from "./components/ExpenseTracker/ETForm";
function App() {
  const authCntxt = useContext(AuthContext);
  // const [isLogin, setIsLogin] = useState(false);
  // const loginHandler = () => {
  //   setIsLogin(true);
  // };
  return (
    <>
      {!authCntxt.isLoggedIn && <SignUp />}
      {/* {authCntxt.isLoggedIn && <Welcome />} */}
      {authCntxt.isLoggedIn && <Redirect to="/welcome" />}
      <Route path="/verify">
        <VerifyEmail />
      </Route>
      <Route path="/forgotPassword">
        <ForgotPassword />
      </Route>
      <Route path="/expenseTracker">
        <ETForm />
      </Route>
      <Route path="/welcome">
        <Welcome />
      </Route>
    </>
  );
}

export default App;
