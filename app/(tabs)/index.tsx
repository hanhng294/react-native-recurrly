import ListHeading from "@/components/ListHeading";
import SubscriptionCard from "@/components/SubscriptionCard";
import UpcomingSubscriptionCard from "@/components/UpcomingSubscriptionCard";
import "@/global.css";
import { Show, useClerk, useUser } from "@clerk/expo";
import dayjs from "dayjs";
import { Link } from "expo-router";
import { styled } from "nativewind";
import React from "react";
import {
  FlatList,
  Image,
  Pressable,
  StyleSheet,
  Text,
  View,
} from "react-native";
import { SafeAreaView as RNSAV } from "react-native-safe-area-context";
import {
  HOME_BALANCE,
  HOME_SUBSCRIPTIONS,
  HOME_USER,
  UPCOMING_SUBSCRIPTIONS,
} from "../constants/data";
import { icons } from "../constants/icons";
import images from "../constants/images";
import { formatCurrency } from "../lib/utils";

const SafeAreaView = styled(RNSAV);

export default function App() {
  const [expandedSubscriptionId, setExpandedSubscriptionId] = React.useState<
    string | null
  >(null);
  const { user } = useUser();
  const { signOut } = useClerk();

  return (
    <View style={styles.container}>
      <Show when="signed-out">
        <Link href="/(auth)/sign-in">
          <Text>Sign in</Text>
        </Link>
        <Link href="/(auth)/sign-up">
          <Text>Sign up</Text>
        </Link>
      </Show>

      <Show when="signed-in">
        <Text>Hello {user?.emailAddresses[0].emailAddress}</Text>

        <Pressable onPress={() => signOut()}>
          <Text>Sign out</Text>
        </Pressable>

        <SafeAreaView className="flex-1 bg-background p-5">
          <FlatList
            ListHeaderComponent={() => (
              <>
                <View className="home-header">
                  <View className="home-user">
                    <Image source={images.avatar} className="home-avatar" />
                    <Text className="home-user-name">{HOME_USER.name}</Text>
                    <Image source={icons.add} className="home-add-icon" />
                  </View>
                </View>

                <View className="home-balance-card">
                  <Text className="home-balance-label">Balance</Text>

                  <View className="home-balance-row">
                    <Text className="home-balance-amount">
                      {formatCurrency(HOME_BALANCE.amount)}
                    </Text>
                    <Text className="home-balance-date">
                      {dayjs(HOME_BALANCE.nextRenewalDate).format("MM/DD")}
                    </Text>
                  </View>
                </View>

                <View className="mb-5">
                  <ListHeading title="Upcoming" />
                  <FlatList
                    data={UPCOMING_SUBSCRIPTIONS}
                    renderItem={({ item }) => (
                      <UpcomingSubscriptionCard {...item} />
                    )}
                    keyExtractor={(item) => item.id}
                    horizontal
                    showsHorizontalScrollIndicator={false}
                    ListEmptyComponent={
                      <Text className="home-empty-state">
                        No upcoming subscriptions
                      </Text>
                    }
                  />
                </View>

                <ListHeading title="All Subscriptions" />
              </>
            )}
            data={HOME_SUBSCRIPTIONS}
            keyExtractor={(item) => item.id}
            renderItem={({ item }) => (
              <SubscriptionCard
                {...item}
                expanded={expandedSubscriptionId === item.id}
                onPress={() =>
                  setExpandedSubscriptionId((currentId) =>
                    currentId === item.id ? null : item.id,
                  )
                }
              />
            )}
            extraData={expandedSubscriptionId}
            ItemSeparatorComponent={() => <View className="h-4" />}
            showsVerticalScrollIndicator={false}
            ListEmptyComponent={
              <Text className="home-empty-state"> No subscriptions yet.</Text>
            }
            contentContainerClassName="pb-20"
          />
        </SafeAreaView>
      </Show>
    </View>
  );
}

//styling
const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    paddingTop: 60,
    gap: 16,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
  },
  button: {
    backgroundColor: "#0a7ea4",
    paddingVertical: 12,
    paddingHorizontal: 24,
    borderRadius: 8,
    alignItems: "center",
  },
  buttonText: {
    color: "#fff",
    fontWeight: "600",
  },
});
