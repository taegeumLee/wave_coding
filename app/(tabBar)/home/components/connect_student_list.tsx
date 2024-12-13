"use client";

import { User } from "@prisma/client";
import { useEffect, useState } from "react";

export default function ConnectStudentList() {
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
    <div className="bg-neutral-200 w-1/4 h-3/4  rounded-lg">
      <div className="flex flex-col items-center justify-center">
        <span className="text-3xl font-bold mt-4 mb-4 border-b-4 border-blue-500">
          학생 목록
        </span>
        {studentList.map((student) => (
          <div
            key={student.id}
            className="flex flex-col items-center justify-center mb-2"
          >
            <div className="flex flex-row items-center justify-center">
              <span className="relative flex h-3 w-3">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-500 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-3 w-3 bg-green-500"></span>
              </span>
              <span className="text-2xl font-bold">{student.name}</span>
            </div>

            <div className="w-full h-0.5 bg-neutral-300" />
          </div>
        ))}
      </div>
    </div>
  );
}
