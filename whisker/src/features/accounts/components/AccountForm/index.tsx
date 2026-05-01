"use client";

import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { FormField } from "@/components/common/FormField";
import { AccountTemplateResponse } from "@/features/accounts/types";
import { ACCOUNT_TYPE_LABELS } from "@/features/accounts/const";

type FormErrors = {
  global?: string;
  accountType?: string;
  accountName?: string;
};

type Props = {
  formAction: (payload: FormData) => void;
  isPending: boolean;
  errors?: FormErrors;
  defaultValues?: {
    accountType?: string;
    accountTemplateId?: string;
    accountName?: string;
  };
  templates: AccountTemplateResponse[];
  submitLabel: string;
  pendingLabel: string;
  hiddenId?: string;
  showInitialAmount?: boolean;
  extraActions?: React.ReactNode;
};

export const AccountForm = ({
  formAction,
  isPending,
  errors,
  defaultValues,
  templates,
  submitLabel,
  pendingLabel,
  hiddenId,
  showInitialAmount = false,
  extraActions,
}: Props) => {
  const [accountName, setAccountName] = useState(
    defaultValues?.accountName ?? "",
  );

  const handleTemplateChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    if (!showInitialAmount) return;
    const val = e.target.value;
    if (val) {
      const tpl = templates.find((t) => String(t.id) === val);
      if (tpl) setAccountName(tpl.accountName);
    }
  };

  return (
    <form action={formAction} className="space-y-5">
      {hiddenId && <input type="hidden" name="id" value={hiddenId} />}

      {errors?.global && (
        <div className="bg-destructive/10 border-destructive/20 text-destructive rounded-lg border px-4 py-3 text-sm">
          {errors.global}
        </div>
      )}

      <FormField label="口座種別" error={errors?.accountType}>
        <select
          name="accountType"
          defaultValue={defaultValues?.accountType ?? ""}
          className="border-input bg-background focus:ring-ring w-full rounded-lg border px-3 py-2 text-sm transition focus:border-transparent focus:ring-2 focus:outline-none"
        >
          <option value="">選択してください</option>
          {Object.entries(ACCOUNT_TYPE_LABELS).map(([value, label]) => (
            <option key={value} value={value}>
              {label}
            </option>
          ))}
        </select>
      </FormField>

      <FormField label="連携口座" optional>
        <select
          name="accountTemplateId"
          defaultValue={defaultValues?.accountTemplateId ?? ""}
          onChange={handleTemplateChange}
          className="border-input bg-background focus:ring-ring w-full rounded-lg border px-3 py-2 text-sm transition focus:border-transparent focus:ring-2 focus:outline-none"
        >
          <option value="">選択しない</option>
          {templates.map((template) => (
            <option key={template.id} value={template.id}>
              {template.accountName}（
              {ACCOUNT_TYPE_LABELS[template.accountType] ??
                template.accountType}
              ）
            </option>
          ))}
        </select>
      </FormField>

      <FormField label="口座名" error={errors?.accountName}>
        <Input
          type="text"
          name="accountName"
          placeholder="例: 三井住友銀行"
          maxLength={50}
          value={accountName}
          onChange={(e) => setAccountName(e.target.value)}
        />
      </FormField>

      {showInitialAmount && (
        <FormField label="初期残高" optional>
          <Input
            type="number"
            name="initialAmount"
            placeholder="例: 100000"
            min={0}
          />
        </FormField>
      )}

      <div className="flex flex-col gap-3 pt-1">
        <Button type="submit" disabled={isPending} className="w-full">
          {isPending ? pendingLabel : submitLabel}
        </Button>
        {extraActions}
      </div>
    </form>
  );
};
