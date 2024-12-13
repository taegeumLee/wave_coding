import { useState, useCallback, useEffect } from "react";
import { Schedule, User } from "@prisma/client";
import { useStudentColors } from "./useStudentColors";
import { EventInput } from "@fullcalendar/core";

export const useScheduleManagement = (studentList: User[]) => {
  const [schedules, setSchedules] = useState<Schedule[]>([]);
  const { getStudentColor } = useStudentColors();

  const events = schedules
    .map((schedule): EventInput | null => {
      if (!schedule.studentId) return null;

      const student = studentList.find((s) => s.id === schedule.studentId);
      const color = getStudentColor(schedule.studentId);

      return {
        id: schedule.id,
        title: `${student?.name} 수업`,
        start: schedule.startTime,
        end: schedule.endTime,
        backgroundColor: color.backgroundColor,
        borderColor: color.borderColor,
        textColor: color.textColor,
        extendedProps: {
          studentId: schedule.studentId,
          student,
        },
      };
    })
    .filter(Boolean) as EventInput[];

  const api = {
    fetchSchedules: useCallback(async () => {
      try {
        const response = await fetch("/api/schedules");
        if (!response.ok) throw new Error("Failed to fetch schedules");
        const data = await response.json();
        setSchedules(data);
      } catch (error) {
        console.error("Error fetching schedules:", error);
        alert("일정을 불러오는데 실패했습니다.");
      }
    }, []),

    createSchedule: useCallback(
      async (studentId: string, startTime: Date, endTime: Date) => {
        try {
          const response = await fetch("/api/schedules", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ studentId, startTime, endTime }),
          });
          if (!response.ok) throw new Error("Failed to create schedule");
          const newSchedule = await response.json();
          setSchedules((prev) => [...prev, newSchedule]);
        } catch (error) {
          console.error("Error creating schedule:", error);
          throw error;
        }
      },
      []
    ),

    updateSchedule: useCallback(
      async (scheduleId: string, startTime: Date, endTime: Date) => {
        try {
          const response = await fetch(`/api/schedules/${scheduleId}`, {
            method: "PUT",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ startTime, endTime }),
          });
          if (!response.ok) throw new Error("Failed to update schedule");
          const updatedSchedule = await response.json();
          setSchedules((prev) =>
            prev.map((s) => (s.id === scheduleId ? updatedSchedule : s))
          );
        } catch (error) {
          console.error("Error updating schedule:", error);
          throw error;
        }
      },
      []
    ),

    deleteSchedule: useCallback(async (scheduleId: string) => {
      try {
        const response = await fetch(`/api/schedules/${scheduleId}`, {
          method: "DELETE",
        });
        if (!response.ok) throw new Error("Failed to delete schedule");
        setSchedules((prev) => prev.filter((s) => s.id !== scheduleId));
      } catch (error) {
        console.error("Error deleting schedule:", error);
        throw error;
      }
    }, []),
  };

  useEffect(() => {
    api.fetchSchedules();
  }, [api.fetchSchedules]);

  return { schedules, events, api };
};
