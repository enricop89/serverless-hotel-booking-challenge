# Hotel Reservation System

## Introduction

The Hotel Reservation System is a serverless web platform designed for a hotel chain to manage room reservations. This system allows for creating, listing, retrieving single reservations, updating, and deleting reservations. While currently configured for a single hotel, the architecture is scalable and can be extended to accommodate multiple hotels in the future.

## Project Structure

### Serverless Framework

The project leverages the Serverless Framework for AWS deployment. The configuration is split across different stages - development (dev) and production (prod) - to facilitate seamless development and deployment processes.

#### serverless.yml Structure

The serverless.yml file is the heart of the Serverless Framework configuration. It defines the AWS Lambda functions, the events that trigger them, and other AWS resources.

Key Components:

- Functions: Defines the Lambda functions for CRUD operations on reservations.
- IAM Role Statements: Configures the necessary permissions for Lambda functions, particularly for DynamoDB access.

- Stage-Specific Configuration: The configuration for different stages (dev and prod) is managed through external YAML files.
  The custom section in serverless.yml dynamically references these files based on the deployment stage. This approach allows for distinct configurations for different environments.

`Development (dev.yml)`: Contains configuration specific to the development stage.
`Production (prod.yml)`: Contains configuration specific to the prod stage

#### Postman Collection

A Postman collection is provided to interact with the deployed API easily. This collection includes pre-configured requests for all the supported operations:

Create Reservation
List Reservations
Get Single Reservation
Update Reservation
Delete Reservation

Importing the Collection:

Download the provided Postman collection JSON file.
Open Postman and import the collection using the 'Import' button.
Configure the environment variables (like API endpoint) in Postman for your specific deployment.

### Getting Started

To get started with this project:

Install the Serverless Framework and configure AWS credentials.
Deploy the service using serverless deploy --stage dev for development or serverless deploy --stage prod for production.
Use the Postman collection to test and interact with the API.
