import { NextResponse } from "next/server";
import axiosInstance from "../../(config)/axios.server";
import axios from "axios";

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const PUT = async (req: Request, context: any) => {
  const { id } = await context.params;
  const { name } = await req.json();
  try {
    const response = await axiosInstance.put(`/api/manufacturers/${id}`, {
      name,
    });
    return NextResponse.json(response.data, { status: 204 });
  } catch (error) {
    if (axios.isCancel(error)) {
      return NextResponse.json(null, { status: 401 });
    }
    return NextResponse.json(null, { status: 500 });
  }
};
// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const DELETE = async (_: Request, context: any) => {
  const { id } = await context.params;
  try {
    const response = await axiosInstance.delete(`/api/manufacturers/${id}`);
    return NextResponse.json(response.data, { status: 204 });
  } catch (error) {
    if (axios.isCancel(error)) {
      return NextResponse.json(null, { status: 401 });
    }
    return NextResponse.json(null, { status: 500 });
  }
};
