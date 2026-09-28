export const FLOOD_HERO_POINTS = 50;
export const FLOOD_CONQUEROR_POINTS = 100;
export const REFRESHER_COUNT = 5;

/**
 * Badges the user can earn. There are badges per topic (id matching topic id), awarded on mastering
 * that topic's quiz. Milestone badges are awarded for broader achievements.
 */
export const badges = [
  // TOPIC BADGES (FOR MASTERY)
  { id: "flood-preparedness", name: "Flood ready", icon: "water-outline" },
  { id: "household-plan", name: "Plan master", icon: "home-outline" },
  { id: "emergency-kit", name: "Fully stocked", icon: "briefcase-outline" },
  { id: "evacuation", name: "Safe exit", icon: "exit-outline" },
  { id: "first-aid", name: "First responder", icon: "medkit-outline" },

  // MILESTONE BADGES
  // complete all checklists
  {
    id: "checklist-complete",
    name: "Checklist champion",
    icon: "checkmark-done-outline",
  },
  // complete your first quiz
  { id: "first-quiz", name: "Getting started", icon: "footsteps-outline" },
  // get 50 points
  { id: "flood-hero", name: "Flood hero", icon: "medal-outline" },
  // get 100 points
  { id: "flood-conqueror", name: "Flood conqueror", icon: "trophy-outline" },
  // master all 5 topics
  { id: "all-topics-mastered", name: "Fully prepared", icon: "ribbon-outline" },
  // for repeating a topic 5 times?
  { id: "topic-refresher", name: "Staying sharp", icon: "refresh-outline" },
];
