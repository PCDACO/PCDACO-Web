import { SharedResponse } from "@/domains/models/shared/shared.response";
import { CreateTransmissionResponse } from "@/domains/models/transmissions/createTransmission.response";
import { GetTransmissionsResponses } from "@/domains/models/transmissions/getTransmissions.response";
import { generateGuid } from "@/lib/uuid";
import { cookies } from "next/headers";
import { NextResponse } from "next/server";

const url = process.env.NEXT_PRIVATE_API_URL;

export const GET = async (req: Request) => {
  const { searchParams } = new URL(req.url);
  const index = Number(searchParams.get("index")) ?? 1;
  const size = Number(searchParams.get("size")) ?? 10;
  const keyword = searchParams.get("keyword") ?? "";
  const accessToken = (await cookies()).get("accessToken");
  const response = await fetch(
    `${url}/api/transmission-types?index=${index}&size=${size}&${keyword}`,
    {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${accessToken!.value}`,
      },
    }
  );
  return NextResponse.json<SharedResponse<GetTransmissionsResponses>>(
    await response.json(),
    { status: response.status }
  );
};
export const POST = async (req: Request) => {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const { name } = await req.json();
  const accessToken = (await cookies()).get("accessToken");
  if (!accessToken) return NextResponse.json(null, { status: 401 });
  const response = await fetch(`${url}/api/transmission-types`, {
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
  return NextResponse.json<SharedResponse<CreateTransmissionResponse>>(
    await response.json(),
    { status: response.status }
  );
};
