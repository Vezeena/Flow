import { useState } from "react";
import {
  View,
  Text,
  ScrollView,
  TextInput,
  ActivityIndicator,
  Pressable,
  Platform,
  Alert,
  KeyboardAvoidingView,
} from "react-native";

import { NearbyAlertsErrorBanner } from "../../alerts/NearbyAlertsErrorBanner.js";
import AlertCardSummarised from "../../components/AlertCardSummarised.js";
import IconButton from "../../components/IconButton";
import { LocationPermissionBanner } from "../../location/LocationPermissionBanner.js";
import { formatPlaceName, searchPlace } from "../../location/locationUtils.js";
import { useHasLocationPermission } from "../../location/useHasLocationPermission.js";
import { useLocations } from "../../location/useLocations.js";
import { colours } from "../../styles/colours";
import { pressableDefaults, sharedStyles } from "../../styles/sharedStyles";
import { configureLocationsStyles } from "./configureLocationsStyles.js";

export default function ConfigureLocations() {
  const { hasLocationPermission } = useHasLocationPermission();
  const { gpsLocation, savedLocations, addLocation, deleteLocation } = useLocations();

  // for searching a new location
  const [query, setQuery] = useState("");
  const [searching, setSearching] = useState(false);
  const [results, setResults] = useState(null);

  // searches for a gpsLocation using the query entered by the user
  async function searchLocations() {
    // don't search if empty
    if (!query.trim()) return;
    setSearching(true);
    setResults(null);

    // get matching gpsLocation
    const foundLocations = await searchPlace(query);
    setSearching(false);
    setResults(foundLocations);
  }

  // saves the searched gpsLocation and refreshes the saved locations list
  async function saveLocation(newLocation) {
    // check if the gpsLocation is already saved
    const alreadySaved = savedLocations.some(
      (savedLocation) =>
        savedLocation.lat === newLocation.lat && savedLocation.long === newLocation.long,
    );
    if (alreadySaved) {
      Alert.alert("Already saved", "That location is already in your list.");
      return;
    }
    // add the new location to the database
    await addLocation(newLocation);
    // clear the search input and results
    setQuery("");
    setResults(null);
  }

  // ask the user to confirm before deleting a saved location
  function confirmRemoveLocation(place) {
    Alert.alert(
      "Remove location",
      `Remove ${formatPlaceName(place.placeName)} from your saved locations?`,
      [
        { text: "Cancel", style: "cancel" },
        {
          text: "Remove",
          style: "destructive",
          onPress: async () => await deleteLocation(place.id),
        },
      ],
    );
  }

  return (
    <KeyboardAvoidingView
      style={{ flex: 1 }}
      behavior={Platform.OS === "ios" ? "padding" : "height"}
    >
      <LocationPermissionBanner />
      <NearbyAlertsErrorBanner />

      <ScrollView
        style={sharedStyles.screen}
        contentContainerStyle={sharedStyles.content}
        keyboardShouldPersistTaps="handled"
      >
        {/* Summarised alerts */}
        <AlertCardSummarised showNoAlerts={false} />

        {/* current location name and region (if it exists) */}
        <View>
          <Text style={sharedStyles.heading}>
            {hasLocationPermission ? "Current location" : "Latest known location"}
          </Text>

          {gpsLocation ? (
            <View style={sharedStyles.card}>
              <Text>{formatPlaceName(gpsLocation.placeName) || "Unknown"}</Text>
            </View>
          ) : (
            <Text style={sharedStyles.cardLabel}>Couldn't find your location.</Text>
          )}
        </View>

        {/* add a location */}
        <View>
          <Text style={sharedStyles.heading}>Add a location</Text>
          {!hasLocationPermission && (
            <Text style={sharedStyles.cardLabel}>Location access is required.</Text>
          )}
          {hasLocationPermission && (
            <View style={configureLocationsStyles.rows}>
              <TextInput
                style={configureLocationsStyles.searchInput}
                placeholder="Search locations…"
                placeholderTextColor={colours.textLight}
                value={query}
                onChangeText={setQuery}
                onSubmitEditing={searchLocations}
                returnKeyType="search"
              />

              {/* spinner */}
              {searching && <ActivityIndicator size="small" color={colours.primary} />}

              {/* no results */}
              {!searching && results?.length === 0 && (
                <Text style={sharedStyles.cardLabel}>
                  No places found. Check the spelling or your connection.
                </Text>
              )}

              {/* display search results */}
              {results?.map((place, index) => (
                <View key={index} style={sharedStyles.cardContainer}>
                  <Pressable
                    style={sharedStyles.card}
                    onPress={() => saveLocation(place)}
                    {...pressableDefaults}
                  >
                    <Text>{formatPlaceName(place.placeName)}</Text>
                  </Pressable>
                </View>
              ))}
            </View>
          )}
        </View>

        {/* saved locations */}
        <View>
          <Text style={sharedStyles.heading}>Saved locations</Text>
          {savedLocations.length === 0 ? (
            <Text style={sharedStyles.cardLabel}>No saved locations.</Text>
          ) : (
            <View style={configureLocationsStyles.rows}>
              {savedLocations.map((place) => (
                <View key={place.id} style={configureLocationsStyles.savedRow}>
                  <Text style={configureLocationsStyles.savedName}>
                    {formatPlaceName(place.placeName)}
                  </Text>
                  <IconButton
                    name="trash-outline"
                    color={colours.red}
                    onPress={() => confirmRemoveLocation(place)}
                  />
                </View>
              ))}
            </View>
          )}
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
}
