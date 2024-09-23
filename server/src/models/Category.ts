//src/models/Category.ts
import mongoose, { Schema, Document } from 'mongoose';
import { ICategory } from '../types';



// Mongoose schema definition
const CategorySchema: Schema<ICategory> = new Schema({
  name: { type: String, required: true, unique: true },
  image: { type: String, required: true }, // Image field
});

// Mongoose model
const Category = mongoose.model<ICategory>('Category', CategorySchema);

// Exporting the types and models
export { ICategory, Category};
