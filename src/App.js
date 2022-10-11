import { useContext } from "react";
import SignUp from "./components/Profile/SignUp";
import { Route } from "react-router-dom";
import Welcome from "./components/Welcome/Welcome";
import AuthContext from "./Store/AuthContext";
import VerifyEmail from "./components/Profile/verifyEmail";
import ForgotPassword from "./components/Profile/ForgotPassword";
function App() {
  const authCntxt = useContext(AuthContext);
  // const [isLogin, setIsLogin] = useState(false);
  // const loginHandler = () => {
  //   setIsLogin(true);
  // };
  return (
    <>
      {!authCntxt.isLoggedIn && (
        <Route path="/" exact>
          <SignUp />
        </Route>
      )}
      {/* {authCntxt.isLoggedIn && <Welcome />} */}
      {authCntxt.isLoggedIn && (
        <Route path="/welcome">
          <Welcome />
        </Route>
      )}
      <Route path="/verify">
        <VerifyEmail />
      </Route>
      <Route path="/forgotPassword">
        <ForgotPassword />
      </Route>
    </>
  );
}

export default App;
