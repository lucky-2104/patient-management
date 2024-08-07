"use server";

import { ID, Query } from "node-appwrite";
import { InputFile } from "node-appwrite/file";
import {
    APPOINTMENT_COLLECTION_ID,
  BUCKET_ID,
  DATABASE_ID,
  ENDPOINT,
  PATIENT_COLLECTION_ID,
  PROJECT_ID,
  databases,
  storage,
  users,
} from "../appwrite.config";
import { parseStringify } from "../utils";

export const createAppointment =
    async (appointment: CreateAppointmentParams) => {
        try {
            const newAppointment = await databases.createDocument(
                DATABASE_ID!,
                APPOINTMENT_COLLECTION_ID!,
                ID.unique(),
                appointment
            );
          
            return parseStringify(newAppointment);
            
        } catch (error) {
            console.error("An error occurred while creating a new appointment:", error);
        }
    };

export const getAppointment = async (appointmentId: string) => {
    try {
        const appointment = await databases.getDocument(
            DATABASE_ID!,
            APPOINTMENT_COLLECTION_ID!,
            appointmentId
        );
        
        return parseStringify(appointment);

    } catch (error) {
        console.log(error);
        
    }
    
};