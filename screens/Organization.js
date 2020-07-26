import * as React from "react";
import { View, Text, StyleSheet, Image, TextInput } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import { Headline, Subheading, Paragraph, Button } from "react-native-paper";
import organization from "../assets/images/Organization.png";
import { connect } from "@aragon/connect";
import AsyncStorage from "@react-native-community/async-storage";

export default function Organization({ navigation }) {
  const [text, setText] = React.useState("");

  const getOrganization = async () => {
    const org = await connect(
      // "0xAFAE8A53Bbb0ef8Ff0768468dE6D34a523458eBB",
      text,
      "thegraph",
      { chainId: 4 }
    );

    console.log(org);

    // Fetch the apps belonging to this organization
    const apps = await org.apps();
    // apps.forEach(console.log);

    try {
      console.log('setting item')
      await AsyncStorage.setItem("organization_address", text);
      navigation.replace("TokenLink");
    } catch (e) {
      console.log("error", e);
    }
  };

  return (
    <View style={styles.container}>
      <Image
        source={organization}
        style={{ width: 140, height: 130, marginTop: 150 }}
      />
      <Headline style={{ color: "white", marginTop: 35, fontSize: 30 }}>
        Enter Organization ID
      </Headline>
      <TextInput
        style={{
          marginTop: 45,
          fontSize: 12,
          backgroundColor: "white",
          height: 30,
          width: 250,
          borderRadius: 30,
          alignContent: "center",
          textAlign: "center",
        }}
        placeholder="Organization ID or Address"
        label="Email"
        value={text}
        onChangeText={(text) => setText(text)}
      />
      <Button
        mode="contained"
        style={{ marginTop: 50, backgroundColor: "#0099ff" }}
        onPress={() => getOrganization()}
        // onPress={() => navigation.push("TokenLink")}
      >
        Open Organization
      </Button>
    </View>
  );
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "rgb(40, 51, 76)",
    alignItems: "center",
  },
  contentContainer: {
    paddingTop: 15,
  },
  optionIconContainer: {
    marginRight: 12,
  },
  option: {
    backgroundColor: "#fdfdfd",
    paddingHorizontal: 15,
    paddingVertical: 15,
    borderWidth: StyleSheet.hairlineWidth,
    borderBottomWidth: 0,
    borderColor: "#ededed",
  },
  lastOption: {
    borderBottomWidth: StyleSheet.hairlineWidth,
  },
  optionText: {
    fontSize: 15,
    alignSelf: "flex-start",
    marginTop: 1,
  },
  button: {
    backgroundColor: "blue",
    padding: 20,
    borderRadius: 5,
    width: 130,
    marginLeft: 120,
    borderRadius: 25,
    marginBottom: 25,
  },
  buttonText: {
    fontSize: 20,
    color: "#fff",
    textAlign: "center",
  },
});