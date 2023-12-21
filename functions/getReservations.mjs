import { HOTELS } from "../modules/constants/index.mjs";
import { getReservations } from "../modules/dynamodb/index.mjs";

export const handler = async (event) => {
  try {
    const hotelId = HOTELS.ENRICO_HOTEL;

    if (!hotelId) {
      return {
        statusCode: 400,
        body: JSON.stringify({ message: "Hotel ID is required" }),
      };
    }

    const reservations = await getReservations(hotelId);

    return {
      statusCode: 200,
      body: JSON.stringify({ reservations: reservations.Items }),
    };
  } catch (error) {
    console.error("Error retrieving reservations:", error);
    return {
      statusCode: 500,
      body: JSON.stringify({ message: "Error retrieving reservations" }),
    };
  }
};
