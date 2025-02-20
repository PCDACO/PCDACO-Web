import { GetToken } from "../actions/shared/action";

export const dynamic = "force-static";

export default async function Home() {
  const tokens = await GetToken();
  console.log("🔍 ~ app/(dashboard)/page.tsx:6 ~ tokens:", tokens)
  return <h1>PCDACO ADMIN PAGE</h1>;
}
