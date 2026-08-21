import { useClerk, useUser } from "@clerk/expo";
import React from "react";
import { Pressable, Text, View } from "react-native";
import { SafeAreaView as RNSafeAreaView } from "react-native-safe-area-context";
import { styled } from "nativewind";
import { colors } from "@/constants/theme";
const SafeAreaView = styled(RNSafeAreaView);

const Settings = () => {
  const { signOut } = useClerk();
  const { user } = useUser();

  const displayName =
    user?.fullName || user?.firstName || user?.emailAddresses[0]?.emailAddress;

  return (
    <SafeAreaView className="flex-1 bg-background p-5">
      <View className="flex-1 p-5">
        <Text className="text-3xl font-sans-bold text-primary">Settings</Text>
        <View className="mt-6 rounded-2xl border border-border bg-card p-5">
          <Text className="text-lg font-sans-semibold text-primary">
            {displayName || "Your account"}
          </Text>
          {user?.primaryEmailAddress?.emailAddress ? (
            <Text className="mt-1 text-sm font-sans-regular text-muted-foreground">
              {user.primaryEmailAddress.emailAddress}
            </Text>
          ) : null}
        </View>
        <Pressable
          accessibilityRole="button"
          className="mt-6 items-center rounded-xl bg-accent p-4"
          onPress={() => signOut()}
        >
          <Text style={{ color: colors.background }} className="font-sans-bold">
            Log out
          </Text>
        </Pressable>
      </View>
    </SafeAreaView>
  );
};

export default Settings;
