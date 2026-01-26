import mongoose, { Schema, model, models } from 'mongoose';

const ProductSchema = new Schema({
  name: {
    type: String,
    required: true,
    trim: true,
  },
  description: {
    type: String,
    required: true,
  },
  shortDescription: {
    type: String,
    required: true,
  },
  image: {
    type: String,
    required: true,
  },
  images: [{
    type: String,
  }],
  price: {
    type: Number,
    required: true,
  },
  compareAtPrice: {
    type: Number,
  },
  category: {
    type: String,
    required: true,
  },
  brand: {
    type: String,
  },
  stock: {
    type: Number,
    default: 0,
  },
  sku: {
    type: String,
    unique: true,
  },
  isActive: {
    type: Boolean,
    default: true,
  },
  isFeatured: {
    type: Boolean,
    default: false,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
  updatedAt: {
    type: Date,
    default: Date.now,
  },
});

ProductSchema.pre('save', function(next) {
  this.updatedAt = new Date();
  next();
});

export default models.Product || model('Product', ProductSchema);
