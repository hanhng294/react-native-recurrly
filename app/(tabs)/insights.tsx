import { styled } from "nativewind";
import React from "react";
import { Text } from "react-native";
import { SafeAreaView as RNSAV } from "react-native-safe-area-context";

const SafeAreaView = styled(RNSAV);

const insights = () => {
  return (
    <SafeAreaView>
      <Text>insights</Text>
    </SafeAreaView>
  );
};

export default insights;
