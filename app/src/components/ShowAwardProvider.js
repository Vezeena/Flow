import { Ionicons } from "@expo/vector-icons";
import LottieView from "lottie-react-native";
import { createContext, useContext, useRef, useState } from "react";
import { StyleSheet, View, Text } from "react-native";

import badgeAwardSource from "../../assets/badge-award.json";
import { badges } from "../content/badges.js";
import { colours } from "../styles/colours.js";

const ShowAwardContext = createContext();

export function ShowAwardProvider({ children }) {
  const [badgeId, setBadgeId] = useState(null);
  const resolveRef = useRef(null);

  const badge = badgeId && badges.find((badge) => badge.id === badgeId);

  // shows the award animation and resolves once it finishes
  const showAward = (badgeId) =>
    new Promise((resolve) => {
      resolveRef.current = resolve;
      setBadgeId(badgeId);
    });

  const handleFinish = () => {
    setBadgeId(null);
    resolveRef.current?.();
    resolveRef.current = null;
  };

  return (
    <ShowAwardContext.Provider value={showAward}>
      {children}
      {badge && (
        <View style={styles.awardContainer}>
          <Text style={styles.awardHeading}>Award earned!</Text>
          <LottieView
            key={badgeId}
            source={badgeAwardSource}
            autoPlay
            loop={false}
            speed={1.5}
            onAnimationFinish={handleFinish}
            style={styles.award}
          />
          <View style={styles.awardTitleRow}>
            <Ionicons name={badge.icon} size={24} color={colours.primary} />
            <Text style={styles.awardTitle}>{badge.name}</Text>
          </View>
        </View>
      )}
    </ShowAwardContext.Provider>
  );
}

export function useShowAward() {
  return useContext(ShowAwardContext);
}

const styles = StyleSheet.create({
  awardContainer: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "rgba(255,255,255,0.9)",
  },
  award: {
    width: 250,
    height: 250,
  },
  awardHeading: {
    fontSize: 22,
    fontWeight: "600",
    color: colours.textPrimary,
    textAlign: "center",
    marginBottom: 8,
  },
  awardTitleRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
    marginTop: 8,
  },
  awardTitle: {
    fontSize: 20,
    fontWeight: "700",
    color: colours.primary,
    textAlign: "center",
  },
});
