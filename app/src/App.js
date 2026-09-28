import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { SQLiteProvider } from "expo-sqlite";
import { StatusBar } from "expo-status-bar";

import { ShowAwardProvider } from "./components/ShowAwardProvider.js";
import { initDatabase } from "./database/database";
import { LocationSetup } from "./location/LocationSetup.js";
import TabNavigator from "./navigation/TabNavigator";
import { NotificationsSetup } from "./notifications/NotificationsSetup.js";
import ConfigureLocations from "./screens/ConfigureLocations/ConfigureLocations.js";
import Topic from "./screens/Topic/Topic";

const DB_NAME = "flow.db";

const Stack = createNativeStackNavigator();
const queryClient = new QueryClient({
  defaultOptions: { queries: { staleTime: Infinity } },
});

/**
 * Defines the root component of the app.
 *
 * Provides the database, location context, and navigation structure used throughout the
 * application.
 */
export function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <SQLiteProvider databaseName={DB_NAME} onInit={initDatabase}>
        <LocationSetup>
          <NotificationsSetup>
            <ShowAwardProvider>
              <NavigationContainer>
                <StatusBar style="dark" />
                <Stack.Navigator id="stack-navigator">
                  <Stack.Screen
                    name="Tabs"
                    // the tab navigator is rendered as a single stack screen
                    component={TabNavigator}
                    options={{ headerShown: false }}
                  />
                  <Stack.Screen
                    name="Topic"
                    component={Topic}
                    options={({ route }) => ({ title: route.params.title })}
                  />
                  <Stack.Screen
                    name="ConfigureLocations"
                    component={ConfigureLocations}
                    options={{ title: "Configure locations" }}
                  />
                </Stack.Navigator>
              </NavigationContainer>
            </ShowAwardProvider>
          </NotificationsSetup>
        </LocationSetup>
      </SQLiteProvider>
    </QueryClientProvider>
  );
}
