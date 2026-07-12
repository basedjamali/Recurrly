import { tabs } from "@/constants/data";
import { Tabs } from "expo-router";
import { View } from "react-native";
import { colors, components } from "@/constants/theme";
import clsx from "clsx";
import { Image } from "expo-image";
import { useSafeAreaInsets } from "react-native-safe-area-context";

const tabBar = components.tabBar;

const TabLayout = () => {
  const insets = useSafeAreaInsets();

  const tabItems = Array.isArray(tabs) ? tabs : [];

  const TabIcon = ({ focused, icon }: TabIconProps) => (
    <View className="tabs-icon">
      <View className={clsx("tabs-pill", focused && "tabs-active")}>
        <Image source={icon} className="tabs-glyph" />
      </View>
    </View>
  );

  return (
    <Tabs
      screenOptions={{
        headerShown: false,
        tabBarShowLabel: false,
        tabBarStyle: {
          position: "absolute",
          bottom: Math.max(insets.bottom, tabBar.horizontalInset),
        },
      }}
    >
      {tabItems.map((tab) => (
        <Tabs.Screen
          key={tab.name}
          name={tab.name}
          options={{
            title: tab.title,
            tabBarIcon: ({ focused }) => (
              <TabIcon focused={focused} icon={tab.icon} />
            ),
          }}
        />
      ))}
    </Tabs>
  );
};

export default TabLayout;
