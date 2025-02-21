export interface Filters {
  code?: string;
  statusStringMapId?: string;
  startDate?: string;
  endDate?: string;
}

export interface RequestStatusIncident {
  incidentId?: string;
  statusCode?: string;
  programCode?: string;
}

export interface CallDetails {
  contactTypeStringMapName: string;
  contactTypeStringMapId: string;
  doctorCRM?: string;
  doctorCRMUF?: string;
  doctorName?: string;
  availabilityStart?: string | null;
  availabilityEnd?: string | null;
  availabilityStart2?: string | null;
  availabilityEnd2?: string | null;
  availabilityStart3?: string | null;
  availabilityEnd3?: string | null;
  contactName?: string;
  contactPhoneNumber?: string;
  incidentDescription?: string;
  healthProfessionalName?: string | null;
  healthProfessionalPhoneNumber?: string | null;
  healthProfessionalCorenUF?: string | null;
  healthProfessionalCorenNumber?: string | null;
  labCollectionCity?: string | null;
  labCollectionState?: string | null;
  clinicName?: string | null;
  clinicUF?: string | null;
  clinicCity?: string | null;
  appointmentDate?: string | null;
  linkToInteraction?: string | null;
}
