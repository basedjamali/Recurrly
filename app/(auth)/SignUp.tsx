import { useSignUp } from "@clerk/expo";
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

const SignUp = () => {
  const { signUp } = useSignUp();
  const [emailAddress, setEmailAddress] = useState("");
  const [password, setPassword] = useState("");
  const [code, setCode] = useState("");
  const [isVerifying, setIsVerifying] = useState(false);
  const [error, setError] = useState("");

  const handleSignUp = async () => {
    setError("");
    const result = await signUp.password({ emailAddress, password });

    if (result.error) {
      setError(result.error.message);
      return;
    }

    const verification = await signUp.verifications.sendEmailCode();
    if (verification.error) {
      setError(verification.error.message);
      return;
    }

    setIsVerifying(true);
  };

  const handleVerify = async () => {
    setError("");
    const result = await signUp.verifications.verifyEmailCode({ code });
    if (result.error) {
      setError(result.error.message);
      return;
    }

    const finalized = await signUp.finalize();
    if (finalized.error) {
      setError(finalized.error.message);
      return;
    }

    router.replace("/(tabs)");
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
            <Text style={styles.title}>
              {isVerifying ? "Verify your email" : "Create your account"}
            </Text>
            <Text style={styles.subtitle}>
              {isVerifying
                ? "Enter the code we sent to your email"
                : "Start managing your subscriptions today"}
            </Text>
          </View>

          <View style={styles.formCard}>
            {isVerifying ? (
              <View style={styles.field}>
                <Text style={styles.label}>Verification code</Text>
                <TextInput
                  autoCapitalize="none"
                  keyboardType="number-pad"
                  placeholder="Enter your code"
                  placeholderTextColor={colors.mutedForeground}
                  style={styles.input}
                  value={code}
                  onChangeText={setCode}
                />
              </View>
            ) : (
              <>
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
                    placeholder="Create a password"
                    placeholderTextColor={colors.mutedForeground}
                    secureTextEntry
                    style={styles.input}
                    value={password}
                    onChangeText={setPassword}
                  />
                </View>
              </>
            )}
            {error ? <Text style={styles.error}>{error}</Text> : null}
            <Pressable
              style={styles.submitButton}
              onPress={isVerifying ? handleVerify : handleSignUp}
            >
              <Text style={styles.submitText}>
                {isVerifying ? "Verify email" : "Sign up"}
              </Text>
            </Pressable>
            <Link href="/(auth)/SignIn" style={styles.signInLink}>
              <Text style={styles.signInPrefix}>Already have an account? </Text>
              <Text style={styles.signInAction}>Sign in</Text>
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
    fontSize: 12,
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
  signInLink: {
    alignSelf: "center",
    flexDirection: "row",
    marginTop: 21,
  },
  signInPrefix: {
    color: "#40577c",
    fontFamily: "sans-regular",
    fontSize: 13,
  },
  signInAction: {
    color: colors.accent,
    fontFamily: "sans-semibold",
    fontSize: 13,
  },
});

export default SignUp;
