import { Link } from "expo-router";
import { SymbolView } from "expo-symbols";
import { useTranslation } from "react-i18next";

import { Card } from "@/components/ui/card";
import { IconButton } from "@/components/ui/icon-button";
import { Section } from "@/components/ui/section";

import { useHaptics } from "@/hooks/use-haptics";
import { useStyles } from "@/hooks/use-styles";

import { getStyles } from "./styles";

type Props = {
  credentialId: string;
  username: string;
  website?: string;
};

export function CredentialSection({ credentialId, username, website }: Props) {
  const { styles, theme } = useStyles(getStyles);
  const { performTapFeedback } = useHaptics();
  const { t } = useTranslation("credential-details", {
    keyPrefix: "screen.sections.credential",
  });

  return (
    <Section.Root>
      <Card color="element">
        <Section.Item.Root>
          <Section.Item.Content>
            <Section.Item.Content.Title>
              {t("fields.username.label")}
            </Section.Item.Content.Title>
            <Section.Item.Content.Description>
              {username}
            </Section.Item.Content.Description>
          </Section.Item.Content>

          <Section.Item.Trailing>
            <Link asChild href={`/credentials/${credentialId}/edit/email`}>
              <IconButton size={10} onPress={performTapFeedback}>
                <SymbolView
                  name={{ android: "edit" }}
                  tintColor={theme.colors.content.element}
                />
              </IconButton>
            </Link>
          </Section.Item.Trailing>
        </Section.Item.Root>

        {website && (
          <>
            <Section.Divider style={styles.divider} />

            <Section.Item.Root>
              <Section.Item.Content>
                <Section.Item.Content.Title>
                  {t("fields.website.label")}
                </Section.Item.Content.Title>
                <Section.Item.Content.Description>
                  {website}
                </Section.Item.Content.Description>
              </Section.Item.Content>
              {/* <Section.Item.Trailing style={{ marginRight: -12 }}>
                <IconButton size={10}>
                  <Section.Item.Trailing.Icon
                    size={Platform.select({
                      ios: theme.size[5],
                      default: theme.size[5],
                    })}
                    name={{ android: "arrow_outward" }}
                  />
                </IconButton>
              </Section.Item.Trailing> */}
            </Section.Item.Root>
          </>
        )}
      </Card>
    </Section.Root>
  );
}
