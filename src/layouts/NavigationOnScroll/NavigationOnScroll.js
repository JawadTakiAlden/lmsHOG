import PropTypes from "prop-types";
import { useEffect } from "react";
import { useLocation } from "react-router-dom";

// ==============================|| NAVIGATION SCROLL TO TOP ||============================== //

const NavigationOnScroll = ({ children }) => {
  const location = useLocation();
  const { pathname } = location;

  useEffect(() => {
    window.scrollTo({
      top: 0,
      left: 0,
      behavior: "smooth",
    });
  }, [pathname]);

  return children || null;
};

NavigationOnScroll.propTypes = {
  children: PropTypes.node,
};

export default NavigationOnScroll;
