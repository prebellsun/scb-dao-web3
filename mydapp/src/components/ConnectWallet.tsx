import { useState } from "react";
// import { ethers } from "ethers"; // ethers 삭제로 인한 제거

function ConnectWallet() {
  const [walletAddress, setWalletAddress] = useState<string | null>(null);

  const connectWallet = async () => {
    if ((window as any).ethereum) {
      try {
        const accounts = await (window as any).ethereum.request({
          method: "eth_requestAccounts",
        });
        setWalletAddress(accounts[0]);
      } catch (error) {
        console.error("지갑 연결 오류:", error);
      }
    } else {
      alert("메타마스크가 설치되어 있지 않습니다.");
    }
  };

  return (
    <div>
      {walletAddress ? (
        <p>지갑 주소: {walletAddress}</p>
      ) : (
        <button onClick={connectWallet}>메타마스크 지갑 연결</button>
      )}
    </div>
  );
}

export default ConnectWallet;
