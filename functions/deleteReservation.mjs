import { deleteReservation } from "./../modules/dynamodb/index.mjs";
import { HOTELS } from "./../modules/constants/index.mjs";
export const handler = async (event) => {
  try {
    const { reservationId } = event.pathParameters;

    if (!reservationId) {
      return {
        statusCode: 400,
        body: JSON.stringify({
          message: "Hotel ID and Reservation ID are required",
        }),
      };
    }
    await deleteReservation(HOTELS.ENRICO_HOTEL, reservationId);

    return {
      statusCode: 200,
      body: JSON.stringify({ message: "Reservation deleted successfully" }),
    };
  } catch (error) {
    console.error("Error deleting the reservation:", error);
    return {
      statusCode: 500,
      body: JSON.stringify({ message: "Error deleting the reservation" }),
    };
  }
};
