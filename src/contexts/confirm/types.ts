import type { ReactNode } from "react";
import type { DialogIcon } from "@/components/ui/dialog";

export namespace ConfirmDialogContextTypes {
  export type DialogState = {
    options: Options;
    resolve: (value: boolean) => void;
  };

  export type Options = {
    icon?: DialogIcon;
    title: string;
    description?: string;
    confirmLabel: string;
    cancelLabel: string;
    destructive?: boolean;
  };

  export type Context = {
    confirm: (options: Options) => Promise<boolean>;
  };
}

export namespace ConfirmDialogProviderTypes {
  export type Props = {
    children: ReactNode;
  };
}
