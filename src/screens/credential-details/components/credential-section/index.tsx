import { useTranslation } from "react-i18next";

import { Card } from "@/components/ui/card";
import { Section } from "@/components/ui/section";
import { Text } from "@/components/ui/text";

import { useLanguage } from "@/hooks/use-language";
import { useTheme } from "@/hooks/use-theme";

import { DateUtils } from "@/utils/date";

type Props = {
  username: string;
  website?: string;
  updatedAt?: Date;
};

export function CredentialSection({ username, website, updatedAt }: Props) {
  const { theme } = useTheme();
  const { language } = useLanguage();
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
            <Section.Divider style={{ marginLeft: theme.spacing[4] }} />

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

      {updatedAt && (
        <Text
          typography="bodySmall"
          color="muted"
          style={{ paddingHorizontal: theme.spacing[4] }}
        >
          {t("fields.updated_at.label")}{" "}
          <Text typography="bodySmall" color="base">
            {DateUtils.formatDate(updatedAt, { language })}
          </Text>
        </Text>
      )}
    </Section.Root>
  );
}
