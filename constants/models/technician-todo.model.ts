// export interface TechnicianTodoPayLoad {}

export interface TechnicianTodoResponse {
  id: string;
  technicianId: string;
}

export type TechnicianTodoParams = RootRequest;

export interface TechnicianTodoEditResponse {
  id: string;
}

export interface TechnicianTodoCreateResponse {
  id: string;
}
