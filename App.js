import * as React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createSharedElementStackNavigator } from "react-navigation-shared-element";
import HomeScreen from "./src/RN-Shared/HomeScreen";
import DetailScreen from "./src/RN-Shared/DetailScreen";

// import { createStackNavigator } from "@react-navigation/stack";

// const Stack = createStackNavigator();
const Stack = createSharedElementStackNavigator();

function MyStack() {
  return (
    <NavigationContainer>
      <Stack.Navigator
        screenOptions={{
          headerShown: false,
          gestureEnabled: true,
          cardStyleInterpolator: ({ current: { progress } }) => {
            return {
              cardStyle: { opacity: progress },
            };
          },
          cardStyle: {
            backgroundColor: "transparent",
          },
        }}
        headerMode='none'
        initialRouteName='Home'>
        <Stack.Screen name='Home' component={HomeScreen} />
        <Stack.Screen
          name='Details'
          component={DetailScreen}
          sharedElementsConfig={(route, otherRoute, showing) => {
            if (route.name === "Details" && showing) {
              const { item } = route.params;
              return [
                {
                  id: `item.${item.id}.image_url`,
                  animation: "move",
                  // resize: "clip",
                  // align: "left-top",
                },
              ];
            }
          }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default MyStack;
