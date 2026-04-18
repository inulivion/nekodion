import { getGmailStatus } from "@/features/gmail/api";
import { SettingsPage } from "./_components";

export default async function Settings() {
  const statusResult = await getGmailStatus();
  const connected =
    "body" in statusResult &&
    (statusResult.body as { connected: boolean }).connected;

  return <SettingsPage connected={connected} />;
}
