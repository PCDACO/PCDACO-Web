import { SharedResponse } from "@/domains/models/shared/shared.response";
import { CreateTransmissionResponse } from "@/domains/models/transmissions/createTransmission.response";
import { GetTransmissionsResponses } from "@/domains/models/transmissions/getTransmissions.response";
import { NextResponse } from "next/server";
import axiosInstance from "../(config)/axios.server";
import axios from "axios";
import { ErrorResponses } from "../domains/responses/ErrorResponses";

export const GET = async (req: Request) => {
  const { searchParams } = new URL(req.url);
  const index = Number(searchParams.get("index")) ?? 1;
  const size = Number(searchParams.get("size")) ?? 10;
  const keyword = searchParams.get("keyword") ?? "";
  try {
    const response = await axiosInstance.get(`/api/transmission-types`, {
      params: {
        index: index,
        size: size,
        keyword: keyword,
      },
    });
    return NextResponse.json<SharedResponse<GetTransmissionsResponses>>(
      response.data,
      { status: response.status }
    );
  } catch (error) {
    if (axios.isCancel(error))
      return NextResponse.json(ErrorResponses[401], { status: 401 });
    return NextResponse.json(ErrorResponses[500], { status: 500 });
  }
};
export const POST = async (req: Request) => {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const { name } = await req.json();
  try {
    const response = await axiosInstance.post(`/api/transmission-types`, {
      name,
    });
    return NextResponse.json<SharedResponse<CreateTransmissionResponse>>(
      response.data,
      { status: response.status }
    );
  } catch (error) {
    if (axios.isCancel(error))
      return NextResponse.json(ErrorResponses[401], { status: 401 });
    return NextResponse.json(ErrorResponses[500], { status: 500 });
  }
};
