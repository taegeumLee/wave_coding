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
    console.log("Converting schedule:", schedule);
    return {
      id: schedule.id,
      title: `학생 ${schedule.studentId} 수업`,
      start: new Date(schedule.startTime).toISOString(),
      end: new Date(schedule.endTime).toISOString(),
      backgroundColor: "#3788d8",
      borderColor: "#3788d8",
      extendedProps: {
        studentId: schedule.studentId,
      },
    };
  });

  return (
    <div className="w-3/4 h-3/4 bg-white rounded-lg p-4 shadow-sm">
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
        height="100%"
        slotMinTime="09:00:00"
        slotMaxTime="22:00:00"
        nowIndicator={true}
        allDaySlot={false}
        slotDuration="00:30:00"
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
            <div className="p-1.5 text-white h-full">
              <div className="font-bold text-sm mb-0.5">
                학생 {eventInfo.event.extendedProps.studentId}
              </div>
              <div className="text-xs opacity-90">
                {new Date(eventInfo.event.start!).toLocaleTimeString("ko-KR", {
                  hour: "2-digit",
                  minute: "2-digit",
                  hour12: false,
                })}
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
      />
    </div>
  );
}
