import { User } from "@prisma/client";
import { useStudentColors } from "./hooks/useStudentColors";

interface StudentListProps {
  studentList: User[];
}

export default function StudentList({ studentList }: StudentListProps) {
  const { getStudentColor } = useStudentColors();

  return (
    <div className="w-64 p-4 border-r overflow-y-auto bg-white">
      <h2 className="font-bold mb-4">학생 목록</h2>
      {studentList.map((student) => (
        <div
          key={student.id}
          draggable
          onDragStart={(e) => {
            e.dataTransfer.setData("studentId", student.id);
            e.dataTransfer.effectAllowed = "copy";
            e.currentTarget.setAttribute("data-student-id", student.id);
          }}
          className="student-card p-3 rounded-lg shadow-sm cursor-move hover:shadow-md transition-all duration-200 mb-2"
          style={{
            ...getStudentColor(student.id),
            border: `1px solid ${getStudentColor(student.id).borderColor}`,
          }}
        >
          <div className="font-medium">{student.name}</div>
          <div className="text-xs opacity-80">드래그하여 수업 추가</div>
        </div>
      ))}
    </div>
  );
}
