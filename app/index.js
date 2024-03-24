import { useEffect, useState } from "react";
import {
  SafeAreaView,
  Text,
  View,
  FlatList,
  StyleSheet,
  TouchableOpacity,
} from "react-native";
import { getBookingIds } from "../api/restfulBookingApi";
import { router } from "expo-router";

export default function AllBookings() {
  const [allBookingIds, setAllBookingIds] = useState([]);
  useEffect(() => {
    const fetchBookingIds = async () => {
      const fetchedAllBookingIds = await getBookingIds();

      console.log(fetchedAllBookingIds);
      setAllBookingIds(fetchedAllBookingIds);
    };
    fetchBookingIds();
  }, []);
  return (
    <View>
      <SafeAreaView>
        <FlatList
          keyExtractor={(booking) => booking.bookingid}
          data={allBookingIds}
          renderItem={({ item }) => {
            return (
              <TouchableOpacity
                style={styles.card}
                onPress={() => router.push(`/booking/${item.bookingid}`)}
              >
                <Text>Booking {item.bookingid}</Text>
              </TouchableOpacity>
            );
          }}
        ></FlatList>
      </SafeAreaView>
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
  item: {
    backgroundColor: "#f9c2ff",
    padding: 20,
    marginVertical: 8,
    marginHorizontal: 16,
  },
  title: {
    fontSize: 32,
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
    margin: 15,
  },
});
