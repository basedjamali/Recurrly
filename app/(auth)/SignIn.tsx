import { useSignIn } from "@clerk/expo";
import { Link, router } from "expo-router";
import { useState } from "react";
import {
  Image,
  KeyboardAvoidingView,
  Platform,
  Pressable,
  SafeAreaView,
  StyleSheet,
  Text,
  TextInput,
  View,
} from "react-native";

import { colors } from "@/constants/theme";

const SignIn = () => {
  const { signIn } = useSignIn();
  const [emailAddress, setEmailAddress] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleSignIn = async () => {
    setError("");
    try {
      const result = await signIn.password({
        identifier: emailAddress,
        password,
      });

      if (result.error) {
        setError(result.error.message);
        return;
      }

      if (signIn.status !== "complete") {
        setError("The sign-in could not be completed. Please try again.");
        return;
      }

      const finalized = await signIn.finalize();
      if (finalized.error) {
        setError(finalized.error.message);
        return;
      }

      router.replace("/(tabs)");
    } catch (signInError) {
      setError(
        signInError instanceof Error
          ? signInError.message
          : "Sign-in failed. Please try again.",
      );
    }
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : undefined}
        style={styles.keyboardView}
      >
        <View style={styles.content}>
          <View style={styles.brand}>
            <Image
              source={require("../../assets/icons/logo.png")}
              style={styles.logo}
            />
            <View>
              <Text style={styles.brandName}>Recurly</Text>
              <Text style={styles.brandTagline}>SMART BILLING</Text>
            </View>
          </View>

          <View style={styles.intro}>
            <Text style={styles.title}>Welcome back</Text>
            <Text style={styles.subtitle}>
              Sign in to continue managing your subscriptions
            </Text>
          </View>

          <View style={styles.formCard}>
            <View style={styles.field}>
              <Text style={styles.label}>Email</Text>
              <TextInput
                autoCapitalize="none"
                keyboardType="email-address"
                placeholder="Enter your email"
                placeholderTextColor={colors.mutedForeground}
                style={styles.input}
                value={emailAddress}
                onChangeText={setEmailAddress}
              />
            </View>
            <View style={styles.field}>
              <Text style={styles.label}>Password</Text>
              <TextInput
                placeholder="Enter your password"
                placeholderTextColor={colors.mutedForeground}
                secureTextEntry
                style={styles.input}
                value={password}
                onChangeText={setPassword}
              />
            </View>
            {error ? <Text style={styles.error}>{error}</Text> : null}
            <Pressable style={styles.submitButton} onPress={handleSignIn}>
              <Text style={styles.submitText}>Sign in</Text>
            </Pressable>
            <Link href="/(auth)/SignUp" style={styles.signUpLink}>
              <Text style={styles.signUpPrefix}>New to Recurly? </Text>
              <Text style={styles.signUpAction}>Create an account</Text>
            </Link>
          </View>
        </View>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: colors.background,
  },
  keyboardView: {
    flex: 1,
  },
  content: {
    flex: 1,
    alignItems: "center",
    paddingHorizontal: 14,
    paddingTop: 42,
  },
  brand: {
    flexDirection: "row",
    alignItems: "center",
    gap: 9,
  },
  logo: {
    width: 56,
    height: 56,
  },
  brandName: {
    color: colors.primary,
    fontFamily: "sans-bold",
    fontSize: 22,
    lineHeight: 25,
  },
  brandTagline: {
    color: "#40577c",
    fontFamily: "sans-regular",
    fontSize: 12,
    letterSpacing: 0,
    lineHeight: 15,
  },
  intro: {
    alignItems: "center",
    marginTop: 68,
    marginBottom: 24,
  },
  title: {
    color: colors.primary,
    fontFamily: "sans-bold",
    fontSize: 22,
    lineHeight: 27,
    textAlign: "center",
  },
  subtitle: {
    color: "#40577c",
    fontFamily: "sans-regular",
    fontSize: 13,
    lineHeight: 17,
    marginTop: 9,
    textAlign: "center",
  },
  formCard: {
    alignSelf: "stretch",
    backgroundColor: "rgba(255, 248, 231, 0.34)",
    borderColor: "rgba(8, 17, 38, 0.16)",
    borderRadius: 14,
    borderWidth: 1,
    padding: 20,
  },
  field: {
    marginBottom: 21,
  },
  label: {
    color: colors.primary,
    fontFamily: "sans-semibold",
    fontSize: 14,
    lineHeight: 17,
    marginBottom: 7,
  },
  input: {
    borderColor: "rgba(8, 17, 38, 0.25)",
    borderRadius: 12,
    borderWidth: 1,
    color: colors.primary,
    fontFamily: "sans-regular",
    fontSize: 13,
    height: 48,
    paddingHorizontal: 12,
  },
  error: {
    color: colors.destructive,
    fontFamily: "sans-regular",
    fontSize: 15,
    marginTop: -10,
    marginBottom: 8,
  },
  submitButton: {
    alignItems: "center",
    backgroundColor: colors.accent,
    borderRadius: 12,
    height: 48,
    justifyContent: "center",
  },
  submitText: {
    color: "#ffffff",
    fontFamily: "sans-semibold",
    fontSize: 14,
  },
  signUpLink: {
    alignSelf: "center",
    flexDirection: "row",
    marginTop: 21,
  },
  signUpPrefix: {
    color: "#40577c",
    fontFamily: "sans-regular",
    fontSize: 13,
  },
  signUpAction: {
    color: colors.accent,
    fontFamily: "sans-semibold",
    fontSize: 13,
  },
});

export default SignIn;
