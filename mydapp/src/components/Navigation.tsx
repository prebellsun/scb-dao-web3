import { Link } from "react-router-dom";
import { useAccount, useConnect, useDisconnect } from "wagmi";
import { injected } from "wagmi/connectors";

const Navigation = () => {
  const { address, isConnected } = useAccount();
  const { connect } = useConnect();
  const { disconnect } = useDisconnect();

  return (
    <nav style={{
      padding: "1rem",
      borderBottom: "1px solid #ccc",
      display: "flex",
      justifyContent: "space-between",
      alignItems: "center"
    }}>
      <div>
        <Link to="/" style={{ marginRight: "1rem" }}>🏠 홈</Link>
        <Link to="/proposals" style={{ marginRight: "1rem" }}>📜 제안 목록</Link>
        <Link to="/create-proposal" style={{ marginRight: "1rem" }}>✍ 제안 생성</Link>
        <Link to="/dao-info" style={{ marginRight: "1rem" }}>ℹ️ DAO 정보</Link>
        <Link to="/create-admin-proposal">🛠 관리자 제안</Link>
      </div>

      <div style={{ marginLeft: "auto" }}>
        {isConnected ? (
          <div style={{ display: "flex", alignItems: "center" }}>
            <p style={{ marginRight: "1rem" }}>
              연결됨: {address?.slice(0, 6)}...{address?.slice(-4)}
            </p>
            <button
              onClick={() => disconnect()}
              style={{
                padding: "0.5rem 1rem",
                backgroundColor: "#f44336",
                color: "white",
                border: "none",
                borderRadius: "4px",
                cursor: "pointer"
              }}
            >
              연결 해제
            </button>
          </div>
        ) : (
          <button
            onClick={() => connect({ connector: injected() })}
            style={{
              padding: "0.5rem 1rem",
              backgroundColor: "#4CAF50",
              color: "white",
              border: "none",
              borderRadius: "4px",
              cursor: "pointer"
            }}
          >
            메타마스크 연결
          </button>
        )}
      </div>
    </nav>
  );
};

export default Navigation;




