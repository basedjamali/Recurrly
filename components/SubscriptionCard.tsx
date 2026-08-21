import { View, Text, Pressable } from "react-native";
import React from "react";
import { Image } from "expo-image";
import {
  formatCurrency,
  formatSubscriptionDateTime,
  formatStatusLabel,
} from "@/lib/utils";
import clsx from "clsx";

const SubscriptionCard = ({
  name,
  price,
  billing,
  icon,
  currency,
  color,
  category,
  plan,
  expanded,
  renewalDate,
  paymentMethod,
  startDate,
  status,
  onPress,
}: SubscriptionCardProps) => {
  return (
    <Pressable
      onPress={onPress}
      className={clsx(
        "sub-card rounded-2xl border border-border p-4",
        expanded ? "sub-card-expanded bg-subscription" : "bg-card",
      )}
      style={!expanded && color ? { backgroundColor: color } : undefined}
    >
      <View className="sub-head flex-row items-center py-2">
        <View className="sub-main min-w-0 flex-1 flex-row items-center gap-3">
          <Image source={icon} className="sub-icon size-16 rounded-lg" />
          <View className="sub-copy min-w-0 flex-1">
            <Text
              numberOfLines={1}
              className="sub-title mb-1 text-lg font-sans-bold text-primary"
            >
              {name}
            </Text>
            <Text
              numberOfLines={1}
              ellipsizeMode="tail"
              className="sub-,meta text-sm font-sans-semibold text-muted-foreground"
            >
              {category?.trim() ||
                plan?.trim() ||
                (renewalDate ? formatSubscriptionDateTime(renewalDate) : "")}
            </Text>
          </View>
        </View>

        <View className="sub-price-box ml-3 shrink-0 items-end">
          <Text className="sub-price mb-1 text-lg font-sans-bold text-primary">
            {formatCurrency(price, currency)}
          </Text>
          <Text className="sub-billing text-sm font-sans-medium text-muted-foreground">
            {billing}
          </Text>
        </View>
      </View>

      {expanded && (
        <View className="sub-body mt-6 gap-4">
          <View className="sub-details gap-6">
            {/* Payment */}
            <View className="sub-row flex-row items-center justify-between gap-3">
              <View className="sub-row-copy min-w-0 flex-1 flex-row items-center gap-2">
                <Text className="sub-label shrink-0 text-base font-sans-medium text-muted-foreground">
                  Payment:
                </Text>
                <Text
                  className="sub-value flex-1 font-sans-bold text-primary"
                  numberOfLines={1}
                  ellipsizeMode="tail"
                >
                  {paymentMethod?.trim() || "Not provided"}
                </Text>
              </View>
            </View>

            {/* Category */}
            <View className="sub-row flex-row items-center justify-between gap-3">
              <View className="sub-row-copy min-w-0 flex-1 flex-row items-center gap-2">
                <Text className="sub-label shrink-0 text-base font-sans-medium text-muted-foreground">
                  Category:
                </Text>
                <Text
                  className="sub-value flex-1 font-sans-bold text-primary"
                  numberOfLines={1}
                  ellipsizeMode="tail"
                >
                  {category?.trim() || plan?.trim() || "Not provided"}
                </Text>
              </View>
            </View>

            {/* Started */}
            <View className="sub-row flex-row items-center justify-between gap-3">
              <View className="sub-row-copy min-w-0 flex-1 flex-row items-center gap-2">
                <Text className="sub-label shrink-0 text-base font-sans-medium text-muted-foreground">
                  Started:
                </Text>
                <Text
                  className="sub-value flex-1 font-sans-bold text-primary"
                  numberOfLines={1}
                  ellipsizeMode="tail"
                >
                  {startDate ? formatSubscriptionDateTime(startDate) : ""}
                </Text>
              </View>
            </View>

            {/* Renewal date */}
            <View className="sub-row flex-row items-center justify-between gap-3">
              <View className="sub-row-copy min-w-0 flex-1 flex-row items-center gap-2">
                <Text className="sub-label shrink-0 text-base font-sans-medium text-muted-foreground">
                  Renewal date:
                </Text>
                <Text
                  className="sub-value flex-1 font-sans-bold text-primary"
                  numberOfLines={1}
                  ellipsizeMode="tail"
                >
                  {renewalDate ? formatSubscriptionDateTime(renewalDate) : ""}
                </Text>
              </View>
            </View>

            {/* Status */}
            <View className="sub-row flex-row items-center justify-between gap-3">
              <View className="sub-row-copy min-w-0 flex-1 flex-row items-center gap-2">
                <Text className="sub-label shrink-0 text-base font-sans-medium text-muted-foreground">
                  Status:
                </Text>
                <Text
                  className="sub-value flex-1 font-sans-bold text-primary"
                  numberOfLines={1}
                  ellipsizeMode="tail"
                >
                  {status ? formatStatusLabel(status) : ""}
                </Text>
              </View>
            </View>
          </View>
        </View>
      )}
    </Pressable>
  );
};

export default SubscriptionCard;
