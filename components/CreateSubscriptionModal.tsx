import dayjs from "dayjs";
import clsx from "clsx";
import React, { useMemo, useState } from "react";
import {
  KeyboardAvoidingView,
  Modal,
  Platform,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  View,
} from "react-native";

import { icons } from "@/constants/icons";
import { colors } from "@/constants/theme";

const categories = [
  "Entertainment",
  "AI Tools",
  "Developer Tools",
  "Design",
  "Productivity",
  "Cloud",
  "Music",
  "Other",
] as const;

const categoryColors: Record<(typeof categories)[number], string> = {
  Entertainment: "#f7c6a3",
  "AI Tools": "#c9b8e8",
  "Developer Tools": "#b8d4e3",
  Design: "#f5c542",
  Productivity: "#b8e8d0",
  Cloud: "#b9d8f5",
  Music: "#f2b5d4",
  Other: "#d9d4c7",
};

type Frequency = "Monthly" | "Yearly";

type CreateSubscriptionModalProps = {
  visible: boolean;
  onClose: () => void;
  onCreated: (subscription: Subscription) => void;
};

const CreateSubscriptionModal = ({
  visible,
  onClose,
  onCreated,
}: CreateSubscriptionModalProps) => {
  const [name, setName] = useState("");
  const [price, setPrice] = useState("");
  const [frequency, setFrequency] = useState<Frequency>("Monthly");
  const [category, setCategory] =
    useState<(typeof categories)[number]>("Other");
  const [error, setError] = useState("");

  const parsedPrice = Number(price.replace(",", "."));
  const isValid =
    name.trim().length > 0 && Number.isFinite(parsedPrice) && parsedPrice > 0;

  const resetForm = () => {
    setName("");
    setPrice("");
    setFrequency("Monthly");
    setCategory("Other");
    setError("");
  };

  const handleClose = () => {
    resetForm();
    onClose();
  };

  const renewalDate = useMemo(
    () => dayjs().add(1, frequency === "Monthly" ? "month" : "year"),
    [frequency],
  );

  const handleSubmit = () => {
    if (!name.trim()) {
      setError("Enter a subscription name.");
      return;
    }

    if (!Number.isFinite(parsedPrice) || parsedPrice <= 0) {
      setError("Enter a price greater than 0.");
      return;
    }

    const now = dayjs();
    const subscription: Subscription = {
      id: `${name
        .trim()
        .toLowerCase()
        .replace(/[^a-z0-9]+/g, "-")}-${Date.now()}`,
      name: name.trim(),
      price: parsedPrice,
      currency: "USD",
      frequency,
      billing: frequency,
      category,
      status: "active",
      startDate: now.toISOString(),
      renewalDate: renewalDate.toISOString(),
      icon: icons.wallet,
      color: categoryColors[category],
    };

    onCreated(subscription);
    resetForm();
    onClose();
  };

  return (
    <Modal
      visible={visible}
      transparent
      animationType="slide"
      onRequestClose={handleClose}
    >
      <View className="modal-overlay" style={styles.overlay}>
        <KeyboardAvoidingView
          behavior={Platform.OS === "ios" ? "padding" : undefined}
          className="modal-container"
          style={styles.container}
        >
          <View className="modal-grabber" style={styles.grabber} />
          <View className="modal-header" style={styles.header}>
            <View>
              <Text className="modal-title" style={styles.title}>
                New Subscription
              </Text>
            </View>
            <Pressable
              accessibilityLabel="Close new subscription form"
              className="modal-close"
              style={styles.closeButton}
              hitSlop={8}
              onPress={handleClose}
            >
              <Text className="modal-close-text" style={styles.closeText}>
                X
              </Text>
            </Pressable>
          </View>

          <ScrollView
            className="modal-body"
            style={styles.bodyScroll}
            contentContainerStyle={styles.body}
            keyboardShouldPersistTaps="handled"
            showsVerticalScrollIndicator={false}
          >
            <View className="auth-field" style={styles.field}>
              <Text className="auth-label" style={styles.label}>
                Name
              </Text>
              <TextInput
                className={clsx(
                  "auth-input",
                  error && !name.trim() && "auth-input-error",
                )}
                style={styles.input}
                value={name}
                onChangeText={(value) => {
                  setName(value);
                  setError("");
                }}
                placeholder="e.g. Netflix"
                placeholderTextColor="rgba(0, 0, 0, 0.4)"
                autoCapitalize="words"
              />
            </View>

            <View className="auth-field" style={styles.field}>
              <Text className="auth-label" style={styles.label}>
                Price
              </Text>
              <TextInput
                className={clsx(
                  "auth-input",
                  error && price && !isValid && "auth-input-error",
                )}
                style={styles.input}
                value={price}
                onChangeText={(value) => {
                  setPrice(value);
                  setError("");
                }}
                placeholder="e.g. 12.99"
                placeholderTextColor="rgba(0, 0, 0, 0.4)"
                keyboardType="decimal-pad"
              />
            </View>

            <View className="auth-field" style={styles.field}>
              <Text className="auth-label" style={styles.label}>
                Frequency
              </Text>
              <View className="picker-row" style={styles.pickerRow}>
                {(["Monthly", "Yearly"] as Frequency[]).map((option) => {
                  const active = frequency === option;
                  return (
                    <Pressable
                      key={option}
                      className={clsx(
                        "picker-option",
                        active && "picker-option-active",
                      )}
                      style={styles.pickerOption}
                      android_ripple={{ color: "rgba(234, 122, 83, 0.12)" }}
                      onPress={() => setFrequency(option)}
                    >
                      <Text
                        className={clsx(
                          "picker-option-text",
                          active && "picker-option-text-active",
                        )}
                        style={[
                          styles.pickerText,
                          active && styles.pickerTextActive,
                        ]}
                      >
                        {option}
                      </Text>
                    </Pressable>
                  );
                })}
              </View>
            </View>

            <View className="auth-field" style={styles.field}>
              <Text className="auth-label" style={styles.label}>
                Category
              </Text>
              <View className="category-scroll" style={styles.categoryList}>
                {categories.map((option) => {
                  const active = category === option;
                  return (
                    <Pressable
                      key={option}
                      className={clsx(
                        "category-chip",
                        active && "category-chip-active",
                      )}
                      style={styles.categoryChip}
                      android_ripple={{ color: "rgba(234, 122, 83, 0.12)" }}
                      onPress={() => setCategory(option)}
                    >
                      <Text
                        className={clsx(
                          "category-chip-text",
                          active && "category-chip-text-active",
                        )}
                        style={[
                          styles.categoryText,
                          active && styles.categoryTextActive,
                        ]}
                      >
                        {option}
                      </Text>
                    </Pressable>
                  );
                })}
              </View>
            </View>

            {error ? <Text className="auth-error">{error}</Text> : null}

            <Pressable
              className={clsx(
                "auth-button",
                !isValid && "auth-button-disabled",
              )}
              style={[
                styles.submitButton,
                !isValid && styles.submitButtonDisabled,
              ]}
              disabled={!isValid}
              onPress={handleSubmit}
            >
              <Text className="auth-button-text" style={styles.submitText}>
                Create subscription
              </Text>
            </Pressable>
          </ScrollView>
        </KeyboardAvoidingView>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  overlay: {
    justifyContent: "flex-end",
    backgroundColor: "transparent",
  },
  container: {
    width: "100%",
    height: "78%",
    overflow: "hidden",
    borderTopWidth: 1,
    borderTopColor: "rgba(8, 17, 38, 0.08)",
    backgroundColor: colors.background,
  },
  grabber: {
    width: 40,
    height: 4,
    marginTop: 8,
    borderRadius: 999,
    alignSelf: "center",
    backgroundColor: colors.border,
  },
  header: {
    minHeight: 64,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: 20,
    paddingTop: 8,
    paddingBottom: 12,
    borderBottomWidth: 1,
    borderBottomColor: "rgba(8, 17, 38, 0.08)",
    backgroundColor: colors.background,
  },
  bodyScroll: {
    flex: 1,
    backgroundColor: colors.background,
  },
  body: {
    gap: 16,
    paddingHorizontal: 20,
    paddingTop: 18,
    paddingBottom: 28,
  },
  field: {
    width: "100%",
    flexShrink: 0,
    gap: 8,
  },
  input: {
    width: "100%",
    height: 52,
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderWidth: 1,
    borderColor: colors.border,
    borderRadius: 14,
    backgroundColor: colors.card,
    color: colors.primary,
    fontFamily: "sans-medium",
    fontSize: 15,
  },
  pickerRow: {
    width: "100%",
    flexDirection: "row",
    gap: 12,
  },
  pickerOption: {
    flex: 1,
    height: 46,
    alignItems: "center",
    justifyContent: "center",
    borderWidth: 1,
    borderColor: colors.border,
    borderRadius: 14,
    backgroundColor: colors.card,
  },
  categoryList: {
    width: "100%",
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 8,
  },
  categoryChip: {
    height: 38,
    paddingHorizontal: 14,
    paddingVertical: 0,
    justifyContent: "center",
  },
  submitButton: {
    width: "100%",
    height: 52,
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 14,
    backgroundColor: colors.accent,
  },
  submitButtonDisabled: {
    backgroundColor: "rgba(234, 122, 83, 0.45)",
  },
  title: {
    color: colors.primary,
    fontFamily: "sans-bold",
    fontSize: 20,
    lineHeight: 24,
  },
  label: {
    color: colors.primary,
    fontFamily: "sans-semibold",
    fontSize: 14,
    lineHeight: 17,
  },
  submitText: {
    color: colors.primary,
    fontFamily: "sans-bold",
    fontSize: 15,
  },
  closeText: {
    color: colors.primary,
    fontFamily: "sans-bold",
    fontSize: 14,
    lineHeight: 16,
  },
  closeButton: {
    width: 32,
    height: 32,
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 16,
    backgroundColor: colors.muted,
  },
  pickerText: {
    color: colors.mutedForeground,
    fontFamily: "sans-semibold",
    fontSize: 14,
  },
  pickerTextActive: {
    color: colors.accent,
  },
  categoryText: {
    color: colors.mutedForeground,
    fontFamily: "sans-semibold",
    fontSize: 12,
  },
  categoryTextActive: {
    color: colors.accent,
  },
});

export default CreateSubscriptionModal;
