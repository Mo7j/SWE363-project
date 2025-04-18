import { useEffect } from "react";

function UniversityRedirect() {
  useEffect(() => {
    window.location.href = "https://portal.kfupm.edu.sa"; // replace with actual URL
  }, []);

  return (
    <div style={{ textAlign: "center", marginTop: "50px" }}>
      Redirecting to university portal...
    </div>
  );
}

export default UniversityRedirect;