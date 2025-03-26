"use server";
import { listQuestionBankVoByPageUsingPost } from "@/api/questionBankController";
import QuestionBankList from "@/components/QuestionBankList";
import "./index.css";


export default async function BanksPage() {
  let questionBankList = [];
  let error = null;

  // 调整为合理分页（如默认页码1，每页20条）
  const pageSize = 20;
  const pageNum = 1;

  try {
    const res = await listQuestionBankVoByPageUsingPost({
      pageSize,
      pageNum,
      sortField: "createTime",
      sortOrder: "descend",
    });
    questionBankList = res?.data?.records || [];
  } catch (e) {
    error = e;
    // message.error("获取题库列表失败，请检查网络或重试");
    // console.error("请求失败:", e);
  }

  return (
    <div id="banksPage" className="max-width-content">
      <h1>题库大全</h1>
      {error && <p className="error-message">{error.message}</p>}
      <QuestionBankList questionBankList={questionBankList} />
      {/* 可添加分页控件 */}
      {/* <Pagination total={total} pageSize={pageSize} onChange={handlePageChange} /> */}
    </div>
  );
}