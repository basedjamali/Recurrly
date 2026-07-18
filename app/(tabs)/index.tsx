import "@/global.css";
import { Link } from "expo-router";
import { Text, View } from "react-native";
import { Image } from "expo-image";
import { SafeAreaView as RNSafeAreaView } from "react-native-safe-area-context";
import { styled } from "nativewind";
import images from "@/constants/images";
import { HOME_USER, HOME_BALANCE } from "@/constants/data";
import { icons } from "@/constants/icons";
import { formatCurrency } from "@/lib/utils";
import dayjs from "dayjs";
const SafeAreaView = styled(RNSafeAreaView);

export default function App() {
  return (
    <SafeAreaView className="flex-1 bg-background p-5">
      <View className="flex-1 p-5">
        {/* Header */}
        <View className="home-header mb-2.5 flex-row items-center justify-between">
          <View className="home-user flex-row items-center">
            <Image
              source={images.avatar}
              className="home-avatar size-16 rounded-full"
            />
            <Text className="home-user-name ml-4 text-2xl font-sans-bold text-primary">
              {HOME_USER.name}
            </Text>
          </View>

          <Image source={icons.add} className="home-add-icon size-12" />
        </View>

        {/* Card Balance */}
        <View className="home-balance-card my-2.5 min-h-50 justify-between gap-5 rounded-bl-4xl rounded-tr-4xl bg-accent p-6">
          <Text className="home-balance-label text-xl font-sans-semibold text-white/80">
            Balance
          </Text>
          <View className="home-balance-row flex-row items-center justify-between">
            <Text className="home-balance-amount text-4xl font-sans-extrabold text-white">
              {formatCurrency(HOME_BALANCE.amount)}
            </Text>
            <Text className="home-balance-date text-xl font-sans-medium text-white">
              {dayjs(HOME_BALANCE.nextRenewalDate).format("MM/DD")}
            </Text>
          </View>
        </View>

        {/* */}
      </View>
    </SafeAreaView>
  );
}
