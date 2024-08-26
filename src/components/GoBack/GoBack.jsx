import { useRef } from "react";
import { IoArrowBackSharp } from "react-icons/io5";
import { Link, useLocation } from "react-router-dom";
import css from "./GoBack.module.css";

const GoBack = () => {
  const location = useLocation();
  const goBackLinkRef = useRef(location.state?.from || "/movies");

  return (
    <Link to={goBackLinkRef.current} className={css.link}>
      <IoArrowBackSharp className={css.btn} />
      Go back
    </Link>
  );
};

export default GoBack;
