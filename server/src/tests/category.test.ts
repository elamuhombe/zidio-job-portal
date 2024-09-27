//src/tests/category.test
import { CategoryService } from "../services/CategoryService";
import { Category } from "../models/Category";
import { ICategory } from "../types";
import { HttpError } from "../middleware/Error";
import { Types } from "mongoose";

jest.mock("../models/Category");

describe("CategoryService", () => {
  let categoryService: CategoryService;

  const sampleCategoryId = new Types.ObjectId();
  const sampleCategory: ICategory = {
    _id: sampleCategoryId,
    name: "Electronics",
    image: "image-url",
  };

  beforeEach(() => {
    categoryService = new CategoryService();
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  describe("createCategory", () => {
    it("should create a new category successfully", async () => {
      (Category.prototype.save as jest.Mock).mockResolvedValue(sampleCategory);
      const result = await categoryService.createCategory(sampleCategory);
      expect(result).toEqual(sampleCategory);
      expect(Category.prototype.save).toHaveBeenCalledTimes(1);
    });

    it("should throw an error when failing to create a category", async () => {
      (Category.prototype.save as jest.Mock).mockRejectedValue(
        new Error("Error")
      );
      await expect(
        categoryService.createCategory(sampleCategory)
      ).rejects.toThrow(HttpError);
    });
  });

  describe("getAllCategories", () => {
    it("should fetch all categories successfully", async () => {
      (Category.find as jest.Mock).mockResolvedValue([sampleCategory]);
      const result = await categoryService.getAllCategories();
      expect(result).toEqual([sampleCategory]);
      expect(Category.find).toHaveBeenCalledTimes(1);
    });

    it("should throw an error when failing to fetch categories", async () => {
      (Category.find as jest.Mock).mockRejectedValue(new Error("Error"));
      await expect(categoryService.getAllCategories()).rejects.toThrow(
        HttpError
      );
    });
  });

  describe("getCategoryById", () => {
    it("should fetch a category by ID successfully", async () => {
      (Category.findById as jest.Mock).mockResolvedValue(sampleCategory);
      const result = await categoryService.getCategoryById(
        sampleCategoryId.toString()
      );
      expect(result).toEqual(sampleCategory);
      expect(Category.findById).toHaveBeenCalledWith(
        sampleCategoryId.toString()
      );
    });

    it("should throw an error when category is not found", async () => {
      (Category.findById as jest.Mock).mockResolvedValue(null);
      await expect(
        categoryService.getCategoryById(sampleCategoryId.toString())
      ).rejects.toThrow(HttpError);
    });

    it("should throw an error when failing to fetch a category", async () => {
      (Category.findById as jest.Mock).mockRejectedValue(new Error("Error"));
      await expect(
        categoryService.getCategoryById(sampleCategoryId.toString())
      ).rejects.toThrow(HttpError);
    });
  });

  describe("updateCategory", () => {
    const updatedData = {
      name: "Updated Category",
      image: "updated-image-url",
    };

    it("should update a category successfully", async () => {
      (Category.findByIdAndUpdate as jest.Mock).mockResolvedValue({
        ...sampleCategory,
        ...updatedData,
      });
      const result = await categoryService.updateCategory(
        sampleCategoryId.toString(),
        updatedData
      );
      expect(result).toEqual({ ...sampleCategory, ...updatedData });
      expect(Category.findByIdAndUpdate).toHaveBeenCalledWith(
        sampleCategoryId.toString(),
        updatedData,
        { new: true }
      );
    });

    it("should throw an error when category is not found", async () => {
      (Category.findByIdAndUpdate as jest.Mock).mockResolvedValue(null);
      await expect(
        categoryService.updateCategory(sampleCategoryId.toString(), updatedData)
      ).rejects.toThrow(HttpError);
    });

    it("should throw an error when failing to update a category", async () => {
      (Category.findByIdAndUpdate as jest.Mock).mockRejectedValue(
        new Error("Error")
      );
      await expect(
        categoryService.updateCategory(sampleCategoryId.toString(), updatedData)
      ).rejects.toThrow(HttpError);
    });
  });

  describe("deleteCategory", () => {
    it("should delete a category successfully", async () => {
      (Category.findByIdAndDelete as jest.Mock).mockResolvedValue(
        sampleCategory
      );
      const result = await categoryService.deleteCategory(
        sampleCategoryId.toString()
      );
      expect(result).toEqual({ message: "Category deleted successfully" });
      expect(Category.findByIdAndDelete).toHaveBeenCalledWith(
        sampleCategoryId.toString()
      );
    });

    it("should throw an error when category is not found", async () => {
      (Category.findByIdAndDelete as jest.Mock).mockResolvedValue(null);
      await expect(
        categoryService.deleteCategory(sampleCategoryId.toString())
      ).rejects.toThrow(HttpError);
    });

    it("should throw an error when failing to delete a category", async () => {
      (Category.findByIdAndDelete as jest.Mock).mockRejectedValue(
        new Error("Error")
      );
      await expect(
        categoryService.deleteCategory(sampleCategoryId.toString())
      ).rejects.toThrow(HttpError);
    });
  });
});
