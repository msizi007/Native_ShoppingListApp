import { Stack } from "expo-router";
import { ActivityIndicator, View } from "react-native";
import { Provider } from "react-redux";
import { PersistGate } from "redux-persist/integration/react";
import { persistor, store } from "../store"; // Adjust path if needed

export default function RootLayout() {
  return (
    // 1. Wrap the app in the Redux Provider
    <Provider store={store}>
      {/* 2. Wrap the app in PersistGate to wait for data to load from storage */}
      <PersistGate
        loading={
          <View style={{ flex: 1, justifyContent: "center" }}>
            <ActivityIndicator size="large" color="#007AFF" />
          </View>
        }
        persistor={persistor}
      >
        {/* 3. Render the Navigation Stack */}
        <Stack
          screenOptions={{
            headerStyle: { backgroundColor: "#fff" },
            headerShadowVisible: false,
            headerTitleStyle: { fontWeight: "bold" },
          }}
        >
          <Stack.Screen
            name="index"
            options={{
              title: "Shopping List",
              headerTitleAlign: "center",
            }}
          />
        </Stack>
      </PersistGate>
    </Provider>
  );
}
