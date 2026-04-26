import { styled } from "nativewind";
import React from "react";
import { Text } from "react-native";
import { SafeAreaView as RNSAV } from "react-native-safe-area-context";

const SafeAreaView = styled(RNSAV);

const settings = () => {
  return (
    <SafeAreaView>
      <Text>settings</Text>
    </SafeAreaView>
  );
};

export default settings;
