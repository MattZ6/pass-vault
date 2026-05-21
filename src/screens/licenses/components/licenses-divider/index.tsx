import { SectionDivider } from "@/components/ui/section/components/divider";

import { useStyles } from "@/hooks/use-styles";

import { getStyles } from "./styles";

export function LicensesDivider() {
  const { styles } = useStyles(getStyles);

  return <SectionDivider style={styles.divider} />;
}
