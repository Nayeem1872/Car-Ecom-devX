"use client";

import React, { useState, useRef, useCallback } from "react";

interface CustomSliderProps {
  defaultValue: number[];
  min: number;
  max: number;
  step: number;
  onValueChange: (value: number[]) => void;
  className?: string;
}

const CustomSlider: React.FC<CustomSliderProps> = ({
  defaultValue,
  min,
  max,
  step,
  onValueChange,
  className = "",
}) => {
  const [value, setValue] = useState(defaultValue[1] || max); // Use the max value from the range
  const [isDragging, setIsDragging] = useState(false);
  const sliderRef = useRef<HTMLDivElement>(null);

  const getPercentage = (val: number) => ((val - min) / (max - min)) * 100;

  const getValueFromPosition = (clientX: number) => {
    if (!sliderRef.current) return min;

    const rect = sliderRef.current.getBoundingClientRect();
    const percentage = Math.max(
      0,
      Math.min(1, (clientX - rect.left) / rect.width)
    );
    const rawValue = min + percentage * (max - min);
    return Math.round(rawValue / step) * step;
  };

  const handleMouseDown = (e: React.MouseEvent) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleMouseMove = useCallback(
    (e: MouseEvent) => {
      if (!isDragging) return;

      const newValue = getValueFromPosition(e.clientX);
      setValue(newValue);
      onValueChange([min, newValue]); // Always return [min, currentValue] to maintain the range format
    },
    [isDragging, onValueChange, min]
  );

  const handleMouseUp = useCallback(() => {
    setIsDragging(false);
  }, []);

  React.useEffect(() => {
    if (isDragging) {
      document.addEventListener("mousemove", handleMouseMove);
      document.addEventListener("mouseup", handleMouseUp);
      return () => {
        document.removeEventListener("mousemove", handleMouseMove);
        document.removeEventListener("mouseup", handleMouseUp);
      };
    }
  }, [isDragging, handleMouseMove, handleMouseUp]);

  const handleTrackClick = (e: React.MouseEvent) => {
    if (isDragging) return;

    const newValue = getValueFromPosition(e.clientX);
    setValue(newValue);
    onValueChange([min, newValue]);
  };

  const percentage = getPercentage(value);

  return (
    <div className={`relative w-full ${className}`}>
      <div
        ref={sliderRef}
        className="relative h-2 cursor-pointer"
        onClick={handleTrackClick}
      >
        {/* Track - Gray background (unselected area) */}
        <div className="absolute inset-0 bg-gray-200 rounded-full" />

        {/* Range - Red background (selected area from min to current value) */}
        <div
          className="absolute h-full bg-red-500 rounded-full"
          style={{
            left: "0%",
            width: `${percentage}%`,
          }}
        />

        {/* Single Thumb */}
        <div
          className="absolute w-5 h-5 bg-gray-500 border-2 border-gray-500 rounded-full cursor-grab active:cursor-grabbing transform -translate-x-1/2 -translate-y-1/2 top-1/2 hover:bg-gray-600 hover:border-gray-600 transition-colors duration-200 shadow-md"
          style={{ left: `${percentage}%` }}
          onMouseDown={handleMouseDown}
        />
      </div>
    </div>
  );
};

export default CustomSlider;
