import { cookies } from "next/headers";
import { NextResponse } from "next/server";
import { Context } from "vm";

const url = `${process.env.NEXT_PRIVATE_API_URL}`;

export const PUT = async (req: Request, context: Context) => {
  const { id } = await context.params;
  const { name, description } = await req.json();
  const accessToken = (await cookies()).get("accessToken");
  if (!accessToken) return NextResponse.json(null, { status: 401 });
  const response = await fetch(`${url}/api/amenities/${id}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${accessToken!.value}`,
    },
    body: JSON.stringify({
      name,
      description,
    }),
  });
  return NextResponse.json(await response.json(), { status: response.status });
};
export const DELETE = async (_: Request, context: Context) => {
  const { id } = await context.params;
  console.log(id);
  const accessToken = (await cookies()).get("accessToken");
  if (!accessToken) return NextResponse.json(null, { status: 401 });
  console.log(`${url}/api/amenities/${id}`);
  const response = await fetch(`${url}/api/amenities/${id}`, {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${accessToken!.value}`,
    },
  });
  return NextResponse.json(await response.json(), { status: response.status });
};
