import mongoose, { Schema, model, models } from 'mongoose';

const TreatmentSchema = new Schema({
  title: {
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
  price: {
    type: Number,
    required: false,
  },
  duration: {
    type: String,
    required: false,
  },
  category: {
    type: String,
    required: true,
  },
  isActive: {
    type: Boolean,
    default: true,
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

TreatmentSchema.pre('save', function(next) {
  this.updatedAt = new Date();
  next();
});

export default models.Treatment || model('Treatment', TreatmentSchema);
