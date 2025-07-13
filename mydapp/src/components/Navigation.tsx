// src/components/Navigation.tsx
import { Link } from "react-router-dom";
import { useAccount, useConnect, useDisconnect } from "wagmi"; // Wagmi 훅 임포트
import { injected } from "wagmi/connectors"; // MetaMask와 같은 Injected 지갑 커넥터 임포트

const Navigation = () => {
  const { address, isConnected } = useAccount(); // 현재 계정 정보와 연결 상태 가져오기
  const { connect } = useConnect(); // 지갑 연결 함수 가져오기
  const { disconnect } = useDisconnect(); // 지갑 연결 해제 함수 가져오기

  return (
    <nav style={{ padding: "1rem", borderBottom: "1px solid #ccc", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
      <div>
        <Link to="/" style={{ marginRight: "1rem" }}>🏠 홈</Link>
        <Link to="/proposals" style={{ marginRight: "1rem" }}>📜 제안 목록</Link>
        <Link to="/create-proposal" style={{ marginRight: "1rem" }}>✍ 제안 생성</Link>
        <Link to="/create-admin-proposal">🛠 관리자 제안</Link>
      </div>

      {/* 지갑 연결/연결 해제 버튼 추가 */}
      <div style={{ marginLeft: "auto" }}>
        {isConnected ? (
          <div style={{ display: "flex", alignItems: "center" }}>
            <p style={{ marginRight: "1rem" }}>연결됨: {address?.slice(0, 6)}...{address?.slice(-4)}</p>
            <button onClick={() => disconnect()} style={{ padding: "0.5rem 1rem", backgroundColor: "#f44336", color: "white", border: "none", borderRadius: "4px", cursor: "pointer" }}>
              연결 해제
            </button>
          </div>
        ) : (
          <button onClick={() => connect({ connector: injected() })} style={{ padding: "0.5rem 1rem", backgroundColor: "#4CAF50", color: "white", border: "none", borderRadius: "4px", cursor: "pointer" }}>
            메타마스크 연결
          </button>
        )}
      </div>
    </nav>
  );
};

export default Navigation;


