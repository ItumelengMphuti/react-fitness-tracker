import { useNavigate } from "react-router-dom";

function NotFound() {
  const navigate = useNavigate();

  return (
    <div>
      <h1>404 - Page Not Found</h1>
      <p>Sorry, the page you're looking for doesn't exist.</p>
      <button type="button" onClick={() => navigate("/")}>
        Go home
      </button>
    </div>
  );
}

export default NotFound;
