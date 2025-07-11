export default function CreateProposal() {
  const handleSubmit = async () => {
    await aragonClient.methods.propose({
      metadata: {
        title: "SCB 운영 규칙 개정",
        summary: "운영 방식에 대한 투표 제안입니다.",
      },
      actions: [], // 실제 실행 코드가 있다면 여기에 추가
    });
    alert("제안이 제출되었습니다.");
  };

  return (
    <div>
      <h3>새 제안 만들기</h3>
      <button onClick={handleSubmit}>제안 제출</button>
    </div>
  );
}
