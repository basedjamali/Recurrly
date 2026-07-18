import "@/global.css";
import { Link } from "expo-router";
import { Text, View } from "react-native";
import { SafeAreaView as RNSafeAreaView } from "react-native-safe-area-context";
import { styled } from "nativewind";
const SafeAreaView = styled(RNSafeAreaView);

export default function App() {
  return (
    <SafeAreaView className="flex-1 bg-background p-5">
      <View className="flex-1 p-5">
        <Text className="text-5xl font-sans-extrabold">Home</Text>

        <Link
          href="/onboarding"
          className="mt-4 font-sans-bold rounded bg-primary text-white p-4"
        >
          Go to Onboarding
        </Link>

        {/* Sign In */}
        <Link
          href="/(auth)/SignIn"
          className="mt-4 font-sans-bold rounded bg-primary text-white p-4"
        >
          Go to Sign In
        </Link>

        {/* Sign Up */}
        <Link
          href="/(auth)/SignUp"
          className="mt-4 font-sans-bold rounded bg-primary text-white p-4"
        >
          Go to Sign Up
        </Link>
      </View>
    </SafeAreaView>
  );
}
