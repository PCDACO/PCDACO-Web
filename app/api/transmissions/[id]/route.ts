import { NextResponse } from "next/server";
import axiosInstance from "../../(config)/axios.server";
import axios from "axios";

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const PUT = async (req: Request, context: any) => {
  const { id } = await context.params;
  const { name } = await req.json();
  try {
    const response = await axiosInstance.put(`/api/transmission-types/${id}`, {
      name,
    });
    return NextResponse.json(response.data, { status: 204 });
  } catch (error) {
    if (axios.isCancel(error)) {
      return NextResponse.json(
        {
          isSuccess: false,
          message: error,
          value: null,
        },
        { status: 401 }
      );
    }
    return NextResponse.json(
      {
        isSuccess: false,
        message: error,
        value: null,
      },
      { status: 500 }
    );
  }
};
// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const DELETE = async (_: Request, context: any) => {
  const { id } = await context.params;
  try {
    const response = await axiosInstance.delete(
      `/api/transmission-types/${id}`
    );
    return NextResponse.json(response.data, { status: 204 });
  } catch (error) {
    if (axios.isCancel(error)) {
      return NextResponse.json(
        {
          isSuccess: false,
          message: error,
          value: null,
        },
        { status: 401 }
      );
    }
    return NextResponse.json(
      {
        isSuccess: false,
        message: error,
        value: null,
      },
      { status: 500 }
    );
  }
};
