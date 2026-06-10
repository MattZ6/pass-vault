import { useObserve } from "expo-observe";
import { SymbolView } from "expo-symbols";
import { useCallback, useEffect, useMemo } from "react";
import { useTranslation } from "react-i18next";
import { Linking, ScrollView, View } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";

import { Button } from "@/components/ui/button";
import { Text } from "@/components/ui/text";

import { author } from "@/config/author";

import { useLanguage } from "@/hooks/use-language";
import { useStyles } from "@/hooks/use-styles";

import { DateUtils } from "@/utils/date";

import { ScreenHeader } from "./components/screen-header";

import { getStyles } from "./styles";

type Action = {
  type: "email" | "external_policy";
  label?: string;
};

type Hint = {
  label: string;
  content: string;
};

type Section = {
  title: string;
  paragraphs?: string[];
  list?: string[];
  hint?: Hint;
  actions: Action[];
};

const externalPrivacyPolicyUrl = "https://passvault.zanin.dev/privacy-policy";
const lastUpdateDate = new Date("2026-06-05T13:14:00Z");

export function PrivacyPolicyScreen() {
  const edgeInsets = useSafeAreaInsets();
  const { styles, theme } = useStyles((input) => getStyles(input, edgeInsets));
  const { language } = useLanguage();
  const { markInteractive } = useObserve();
  const { t } = useTranslation("privacy-policy", { keyPrefix: "screen" });

  const sections = useMemo(() => {
    return t("sections", { returnObjects: true }) as Section[];
  }, [t]);

  const handleActionPress = useCallback(async (action: Action) => {
    switch (action.type) {
      case "email":
        await Linking.openURL(`mailto:${author.email}`);
        break;

      case "external_policy":
        await Linking.openURL(externalPrivacyPolicyUrl);
        break;

      default:
        break;
    }
  }, []);

  useEffect(() => {
    markInteractive();
  }, [markInteractive]);

  return (
    <>
      <ScreenHeader />

      <ScrollView
        contentInsetAdjustmentBehavior="automatic"
        style={styles.list}
        contentContainerStyle={styles.scrollContainer}
        fadingEdgeLength={{
          start: theme.size[2],
          end: theme.size[8],
        }}
      >
        {sections.map((section) => (
          <View key={section.title} style={styles.section}>
            <Text typography="subtitle" weight="medium">
              {section.title}
            </Text>

            {section.paragraphs && (
              <View style={styles.sectionContent}>
                {section.paragraphs.map((paragraph, index) => (
                  <Text key={index.toString()} color="muted">
                    {paragraph}
                  </Text>
                ))}
              </View>
            )}

            {section.list && (
              <View style={styles.sectionContent}>
                {section.list.map((item, index) => (
                  <View key={index.toString()} style={styles.listItem}>
                    <View style={styles.listItemDot} />
                    <View style={styles.listItemContent}>
                      <Text color="muted">{item}</Text>
                    </View>
                  </View>
                ))}
              </View>
            )}

            {section.hint && (
              <View style={styles.hint}>
                <Text weight="semiBold" typography="bodySmall" color="muted">
                  {section.hint.label}
                </Text>
                <Text typography="bodySmall" color="muted">
                  {section.hint.content}
                </Text>
              </View>
            )}

            {section.actions && (
              <View style={styles.actions}>
                {section.actions.map((action) => (
                  <View key={action.type} style={styles.buttonWrapper}>
                    <Button onPress={() => handleActionPress(action)}>
                      <View style={styles.buttonContent}>
                        <Text>
                          {action.type === "email"
                            ? author.email
                            : action.label}
                        </Text>
                        <SymbolView
                          name={{
                            android:
                              action.type === "email"
                                ? "email"
                                : "arrow_outward",
                          }}
                          size={20}
                          tintColor={theme.colors.content.element}
                        />
                      </View>
                    </Button>
                  </View>
                ))}
              </View>
            )}
          </View>
        ))}

        <Text color="muted" typography="bodySmall" style={styles.lastUpdated}>
          {t("updated_at.label", {
            date: DateUtils.formatDate(lastUpdateDate, { language }),
          })}
        </Text>
      </ScrollView>
    </>
  );
}
