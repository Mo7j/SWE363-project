import { useNavigate } from "react-router-dom";

export default function Home() {
  const navigate = useNavigate();

  const handleGoToAbout = () => {
    navigate("/search-request");
  };

  return (
    <div>
      <h1>Welcome to the Home Page</h1>
      <button onClick={handleGoToAbout}>
        Go to Search Reuset Page
      </button>
    </div>
  );
}
