import { createAdminsTable } from "../models/Admins";
import { createAssignmentsTable } from "../models/Assignments";
import { createDriversTable } from "../models/Drivers";
import { createOrderStatusType, createOrdersTable } from "../models/Orders";
import { createTruckStatusType, createTrucksTable } from "../models/Trucks";
import { checkConnection } from "./connection";

async function dbInit() {
  try {
    // Check connection to database
    await checkConnection();

    // Create Admins table
    await createAdminsTable();

    // Create Drivers table
    await createDriversTable();

    // Create Order Status Type
    await createOrderStatusType();

    // Create Orders table
    await createOrdersTable();

    // Create Truck Status Type
    await createTruckStatusType();

    // Create Trucks table
    await createTrucksTable();

    // Create Assignments table
    await createAssignmentsTable();
  } catch (error) {
    console.log("Error initializing database:", error);
  }
}

export default dbInit;
