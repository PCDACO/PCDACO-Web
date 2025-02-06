import { CreateAmenitiesResponse } from "@/domains/models/amenities/createAmenities.response";
import { GetAmenitiesResponses } from "@/domains/models/amenities/getamenities.response";
import { SharedResponse } from "@/domains/models/shared/shared.response";
import { NextResponse } from "next/server";
import axiosInstance from "../(config)/axios.server";
import axios from "axios";
import { ErrorResponses } from "../domains/responses/ErrorResponses";

export const GET = async (req: Request) => {
  const { searchParams } = new URL(req.url);
  const index = Number(searchParams.get("index"));
  const size = Number(searchParams.get("size"));
  const keyword = searchParams.get("keyword") ?? "";
  try {
    const response = await axiosInstance.get(`/api/amenities`, {
      params: {
        index: index,
        size: size,
        keyword: keyword,
      },
    });
    return NextResponse.json<SharedResponse<GetAmenitiesResponses>>(
      response.data,
      {
        status: response.status,
      }
    );
  } catch (error) {
    if (axios.isCancel(error))
      return NextResponse.json(ErrorResponses[401], { status: 401 });
    return NextResponse.json(ErrorResponses[500], { status: 500 });
  }
};

export const POST = async (req: Request) => {
  const { name, description } = await req.json();
  try {
    const response = await axiosInstance.post(`/api/amenities`, {
      name,
      description,
    });
    return NextResponse.json<SharedResponse<CreateAmenitiesResponse>>(
      response.data,
      { status: response.status }
    );
  } catch (error) {
    if (axios.isCancel(error))
      return NextResponse.json(ErrorResponses[401], { status: 401 });
    return NextResponse.json(ErrorResponses[500], { status: 500 });
  }
};
