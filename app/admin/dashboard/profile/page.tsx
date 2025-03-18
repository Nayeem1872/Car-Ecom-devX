"use client";
import { useEffect, useState } from "react";
import { motion } from "framer-motion";

import { Button } from "@/components/ui/button";

import { useToast } from "@/components/ui/use-toast";

import axios from "axios";
import PersonalInformation from "./components/PersonalInformation";
import MarketingInformation from "./components/MarketingInformation";

const Profile = () => {
  const { toast } = useToast();
  const [isEditing, setIsEditing] = useState(false);
  const [activeTab, setActiveTab] = useState("personal");
  const [profileData, setProfileData] = useState<any>({
    vendor: {
      phoneNo: [],
      vendorAddress: [
        {
          street: "",
          city: "",
          state: "",
          country: "",
          postalCode: "",
        },
      ],
      vendorName: "",
    },
  });

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const response = await axios.get("/api/ecom/user");
        setProfileData({
          ...response.data.data,
          vendor: response.data.data.vendor || {
            phoneNo: [],
            vendorAddress: [
              {
                street: "",
                city: "",
                state: "",
                country: "",
                postalCode: "",
              },
            ],
          },
        });
      } catch (error) {
        console.error("Error fetching User:", error);
      }
    };

    fetchUser();
  }, []);

  const handleSave = async () => {
    setIsEditing(false);

    // Prepare data to match the expected API structure
    const data = {
      //   vendorName: profileData.vendor.vendorName || "",
      vendorAddress: [
        {
          street: profileData.vendor.vendorAddress[0]?.street || "",
          city: profileData.vendor.vendorAddress[0]?.city || "",
          state: profileData.vendor.vendorAddress[0]?.state || "",
          country: profileData.vendor.vendorAddress[0]?.country || "",
          postalCode: profileData.vendor.vendorAddress[0]?.postalCode || "",
        },
      ],
      phoneNo: profileData.vendor.phoneNo || [],
      //   serviceEmail: profileData.email || "",
    };

    try {
      // Send the PATCH request
      const response = await axios.patch(
        `/api/ecom/vendor/edit?id=${profileData._id}`,
        data
      );
      toast({
        title: "Profile Updated",
        description: "Your profile has been updated successfully.",
      });
      console.log("Response from PATCH request:", response);
    } catch (error) {
      console.error("Error updating vendor:", error);
      toast({
        title: "Error",
        description: "An error occurred while updating your profile.",
        variant: "destructive",
      });
    }
  };

  const handleAddPhoneNumber = () => {
    setProfileData({
      ...profileData,
      vendor: {
        ...profileData.vendor,
        phoneNo: [...profileData.vendor.phoneNo, ""], // Add a new empty phone number
      },
    });
  };
  console.log("profileData", profileData);

  const handleRemovePhoneNumber = (index: number) => {
    const updatedPhoneNumbers = [...profileData.vendor.phoneNo];
    updatedPhoneNumbers.splice(index, 1); // Remove phone number at the given index
    setProfileData({
      ...profileData,
      vendor: {
        ...profileData.vendor,
        phoneNo: updatedPhoneNumbers,
      },
    });
  };

  const handlePhoneChange = (index: number, value: string) => {
    const updatedPhoneNumbers = [...profileData.vendor.phoneNo];
    updatedPhoneNumbers[index] = value; // Update the phone number at the given index
    setProfileData({
      ...profileData,
      vendor: {
        ...profileData.vendor,
        phoneNo: updatedPhoneNumbers,
      },
    });
  };

  const handleAddressChange = (field: string, value: string) => {
    setProfileData({
      ...profileData,
      vendor: {
        ...profileData.vendor,
        vendorAddress: [
          {
            ...profileData.vendor.vendorAddress[0],
            [field]: value, // Update the specific address field
          },
        ],
      },
    });
  };

  return (
    <>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="container mx-auto py-8"
      >
        <h1 className="text-3xl font-bold mb-2">Profile</h1>
        <p className="text-muted-foreground mb-8">
          View and manage your profile information
        </p>

        {/* Tabs */}
        <div className="flex space-x-4 mb-6">
          <Button
            variant={activeTab === "personal" ? "default" : "outline"}
            onClick={() => setActiveTab("personal")}
          >
            Personal Information
          </Button>
          <Button
            variant={activeTab === "marketing" ? "default" : "outline"}
            onClick={() => setActiveTab("marketing")}
          >
            Marketing Information
          </Button>
        </div>

        {/* Tab Content */}
        {activeTab === "personal" && (
          <PersonalInformation
            profileData={profileData}
            setProfileData={setProfileData}
            isEditing={isEditing}
          />
        )}

        {activeTab === "marketing" && (
          <MarketingInformation
            profileData={profileData}
            setProfileData={setProfileData}
            isEditing={isEditing}
            handleAddPhoneNumber={() => {}}
            handlePhoneChange={() => {}}
            handleRemovePhoneNumber={() => {}}
            handleAddressChange={() => {}}
          />
        )}

        <div className="flex justify-end gap-4 pt-4">
          {activeTab === "marketing" && isEditing ? (
            <>
              <Button variant="outline" onClick={() => setIsEditing(false)}>
                Cancel
              </Button>
              <Button onClick={handleSave}>Save Changes</Button>
            </>
          ) : activeTab === "marketing" ? (
            <Button onClick={() => setIsEditing(true)}>Edit Profile</Button>
          ) : null}
        </div>
      </motion.div>
    </>
  );
};

export default Profile;
