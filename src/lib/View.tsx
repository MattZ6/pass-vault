import type { ViewProps as RNViewProps } from "react-native";
import ViewNativeComponent from "react-native/Libraries/Components/View/ViewNativeComponent";

export type ViewProps = RNViewProps;

export function View(props: ViewProps) {
	return <ViewNativeComponent {...props} />;
}
