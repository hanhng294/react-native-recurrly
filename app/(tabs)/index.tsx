import "@/global.css";
import { Link } from "expo-router";
import { styled } from "nativewind";
import { Text } from "react-native";
import { SafeAreaView as RNSAV } from "react-native-safe-area-context";

const SafeAreaView = styled(RNSAV);

export default function App() {
  return (
    <SafeAreaView className="flex-1 items-center justify-center bg-background">
      <Text className="text-xl font-bold text-success">
        {" "}
        Welcome to Nativewind!{" "}
      </Text>
      <Link
        href="/onboarding"
        className="mt-4 px-2 py-2 rounded bg-primary text-white"
      >
        {" "}
        Go to onboarding{" "}
      </Link>
      <Link
        href="/(auth)/sign-in"
        className="mt-4 px-2 py-2 rounded bg-primary text-white"
      >
        {" "}
        Go to Sign in{" "}
      </Link>
      <Link
        href="/sign-up"
        className="mt-4 px-2 py-2 rounded bg-primary text-white"
      >
        {" "}
        Go to Sign up{" "}
      </Link>
      <Link
        href={{
          pathname: "/subscriptions/[id]",
          params: { id: "claude" },
        }}
      >
        {" "}
        Claude Max Subscription
      </Link>
    </SafeAreaView>
  );
}
