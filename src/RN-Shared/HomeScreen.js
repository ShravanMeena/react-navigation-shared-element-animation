import React, { Component } from "react";
import {
  ScrollView,
  Text,
  View,
  TouchableOpacity,
  Image,
  Dimensions,
  StatusBar,
} from "react-native";
import { data } from "../config/data";
import { SharedElement } from "react-navigation-shared-element";

const { width } = Dimensions.get("screen");
const ITEM_WIDTH = width * 0.9;
const ITEM_HEIGHT = ITEM_WIDTH * 0.9;

export default class HomeScreen extends Component {
  render() {
    const { navigation } = this.props;
    return (
      <View style={{ flex: 1, backgroundColor: "#0f0f0f" }}>
        <StatusBar hidden />
        {/* Header */}
        {/* <View
          style={{ marginTop: 50, marginBottom: 20, paddingHorizontal: 20 }}>
          <Text style={{ color: "#888", textTransform: "uppercase" }}>
            Saturday 9 January
          </Text>
          <Text style={{ color: "#fff", fontSize: 32, fontWeight: "600" }}>
            Today
          </Text>
        </View> */}
        <ScrollView indicatorStyle='white'>
          {data.map((item) => (
            <View
              key={item.id}
              style={{
                width: width,
                height: width / 2,
                padding: 20,
              }}>
              <TouchableOpacity
                activeOpacity={0.8}
                onPress={() => navigation.navigate("Details", { item })}>
                <SharedElement id={`item.${item.id}.image_url`}>
                  <Image
                    style={{
                      borderRadius: 14,
                      width: width - 40,
                      height: width / 2.2,
                    }}
                    source={{ uri: item.image_url }}
                    resizeMode='cover'
                  />
                </SharedElement>
                <View
                  style={{
                    position: "absolute",
                    bottom: 20,
                    left: 10,
                  }}>
                  <View style={{ flexDirection: "row" }}>
                    <View style={{ flexDirection: "column", paddingLeft: 6 }}>
                      <Text
                        style={{
                          color: "white",
                          fontSize: 34,
                        }}>
                        {item.title}
                      </Text>
                    </View>
                  </View>
                </View>
              </TouchableOpacity>
            </View>
          ))}
        </ScrollView>
      </View>
    );
  }
}
