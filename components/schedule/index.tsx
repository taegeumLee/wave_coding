"use client";

import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import timeGridPlugin from "@fullcalendar/timegrid";
import interactionPlugin from "@fullcalendar/interaction";
import { EventClickArg } from "@fullcalendar/core";
import koLocale from "@fullcalendar/core/locales/ko";
import { useState } from "react";
import { User } from "@prisma/client";
import { useScheduleManagement } from "./hooks/useScheduleManagement";
import ScheduleModal from "./ScheduleModal";
import StudentList from "./StudentList";

interface ScheduleProps {
  studentList: User[];
}

export default function Schedule({ studentList }: ScheduleProps) {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const { schedules, events, api } = useScheduleManagement(studentList);
  const [selectedEvent, setSelectedEvent] = useState<
    EventClickArg["event"] | null
  >(null);

  const handleEventClick = (info: EventClickArg) => {
    setSelectedEvent(info.event);
    setIsModalOpen(true);
  };

  return (
    <div className="flex h-3/4 w-full bg-neutral-50 rounded-lg border-2 border-neutral-200">
      <StudentList studentList={studentList} />

      <div className="flex-1 p-4 overflow-hidden">
        <FullCalendar
          plugins={[dayGridPlugin, timeGridPlugin, interactionPlugin]}
          initialView="timeGridWeek"
          headerToolbar={{
            left: "prev,next today",
            center: "title",
            right: "dayGridMonth,timeGridWeek,timeGridDay",
          }}
          locale={koLocale}
          selectable={true}
          selectMirror={true}
          dayMaxEvents={true}
          weekends={true}
          events={events}
          eventClick={handleEventClick}
          slotMinTime="09:00:00"
          slotMaxTime="22:00:00"
          allDaySlot={false}
          expandRows={true}
          height="100%"
          slotDuration="00:30:00"
          droppable={true}
          editable={true}
          eventStartEditable={true}
          eventDurationEditable={false}
          eventOverlap={false}
          eventConstraint={{
            startTime: "09:00:00",
            endTime: "22:00:00",
            dows: [0, 1, 2, 3, 4, 5, 6],
          }}
        />

        <ScheduleModal
          isOpen={isModalOpen}
          onClose={() => {
            setIsModalOpen(false);
            setSelectedEvent(null);
          }}
          event={selectedEvent}
          onUpdate={api.updateSchedule}
          onDelete={api.deleteSchedule}
        />
      </div>
    </div>
  );
}
