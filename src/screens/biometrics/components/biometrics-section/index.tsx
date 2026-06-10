import { useTranslation } from "react-i18next";
import { View } from "react-native";

import { Card } from "@/components/ui/card";
import { Section } from "@/components/ui/section";
import { Text } from "@/components/ui/text";

import { useBiometrics } from "@/hooks/use-biometrics";
import { useStyles } from "@/hooks/use-styles";

import { getStyles } from "./styles";

export function BiometricsSection() {
  const { data } = useBiometrics();
  const { styles } = useStyles(getStyles);
  const { t } = useTranslation("biometrics", {
    keyPrefix: "screen.sections.capabilities",
  });

  return (
    <Section.Root>
      <Section.Header>
        <Section.Header.Title>{t("label")}</Section.Header.Title>
      </Section.Header>

      <Card color="element">
        <Section.Item.Root>
          <Section.Item.Content>
            <Section.Item.Content.Title>
              {t("fields.types.label")}
            </Section.Item.Content.Title>

            <View style={styles.supportedTypesContainer}>
              {data?.supportedAuthTypes?.map((type) => (
                <Section.Item.Content.Description key={type} typography="body">
                  {t(`fields.types.values.${type}`)}
                </Section.Item.Content.Description>
              ))}
            </View>
          </Section.Item.Content>
        </Section.Item.Root>

        <Section.Divider style={styles.divider} />

        <Section.Item.Root>
          <Section.Item.Content>
            <Section.Item.Content.Title>
              {t("fields.hardware.label")}
            </Section.Item.Content.Title>
          </Section.Item.Content>
          <Section.Item.Trailing>
            <Text color="muted" style={styles.value}>
              {t(`fields.hardware.values.${data?.hasHardware}`)}
            </Text>
          </Section.Item.Trailing>
        </Section.Item.Root>

        <Section.Divider style={styles.divider} />

        <Section.Item.Root>
          <Section.Item.Content>
            <Section.Item.Content.Title>
              {t("fields.enrollment_status.label")}
            </Section.Item.Content.Title>
          </Section.Item.Content>
          <Section.Item.Trailing>
            <Text color="muted" style={styles.value}>
              {t(`fields.enrollment_status.values.${data?.isEnrolled}`)}
            </Text>
          </Section.Item.Trailing>
        </Section.Item.Root>

        <Section.Divider style={styles.divider} />

        <Section.Item.Root>
          <Section.Item.Content>
            <Section.Item.Content.Title>
              {t("fields.enrollment_level.label")}
            </Section.Item.Content.Title>
          </Section.Item.Content>
          <Section.Item.Trailing>
            <Text color="muted" style={styles.value}>
              {t(`fields.enrollment_level.values.${data?.enrolledLevel}`)}
            </Text>
          </Section.Item.Trailing>
        </Section.Item.Root>
      </Card>
    </Section.Root>
  );
}
