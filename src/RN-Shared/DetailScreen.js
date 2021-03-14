import React, { Component } from "react";
import {
  StyleSheet,
  Text,
  View,
  ScrollView,
  Image,
  Dimensions,
  PanResponder,
  Animated,
} from "react-native";
import { SharedElement } from "react-navigation-shared-element";

import { SimpleLineIcons, MaterialCommunityIcons } from "@expo/vector-icons";
const { height } = Dimensions.get("window");
const ITEM_HEIGHT = height * 0.5;
const SCREEN_WIDTH = Dimensions.get("window").width;
const SWIPE_WIDTH = 0.25 * SCREEN_WIDTH;
const SWIPE_OUT_DURATION = 550;

export default class DetailScreen extends Component {
  constructor() {
    super();
    const position = new Animated.ValueXY();
    const panResponder = PanResponder.create({
      onStartShouldSetPanResponder: () => true,
      onPanResponderMove: (event, gesture) => {
        position.setValue({ x: gesture.dx, y: gesture.dy });
      },
      onPanResponderRelease: (event, gesture) => {
        if (gesture.dy > height / 2) {
          this.props.navigation.goBack();
        } else {
          this.resetPosition();
        }
      },
    });
    this.state = {
      panResponder,
      position,
      index: 0,
      animation: new Animated.Value(0),
    };
  }

  resetPosition = () => {
    Animated.spring(this.state.position, {
      toValue: { x: 0, y: 0 },
      useNativeDriver: false,
    }).start();
  };

  getCardStyle = () => {
    const { position } = this.state;
    return {
      ...position.getLayout(),
    };
  };

  render() {
    const { item } = this.props.route.params;
    const { navigation } = this.props;

    return (
      <ScrollView style={{ flex: 1, backgroundColor: "rgba(0,0,0,.9)" }}>
        <Animated.View
          style={[{ backgroundColor: "#0f0f0f" }]}
          style={[this.getCardStyle()]}
          {...this.state.panResponder.panHandlers}>
          <SharedElement id={`item.${item.id}.image_url`}>
            <Image
              source={{ uri: item.image_url }}
              style={{
                width: "100%",
                height: ITEM_HEIGHT,
              }}
              resizeMode='cover'
            />
          </SharedElement>
          <MaterialCommunityIcons
            name='close'
            size={28}
            color='#fff'
            style={{
              position: "absolute",
              top: 40,
              right: 20,
              zIndex: 2,
            }}
            onPress={() => {
              navigation.goBack();
            }}
          />

          <View
            style={{
              paddingHorizontal: 20,
              backgroundColor: "#0f0f0f",
            }}>
            <Text
              style={{
                fontSize: 18,
                color: "#fff",
                lineHeight: 24,
                marginBottom: 4,
              }}>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
              eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut
              enim ad minim veniam, quis nostrud exercitation ullamco laboris
              nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in
              reprehenderit in voluptate velit esse cillum dolore eu fugiat
              nulla pariatur. Excepteur sint occaecat cupidatat non proident,
              sunt in culpa qui officia deserunt mollit anim id est laborum.
            </Text>
            <Text
              style={{
                fontSize: 18,
                color: "#fff",
                lineHeight: 24,
                marginBottom: 4,
              }}>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
              eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut
              enim ad minim veniam, quis nostrud exercitation ullamco laboris
              nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in
              reprehenderit in voluptate velit esse cillum dolore eu fugiat
              nulla pariatur. Excepteur sint occaecat cupidatat non proident,
              sunt in culpa qui officia deserunt mollit anim id est laborum.
            </Text>
          </View>
        </Animated.View>
      </ScrollView>
    );
  }
}
