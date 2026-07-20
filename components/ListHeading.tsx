import { View, Text, TouchableOpacity } from "react-native";
import React from "react";

const ListHeading = ({ title }: ListHeadingProps) => {
  return (
    <View className="list-head my-5 flex-row items-center justify-between">
      <Text className="list-title text-2xl font-sans-bold text-primary">
        {title}
      </Text>

      <TouchableOpacity className="list-action rounded-full border border-black/20 px-4 py-1">
        <Text className="list-action-text text-lg font-sans-semibold text-primary">
          View all
        </Text>
      </TouchableOpacity>
    </View>
  );
};

export default ListHeading;
