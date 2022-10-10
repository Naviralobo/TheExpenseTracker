import { useState } from "react";
import SignUp from "./components/Profile/SignUp";

import Welcome from "./Welcome";

function App() {
  const [isLogin, setIsLogin] = useState(false);
  const loginHandler = () => {
    setIsLogin(true);
  };
  return (
    <>
      {!isLogin && <SignUp onLogin={loginHandler} />}
      {isLogin && <Welcome />}
    </>
  );
}

export default App;
