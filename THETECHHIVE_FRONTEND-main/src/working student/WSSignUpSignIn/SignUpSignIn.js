import { useCallback } from "react";
import { useNavigate } from "react-router-dom";
import "./SignUpSignIn.css";

const SignUpSignIn = () => {
  const navigate = useNavigate();
  const onSIGNUPClick = useCallback(() => {
    navigate("/signup");
  }, [navigate]);

  const onSIGNINClick = useCallback(() => {
    navigate("/signin");
  }, [navigate]);

  const onWSLANDINGPAGEClick = useCallback(() => {
    navigate("/wslandingpage");
  }, [navigate]);

  

  return (
    <div className="ws-sign-upsign-in">
      <img className="background" alt="" src="/bg1.png" />

      <div className="main-box" />
      <div className="back-bg" onClick={onWSLANDINGPAGEClick} />
      <img className="back-icon" alt="" src="/back.png" onClick={onWSLANDINGPAGEClick} />

      <img className="main-bg" alt="" src="/main-bg.png" />
      <img className="main-title" alt="" src="/TITLE.png" />

      <i className="welcome">WELCOME!</i>

      <div className="signup-container" onClick={onSIGNUPClick}>
        <div className="signup-box" />
        <div className="signup-name">SIGN UP</div>
      </div>

      <div className="line" />
     
      <div className="signin-container" onClick={onSIGNINClick}>
        <div className="signin-box" />
        <div className="signin-name">SIGN IN</div>
      </div>
      
      <img className="wildcat-cutie" alt="" src="/wildcat-icon.png" />
    </div>
  );
};

export default SignUpSignIn;
