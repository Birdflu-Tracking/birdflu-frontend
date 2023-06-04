export type WsResponse = {
  message: string;
  type: Number;
};

type Timestamp = {
  _seconds: number;
  _nanoseconds: number;
};

export interface Batch {
  batchSize: number;
  batchId: string;
  createdAt: Timestamp;
  farmerId: string;
  distributorId: string;
  sellerId: string;
  infected: boolean;
  currentOwner: any;
}

export interface BatchWithBuyer extends Batch {
  buyer: User;
}

export type UserType = "farmer" | "distributor" | "seller";

export type User = {
  userId: string;
  fullName: string;
  email: string;
  phoneNumber: number;
  outletAddress: string;
  type: UserType;
  outletName: string;
  latitude: number;
  longitude: number;
  infected: boolean;
};

export type BatchSalesData = {
  totalBatchesGenerated: number;
  totalBatchesSold: number;
  totalChickensSold: number;
};

export type FarmReports = {
  reportId: string;
  farmId: string;
  HealthWorkerDocId: string;
  initiatedAt: Timestamp;
  submittedAt: Timestamp;
  submitted: boolean;
  predictionResult: boolean;
  chickenSymptoms: Array<object>;
};
