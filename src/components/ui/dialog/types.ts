import type { AndroidSymbol, SFSymbol } from "expo-symbols";

export type DialogIcon = {
  ios?: SFSymbol;
  android?: AndroidSymbol;
};

export type DialogProps = {
  isOpen: boolean;
  title: string;
  description?: string;
  confirmLabel: string;
  cancelLabel?: string;
  destructive?: boolean;
  onConfirm: () => void;
  onCancel?: () => void;
};
