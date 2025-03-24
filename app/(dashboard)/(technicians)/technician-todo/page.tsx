import TechnicianTodo from "@/components/technician-todo/todo/todo";
import { GetTechnicianTasks } from "./action";

export default async function TechnicianTodoPage() {
  const response = await GetTechnicianTasks();

  return <TechnicianTodo tasks={response.value} />
}
