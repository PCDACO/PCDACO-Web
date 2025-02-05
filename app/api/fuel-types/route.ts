import { CreateFuelTypeResponse } from "@/domains/models/fuel-types/createFuelType.response";
import { GetFuelTypesResponses } from "@/domains/models/fuel-types/getFuelTypes.response";
import { SharedResponse } from "@/domains/models/shared/shared.response";
import { NextResponse } from "next/server";
import axiosInstance from "../(config)/axios.server";
import axios from "axios";

export const GET = async (req: Request) => {
  const { searchParams } = new URL(req.url);
  const index = Number(searchParams.get("index")) ?? 1;
  const size = Number(searchParams.get("size")) ?? 10;
  const keyword = searchParams.get("keyword") ?? "";
  try {
    const response = await axiosInstance.get(`/api/fuel-types`, {
      params: {
        index: index,
        size: size,
        keyword: keyword,
      },
    });
    return NextResponse.json<SharedResponse<GetFuelTypesResponses>>(
      response.data,
      { status: response.status }
    );
  } catch (error) {
    if (axios.isCancel(error)) return NextResponse.json(null, { status: 401 });
    return NextResponse.json(null, { status: 500 });
  }
};
export const POST = async (req: Request) => {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const { name } = await req.json();
  const response = await axiosInstance.post(`/api/fuel-types`, {
    name,
  });
  return NextResponse.json<SharedResponse<CreateFuelTypeResponse>>(
    response.data,
    { status: response.status }
  );
};
