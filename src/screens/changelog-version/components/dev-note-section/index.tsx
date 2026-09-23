import { useTranslation } from "react-i18next";
import { ImageBackground, View } from "react-native";

import { Card } from "@/components/ui/card";
import { IconButton } from "@/components/ui/icon-button";
import { Text } from "@/components/ui/text";

import { author } from "@/config/author";

import { useStyles } from "@/hooks/use-styles";
import { useTheme } from "@/hooks/use-theme";

import { getStyles } from "./styles";

type Note = {
  title: string;
  content: string[];
};

type Props = {
  version: string;
};

export function DevNoteSection({ version }: Props) {
  const { resolvedThemeOption } = useTheme();
  const { styles } = useStyles(getStyles);
  const { t } = useTranslation("versions", {
    keyPrefix: version,
  });

  const note = t("note", {
    defaultValue: "",
    returnObjects: true,
  }) as Note | null;

  if (!note) {
    return null;
  }

  return (
    <Card
      color={resolvedThemeOption === "dark" ? "base" : "element"}
      style={styles.card}
    >
      <Text weight="medium" color="muted">
        {note.title}
      </Text>

      <View style={styles.content}>
        {note.content.map((paragraph, index) => (
          <Text key={index.toString()} color="element">
            {paragraph}
          </Text>
        ))}
      </View>

      <View style={styles.footer}>
        <IconButton size={11} accessible={false}>
          <ImageBackground
            src={author.avatar}
            alt=""
            style={styles.authorAvatar}
          >
            <View style={styles.avatarRing} />
          </ImageBackground>
        </IconButton>
      </View>
    </Card>
  );
}
