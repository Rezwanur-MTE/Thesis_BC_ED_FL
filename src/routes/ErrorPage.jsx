import { useRouteError } from "react-router-dom";

function ErrorPage() {
    const error = useRouteError();
    console.log(error);
  return (
    <div>
      <h1>Page not found</h1>
      <p>Sorry , an unexpected error occured</p>
      <p>
        {error.status} {error.message}
      </p>
    </div>
  );
}

export default ErrorPage;
