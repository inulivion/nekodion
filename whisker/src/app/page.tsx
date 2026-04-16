import { fetcher } from "@/util/fetcher";

export default async function Home() {
  const res = await fetcher.get("/test");
  return <div>{res.body}</div>;
}
