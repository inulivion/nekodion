import { getAccountTemplates } from "@/features/accounts/api";
import { CreateAccountPage } from "./_components";

export default async function CreateAccount() {
  const templatesResponse = await getAccountTemplates();

  if ("error" in templatesResponse) {
    throw new Error("データの取得に失敗しました");
  }

  return <CreateAccountPage templates={templatesResponse.body} />;
}
