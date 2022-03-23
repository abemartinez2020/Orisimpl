import { useLocation } from "react-router-dom";
function PageNotFound() {
  let { pathname } = useLocation();
  return (
    <section
      className="bg-light text-dark  text-center text-sm-center mt-5 mb-0"
      style={{ paddingTop: "150px", marginBottom: "0px", height: "100vh" }}
    >
      <h1>
        Sorry, <strong style={{ color: "purple" }}>{pathname} </strong>
        does not exist.
      </h1>
    </section>
  );
}

export default PageNotFound;
