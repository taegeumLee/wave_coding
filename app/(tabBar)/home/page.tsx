"use client";

import Schedule from "@/components/schedule";
import ConnectStudentList from "./components/connect_student_list";
import { User } from "@prisma/client";
import { useEffect, useState } from "react";

export default function Home() {
  const [studentList, setStudentList] = useState<User[]>([]);

  useEffect(() => {
    const fetchStudentList = async () => {
      const data = await fetch("/api/get_connected_students");
      const studentList = await data.json();
      setStudentList(studentList);
    };
    fetchStudentList();
  }, []);

  return (
    <div className="bg-neutral-100 max-w-screen-2xl h-screen mx-auto p-4 relative">
      <div className="flex flex-row gap-4 h-full">
        <Schedule studentList={studentList} />

        <div className="flex flex-col w-1/4 h-3/4 items-center gap-2 mb-3 ">
          <div className="flex flex-row gap-2 bg-neutral-50 w-full p-2 rounded-md border-2 border-neutral-200">
            <span className="text-2xl font-bold">검색</span>
            <input
              className="bg-neutral-50 p-1 outline-none ring-0 border-b-4 border-blue-500"
              type="text"
              placeholder="이름을 입력하세요"
            />
          </div>
          <ConnectStudentList
            studentList={studentList}
            setStudentList={setStudentList}
          />
        </div>
      </div>
    </div>
  );
}
