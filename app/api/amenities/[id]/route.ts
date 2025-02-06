import { NextResponse } from "next/server";
import axiosInstance from "../../(config)/axios.server";
import { SharedResponse } from "@/domains/models/shared/shared.response";
import axios from "axios";
import { ErrorResponses } from "../../domains/responses/ErrorResponses";

const url = `${process.env.NEXT_PRIVATE_API_URL}`;

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const PUT = async (req: Request, context: any) => {
  const { id } = context.params;
  const { name, description } = await req.json();
  try {
    const response = await axiosInstance.put(`${url}/api/amenities/${id}`, {
      name,
      description,
    });
    return NextResponse.json<SharedResponse>(response.data, {
      status: response.status,
    });
  } catch (error) {
    if (axios.isCancel(error)) {
      return NextResponse.json(ErrorResponses[401], { status: 401 });
    }
    return NextResponse.json(ErrorResponses[500], { status: 500 });
  }
};
// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const DELETE = async (_: Request, context: any) => {
  const { id } = await context.params;
  try {
    const response = await axiosInstance.delete(`${url}/api/amenities/${id}`);
    return NextResponse.json(response.data, { status: response.status });
  } catch (error) {
    if (axios.isCancel(error)) {
      return NextResponse.json(ErrorResponses[401], { status: 401 });
    }
    return NextResponse.json(ErrorResponses[500], { status: 500 });
  }
};
