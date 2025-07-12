// src/components/Navigation.tsx
import { Link } from "react-router-dom";

const Navigation = () => {
  return (
    <nav style={{ padding: "1rem", borderBottom: "1px solid #ccc" }}>
      <Link to="/" style={{ marginRight: "1rem" }}>🏠 홈</Link>
      <Link to="/proposals" style={{ marginRight: "1rem" }}>📜 제안 목록</Link>
      <Link to="/create-proposal" style={{ marginRight: "1rem" }}>✍ 제안 생성</Link>
      <Link to="/create-admin-proposal">🛠 관리자 제안</Link>
    </nav>
  );
};

export default Navigation;


