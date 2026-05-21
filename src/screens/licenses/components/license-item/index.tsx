import { ImageBackground, View } from "react-native";

import { Section } from "@/components/ui/section";
import { Text } from "@/components/ui/text";
import { useStyles } from "@/hooks/use-styles";
import { getStyles } from "./styles";

type Props = {
  imageUrl: string;
  name: string;
  licenses: string;
  version: string;
};

export function LicenseItem({ imageUrl, name, licenses, version }: Props) {
  const { styles } = useStyles(getStyles);

  return (
    <Section.Item.Root>
      <Section.Item.Leading style={styles.avatarContainer}>
        <ImageBackground
          source={{ uri: imageUrl }}
          style={styles.avatar}
          alt=""
        />
        <View style={styles.avatarRing} />
      </Section.Item.Leading>
      <Section.Item.Content>
        <Section.Item.Content.Title numberOfLines={undefined}>
          {name}
        </Section.Item.Content.Title>
        <Section.Item.Content.Description>
          {licenses}
        </Section.Item.Content.Description>
      </Section.Item.Content>

      <Section.Item.Trailing>
        <Text color="muted" style={styles.version}>
          {version}
        </Text>
      </Section.Item.Trailing>
    </Section.Item.Root>
  );
}
