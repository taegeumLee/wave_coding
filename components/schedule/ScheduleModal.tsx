import { useState } from "react";
import { format } from "date-fns";
import { ScheduleModalProps } from "./types";

export default function ScheduleModal({
  isOpen,
  onClose,
  event,
  onUpdate,
  onDelete,
}: ScheduleModalProps) {
  const [startTime, setStartTime] = useState(
    event?.start ? format(new Date(event.start), "HH:mm") : "09:00"
  );

  if (!isOpen || !event) return null;

  const handleTimeChange = async (newTime: string) => {
    if (!event.start) return;

    const [hours, minutes] = newTime.split(":").map(Number);
    const newStart = new Date(event.start);
    newStart.setHours(hours, minutes);
    const newEnd = new Date(newStart);
    newEnd.setHours(newStart.getHours() + 1);

    try {
      await onUpdate(event.id, newStart, newEnd);
      onClose();
    } catch (error) {
      alert("수업 시간 변경에 실패했습니다.");
    }
  };

  const handleDelete = async () => {
    if (!confirm("이 수업을 삭제하시겠습니까?")) return;
    try {
      await onDelete(event.id);
      onClose();
    } catch (error) {
      alert("수업 삭제에 실패했습니다.");
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg p-6 w-96">
        <h2 className="text-xl font-bold mb-4">{event.title}</h2>
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700 mb-1">
            시작 시간
          </label>
          <input
            type="time"
            value={startTime}
            onChange={(e) => handleTimeChange(e.target.value)}
            min="09:00"
            max="21:00"
            step="1800"
            className="w-full p-2 border rounded"
          />
        </div>
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700 mb-1">
            종료 시간
          </label>
          <input
            type="time"
            value={format(new Date(event.end!), "HH:mm")}
            disabled
            className="w-full p-2 border rounded bg-gray-100"
          />
        </div>
        <div className="flex justify-end gap-2">
          <button
            onClick={handleDelete}
            className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600"
          >
            삭제
          </button>
          <button
            onClick={onClose}
            className="px-4 py-2 bg-gray-200 rounded hover:bg-gray-300"
          >
            닫기
          </button>
        </div>
      </div>
    </div>
  );
}
