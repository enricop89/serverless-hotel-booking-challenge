import { createReservation } from "../modules/dynamodb/index.mjs";
import { HOTELS } from "../modules/constants/index.mjs";
export const handler = async (event) => {
  try {
    const data = JSON.parse(event.body);
    data.hotelId = HOTELS.ENRICO_HOTEL;
    if (!data.customerId || !data.checkInDate || !data.checkOutDate) {
      return {
        statusCode: 400,
        body: JSON.stringify({
          message: "Missing required reservation details",
        }),
      };
    }
    console.log("trigger push");
    const reservationId = await createReservation(data);

    return {
      statusCode: 200,
      body: JSON.stringify({
        message: "Reservation created successfully",
        reservationId,
      }),
    };
  } catch (error) {
    console.error("Error creating reservation:", error);
    return {
      statusCode: 500,
      body: JSON.stringify({ message: "Error creating reservation" }),
    };
  }
};
