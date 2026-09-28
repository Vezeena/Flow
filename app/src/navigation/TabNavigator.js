import { Ionicons } from "@expo/vector-icons";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";

import Alerts from "../screens/Alerts/Alerts";
import Home from "../screens/Home/Home";
import Hub from "../screens/Hub/Hub";
import Progress from "../screens/Progress/Progress";
import { colours } from "../styles/colours";

// adapted from: https://reactnavigation.org/docs/bottom-tab-navigator/?config=dynamic

const Tab = createBottomTabNavigator();

/** Renders the app's bottom tab navigator. */
export default function TabNavigator() {
  return (
    <Tab.Navigator
      id="tab-navigator"
      screenOptions={{
        // [DELETE]
        // headerShown: false,
        tabBarActiveTintColor: colours.primary,
        tabBarInactiveTintColor: colours.textLight,
        headerStyle: { backgroundColor: colours.background },
        headerTintColor: colours.textPrimary,
      }}
    >
      <Tab.Screen
        name="Home"
        component={Home}
        options={{
          tabBarIcon: ({ color, size }) => <Ionicons name="home" color={color} size={size} />,
        }}
      />
      <Tab.Screen
        name="Hub"
        component={Hub}
        options={{
          tabBarIcon: ({ color, size }) => <Ionicons name="book" color={color} size={size} />,
        }}
      />
      <Tab.Screen
        name="Alerts"
        component={Alerts}
        options={{
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="notifications" color={color} size={size} />
          ),
        }}
      />
      <Tab.Screen
        name="Progress"
        component={Progress}
        options={{
          tabBarIcon: ({ color, size }) => <Ionicons name="trophy" color={color} size={size} />,
        }}
      />
    </Tab.Navigator>
  );
}
