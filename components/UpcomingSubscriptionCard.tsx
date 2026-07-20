import { View, Text } from "react-native";
import React from "react";
import { formatCurrency } from "@/lib/utils";
import { Image } from "expo-image";

const UpcomingSubscriptionCard = ({name, price, daysLeft, icon, currency }: UpcomingSubscriptionCardProps) => {
  return (
    <View className="upcoming-card mr-4 w-44 rounded-2xl border border-black/10 bg-background p-4">
      <View className="upcoming-row flex-row items-center gap-3">
        <Image source={icon} className="upcoming-icon size-14" />
        <View>
          <Text className="upcoming-price text-lg font-sans-bold text-primary">
            {formatCurrency(price, currency)}
          </Text>
          <Text className="upcoming-meta text-sm font-sans-semibold text-muted-foreground" numberOfLines={1}>{daysLeft > 1 ? `${daysLeft} days left` : 'Last day'}</Text>
        </View>
      </View>

      <Text className="upcoming-name mt-2 text-lg font-sans-bold text-primary" numberOfLines={1}>{name}</Text>
    </View>
  );
};

export default UpcomingSubscriptionCard;
