import { useNavigate } from 'react-router-dom';
import '../styels/homePage.css'; // Assuming you have some styles for the Home component
export default function Home() {
  const navigate = useNavigate();

  return (
    <div className='home-page'>
      <h1>Welcome to the Home Page</h1>
      <button onClick={() => navigate('/settings')}>Go to Profile Settings</button>
      <button onClick={() => navigate('/website-settings')}>Go to Website Settings</button>
    </div>
  );
}
  