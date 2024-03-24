import { useEffect, useState } from "react";
import { SafeAreaView, Text, View, FlatList, StyleSheet } from "react-native";
import { getBookingIds } from "../api/restfulBookingApi";
import { Link } from "expo-router";

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
      <Text>Home page pp</Text>
      <SafeAreaView style={styles.container}>
        <FlatList
          keyExtractor={(booking) => booking.bookingid}
          data={allBookingIds}
          renderItem={({ item }) => {
            return (
              <Link
                push
                href={{
                  pathname: "/booking/[id]",
                  params: { id: item.bookingid },
                }}
              >
                <View>
                  <Text>{item.bookingid}</Text>
                </View>
              </Link>
            );
          }}
        ></FlatList>
      </SafeAreaView>
    </View>
  );
}

const styles = StyleSheet.create({
  item: {
    backgroundColor: "#f9c2ff",
    padding: 20,
    marginVertical: 8,
    marginHorizontal: 16,
  },
  title: {
    fontSize: 32,
  },
});
