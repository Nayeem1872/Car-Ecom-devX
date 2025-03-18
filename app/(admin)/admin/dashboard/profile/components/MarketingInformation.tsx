"use client";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Phone } from "lucide-react";
import { ProfileData } from "./types";

interface MarketingInformationProps {
  profileData: ProfileData;
  setProfileData: React.Dispatch<React.SetStateAction<ProfileData>>;
  isEditing: boolean;
  handleAddPhoneNumber: () => void;
  handlePhoneChange: (index: number, value: string) => void;
  handleRemovePhoneNumber: (index: number) => void;
  handleAddressChange: (field: string, value: string) => void;
}

const MarketingInformation: React.FC<MarketingInformationProps> = ({
  profileData,
  setProfileData,
  isEditing,
  handleAddPhoneNumber,
  handlePhoneChange,
  handleRemovePhoneNumber,
  handleAddressChange,
}) => {
  console.log("profileData", profileData);

  return (
    <div className="grid gap-6">
      <Card>
        <CardHeader>
          <CardTitle>Marketing Information</CardTitle>
          <CardDescription>
            Manage your phone numbers and address for marketing purposes
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="space-y-2">
            <Label className="flex items-center gap-2">Vendor Name:</Label>
            <Input
              value={profileData.vendor?.vendorName || ""}
              onChange={(e) =>
                setProfileData({
                  ...profileData,
                  vendor: {
                    ...profileData.vendor,
                    vendorName: e.target.value,
                  },
                })
              }
              disabled={!isEditing}
              placeholder="Enter Vendor Name"
            />
          </div>

          {/* Service Email */}
          <div className="space-y-2">
            <Label className="flex items-center gap-2">Service Email:</Label>
            <Input
              value={profileData.vendor?.serviceEmail || ""}
              onChange={(e) =>
                setProfileData({
                  ...profileData,
                  vendor: {
                    ...profileData.vendor,
                    serviceEmail: e.target.value,
                  },
                })
              }
              disabled={!isEditing}
              placeholder="Enter Service Email"
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="phoneNo" className="flex items-center gap-2">
              <Phone size={16} />
              Phone Numbers
            </Label>
            {profileData.vendor?.phoneNo?.map((phone, index) => (
              <div key={index} className="flex gap-2">
                <Input
                  id={`phoneNo-${index}`}
                  value={phone}
                  onChange={(e) => handlePhoneChange(index, e.target.value)}
                  disabled={!isEditing}
                />
                {isEditing && (
                  <Button
                    variant="outline"
                    onClick={() => handleRemovePhoneNumber(index)}
                  >
                    Remove
                  </Button>
                )}
              </div>
            ))}
            {isEditing && (
              <Button variant="outline" onClick={handleAddPhoneNumber}>
                Add Phone Number
              </Button>
            )}
          </div>

          {/* Address Fields */}
          <div className="space-y-2">
            <Label htmlFor="street" className="flex items-center gap-2">
              Address
            </Label>
            <Input
              id="street"
              value={profileData.vendor?.vendorAddress[0]?.street || ""}
              onChange={(e) => handleAddressChange("street", e.target.value)}
              disabled={!isEditing}
              placeholder="Street"
            />
            <div className="grid grid-cols-2 gap-6">
              <Input
                id="city"
                value={profileData.vendor?.vendorAddress[0]?.city || ""}
                onChange={(e) => handleAddressChange("city", e.target.value)}
                disabled={!isEditing}
                placeholder="City"
              />
              <Input
                id="state"
                value={profileData.vendor?.vendorAddress[0]?.state || ""}
                onChange={(e) => handleAddressChange("state", e.target.value)}
                disabled={!isEditing}
                placeholder="State"
              />
            </div>
            <div className="grid grid-cols-2 gap-6">
              <Input
                id="country"
                value={profileData.vendor?.vendorAddress[0]?.country || ""}
                onChange={(e) => handleAddressChange("country", e.target.value)}
                disabled={!isEditing}
                placeholder="Country"
              />
              <Input
                id="postalCode"
                value={profileData.vendor?.vendorAddress[0]?.postalCode || ""}
                onChange={(e) =>
                  handleAddressChange("postalCode", e.target.value)
                }
                disabled={!isEditing}
                placeholder="Postal Code"
              />
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default MarketingInformation;
