import { useTranslation } from "react-i18next";

import { Card } from "@/components/ui/card";
import { Section } from "@/components/ui/section";

import { useStyles } from "@/hooks/use-styles";

import { getStyles } from "./styles";

type Props = {
  username: string;
  website?: string;
};

export function CredentialSection({ username, website }: Props) {
  const { styles } = useStyles(getStyles);
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
