import { SharedResponse } from "@/domains/models/shared/shared.response";
import { NextResponse } from "next/server";
import { ErrorResponses } from "../domains/responses/ErrorResponses";
import axios from "axios";
import axiosInstance from "../(config)/axios.server";
import { GetCompensationStatusesResponses } from "@/domains/models/compensation-statuses/getCompensationStatuses.response";

export const GET = async (req: Request) => {
  const { searchParams } = new URL(req.url);
  const index = Number(searchParams.get("index"));
  const size = Number(searchParams.get("size"));
  const keyword = searchParams.get("keyword") ?? "";
  try {
    const response = await axiosInstance.get(`/api/compensation-statuses`, {
      params: {
        index: index,
        size: size,
        keyword: keyword,
      },
    });
    return NextResponse.json<SharedResponse<GetCompensationStatusesResponses>>(
      response.data,
      { status: 200 }
    );
  } catch (error) {
    if (axios.isCancel(error))
      return NextResponse.json(ErrorResponses[401], { status: 401 });
    return NextResponse.json(ErrorResponses[500], { status: 500 });
  }
};
