import axios from "axios";
// import { AsyncStorage } from "@react-native-async-storage/async-storage";

const BASE_URL = "https://restful-booker.herokuapp.com";

// const fetchAndSaveAuthToken = async () => {
//   const token = await axios
//     .post(`${BASE_URL}/auth`, {
//       username: "admin",
//       password: "password123",
//     })
//     .then((res) => {
//       console.log(res.data);
//       return res.data.token;
//     })
//     .catch((err) => {
//       console.log(err);
//     });
//   // await AsyncStorage.setItem("authToken", token);
//   return token;
// };

export const getBookingIds = async () => {
  return await axios.get(`${BASE_URL}/booking`).then((res) => {
    return res.data;
  });
};

export const getUserBookingIds = async (user) => {
  return await axios
    .get(`${BASE_URL}/booking`, {
      params: {
        ...(user.firstName ? { firstname: user.firstNames } : {}),
        ...(user.lastName ? { lastname: user.lastName } : {}),
      },
    })
    .then((res) => {
      return res.data;
    });
};

export const getBookingById = async (bookingId) => {
  return await axios
    .get(`${BASE_URL}/booking/${bookingId}`, {
      headers: {
        Accept: "*/*",
      },
    })
    .then((res) => {
      return res.data;
    });
};

export const createNewBooking = async (booking) => {
  return await axios
    .post(`${BASE_URL}/booking`, booking, {
      headers: {
        Accept: "*/*",
        "Content-Type": "application/json",
      },
    })
    .then((res) => {
      return res.data;
    });
};
