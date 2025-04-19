import { useNavigate } from 'react-router-dom';

export default function Home() {
  const navigate = useNavigate();

  return (
    <div>
      <h1>Welcome to the Home Page</h1>
      <button onClick={() => navigate('/settings')}>Go to Profile Settings</button>
      <button onClick={() => navigate('/website-settings')}>Go to Website Settings</button>
    </div>
  );
}
  