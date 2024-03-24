import { useState } from "react";
import { useForm, Controller } from "react-hook-form";
import {
  View,
  Text,
  TextInput,
  Button,
  StyleSheet,
  SafeAreaView,
  Alert,
} from "react-native";
import { createNewBooking } from "../api/restfulBookingApi";

export default function CreateBooking() {
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = async (data) => {
    const booking = {
      firstname: data.firstName,
      lastname: data.lastName,
      totalprice: parseInt(data.totalPrice),
      depositpaid: false,
      bookingdates: {
        checkin: data.checkInDate,
        checkout: data.checkOutDate,
      },
      additionalneeds: data.additionalNeeds,
    };
    await createNewBooking(booking)
      .then((res) => {
        Alert.alert(
          "Success",
          `Booking ${res.bookingid} has been created succesfully.`,
          [
            {
              text: "Ok",
            },
          ]
        );
      })
      .catch((err) => {
        console.log("err", err);
        Alert.alert(
          "Error",
          "An error occurred while trying to create the booking.",
          [
            {
              text: "Ok",
            },
          ]
        );
      });
  };

  const validateIsNumber = (value) => {
    const matches = value.match(
      /^(?:0\.(?:0[0-9]|[0-9]\d?)|[0-9]\d*(?:\.\d{1,2})?)(?:e[+-]?\d+)?$/
    );
    return matches?.length > 0 || "Total price must be a number";
  };

  return (
    <SafeAreaView>
      <View style={styles.container}>
        <Controller
          control={control}
          render={({ field }) => (
            <TextInput
              {...field}
              onChangeText={(value) => field.onChange(value)}
              style={styles.input}
              placeholder="Your first name"
            />
          )}
          name="firstName"
          rules={{ required: "You must enter your first name" }}
        />
        {errors.firstName && (
          <Text style={styles.errorText}>{errors.firstName.message}</Text>
        )}

        <Controller
          control={control}
          render={({ field }) => (
            <TextInput
              {...field}
              onChangeText={(value) => field.onChange(value)}
              style={styles.input}
              placeholder="Your last name"
            />
          )}
          name="lastName"
          rules={{ required: "You must enter your last name" }}
        />
        {errors.lastName && (
          <Text style={styles.errorText}>{errors.lastName.message}</Text>
        )}

        <Controller
          control={control}
          render={({ field }) => (
            <TextInput
              {...field}
              type="number"
              onChangeText={(value) => field.onChange(value)}
              style={styles.input}
              placeholder="Total price"
            />
          )}
          name="totalPrice"
          rules={{
            required: "You must enter your total price",
            validate: validateIsNumber,
          }}
        />
        {errors.totalPrice && (
          <Text style={styles.errorText}>{errors.totalPrice.message}</Text>
        )}

        <Controller
          control={control}
          render={({ field }) => (
            <TextInput
              {...field}
              onChangeText={(value) => field.onChange(value)}
              style={styles.input}
              placeholder="Check in date"
            />
          )}
          name="checkInDate"
          rules={{ required: "You must enter your check in date" }}
        />
        {errors.checkInDate && (
          <Text style={styles.errorText}>{errors.checkInDate.message}</Text>
        )}

        <Controller
          control={control}
          render={({ field }) => (
            <TextInput
              {...field}
              onChangeText={(value) => field.onChange(value)}
              style={styles.input}
              placeholder="Check out date"
            />
          )}
          name="checkOutDate"
          rules={{ required: "You must enter your check out date" }}
        />
        {errors.checkOutDate && (
          <Text style={styles.errorText}>{errors.checkOutDate.message}</Text>
        )}

        <Controller
          control={control}
          render={({ field }) => (
            <TextInput
              {...field}
              onChangeText={(value) => field.onChange(value)}
              style={styles.input}
              placeholder="Additional Needs"
            />
          )}
          name="additionalNeeds"
        />
        {errors.additionalNeeds && (
          <Text style={styles.errorText}>{errors.additionalNeeds.message}</Text>
        )}

        <Button title="Submit" onPress={handleSubmit(onSubmit)} />
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 16,
  },
  input: {
    height: 40,
    borderColor: "gray",
    borderWidth: 1,
    marginBottom: 10,
    padding: 8,
  },
  errorText: {
    color: "red",
    marginBottom: 10,
  },
});
