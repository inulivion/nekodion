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
    closingDay?: string;
    balance?: string;
  };
  templates: AccountTemplateResponse[];
  submitLabel: string;
  pendingLabel: string;
  hiddenId?: string;
  showBalance?: boolean;
  extraActions?: React.ReactNode;
};

const READONLY_FIELD_CLASSES =
  "border-input bg-muted/50 text-muted-foreground w-full rounded-lg border px-3 py-2 text-sm";

export const AccountForm = ({
  formAction,
  isPending,
  errors,
  defaultValues,
  templates,
  submitLabel,
  pendingLabel,
  hiddenId,
  showBalance = false,
  extraActions,
}: Props) => {
  const isEditMode = !!hiddenId;

  const [accountName, setAccountName] = useState(
    defaultValues?.accountName ?? "",
  );
  const [accountType, setAccountType] = useState(
    defaultValues?.accountType ?? "",
  );

  const handleTemplateChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const val = e.target.value;
    if (val) {
      const tpl = templates.find((t) => String(t.id) === val);
      if (tpl) setAccountName(tpl.accountName);
    }
  };

  const selectedTemplate = templates.find(
    (t) => String(t.id) === (defaultValues?.accountTemplateId ?? ""),
  );

  const isCredit = accountType === "CREDIT";

  return (
    <form action={formAction} className="space-y-5">
      {hiddenId && <input type="hidden" name="id" value={hiddenId} />}

      {errors?.global && (
        <div className="bg-destructive/10 border-destructive/20 text-destructive rounded-lg border px-4 py-3 text-sm">
          {errors.global}
        </div>
      )}

      <FormField label="口座種別" error={errors?.accountType}>
        {isEditMode ? (
          <>
            <div className={READONLY_FIELD_CLASSES}>
              {ACCOUNT_TYPE_LABELS[accountType] ?? accountType}
            </div>
            <input type="hidden" name="accountType" value={accountType} />
          </>
        ) : (
          <select
            name="accountType"
            value={accountType}
            onChange={(e) => setAccountType(e.target.value)}
            className="border-input focus:ring-ring w-full rounded-lg border px-3 py-2 text-sm transition focus:border-transparent focus:ring-2 focus:outline-none"
          >
            <option value="">選択してください</option>
            {Object.entries(ACCOUNT_TYPE_LABELS).map(([value, label]) => (
              <option key={value} value={value}>
                {label}
              </option>
            ))}
          </select>
        )}
      </FormField>

      <FormField label="連携口座" optional>
        {isEditMode ? (
          <>
            <div className={READONLY_FIELD_CLASSES}>
              {selectedTemplate
                ? `${selectedTemplate.accountName}（${
                    ACCOUNT_TYPE_LABELS[selectedTemplate.accountType] ??
                    selectedTemplate.accountType
                  }）`
                : "選択しない"}
            </div>
            <input
              type="hidden"
              name="accountTemplateId"
              value={defaultValues?.accountTemplateId ?? ""}
            />
          </>
        ) : (
          <select
            name="accountTemplateId"
            defaultValue={defaultValues?.accountTemplateId ?? ""}
            key={defaultValues?.accountTemplateId ?? ""}
            onChange={handleTemplateChange}
            className="border-input focus:ring-ring w-full rounded-lg border px-3 py-2 text-sm transition focus:border-transparent focus:ring-2 focus:outline-none"
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
        )}
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

      {isCredit && (
        <FormField label="締日" optional>
          <Input
            type="number"
            name="closingDay"
            placeholder="例: 15"
            min={1}
            max={31}
            defaultValue={defaultValues?.closingDay ?? ""}
          />
        </FormField>
      )}

      {showBalance && !isCredit && (
        <FormField label="残高" optional>
          <Input
            type="number"
            name="balance"
            placeholder="例: 100000"
            defaultValue={defaultValues?.balance ?? ""}
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
