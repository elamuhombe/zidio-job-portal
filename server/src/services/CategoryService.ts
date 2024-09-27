//src/services/CaregoryService.ts
import { Category } from "../models/Category"; // Assuming you have a Category model
import { ICategory } from "../types"; // Assuming you have a corresponding ICategory interface
import { HttpError } from "../middleware/Error"; // Error handling class

export class CategoryService {
    // Method to create a new category
    public async createCategory(payload: ICategory): Promise<ICategory> {
        try {
            const category = new Category(payload);
            const savedCategory = await category.save();
            return savedCategory;
        } catch (error) {
            throw new HttpError(500, "Failed to create category");
        }
    }

    // Method to get all categories
    public async getAllCategories(): Promise<ICategory[]> {
        try {
            const categories = await Category.find();
            return categories;
        } catch (error) {
            throw new HttpError(500, "Failed to fetch categories");
        }
    }

    // Method to get a category by ID
    public async getCategoryById(id: string): Promise<ICategory> {
        try {
            const category = await Category.findById(id);
            if (!category) {
                throw new HttpError(404, "Category not found");
            }
            return category;
        } catch (error) {
            throw new HttpError(500, "Failed to fetch category");
        }
    }

    // Method to update a category
    public async updateCategory(id: string, payload: Partial<ICategory>): Promise<ICategory> {
        try {
            const updatedCategory = await Category.findByIdAndUpdate(id, payload, { new: true });
            if (!updatedCategory) {
                throw new HttpError(404, "Category not found");
            }
            return updatedCategory;
        } catch (error) {
            throw new HttpError(500, "Failed to update category");
        }
    }

    // Method to delete a category
    public async deleteCategory(id: string): Promise<{ message: string }> {
        try {
            const deletedCategory = await Category.findByIdAndDelete(id);
            if (!deletedCategory) {
                throw new HttpError(404, "Category not found");
            }
            return { message: "Category deleted successfully" };
        } catch (error) {
            throw new HttpError(500, "Failed to delete category");
        }
    }
}
