import React from "react";
import LandingNav from "../../components/Navigation/LandingNav";
import FooterLanding from "../../components/Footer/LandingFooter";

const Live = () => {
  const url = "https://view.livechesscloud.com#caf7d2fa-9b55-4367-96d4-1442d646a236";
  return (
    <div>
      <div className="relative z-10 pt-6 pb-6 sm:pb-6 md:pb-6 lg:pb-6 xl:pb-6">
        <LandingNav />
      </div>
      <div>
        <iframe
          className="w-full h-screen"
          title="Live Broadcast"
          frameBorder="0"
          allowFullScreen
          src={url}
        />
      </div>
      <FooterLanding />
    </div>
  );
};

export default Live;
