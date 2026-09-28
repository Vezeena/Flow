import { Ionicons } from "@expo/vector-icons";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { useSQLiteContext } from "expo-sqlite";
import { Pressable, View, Text } from "react-native";

import { topics } from "../content/topics.js";
import { awardBadge, isBadgeAwarded } from "../database/badgeQueries.js";
import {
  checkItem,
  getCheckedItems,
  getCheckedItemsCount,
  uncheckItem,
} from "../database/checklistQueries.js";
import { colours } from "../styles/colours";
import { iconDefaults, pressableDefaults } from "../styles/sharedStyles";
import { checklistStyles } from "./checklistStyles";
import { useShowAward } from "./ShowAwardProvider.js";

/** Shows a topic's checklist with relevant items ticked and toggles them on press. */
export default function Checklist({ topicId, items }) {
  const db = useSQLiteContext();
  const queryClient = useQueryClient();
  const showAward = useShowAward();

  const totalItems = topics.reduce((count, topic) => count + topic.checklist.length, 0);

  const { data: checkedIndices } = useQuery({
    queryKey: ["checkedItems", topicId],
    queryFn: () => getCheckedItems(db, topicId),
  });

  // toggle the item to the state opposite if its current state
  // if the item is checked it will uncheck it and vice versa
  async function toggleItem(index) {
    const isChecked = checkedIndices.includes(index);
    if (isChecked) {
      await uncheckItem(db, topicId, index);
    } else {
      await checkItem(db, topicId, index);
    }

    // Invalidate queries
    queryClient.invalidateQueries({ queryKey: ["checkedItems", topicId] });

    // Award badge when selecting the final checklist item
    if (
      !isChecked &&
      !(await isBadgeAwarded(db, "checklist-complete")) &&
      (await getCheckedItemsCount(db)) === totalItems
    ) {
      await awardBadge(db, "checklist-complete");
      await showAward("checklist-complete");
      queryClient.invalidateQueries({ queryKey: ["awardedBadges"] });
    }
  }

  return (
    <View>
      {items.map((item, index) => {
        const isChecked = checkedIndices?.includes(index);
        return (
          <View key={index} style={checklistStyles.itemContainer}>
            <Pressable
              {...pressableDefaults}
              style={checklistStyles.item}
              onPress={() => toggleItem(index)}
            >
              <Ionicons
                {...iconDefaults}
                name={isChecked ? "checkmark-circle" : "ellipse-outline"}
                color={isChecked ? colours.success : colours.borderDark}
              />
              <Text style={checklistStyles.itemText}>{item}</Text>
            </Pressable>
          </View>
        );
      })}
    </View>
  );
}
