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
  predictionResult: string;
  avianResult:boolean,
  chickenSymptoms: Array<object>;
};

export type SellerReports = {
  reportId: string;
  reportData: {
    address: string;
    createdAt: Timestamp;
    phoneNumber: number;
    poultryShopDocId: string;
    poultryShopName: string;
    reporterName: string;
    symptomStartDate: Timestamp;
    doctorLetterUrl: string;
  };
};

export type CurrentRequests = {
  submitted: Array<{
    reportId: string;
    reportData: FarmReports;
    farmData: User;
  }>;
  notSubmitted: Array<{
    reportId: string;
    reportData: FarmReports;
    farmData: User;
  }>;
};
