export interface AlertLogPostProps {
  cameraId: string;
}

export interface AlertLogGetProps {
  start?: string | undefined;
  finish?: string | undefined;
  id: string;
}

export interface CamerasByCustomerIdProps {
  status?: "true" | "false";
  id: string;
}

export interface CameraPostProps {
  name: string;
  ip: string;
  isEnabled: boolean;
  customerId: string;
}

export interface NameProps {
  name: string;
}
