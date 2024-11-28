import React, { useEffect, useState } from "react";
import { InputNumber } from "antd";
import { ClockCircleOutlined } from "@ant-design/icons";

interface TimeInputProps {
  value?: string; // Giá trị dạng chuỗi HH:mm:ss
  onChange?: (value: string) => void; // Hàm xử lý khi thay đổi giá trị
}

const TimeInput: React.FC<TimeInputProps> = ({
  value = "00:00:00",
  onChange,
}) => {
  const [time, setTime] = useState<{
    hours: number;
    minutes: number;
    seconds: number;
  }>({
    hours: 0,
    minutes: 0,
    seconds: 0,
  });

  // Chuyển đổi chuỗi thành object khi `value` thay đổi
  useEffect(() => {
    const [hours, minutes, seconds] = value
      .split(":")
      .map((v) => parseInt(v, 10) || 0);
    setTime({ hours, minutes, seconds });
  }, [value]);

  // Xử lý khi thay đổi giá trị của từng trường
  const handleInputChange = (
    num: number | null,
    field: "hours" | "minutes" | "seconds"
  ) => {
    const newTime = { ...time, [field]: num || 0 };
    setTime(newTime);

    // Gọi hàm onChange với chuỗi HH:mm:ss mới
    const formattedTime = `${newTime.hours
      .toString()
      .padStart(2, "0")}:${newTime.minutes
      .toString()
      .padStart(2, "0")}:${newTime.seconds.toString().padStart(2, "0")}`;
    onChange?.(formattedTime);
  };

  return (
    <div style={{ display: "flex", gap: "5px" }}>
      <InputNumber
        min={0}
        max={23}
        value={time.hours}
        onChange={(val) => handleInputChange(val, "hours")}
        placeholder="HH"
        formatter={(val) => `${val}`.padStart(2, "0")}
        parser={(val) => parseInt(val || "0", 10)}
        style={{ width: "80px" }}
        prefix={<ClockCircleOutlined />}
      />
      :
      <InputNumber
        min={0}
        max={59}
        value={time.minutes}
        onChange={(val) => handleInputChange(val, "minutes")}
        placeholder="MM"
        formatter={(val) => `${val}`.padStart(2, "0")}
        parser={(val) => parseInt(val || "0", 10)}
        style={{ width: "80px" }}
      />
      :
      <InputNumber
        min={0}
        max={59}
        value={time.seconds}
        onChange={(val) => handleInputChange(val, "seconds")}
        placeholder="SS"
        formatter={(val) => `${val}`.padStart(2, "0")}
        parser={(val) => parseInt(val || "0", 10)}
        style={{ width: "80px" }}
      />
    </div>
  );
};

export default TimeInput;
