import introVideo from "../images/intro.mp4";
import "./IntroSplash.css";

export default function SplashScreen({ onFinish }) {
  return (
    <div className="splash-screen">
      <video
        className="intro-video" 
        autoPlay
        muted
        playsInline
        onEnded={onFinish}
      >
        <source src={introVideo} type="video/mp4" />
        Your browser does not support the video tag.
      </video>
    </div>
  );
}