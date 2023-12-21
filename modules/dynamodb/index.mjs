import {
  DynamoDBClient,
  PutItemCommand,
  UpdateItemCommand,
  GetItemCommand,
  DeleteItemCommand,
  QueryCommand,
} from "@aws-sdk/client-dynamodb";
import { v4 as uuidv4 } from "uuid";
const dynamoClient = new DynamoDBClient({ region: process.env.REGION });
import { DYNAMO_ENTITIES_PREFIX } from "../constants/index.mjs";

const TABLE_NAME = process.env.DYNAMODB_TABLE;

const createReservation = async (reservationData) => {
  const reservationId = uuidv4();
  const params = {
    TableName: TABLE_NAME,
    Item: {
      PK: { S: `${DYNAMO_ENTITIES_PREFIX.HOTELS}${reservationData.hotelId}` },
      SK: { S: `${DYNAMO_ENTITIES_PREFIX.RESERVATIONS}${reservationId}` },
      customerId: { S: reservationData.customerId },
      checkInDate: { S: reservationData.checkInDate },
      checkOutDate: { S: reservationData.checkOutDate },
    },
  };
  const command = new PutItemCommand(params);

  await dynamoClient.send(command);
  return reservationId;
};

const getReservations = async (hotelId) => {
  const params = {
    TableName: TABLE_NAME,
    KeyConditionExpression: "PK = :hotelId",
    ExpressionAttributeValues: {
      ":hotelId": { S: `${DYNAMO_ENTITIES_PREFIX.HOTELS}${hotelId}` },
    },
  };

  const command = new QueryCommand(params);

  const response = await dynamoClient.send(command);
  return response;
};

const getReservationById = async (hotelId, reservationId) => {
  const params = {
    TableName: TABLE_NAME,
    Key: {
      PK: { S: `${DYNAMO_ENTITIES_PREFIX.HOTELS}${hotelId}` },
      SK: { S: `${DYNAMO_ENTITIES_PREFIX.RESERVATIONS}${reservationId}` },
    },
  };
  const command = new GetItemCommand(params);
  const result = await dynamoClient.send(command);
  return result.Item;
};

const deleteReservation = async (hotelId, reservationId) => {
  const params = {
    TableName: TABLE_NAME,
    Key: {
      PK: { S: `${DYNAMO_ENTITIES_PREFIX.HOTELS}${hotelId}` },
      SK: { S: `${DYNAMO_ENTITIES_PREFIX.RESERVATIONS}${reservationId}` },
    },
  };
  const command = new DeleteItemCommand(params);

  const result = await dynamoClient.send(command);
  return result;
};

const updateReservation = async (hotelId, reservationId, updateData) => {
  const updateExpressions = [];
  const expressionAttributeValues = {};
  const expressionAttributeNames = {};

  for (const [key, value] of Object.entries(updateData)) {
    updateExpressions.push(`#${key} = :${key}`);
    expressionAttributeValues[`:${key}`] = { S: value };
    expressionAttributeNames[`#${key}`] = key;
  }

  const params = {
    TableName: TABLE_NAME,
    Key: {
      PK: { S: `${DYNAMO_ENTITIES_PREFIX.HOTELS}${hotelId}` },
      SK: { S: `${DYNAMO_ENTITIES_PREFIX.RESERVATIONS}${reservationId}` },
    },
    ConditionExpression: "attribute_exists(PK) AND attribute_exists(SK)",
    UpdateExpression: `SET ${updateExpressions.join(", ")}`,
    ExpressionAttributeValues: expressionAttributeValues,
    ExpressionAttributeNames: expressionAttributeNames,
    ReturnValues: "UPDATED_NEW",
  };
  const command = new UpdateItemCommand(params);

  try {
    const result = await dynamoClient.send(command);
    return result.Attributes;
  } catch (error) {
    if (error.code === "ConditionalCheckFailedException") {
      throw new Error("Reservation does not exist");
    }
    throw error;
  }
};

export {
  createReservation,
  getReservations,
  getReservationById,
  deleteReservation,
  updateReservation,
};
