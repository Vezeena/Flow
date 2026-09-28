import { Ionicons } from "@expo/vector-icons";
import { useQuery } from "@tanstack/react-query";
import { useSQLiteContext } from "expo-sqlite";
import { View, Text, ScrollView } from "react-native";

import { NearbyAlertsErrorBanner } from "../../alerts/NearbyAlertsErrorBanner.js";
import AlertCardSummarised from "../../components/AlertCardSummarised.js";
import Badge from "../../components/Badge";
import TopicProgressRow from "../../components/TopicProgressRow.js";
import { badges, FLOOD_CONQUEROR_POINTS, FLOOD_HERO_POINTS } from "../../content/badges";
import { topics } from "../../content/topics.js";
import { getAwardedBadges } from "../../database/badgeQueries.js";
import { getAllTopicsProgress } from "../../database/quizQueries.js";
import { getPoints } from "../../database/statsQueries.js";
import { LocationPermissionBanner } from "../../location/LocationPermissionBanner.js";
import { NotificationsPermissionBanner } from "../../notifications/NotificationsPermissionBanner.js";
import { colours } from "../../styles/colours";
import { iconDefaults, sharedStyles } from "../../styles/sharedStyles";
import { progressStyles } from "./progressStyles";

/** Displays the user's learning progress, achievements, topic completion, and earned badges. */
export default function Progress() {
  const db = useSQLiteContext();

  const { data: points } = useQuery({
    queryKey: ["points"],
    queryFn: () => getPoints(db),
  });
  const { data: awardedBadges } = useQuery({
    queryKey: ["awardedBadges"],
    queryFn: () => getAwardedBadges(db),
  });
  const { data: topicsProgress } = useQuery({
    queryKey: ["topicsProgress"],
    queryFn: () => getAllTopicsProgress(db),
  });

  const awardedBadgesIds = new Set(awardedBadges?.map((badge) => badge.badge_id));
  const isFloodHero = awardedBadgesIds?.has("flood-hero");
  const isFloodConqueror = awardedBadgesIds?.has("flood-conqueror");
  const progressByTopicId = new Map(
    topicsProgress?.map((progress) => [progress.topic_id, progress]),
  );

  return (
    <>
      <NotificationsPermissionBanner />
      <LocationPermissionBanner />
      <NearbyAlertsErrorBanner />

      <ScrollView style={sharedStyles.screen} contentContainerStyle={sharedStyles.content}>
        {/* Summarised alerts */}
        <AlertCardSummarised showNoAlerts={false} />

        {/* Summary & achievement */}
        <View style={sharedStyles.card}>
          <View style={progressStyles.achievementRow}>
            <View style={progressStyles.achievementPoints}>
              {/* Points */}
              <Text style={progressStyles.achievementNumber}>{points}</Text>
              <Text style={progressStyles.achievementLabel}>points</Text>
            </View>
            <View style={progressStyles.achievementReward}>
              <Ionicons name="trophy-outline" {...iconDefaults} />
              {isFloodHero ? (
                isFloodConqueror ? (
                  <Text style={progressStyles.achievementRewardText}>Flood conqueror!</Text>
                ) : (
                  <Text style={progressStyles.achievementRewardText}>
                    {FLOOD_CONQUEROR_POINTS - points} to flood conqueror
                  </Text>
                )
              ) : (
                <Text style={progressStyles.achievementRewardText}>
                  {FLOOD_HERO_POINTS - points} to flood hero
                </Text>
              )}
            </View>
          </View>
          <View style={progressStyles.achievementTrack}>
            <View
              style={[
                progressStyles.achievementFill,
                {
                  width: `${Math.min(100, (points / (isFloodHero ? FLOOD_CONQUEROR_POINTS : FLOOD_HERO_POINTS)) * 100)}%`,
                },
              ]}
            />
          </View>
        </View>

        {/* Topics */}
        <View>
          <Text style={sharedStyles.heading}>Topics</Text>
          {topics.map((topic) => {
            const progress = progressByTopicId?.get(topic.id);
            return (
              <TopicProgressRow
                key={topic.id}
                icon={topic.icon}
                name={topic.title}
                completed={progress ? progress.best_score : 0}
                total={progress ? progress.total : topic.quiz.length}
                repeats={progress ? progress.repeats : 0}
              />
            );
          })}
        </View>

        {/* Badges */}
        <View style={progressStyles.badgeGrid}>
          {/* order badges by unlocked first */}
          {/* earned badges */}
          {badges
            .filter((badge) => awardedBadgesIds.has(badge.id))
            .map((badge) => (
              <Badge
                key={badge.id}
                icon={badge.icon}
                name={badge.name}
                earned
                colour={colours.primary}
              />
            ))}

          {/* locked badges */}
          {badges
            .filter((badge) => !awardedBadgesIds.has(badge.id))
            .map((badge) => (
              <Badge key={badge.id} icon={badge.icon} name={badge.name} earned={false} />
            ))}
        </View>
      </ScrollView>
    </>
  );
}
