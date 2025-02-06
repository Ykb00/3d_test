import Lottie from "lottie-react";

const LottiePlayer = ({ animationPath }) => {
  return (
    <div className="flex justify-center items-center">
      <Lottie
        animationData={animationPath}
        loop
        autoplay
        className="w-64 h-64"
      />
    </div>
  );
};

export default LottiePlayer;
