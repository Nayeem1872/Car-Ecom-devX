export interface VendorAddress {
  street: string;
  city: string;
  state: string;
  country: string;
  postalCode: string;
}

export interface ProfileData {
  _id: string;
  firstName: string;
  lastName: string;
  email: string;
  vendor: {
    _id: string;
    vendorName: string;
    phoneNo: string[];
    serviceEmail: string;
    vendorAddress: VendorAddress[];
  };
  mfaEnabled: boolean;
  role: string;
  createdAt: string;
  updatedAt: string;
}
