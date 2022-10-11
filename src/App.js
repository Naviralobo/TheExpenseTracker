import { useContext } from "react";
import SignUp from "./components/Profile/SignUp";
import { Route } from "react-router-dom";
import Welcome from "./components/Welcome/Welcome";
import AuthContext from "./Store/AuthContext";
import VerifyEmail from "./components/Profile/verifyEmail";
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
      {authCntxt.isLoggedIn && (
        <Route path="/welcome">
          <Welcome />
        </Route>
      )}
      <Route path="/verify">
        <VerifyEmail />
      </Route>
    </>
  );
}

export default App;
