// components/PersonalInformation.tsx
"use client";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { User, Mail } from "lucide-react";
import { ProfileData } from "./types";

interface PersonalInformationProps {
  profileData: ProfileData;
  setProfileData: React.Dispatch<React.SetStateAction<ProfileData>>;
  isEditing: boolean;
}

const PersonalInformation: React.FC<PersonalInformationProps> = ({
  profileData,
  setProfileData,
  isEditing,
}) => {
  return (
    <div className="grid gap-6">
      <Card>
        <CardHeader>
          <CardTitle>Personal Information</CardTitle>
          <CardDescription>
            Manage your personal details and account settings
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-2">
              <Label htmlFor="firstName" className="flex items-center gap-2">
                <User size={16} />
                First Name
              </Label>
              <Input
                id="firstName"
                value={profileData.firstName || ""}
                onChange={(e) =>
                  setProfileData({
                    ...profileData,
                    firstName: e.target.value,
                  })
                }
                disabled={!isEditing}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="lastName" className="flex items-center gap-2">
                <User size={16} />
                Last Name
              </Label>
              <Input
                id="lastName"
                value={profileData.lastName || ""}
                onChange={(e) =>
                  setProfileData({
                    ...profileData,
                    lastName: e.target.value,
                  })
                }
                disabled={!isEditing}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="email" className="flex items-center gap-2">
                <Mail size={16} />
                Email
              </Label>
              <Input
                id="email"
                type="email"
                value={profileData.email || ""}
                onChange={(e) =>
                  setProfileData({ ...profileData, email: e.target.value })
                }
                disabled={!isEditing}
              />
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default PersonalInformation;
