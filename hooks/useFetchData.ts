import { useState, useEffect } from "react";
import axios from "axios";

interface Vendor {
  _id: string;
  vendorName: string;
  vendorDetails: string;
  logo: string;
  vendorAddress: {
    street: string;
    city: string;
    state: string;
    country: string;
    postalCode: string;
    _id: string;
  }[];
  vendorType: string;
  createdBy: string;
  updatedBy: string;
  createdAt: string;
  updatedAt: string;
  phoneNo: string[];
  serviceEmail: string;
}

const useFetchData = <T>(url: string) => {
  const [data, setData] = useState<T | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(url);
        setData(response.data);
        setIsLoading(false);
      } catch (error) {
        console.error("Error fetching data:", error);
        setIsLoading(false);
      }
    };

    fetchData();
  }, [url]);

  return { data, isLoading };
};

export default useFetchData;
