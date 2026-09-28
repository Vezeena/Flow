import { Ionicons } from "@expo/vector-icons";
import { useQuery } from "@tanstack/react-query";
import { useSQLiteContext } from "expo-sqlite";
import { View, Text, ScrollView, Pressable } from "react-native";

import { NearbyAlertsErrorBanner } from "../../alerts/NearbyAlertsErrorBanner.js";
import AlertCardSummarised from "../../components/AlertCardSummarised.js";
import TopicCard from "../../components/TopicCard";
import { badges } from "../../content/badges";
import { topics } from "../../content/topics";
import { getAwardedBadges } from "../../database/badgeQueries.js";
import { getCompletedQuizes } from "../../database/quizQueries.js";
import { getPoints } from "../../database/statsQueries.js";
import { LocationPermissionBanner } from "../../location/LocationPermissionBanner.js";
import { NotificationsPermissionBanner } from "../../notifications/NotificationsPermissionBanner.js";
import { iconDefaults, pressableDefaults, sharedStyles } from "../../styles/sharedStyles";
import { homeStyles } from "./homeStyles";

/**
 * Displays the home screen with the user's current alert status, learning progress, and quick
 * access to hub resource topics.
 */
export default function Home({ navigation }) {
  const db = useSQLiteContext();

  const { data: points } = useQuery({
    queryKey: ["points"],
    queryFn: () => getPoints(db),
  });
  const { data: awardedBadges } = useQuery({
    queryKey: ["awardedBadges"],
    queryFn: () => getAwardedBadges(db),
  });
  const { data: completedQuizes } = useQuery({
    queryKey: ["completedQuizes"],
    queryFn: () => getCompletedQuizes(db),
  });

  const completedQuizesIds = new Set(completedQuizes?.map((quiz) => quiz.topic_id));
  const nextTopic = completedQuizes && topics.find((topic) => !completedQuizesIds.has(topic.id));

  return (
    <>
      <NotificationsPermissionBanner />
      <LocationPermissionBanner />
      <NearbyAlertsErrorBanner />

      <ScrollView style={sharedStyles.screen} contentContainerStyle={sharedStyles.content}>
        {/* Summarised alerts */}
        <AlertCardSummarised />

        {/* Next up */}
        {nextTopic ? (
          <View>
            <Text style={sharedStyles.heading}>Next up</Text>
            <View style={[sharedStyles.card, homeStyles.nextUpContainer]}>
              <Text style={homeStyles.nextUpTitle}>{nextTopic.title}</Text>
              <Text style={homeStyles.nextUpText}>
                Read the content and then complete the quiz!
              </Text>
              <View style={[sharedStyles.buttonContainer, homeStyles.nextUpButtonContainer]}>
                <Pressable
                  style={sharedStyles.button}
                  onPress={() =>
                    navigation.navigate("Topic", {
                      topicId: nextTopic.id,
                      title: nextTopic.title,
                    })
                  }
                  {...pressableDefaults}
                >
                  <Text style={sharedStyles.buttonText}>Start</Text>
                </Pressable>
              </View>
            </View>
          </View>
        ) : (
          <View style={sharedStyles.card}>
            <Text style={homeStyles.nextUpTitle}>You have mastered all topics!</Text>
            <Text style={homeStyles.nextUpText}>Revisit any topic to refresh your memory.</Text>
          </View>
        )}

        {/* Progress */}
        <View>
          <Text style={sharedStyles.heading}>Your progress</Text>
          <View style={sharedStyles.card}>
            <View style={homeStyles.statsRow}>
              <View>
                <Text style={homeStyles.statNumber}>{points}</Text>
                <Text style={homeStyles.statLabel}>points</Text>
              </View>
              <View>
                <Text style={homeStyles.statNumber}>
                  {awardedBadges?.length}
                  <Text style={homeStyles.statDenominator}>/{badges.length}</Text>
                </Text>
                <Text style={homeStyles.statLabel}>badges</Text>
              </View>
            </View>
          </View>
        </View>

        {/* Learn about */}
        <View>
          <View style={homeStyles.learnAboutTitleContainer}>
            <Text style={sharedStyles.heading}>Learn about</Text>
            <View style={sharedStyles.viewAllPressableContainer}>
              <Pressable
                onPress={() => navigation.navigate("Hub")}
                {...pressableDefaults}
                style={sharedStyles.viewAllContainer}
              >
                <Text style={sharedStyles.viewAll}>View all</Text>
                <Ionicons name="chevron-forward" {...iconDefaults} />
              </Pressable>
            </View>
          </View>
          <View style={homeStyles.topicGrid}>
            <View style={homeStyles.topicRow}>
              <TopicCard
                icon="water-outline"
                label="Flood prep"
                onPress={() =>
                  navigation.navigate("Topic", {
                    topicId: "flood-preparedness",
                    title: "Flood preparedness",
                  })
                }
              />
              <TopicCard
                icon="home-outline"
                label="Plan"
                onPress={() =>
                  navigation.navigate("Topic", {
                    topicId: "household-plan",
                    title: "Household Emergency Plan",
                  })
                }
              />
            </View>
            <View style={homeStyles.topicRow}>
              <TopicCard
                icon="briefcase-outline"
                label="Kit"
                onPress={() =>
                  navigation.navigate("Topic", {
                    topicId: "emergency-kit",
                    title: "Emergency kit",
                  })
                }
              />
              <TopicCard
                icon="medkit-outline"
                label="First aid"
                onPress={() =>
                  navigation.navigate("Topic", {
                    topicId: "first-aid",
                    title: "First aid basics",
                  })
                }
              />
            </View>
          </View>
        </View>
      </ScrollView>
    </>
  );
}
