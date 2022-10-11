import { useContext } from "react";
import SignUp from "./components/Profile/SignUp";

import Welcome from "./components/Welcome/Welcome";
import AuthContext from "./Store/AuthContext";

function App() {
  const authCntxt = useContext(AuthContext);
  // const [isLogin, setIsLogin] = useState(false);
  // const loginHandler = () => {
  //   setIsLogin(true);
  // };
  return (
    <>
      {!authCntxt.isLoggedIn && <SignUp />}
      {authCntxt.isLoggedIn && <Welcome />}
    </>
  );
}

export default App;
