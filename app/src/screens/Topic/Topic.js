import { Ionicons } from "@expo/vector-icons";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { useSQLiteContext } from "expo-sqlite";
import { useState } from "react";
import { View, Text, ScrollView, Pressable, Image } from "react-native";
import { Modal } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

import Checklist from "../../components/Checklist";
import IconButton from "../../components/IconButton.js";
import Quiz from "../../components/Quiz";
import { useShowAward } from "../../components/ShowAwardProvider.js";
import {
  FLOOD_CONQUEROR_POINTS,
  FLOOD_HERO_POINTS,
  REFRESHER_COUNT,
} from "../../content/badges.js";
import { topics } from "../../content/topics";
import { awardBadge, isBadgeAwarded } from "../../database/badgeQueries.js";
import {
  getAllTopicsProgress,
  getTopicScores,
  recordQuizResult,
  saveQuizAttempt,
} from "../../database/quizQueries.js";
import { getPoints } from "../../database/statsQueries.js";
import { colours } from "../../styles/colours";
import { iconDefaults, pressableDefaults, sharedStyles } from "../../styles/sharedStyles";
import { topicStyles } from "./topicStyles";

/** Displays details for a selected learning topic using the provided topic data. */
export default function Topic({ route }) {
  const db = useSQLiteContext();
  const queryClient = useQueryClient();
  const showAward = useShowAward();

  // passed in when navigating to this screen
  const { topicId } = route.params;
  const [quizOpen, setQuizOpen] = useState(false);

  // finds the matching topic by ID
  const topic = topics.find((possibleTopic) => possibleTopic.id === topicId);

  const { data: scores } = useQuery({
    queryKey: ["topicScores", topicId],
    queryFn: () => getTopicScores(db, topicId),
  });

  async function handleQuizComplete(score, total, passed) {
    await saveQuizAttempt(db, topicId, score, total, passed);
    await recordQuizResult(db, topicId, score, total, showAward);

    // Invalidate queries
    queryClient.invalidateQueries({ queryKey: ["topicScores", topicId] });
    queryClient.invalidateQueries({ queryKey: ["points"] });
    queryClient.invalidateQueries({ queryKey: ["completedQuizes"] });
    queryClient.invalidateQueries({ queryKey: ["topicsProgress"] });

    // Award first quiz badge
    if (!(await isBadgeAwarded(db, "first-quiz"))) {
      await awardBadge(db, "first-quiz");
      await showAward("first-quiz");
    }

    // Award point badges
    const points = await getPoints(db);
    if (points >= FLOOD_HERO_POINTS && !(await isBadgeAwarded(db, "flood-hero"))) {
      await awardBadge(db, "flood-hero");
      await showAward("flood-hero");
    }
    if (points >= FLOOD_CONQUEROR_POINTS && !(await isBadgeAwarded(db, "flood-conqueror"))) {
      await awardBadge(db, "flood-conqueror");
      await showAward("flood-conqueror");
    }

    // Award all topics mastered
    const topicsProgress = await getAllTopicsProgress(db);
    const masteredTopics = topicsProgress.filter((progress) => progress.completed === 1);
    if (
      masteredTopics.length >= topics.length &&
      !(await isBadgeAwarded(db, "all-topics-mastered"))
    ) {
      await awardBadge(db, "all-topics-mastered");
      await showAward("all-topics-mastered");
    }

    // Award refresher badge
    const topicProgress = topicsProgress.find((progress) => progress.topic_id === topicId);
    if (
      topicProgress.repeats >= REFRESHER_COUNT &&
      !(await isBadgeAwarded(db, "topic-refresher"))
    ) {
      await awardBadge(db, "topic-refresher");
      await showAward("topic-refresher");
    }

    queryClient.invalidateQueries({ queryKey: ["awardedBadges"] });
  }

  if (!topic) {
    return (
      <ScrollView style={sharedStyles.screen} contentContainerStyle={sharedStyles.content}>
        <View>
          <Text>Topic not found</Text>
        </View>
      </ScrollView>
    );
  }

  return (
    <ScrollView style={sharedStyles.screen} contentContainerStyle={sharedStyles.content}>
      <View>
        {/* learning content */}
        {topic.learningContent.map((paragraph, index) => (
          <Text key={index} style={topicStyles.paragraph}>
            {paragraph}
          </Text>
        ))}

        {/* topic image */}
        <Image source={topic.image} style={topicStyles.topicImage} resizeMode="cover" />

        {/* checklist */}
        <Text style={sharedStyles.heading}>Checklist</Text>
        <Checklist topicId={topic.id} items={topic.checklist} />

        {/* 'test your knowledge' button */}
        <View style={topicStyles.quizButtonContainer}>
          <Pressable
            {...pressableDefaults}
            style={topicStyles.quizButton}
            onPress={() => setQuizOpen(true)}
          >
            <Text style={topicStyles.quizButtonText}>Test your knowledge</Text>
            <Ionicons name="arrow-forward" {...iconDefaults} />
          </Pressable>
        </View>

        {/* summary */}
        {scores && scores.bestScore !== null && (
          <View style={topicStyles.scoreRow}>
            <Text style={topicStyles.scoreText}>
              Last attempt: {scores.lastScore}/{scores.lastTotal}
            </Text>
            <Text style={topicStyles.scoreText}>
              Best: {scores.bestScore}/{scores.bestTotal}
            </Text>
          </View>
        )}

        {/* quiz */}
        <Modal visible={quizOpen} animationType="slide" onRequestClose={() => setQuizOpen(false)}>
          <SafeAreaView style={topicStyles.modalContainer}>
            <IconButton
              style={topicStyles.closeButton}
              name="close"
              size={28}
              color={colours.textPrimary}
              onPress={() => setQuizOpen(false)}
            />
            <Quiz
              questions={topic.quiz}
              onComplete={(score, total, passed) => {
                handleQuizComplete(score, total, passed);
                setQuizOpen(false);
              }}
            />
          </SafeAreaView>
        </Modal>
      </View>
    </ScrollView>
  );
}
