import { HOTELS } from "../modules/constants/index.mjs";
import { updateReservation } from "./../modules/dynamodb/index.mjs";

export const handler = async (event) => {
  try {
    const { reservationId } = event.pathParameters;
    const { checkInDate, checkOutDate } = JSON.parse(event.body);

    if (!reservationId) {
      return {
        statusCode: 400,
        body: JSON.stringify({
          message: "Hotel ID and Reservation ID are required",
        }),
      };
    }
    const updateData = {};
    if (checkInDate) updateData.checkInDate = checkInDate;
    if (checkOutDate) updateData.checkOutDate = checkOutDate;

    const updatedReservation = await updateReservation(
      HOTELS.ENRICO_HOTEL,
      reservationId,
      updateData
    );

    return {
      statusCode: 200,
      body: JSON.stringify({
        message: "Reservation updated successfully",
        updatedReservation,
      }),
    };
  } catch (error) {
    console.error("Error updating the reservation:", error);
    return {
      statusCode: 500,
      body: JSON.stringify({ message: "Error updating the reservation" }),
    };
  }
};
