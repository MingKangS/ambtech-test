import { useEffect, useState } from "react";
import { Text, View } from "react-native";
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
      {allBookingIds.map((booking) => (
        <Link
          key={booking.bookingid}
          href={{
            pathname: "/booking/[id]",
            params: { id: booking.bookingid },
          }}
        >
          <View>
            <Text>{booking.bookingid}</Text>
          </View>
        </Link>
      ))}
    </View>
  );
}
