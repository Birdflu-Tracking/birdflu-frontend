export type WsResponse = {
  message: string;
  type: Number;
};

export interface Batch {
  batchSize: number;
  batchId: string;
  createdAt: {
    _nanoseconds: number;
    _seconds: number;
  };
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
  firstName: string;
  lastName: string;
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
