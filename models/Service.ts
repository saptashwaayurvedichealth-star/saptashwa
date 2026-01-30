import mongoose, { Schema, model, models } from 'mongoose';

const ServiceSchema = new Schema({
  title: {
    type: String,
    required: true,
    trim: true,
  },
  description: {
    type: String,
    required: true,
  },
  image: {
    type: String,
    required: true,
  },
  features: [{
    type: String,
  }],
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

ServiceSchema.pre('save', function(next) {
  this.updatedAt = new Date();
  next();
});

// Clear the cached model to ensure schema changes are applied
if (models.Service) {
  delete models.Service;
}

export default model('Service', ServiceSchema);
