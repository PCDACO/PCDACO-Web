import { CreateAmenitiesResponse } from "@/domains/models/amenities/createAmenities.response";
import { GetAmenitiesResponses } from "@/domains/models/amenities/getamenities.response";
import { SharedResponse } from "@/domains/models/shared/shared.response";
import { generateGuid } from "@/lib/uuid";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { NextResponse } from "next/server";
const url = `${process.env.NEXT_PRIVATE_API_URL}`;

export const GET = async (req: Request) => {
  const { searchParams } = new URL(req.url);
  const index = Number(searchParams.get("index"));
  const size = Number(searchParams.get("size"));
  const keyword = searchParams.get("keyword") ?? "";

  const accessToken = (await cookies()).get("accessToken");
  if (!accessToken) return NextResponse.json(null, { status: 401 });
  const response = await fetch(
    `${url}/api/amenities?index=${index}&size=${size}&keyword=${keyword}`,
    {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${accessToken!.value}`,
      },
    }
  );

  return NextResponse.json<SharedResponse<GetAmenitiesResponses>>(
    await response.json(),
    {
      status: response.status,
    }
  );
};

export const POST = async (req: Request) => {
  const { name, description } = await req.json();
  const accessToken = (await cookies()).get("accessToken");
  if (!accessToken) redirect("/login");
  const response = await fetch(`${url}/api/amenities`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${accessToken!.value}`,
      "Idempotence-Key": generateGuid(),
    },
    body: JSON.stringify({
      name,
      description,
    }),
  });
  return NextResponse.json<SharedResponse<CreateAmenitiesResponse>>(
    await response.json(),
    { status: response.status }
  );
};
