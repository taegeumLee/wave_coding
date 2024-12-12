import Schedule from "@/components/schedule";
import ConnectStudentList from "./components/connect_student_list";

export default function Home() {
  return (
    <div className="bg-neutral-100 max-w-screen-2xl h-screen mx-auto p-4">
      <div className="flex flex-row items-center gap-2 mt-5 mb-3">
        <span className="text-2xl font-bold">검색</span>
        <input
          className="bg-neutral-100 p-1 outline-none ring-0 border-b-2 border-blue-500"
          type="text"
          placeholder="이름을 입력하세요"
        />
      </div>
      <div className="flex flex-row gap-4 h-full">
        <Schedule />
        <ConnectStudentList />
      </div>
    </div>
  );
}
