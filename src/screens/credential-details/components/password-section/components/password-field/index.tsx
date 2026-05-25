import { Section } from "@/components/ui/section";

type Props = {
  password: string | null;
};

export function PasswordField({ password }: Props) {
  return (
    <Section.Item.Content.Description>
      {password ?? "••••••••••••••"}
    </Section.Item.Content.Description>
  );
}
