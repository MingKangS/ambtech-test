import { useEffect, useState } from "react";
import { Text, View } from "react-native";
import { getUserBookingIds } from "../api/restfulBookingApi";
import { getUser } from "../api/mockData";

export default function UserBookings() {
  const [allBookingIds, setAllBookingIds] = useState([]);
  useEffect(() => {
    const fetchBookingIds = async () => {
      const user = await getUser();
      const fetchedAllBookingIds = await getUserBookingIds(user);

      console.log(fetchedAllBookingIds);
      setAllBookingIds(fetchedAllBookingIds);
    };
    fetchBookingIds();
  }, []);
  return (
    <View>
      {allBookingIds.map((booking) => (
        <View>
          <Text>{booking.bookingid}</Text>
        </View>
      ))}
    </View>
  );
}
