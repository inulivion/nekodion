type Props = {
  label: string;
  optional?: boolean;
  error?: string;
  children: React.ReactNode;
};

export const FormField = ({ label, optional, error, children }: Props) => {
  return (
    <div className="space-y-1.5">
      <label className="text-foreground block text-sm font-medium">
        {label}
        {optional && (
          <span className="text-muted-foreground ml-1.5 text-xs font-normal">
            任意
          </span>
        )}
      </label>
      {children}
      {error && <p className="text-destructive text-xs">{error}</p>}
    </div>
  );
};
