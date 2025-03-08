"use client";
import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import axios from "axios";
import { Search } from "lucide-react";
import { Input } from "@/components/ui/input";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { useToast } from "@/hooks/use-toast";
import AddCategoryModal from "../../components/AddCategoryModal";
import EditCategoryModal from "../../components/EditCategoryModal";
import CategoriesTable, { Category } from "../../components/CategoriesTable";

interface NewCategory {
  name: string;
  description: string;
  parentCategory: string;
}
interface CategoryFormData {
  name: string;
  description: string;
  parentCategory: string | null;
}

const Categories = () => {
  const [newCategory, setNewCategory] = useState<NewCategory>({
    name: "",
    description: "",
    parentCategory: "",
  });
  const [categories, setCategories] = useState<Category[]>([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [open, setOpen] = useState(false);
  const { toast } = useToast();

  const [editForm, setEditForm] = useState<CategoryFormData>({
    name: "",
    description: "",
    parentCategory: null,
  });
  const [selectedCategoryId, setSelectedCategoryId] = useState<string | null>(
    null
  );
  const [openEditModal, setOpenEditModal] = useState(false);

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await axios.get("/api/ecom/category/get");

        const data = Array.isArray(response.data)
          ? response.data
          : response.data.category || [];

        const transformed: Category[] = data.map((cat: any) => ({
          id: cat._id,
          name: cat.name,
          description: cat.description,
          parentCategory: cat.parentCategory,
          productsCount: cat.subCategories ? cat.subCategories.length : 0,
        }));
        setCategories(transformed);
      } catch (error) {
        console.error("Error fetching categories:", error);
        toast({
          title: "Error",
          description: "Failed to fetch categories",
          variant: "destructive",
        });
      }
    };

    fetchCategories();
  }, [toast]);

  const handleAddCategory = async () => {
    if (!newCategory.name) {
      toast({
        title: "Error",
        description: "Please provide a category name",
        variant: "destructive",
      });
      return;
    }

    try {
      const response = await axios.post("/api/ecom/category/craete", {
        name: newCategory.name,
        description: newCategory.description,
        parentCategory: newCategory.parentCategory,
      });

      const createdCategory: Category = {
        id: response.data._id,
        name: response.data.name ?? newCategory.name,
        description: response.data.description ?? newCategory.description,
        parentCategory:
          response.data.parentCategory ?? newCategory.parentCategory,
        productsCount: response.data.subCategories
          ? response.data.subCategories.length
          : 0,
      };

      setCategories([...categories, createdCategory]);
      setNewCategory({ name: "", description: "", parentCategory: "" });
      setOpen(false);

      toast({
        title: "Success",
        description: "Category added successfully",
      });
    } catch (error) {
      console.error("Error adding category:", error);
      toast({
        title: "Error",
        description: "Failed to add category",
        variant: "destructive",
      });
    }
  };

  const handleEditCategory = async () => {
    if (!selectedCategoryId) return;

    try {
      const response = await axios.patch(
        `/api/ecom/category/edit?id=${selectedCategoryId}`,
        {
          name: editForm.name,
          description: editForm.description,
          parentCategory:
            editForm.parentCategory === "" ? null : editForm.parentCategory,
        }
      );
      const updatedCategory = {
        id: response.data._id,
        name: response.data.name ?? editForm.name,
        description: response.data.description ?? editForm.description,
        parentCategory: response.data.parentCategory ?? editForm.parentCategory,
        productsCount: response.data.subCategories
          ? response.data.subCategories.length
          : 0,
      };

      setCategories((prevCategories) =>
        prevCategories.map((cat) =>
          cat.id === updatedCategory.id ? updatedCategory : cat
        )
      );
      setOpenEditModal(false);
      setSelectedCategoryId(null);

      toast({
        title: "Success",
        description: "Category updated successfully",
      });
    } catch (error) {
      console.error("Error updating category:", error);
      toast({
        title: "Error",
        description: "Failed to update category",
        variant: "destructive",
      });
    }
  };

  const filteredCategories = categories.filter(
    (category) =>
      category.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      category.description.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // Callbacks for the table actions
  const handleViewCategory = (category: Category) => {
    // Implement your view functionality here
    console.log("Viewing category:", category);
  };

  const handleEditCategoryClick = (category: Category) => {
    setSelectedCategoryId(category.id);
    setEditForm({
      name: category.name,
      description: category.description,
      parentCategory: category.parentCategory, // keep null as null if it is null
    });
    setOpenEditModal(true);
  };

  const handleDeleteCategory = (category: Category) => {
    // Implement your delete functionality here
    console.log("Deleting category:", category);
  };

  return (
    <>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
        className="mb-8"
      >
        <h1 className="text-3xl font-bold mb-2">Categories</h1>
        <p className="text-muted-foreground">Manage your product categories</p>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1, duration: 0.5 }}
      >
        <Card className="glass-card overflow-hidden">
          <CardHeader className="pb-4">
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
              <div>
                <CardTitle>Category Management</CardTitle>
                <CardDescription>
                  View and manage your product categories
                </CardDescription>
              </div>
              <div className="flex items-center gap-2">
                <div className="relative">
                  <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                  <Input
                    placeholder="Search categories..."
                    className="pl-8 glass-effect w-[180px] sm:w-[220px]"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                  />
                </div>
                <AddCategoryModal
                  open={open}
                  setOpen={setOpen}
                  newCategory={newCategory}
                  setNewCategory={setNewCategory}
                  handleAddCategory={handleAddCategory}
                />
              </div>
            </div>
          </CardHeader>
          <CardContent>
            <CategoriesTable
              categories={filteredCategories}
              onView={handleViewCategory}
              onEdit={handleEditCategoryClick}
              onDelete={handleDeleteCategory}
            />
          </CardContent>
        </Card>
      </motion.div>

      {openEditModal && (
        <EditCategoryModal
          open={openEditModal}
          setOpen={setOpenEditModal}
          category={editForm}
          setCategory={setEditForm}
          handleEditCategory={handleEditCategory}
        />
      )}
    </>
  );
};

export default Categories;
