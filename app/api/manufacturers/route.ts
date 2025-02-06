import { GetManufacturersResponses } from "@/domains/models/manufacturers/getManufacturers.response";
import { SharedResponse } from "@/domains/models/shared/shared.response";
import { NextResponse } from "next/server";
import axiosInstance from "../(config)/axios.server";
import axios from "axios";

export const GET = async (req: Request) => {
  const { searchParams } = new URL(req.url);
  const index = Number(searchParams.get("index"));
  const size = Number(searchParams.get("size"));
  const keyword = searchParams.get("keyword") ?? "";
  try {
    const response = await axiosInstance.get(`/api/manufacturers`, {
      params: {
        index: index,
        size: size,
        keyword: keyword,
      },
    });
    return NextResponse.json<SharedResponse<GetManufacturersResponses>>(
      response.data,
      { status: 200 }
    );
  } catch (error) {
    if (axios.isCancel(error))
      return NextResponse.json(
        {
          isSuccess: false,
          message: error,
          value: null,
        },
        { status: 401 }
      );
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

export const POST = async (req: Request) => {
  const { name } = await req.json();
  try {
    const response = await axiosInstance.post(`/api/manufacturers`, {
      name,
    });
    return NextResponse.json(response.data, { status: response.status });
  } catch (error) {
    if (axios.isCancel(error))
      return NextResponse.json(
        {
          isSuccess: false,
          message: error,
          value: null,
        },
        { status: 401 }
      );
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
