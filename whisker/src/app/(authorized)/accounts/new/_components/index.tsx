"use client";

import { useActionState } from "react";
import {
  createAccountAction,
  CreateAccountActionState,
} from "@/features/accounts/actions";
import { AccountTemplateResponse } from "@/features/accounts/types";
import { AccountForm } from "@/features/accounts/components/AccountForm";

type Props = {
  templates: AccountTemplateResponse[];
};

const initialState: CreateAccountActionState = {};

export const CreateAccountPage = ({ templates }: Props) => {
  const [state, formAction, isPending] = useActionState(
    createAccountAction,
    initialState,
  );

  return (
    <div className="mx-auto max-w-lg">
      <h1 className="mb-6 text-xl font-bold tracking-tight">口座追加</h1>

      <AccountForm
        formAction={formAction}
        isPending={isPending}
        errors={state.errors}
        templates={templates}
        submitLabel="追加する"
        pendingLabel="作成中..."
      />
    </div>
  );
};
