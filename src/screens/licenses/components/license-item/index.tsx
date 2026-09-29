import { Linking } from "react-native";

import { Button } from "@/components/ui/button";
import { Section } from "@/components/ui/section";

import { useHaptics } from "@/hooks/use-haptics";

type Props = {
  name: string;
  licenses: string;
  licenseUrl: string;
};

export function LicenseItem({ name, licenses, licenseUrl }: Props) {
  const { performTapFeedback } = useHaptics();

  function handlePress() {
    performTapFeedback();
    Linking.openURL(licenseUrl);
  }

  return (
    <Button onPress={handlePress}>
      <Section.Item.Root>
        <Section.Item.Content>
          <Section.Item.Content.Title numberOfLines={undefined}>
            {name}
          </Section.Item.Content.Title>
          <Section.Item.Content.Description>
            {licenses}
          </Section.Item.Content.Description>
        </Section.Item.Content>

        <Section.Item.Trailing>
          <Section.Item.Trailing.Icon />
        </Section.Item.Trailing>
      </Section.Item.Root>
    </Button>
  );
}
