import { Link } from "react-router-dom";
import { IoArrowBackSharp } from "react-icons/io5";

export default function NotFound() {
  return (
    <>
      <Link to="/">
        <IoArrowBackSharp />
        Please, go to Home page
      </Link>
      <p
        style={{
          color: "#000",
          fontSize: "large",
          fontWeight: "700",
          padding: "100px auto",
        }}
      >
        404 This page was not found
      </p>
    </>
  );
}
