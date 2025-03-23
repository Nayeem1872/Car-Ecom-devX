"use client";
import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { useToast } from "@/components/ui/use-toast";
import { Label } from "@/components/ui/label";
import axios from "axios";
import { ProfileData } from "./components/types";
import PersonalInformation from "./components/PersonalInformation";
import MarketingInformation from "./components/MarketingInformation";
import { Calendar, Loader, Shield, Store, UserCog } from "lucide-react";
import { format } from "date-fns";
import { Switch } from "@/components/ui/switch";

const Profile = () => {
  const { toast } = useToast();
  const [isEditing, setIsEditing] = useState(false);
  const [activeTab, setActiveTab] = useState("personal");
  const [profileData, setProfileData] = useState<ProfileData>({
    _id: "",
    firstName: "",
    lastName: "",
    email: "",
    vendor: {
      _id: "",
      vendorName: "",
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
      serviceEmail: "",
    },
    mfaEnabled: false,
    role: "",
    createdAt: "",
    updatedAt: "",
  });

  const [isLoading, setIsLoading] = useState(true); // Add loading state

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
        setIsLoading(false);
      } catch (error) {
        console.error("Error fetching User:", error);
        setIsLoading(false);
      }
    };

    fetchUser();
  }, []);
  const handleSave = async () => {
    setIsEditing(false);
    const data = {
      vendorName: profileData.vendor.vendorName || "",
      serviceEmail: profileData.vendor.serviceEmail || "",
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
    };

    try {
      const response = await axios.patch(
        `/api/ecom/vendor/edit?id=${profileData.vendor._id}`,
        data
      );
      toast({
        title: "Profile Updated",
        description: "Your profile has been updated successfully.",
      });
      
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
        {isLoading ? (
          <div className="flex items-center justify-center h-56 w-full">
            <div className="flex flex-col items-center gap-2">
              <Loader className="h-8 w-8 animate-spin text-primary" />
              <p className="text-sm text-muted-foreground">Loading...</p>
            </div>
          </div>
        ) : (
          <>
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
                handleAddPhoneNumber={handleAddPhoneNumber}
                handlePhoneChange={handlePhoneChange}
                handleRemovePhoneNumber={handleRemovePhoneNumber}
                handleAddressChange={handleAddressChange}
              />
            )}
            <div className="space-y-4">
              <div className="flex items-center justify-between py-4 border-t">
                <div className="space-y-0.5">
                  <div className="flex items-center gap-2">
                    <Shield size={16} />
                    <Label>Two-Factor Authentication</Label>
                  </div>
                  <p className="text-sm text-muted-foreground">
                    Add an extra layer of security to your account
                  </p>
                </div>
                <Switch
                  checked={profileData.mfaEnabled || false}
                  onCheckedChange={(checked) =>
                    setProfileData({ ...profileData, mfaEnabled: checked })
                  }
                  disabled={!isEditing}
                />
              </div>

              <div className="flex items-center gap-2 py-2">
                <Store size={16} />
                <Label>Vendor ID:</Label>
                <span className="text-sm text-muted-foreground">
                  {profileData.vendor._id || "N/A"}
                </span>
              </div>

              <div className="flex items-center gap-2 py-2">
                <UserCog size={16} />
                <Label>Role:</Label>
                <span className="text-sm text-muted-foreground">
                  {profileData.role || "N/A"}
                </span>
              </div>

              <div className="flex items-center gap-2 py-2">
                <Calendar size={16} />
                <Label>Member Since:</Label>
                <span className="text-sm text-muted-foreground">
                  {profileData.createdAt
                    ? format(new Date(profileData.createdAt), "PPP")
                    : "N/A"}
                </span>
              </div>
            </div>
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
          </>
        )}
      </motion.div>
    </>
  );
};

export default Profile;
