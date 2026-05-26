import { useTranslation } from "react-i18next";

import { Card } from "@/components/ui/card";
import { Section } from "@/components/ui/section";

type Props = {
  username: string;
};

export function CredentialSection({ username }: Props) {
  const { t } = useTranslation("credential-details", {
    keyPrefix: "screen.sections.credential",
  });

  return (
    <Section.Root>
      <Card color="element">
        <Section.Item.Root>
          <Section.Item.Content>
            <Section.Item.Content.Title typography="bodySmall">
              {t("fields.username.label")}
            </Section.Item.Content.Title>
            <Section.Item.Content.Description>
              {username}
            </Section.Item.Content.Description>
          </Section.Item.Content>
        </Section.Item.Root>

        {/* <Section.Divider style={{ marginLeft: theme.spacing[4] }} /> */}

        {/* <Section.Item.Root>
                  <Section.Item.Content>
                    <Section.Item.Content.Title typography="bodySmall">
                      Website
                    </Section.Item.Content.Title>
                    <Section.Item.Content.Description>
                      https://github.com
                    </Section.Item.Content.Description>
                  </Section.Item.Content>
                  <Section.Item.Trailing style={{ marginRight: -12 }}>
                    <IconButton size={10}>
                      <Section.Item.Trailing.Icon
                        size={Platform.select({
                          ios: theme.size[5],
                          default: theme.size[5],
                        })}
                        name={{ android: "arrow_outward" }}
                      />
                    </IconButton>
                  </Section.Item.Trailing>
                </Section.Item.Root> */}

        {/* <Section.Item.Root>
          <Section.Item.Content>
            <Section.Item.Content.Description
              typography="label"
              style={{ textAlign: "center" }}
            >
              Updated <Text typography="label">Apr 10, 2026</Text>
            </Section.Item.Content.Description>
          </Section.Item.Content>
        </Section.Item.Root> */}
      </Card>
    </Section.Root>
  );
}
