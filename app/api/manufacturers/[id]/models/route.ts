import axiosInstance from "@/app/api/(config)/axios.server";
import { ErrorResponses } from "@/app/api/domains/responses/ErrorResponses";
import axios from "axios";
import { NextResponse } from "next/server";

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const GET = async (req: Request, context: any) => {
  const { searchParams } = new URL(req.url);
  const { id } = await context.params;
  const index = Number(searchParams.get("index")) ?? 1;
  const size = Number(searchParams.get("size")) ?? 10;
  const keyword = searchParams.get("keyword") ?? "";
  try {
    const response = await axiosInstance.get(
      `/api/manufacturers/${id}/models`,
      {
        params: {
          index: index,
          size: size,
          keyword: keyword,
        },
      }
    );
    return NextResponse.json(response.data, { status: 200 });
  } catch (error) {
    if (axios.isCancel(error)) {
      return NextResponse.json(ErrorResponses[401], { status: 401 });
    }
    return NextResponse.json(ErrorResponses[401], { status: 401 });
  }
};
