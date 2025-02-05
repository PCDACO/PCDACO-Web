import { GetManufacturersResponses } from "@/domains/models/manufacturers/getManufacturers.response";
import { SharedResponse } from "@/domains/models/shared/shared.response";
import { generateGuid } from "@/lib/uuid";
import { cookies } from "next/headers";
import { NextResponse } from "next/server";

const url = process.env.NEXT_PRIVATE_API_URL;

export const GET = async (req: Request) => {
  const { searchParams } = new URL(req.url);
  const index = Number(searchParams.get("index"));
  const size = Number(searchParams.get("size"));
  const keyword = searchParams.get("keyword") ?? "";
  const accessToken = (await cookies()).get("accessToken");
  if (!accessToken) return NextResponse.json(null, { status: 401 });
  console.log(
    "APIIIII" +
      `${url}/api/manufacturers?index=${index}&size=${size}&keyword=${keyword}`
  );
  const response = await fetch(
    `${url}/api/manufacturers?index=${index}&size=${size}&keyword=${keyword}`,
    {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${accessToken!.value}`,
      },
    }
  );
  return NextResponse.json<SharedResponse<GetManufacturersResponses>>(
    await response.json(),
    { status: 200 }
  );
};

export const POST = async (req: Request) => {
  const { name } = await req.json();
  const accessToken = (await cookies()).get("accessToken");
  if (!accessToken) return NextResponse.json(null, { status: 401 });
  const response = await fetch(`${url}/api/manufacturers`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${accessToken!.value}`,
      "Idempotence-Key": generateGuid(),
    },
    body: JSON.stringify({
      name,
    }),
  });
  return NextResponse.json(await response.json(), { status: response.status });
};
