import { getReservationById } from "./../modules/dynamodb/index.mjs";
import { HOTELS } from "./../modules/constants/index.mjs";

export const handler = async (event) => {
  try {
    const hotelId = HOTELS.ENRICO_HOTEL;
    const { reservationId } = event.pathParameters;

    if (!hotelId || !reservationId) {
      return {
        statusCode: 400,
        body: JSON.stringify({
          message: "Hotel ID and Reservation ID are required",
        }),
      };
    }

    const reservation = await getReservationById(hotelId, reservationId);

    if (!reservation) {
      return {
        statusCode: 404,
        body: JSON.stringify({ message: "Reservation not found" }),
      };
    }

    return {
      statusCode: 200,
      body: JSON.stringify(reservation),
    };
  } catch (error) {
    console.error("Error retrieving the reservation:", error);
    return {
      statusCode: 500,
      body: JSON.stringify({ message: "Error retrieving the reservation" }),
    };
  }
};
