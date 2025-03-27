"use client";

import { useState, useEffect } from "react";
import TechnicianTodo from "@/components/technician-todo/todo/todo";
import { GetTechnicianTasks } from "./action";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Calendar } from "@/components/ui/calendar";
import { Button } from "@/components/ui/button";
import { format } from "date-fns";
import { TechnicianTaskResponse } from "@/constants/models/technician-task.model";

export default function TechnicianTodoPage() {
  const [selectedDate, setSelectedDate] = useState<Date | undefined>(
    new Date()
  );
  const [tasks, setTasks] = useState<TechnicianTaskResponse>();

  useEffect(() => {
    if (selectedDate) {
      fetchTasks(selectedDate);
    }
  }, [selectedDate]);

  const fetchTasks = async (date: Date) => {
    const response = await GetTechnicianTasks({
      inspectionDate: date,
    });
    setTasks(response.value);
  };

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">Lịch Làm Việc</h1>

      {/* Picker chọn ngày */}
      <div className="mb-4">
        <Popover>
          <PopoverTrigger asChild>
            <Button variant="outline">
              {selectedDate ? format(selectedDate, "dd/MM/yyyy") : "Chọn ngày"}
            </Button>
          </PopoverTrigger>
          <PopoverContent className="w-auto p-0">
            <Calendar
              mode="single"
              selected={selectedDate}
              onSelect={setSelectedDate}
              initialFocus
            />
          </PopoverContent>
        </Popover>
      </div>

      {/* Hiển thị danh sách công việc */}
      {tasks ? <TechnicianTodo tasks={tasks} /> : <p>Đang tải dữ liệu...</p>}
    </div>
  );
}
