import { useEffect, useState } from "react";
import { Text, View, StyleSheet } from "react-native";
import { getBookingById } from "../../api/restfulBookingApi";
import { usePathname } from "expo-router";

export default function Booking() {
  const [bookingDetails, setBookingDetails] = useState([]);
  const bookingId = usePathname().split("/").at(-1);
  useEffect(() => {
    const fetchBookingById = async () => {
      console.log("bookingId", bookingId);
      const fetchedBookingDetails = await getBookingById(bookingId).catch(
        (err) => {
          console.log(err);
          Alert.alert(
            "Error",
            "An error occurred while trying to fetch booking details.",
            [
              {
                text: "Ok",
              },
            ]
          );
        }
      );
      console.log("fetchedBookingDetails", fetchedBookingDetails);
      setBookingDetails(fetchedBookingDetails);
    };
    fetchBookingById();
  }, []);
  return (
    <View style={styles.container}>
      <View style={styles.card}>
        <Text style={styles.title}>Booking {bookingId}</Text>
        <Text style={styles.description}>
          First name: {bookingDetails.firstname}
        </Text>
        <Text style={styles.description}>
          Last name: {bookingDetails.lastname}
        </Text>
        <Text style={styles.description}>
          Total price: {bookingDetails.totalprice}
        </Text>

        <Text style={styles.description}>
          Check in date: {bookingDetails.bookingdates?.checkin}
        </Text>
        <Text style={styles.description}>
          Check out date: {bookingDetails.bookingdates?.checkin}
        </Text>
        <Text style={styles.description}>
          Additional needs: {bookingDetails.additionalneeds}
        </Text>
        <Text style={styles.description}>
          {bookingDetails.depositpaid ? "Deposit paid" : "Deposit unpaid"}
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
