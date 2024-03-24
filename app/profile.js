import { Text, View, StyleSheet } from "react-native";
import { getUser } from "../api/mockData";
import { useState, useEffect } from "react";

export default function Profile() {
  const [userProfile, setUserProfile] = useState({});
  useEffect(() => {
    const fetchUser = async () => {
      const fetchedUser = await getUser();
      setUserProfile(fetchedUser);
    };
    fetchUser();
  }, []);
  return (
    <View style={styles.container}>
      <View style={styles.card}>
        <Text style={styles.title}>User Profile</Text>
        <Text style={styles.description}>
          First name: {userProfile.firstName}
        </Text>
        <Text style={styles.description}>
          Last name: {userProfile.lastName}
        </Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#f0f0f0",
  },
  card: {
    backgroundColor: "#fff",
    padding: 20,
    borderRadius: 10,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  title: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 10,
  },
  description: {
    fontSize: 16,
  },
});
