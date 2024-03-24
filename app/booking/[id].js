import { useEffect, useState } from "react";
import { Text, View } from "react-native";
import { getBookingById } from "../../api/restfulBookingApi";
import { usePathname } from "expo-router";

export default function Booking(p) {
  const [bookingDetails, setBookingDetails] = useState([]);
  const bookingId = usePathname().split("/").at(-1);
  useEffect(() => {
    const fetchBookingById = async () => {
      console.log("bookingId", bookingId);
      const fetchedBookingDetails = await getBookingById(bookingId).catch(
        (err) => {
          console.log(err);
        }
      );
      console.log("fetchedBookingDetails", fetchedBookingDetails);
      setBookingDetails(fetchedBookingDetails);
    };
    fetchBookingById();
  }, []);
  return (
    <View>
      <Text>bbbb</Text>
    </View>
  );
}
