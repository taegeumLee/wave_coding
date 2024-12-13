"use client";

import { Schedule as ScheduleType, User } from "@prisma/client";
import { useEffect, useState } from "react";
import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import timeGridPlugin from "@fullcalendar/timegrid";
import interactionPlugin from "@fullcalendar/interaction";
import koLocale from "@fullcalendar/core/locales/ko";

interface StudentListProps {
  studentList: User[];
}

export default function Schedule({ studentList }: StudentListProps) {
  const [schedules, setSchedules] = useState<ScheduleType[]>([]);

  useEffect(() => {
    async function fetchSchedules() {
      if (studentList.length > 0) {
        const allSchedules: ScheduleType[] = [];
        for (const student of studentList) {
          const response = await fetch(
            `/api/schedules?studentId=${student.id}`
          );
          const data = await response.json();
          console.log("Fetched schedules for student:", student.id, data);
          allSchedules.push(...data);
        }
        console.log("All schedules:", allSchedules);
        setSchedules(allSchedules);
      }
    }
    fetchSchedules();
  }, [studentList]);

  const handleEventDrop = async (info: any) => {
    const { event } = info;
    try {
      const response = await fetch(`/api/schedules/${event.id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          startTime: event.start,
          endTime: event.end,
        }),
      });

      if (!response.ok) {
        throw new Error("Failed to update schedule");
      }
    } catch (error) {
      console.error("Error updating schedule:", error);
      info.revert();
    }
  };

  const events = schedules.map((schedule) => {
    const student = studentList.find((s) => s.id === schedule.studentId);

    // UTC 시간을 한국 시간으로 정확하게 변환
    const startDate = new Date(schedule.startTime);
    const endDate = new Date(schedule.endTime);

    console.log("Original UTC:", {
      start: schedule.startTime,
      end: schedule.endTime,
      convertedStart: startDate,
      convertedEnd: endDate,
    });

    return {
      id: schedule.id,
      title: `${student?.name || "Unknown"} 수업`,
      start: startDate,
      end: endDate,
      backgroundColor: "#3B82F6",
      borderColor: "#3B82F6",
      extendedProps: {
        studentId: schedule.studentId,
        studentName: student?.name,
      },
      allDay: false,
    };
  });

  return (
    <div className="w-3/4 h-3/4 bg-neutral-50 rounded-lg p-4 shadow-sm border-2 border-neutral-200">
      <h2 className="text-3xl font-bold mb-4">수업 일정</h2>
      <div className="h-[calc(100%-4rem)] overflow-auto">
        <FullCalendar
          plugins={[dayGridPlugin, timeGridPlugin, interactionPlugin]}
          initialView="timeGridWeek"
          headerToolbar={{
            left: "prev,next today",
            center: "title",
            right: "dayGridMonth,timeGridWeek,timeGridDay",
          }}
          editable={true}
          droppable={true}
          eventDrop={handleEventDrop}
          events={events}
          locale={koLocale}
          height="auto"
          contentHeight="auto"
          aspectRatio={1.5}
          handleWindowResize={false}
          stickyHeaderDates={true}
          eventTimeFormat={{
            hour: "2-digit",
            minute: "2-digit",
            hour12: false,
          }}
          dayHeaderFormat={{
            weekday: "short",
            month: "numeric",
            day: "numeric",
            omitCommas: true,
          }}
          eventContent={(eventInfo) => {
            return (
              <div className=" text-neutral-700 h-full">
                <div className="font-bold text-sm mb-0.5">
                  {eventInfo.event.extendedProps.studentName}
                </div>
                <div className="text-xs opacity-90">
                  {new Date(eventInfo.event.start!).toLocaleTimeString(
                    "ko-KR",
                    {
                      hour: "2-digit",
                      minute: "2-digit",
                      hour12: false,
                    }
                  )}
                  {" - "}
                  {new Date(eventInfo.event.end!).toLocaleTimeString("ko-KR", {
                    hour: "2-digit",
                    minute: "2-digit",
                    hour12: false,
                  })}
                </div>
              </div>
            );
          }}
          slotLabelFormat={{
            hour: "2-digit",
            minute: "2-digit",
            hour12: false,
          }}
          buttonText={{
            today: "오늘",
            month: "월",
            week: "주",
            day: "일",
          }}
          titleFormat={{
            year: "numeric",
            month: "long",
          }}
          eventBackgroundColor="#3B82F6"
          eventBorderColor="#3B82F6"
          dayCellClassNames="hover:bg-blue-50"
          slotLabelClassNames="text-neutral-500 font-medium"
          dayHeaderClassNames="bg-neutral-100 text-neutral-700"
          nowIndicatorClassNames="border-red-500"
          slotLaneClassNames="bg-white border-neutral-100"
          slotMinTime="09:00:00"
          slotMaxTime="22:00:00"
          nowIndicator={true}
          allDaySlot={false}
          slotDuration="00:30:00"
          timeZone="Asia/Seoul"
        />
      </div>
    </div>
  );
}
