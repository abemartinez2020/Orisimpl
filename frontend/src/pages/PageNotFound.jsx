import { useLocation } from "react-router-dom";
function PageNotFound() {
  let { pathname } = useLocation();
  return (
    <div>
      <h1>
        Sorry, <strong style={{ color: "purple" }}>{pathname} </strong>
        does not exist.
      </h1>
    </div>
  );
}

export default PageNotFound;
