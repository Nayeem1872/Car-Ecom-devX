"use client";
import React from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Eye, Edit, Trash2 } from "lucide-react";

interface BannerTableProps {
  banners: any[];
}

const BannerTable = ({ banners }: BannerTableProps) => {
  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead className="w-[80px]">Preview</TableHead>
          <TableHead>Name</TableHead>
          <TableHead>Image URL</TableHead>
          <TableHead className="text-right">Actions</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {banners.length > 0 ? (
          banners.map((banner) => (
            <TableRow key={banner.id}>
              <TableCell>
                <div className="h-12 w-24 rounded-md overflow-hidden">
                  <img
                    src={banner.image}
                    alt={`${banner.name} Preview`}
                    className="h-full w-full object-cover"
                  />
                </div>
              </TableCell>
              <TableCell className="font-medium">{banner.name}</TableCell>
              <TableCell className="truncate max-w-[200px]">
                <span className="text-xs text-muted-foreground">
                  {banner.image}
                </span>
              </TableCell>
              <TableCell className="text-right">
                <div className="flex justify-end gap-2">
                  <Button variant="ghost" size="sm">
                    <Eye className="h-4 w-4" />
                  </Button>
                  <Button variant="ghost" size="sm">
                    <Edit className="h-4 w-4" />
                  </Button>
                  <Button variant="ghost" size="sm">
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </div>
              </TableCell>
            </TableRow>
          ))
        ) : (
          <TableRow>
            <TableCell colSpan={4} className="h-24 text-center">
              No banners found.
            </TableCell>
          </TableRow>
        )}
      </TableBody>
    </Table>
  );
};

export default BannerTable;
