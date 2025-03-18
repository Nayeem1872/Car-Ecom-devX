// types.ts

export interface VendorAddress {
  street: string;
  city: string;
  state: string;
  country: string;
  postalCode: string;
  _id: string;
}

export interface Vendor {
  _id: string;
  vendorName: string;
  vendorDetails: string;
  logo: string;
  vendorAddress: VendorAddress[];
  vendorType: string;
  createdBy: string;
  updatedBy: string;
  createdAt: string;
  updatedAt: string;
  __v: number;
}

export interface Discount {
  price: number;
  startAt: string | null;
  endAt: string | null;
}

export interface CarSpec {
  fieldLabel: string;
  fieldValue: string;
}

export interface CarFeature {
  required: boolean;
  fieldName: string;
  fieldLabel: string;
  fieldType: string;
  fieldValue: string;
  _id: string;
  options: any[];
}

export interface CarVariant {
  varient: any[];
}

export interface Car {
  id: string;
  specs: Record<string, CarSpec>;
  features: CarFeature[];
  year: number;
  mileage: number;
  condition: string;
  exteriorColor: string;
  interiorColor: string;
  vin: string;
  stockNumber: string;
  relatedCars: number[];
  discount: Discount;
  varients: CarVariant;
  _id: string;
  name: string;
  description: string;
  featured: boolean;
  price: number;
  stock: number;
  images: string[];
  vendor: Vendor;
  createdBy: string;
  updatedBy: string;
  createdAt: string;
  updatedAt: string;
  __v: number;
}

export interface CarDetailsContentProps {
  car: Car;
  currentImageIndex: number;
  setCurrentImageIndex: (index: number) => void;
  handlePrevImage: () => void;
  handleNextImage: () => void;
}
