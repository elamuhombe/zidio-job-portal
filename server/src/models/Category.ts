//src/models/Category.ts
import mongoose, { Schema, Document } from 'mongoose';

interface ICategory extends Document {
  name: string; // Category name
  image: string; // URL or path to the category image
}

// Mongoose schema definition
const CategorySchema: Schema<ICategory> = new Schema({
  name: { type: String, required: true, unique: true },
  image: { type: String, required: true }, // Image field
});

// Mongoose model
const Category = mongoose.model<ICategory>('Category', CategorySchema);

// Exporting the types and models
export { ICategory, Category};
