import { User } from "@prisma/client";
import { EventImpl } from "@fullcalendar/core/internal";

export interface StudentColor {
  backgroundColor: string;
  borderColor: string;
  textColor: string;
}

export interface ScheduleModalProps {
  isOpen: boolean;
  onClose: () => void;
  event: EventImpl | null;
  onUpdate: (id: string, startTime: Date, endTime: Date) => Promise<void>;
  onDelete: (id: string) => Promise<void>;
}
