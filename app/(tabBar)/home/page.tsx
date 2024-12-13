"use client";

import Schedule from "@/components/schedule/index";
import ConnectStudentList from "./components/connect_student_list";
import { User } from "@prisma/client";
import { useEffect, useState } from "react";

export default function Home() {
  const [studentList, setStudentList] = useState<User[]>([]);

  useEffect(() => {
    const fetchStudentList = async () => {
      const response = await fetch("/api/students");
      if (!response.ok) {
        console.error("Failed to fetch students");
        return;
      }
      const data = await response.json();
      setStudentList(data);
    };
    fetchStudentList();
  }, []);

  return (
    <div className="bg-neutral-100 max-w-screen-2xl h-screen mx-auto p-4 relative">
      <div className="flex flex-row gap-4 h-full">
        <Schedule studentList={studentList} />
        <div className="flex flex-col w-1/4 h-3/4 items-center gap-2 mb-3">
          <ConnectStudentList
            studentList={studentList}
            setStudentList={setStudentList}
          />
        </div>
      </div>
    </div>
  );
}
