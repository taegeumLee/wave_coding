import { useState, useCallback } from "react";
import { StudentColor } from "../types";

const STUDENT_COLORS: StudentColor[] = [
  {
    backgroundColor: "#3B82F680",
    borderColor: "#2563EB",
    textColor: "#1E40AF",
  },
  {
    backgroundColor: "#10B98180",
    borderColor: "#059669",
    textColor: "#047857",
  },
  {
    backgroundColor: "#F59E0B80",
    borderColor: "#D97706",
    textColor: "#92400E",
  },
  {
    backgroundColor: "#EF444480",
    borderColor: "#DC2626",
    textColor: "#B91C1C",
  },
  {
    backgroundColor: "#8B5CF680",
    borderColor: "#7C3AED",
    textColor: "#5B21B6",
  },
  {
    backgroundColor: "#EC489980",
    borderColor: "#DB2777",
    textColor: "#BE185D",
  },
];

export const useStudentColors = () => {
  const [colorMap, setColorMap] = useState<Record<string, StudentColor>>({});

  const getStudentColor = useCallback(
    (studentId: string): StudentColor => {
      if (colorMap[studentId]) return colorMap[studentId];

      const colorIndex = Object.keys(colorMap).length % STUDENT_COLORS.length;
      const newColor = STUDENT_COLORS[colorIndex];
      setColorMap((prev) => ({ ...prev, [studentId]: newColor }));
      return newColor;
    },
    [colorMap]
  );

  return { getStudentColor };
};
