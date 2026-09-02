import {
  FlatList,
  KeyboardAvoidingView,
  Platform,
  Text,
  TextInput,
  View,
} from "react-native";
import React, { useMemo, useState } from "react";
import { SafeAreaView as RNSafeAreaView } from "react-native-safe-area-context";
import { styled } from "nativewind";
import SubscriptionCard from "@/components/SubscriptionCard";
import { useSubscriptions } from "@/components/SubscriptionsProvider";
import { colors } from "@/constants/theme";
const SafeAreaView = styled(RNSafeAreaView);

const Subscriptions = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [expandedSubscriptionId, setExpandedSubscriptionId] = useState<
    string | null
  >(null);
  const { subscriptions } = useSubscriptions();

  const filteredSubscriptions = useMemo(() => {
    const normalizedQuery = searchQuery.trim().toLowerCase();

    if (!normalizedQuery) return subscriptions;

    return subscriptions.filter((subscription) =>
      [subscription.name, subscription.plan, subscription.category]
        .filter((value): value is string => Boolean(value))
        .some((value) => value.toLowerCase().includes(normalizedQuery)),
    );
  }, [searchQuery, subscriptions]);

  return (
    <SafeAreaView className="flex-1 bg-background p-5">
      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        className="flex-1"
      >
        <View className="flex-1 p-5">
          <FlatList
            data={filteredSubscriptions}
            keyExtractor={(item) => item.id}
            renderItem={({ item }) => {
              const { id, ...cardProps } = item;
              return (
                <SubscriptionCard
                  {...cardProps}
                  expanded={expandedSubscriptionId === id}
                  onPress={() =>
                    setExpandedSubscriptionId((currentId) =>
                      currentId === id ? null : id,
                    )
                  }
                />
              );
            }}
            ItemSeparatorComponent={() => <View className="h-4" />}
            contentContainerClassName="pb-30"
            showsVerticalScrollIndicator={false}
            keyboardShouldPersistTaps="handled"
            ListHeaderComponent={
              <View className="mb-6">
                <Text className="mb-5 text-3xl font-sans-bold text-primary">
                  Subscriptions
                </Text>
                <TextInput
                  value={searchQuery}
                  onChangeText={setSearchQuery}
                  placeholder="Search subscriptions"
                  placeholderTextColor={colors.mutedForeground}
                  autoCapitalize="none"
                  autoCorrect={false}
                  clearButtonMode="while-editing"
                  style={{
                    backgroundColor: colors.card,
                    borderColor: colors.border,
                    borderRadius: 12,
                    borderWidth: 1,
                    color: colors.primary,
                    fontFamily: "sans-regular",
                    fontSize: 15,
                    height: 52,
                    paddingHorizontal: 16,
                  }}
                />
              </View>
            }
            ListEmptyComponent={
              <Text className="py-4 text-sm font-sans-medium text-black/60">
                No subscriptions found
              </Text>
            }
          />
        </View>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

export default Subscriptions;
