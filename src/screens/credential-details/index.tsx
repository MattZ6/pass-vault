import FeatherIcon from "@expo/vector-icons/Feather";
import { Pressable, StyleSheet, Text, View } from "react-native";

import { useVaultStore } from "@/store/vault";

import { colors } from "@/styles/themes/colors/dark";

import { PasswordSection } from "./components/password-section";

type Props = {
  id: string;
};

export function CredentialDetailsScreen({ id }: Props) {
  const getCredentialById = useVaultStore((s) => s.getCredentialById);
  const credential = getCredentialById(id);

  if (!credential) {
    return (
      <View style={{ padding: 80 }}>
        <Text style={{ color: "#ffffff" }}>Not found</Text>
      </View>
    );
  }

  return (
    <View>
      <View style={styles.header}>
        <Pressable>
          {/* Esse cor deixo o ícone escondido por enquanto */}
          <FeatherIcon name="x" color={colors.mauve1} size={22} />
        </Pressable>

        <Text style={styles.headerTitle}>{credential.service}</Text>

        <Pressable>
          <FeatherIcon name="x" color={colors.mauve9} size={22} />
        </Pressable>
      </View>

      <View style={styles.content}>
        <View style={styles.logoContainer}>
          <FeatherIcon name="key" color={colors.mauve9} size={40} />
        </View>

        <View style={styles.field}>
          <Text style={styles.label}>Email / Username</Text>
          <Text style={styles.text}>{credential.username}</Text>
        </View>

        <PasswordSection />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  content: {
    padding: 24,
    gap: 48,
  },
  header: {
    flexDirection: "row",
    alignItems: "center",

    paddingVertical: 16,
    paddingHorizontal: 24,
  },
  headerTitle: {
    flex: 1,

    fontWeight: "600",
    fontSize: 16,
    lineHeight: 24,
    color: colors.mauve12,
    textAlign: "center",
  },
  logoContainer: {
    alignItems: "center",
    justifyContent: "center",

    width: 88,
    height: 88,
    borderRadius: 24,

    alignSelf: "center",

    borderWidth: 1,
    borderColor: colors.mauve4,

    backgroundColor: colors.mauve2,
  },
  field: {
    gap: 8,
  },
  label: {
    fontSize: 12,
    lineHeight: 20,
    textTransform: "uppercase",
    color: colors.mauve9,
    // fontWeight: "600",
    // fontSize: 14,
    // lineHeight: 20,
    // color: colors.mauve11,
  },
  text: {
    fontSize: 16,
    lineHeight: 24,
    color: colors.mauve12,
  },
  passwordContainer: {
    alignItems: "center",
    justifyContent: "center",

    height: 56,
    paddingHorizontal: 16,
    borderRadius: 12,

    backgroundColor: colors.mauve2,
  },
  password: {
    fontSize: 24,
    lineHeight: 32,
    color: colors.mauve11,
  },
  passwordHidden: {
    fontSize: 32,
    // lineHeight: 40K,
    color: colors.mauve11,
    justifyContent: "center",
  },
  passwordHint: {
    fontSize: 14,
    lineHeight: 24,
    color: colors.mauve9,
    textAlign: "center",
  },
  button: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    gap: 16,

    height: 56,
    borderRadius: 12,

    backgroundColor: colors.mauve3,
  },
  buttonText: {
    fontWeight: "600",
    fontSize: 16,
    lineHeight: 24,
    color: colors.mauve12,
  },
});
