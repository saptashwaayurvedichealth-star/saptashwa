import mongoose, { Schema, model, models } from 'mongoose';

const TestimonialSchema = new Schema({
  patientName: {
    type: String,
    required: true,
    trim: true,
  },
  description: {
    type: String,
    required: true,
  },
  rating: {
    type: Number,
    required: true,
    min: 1,
    max: 5,
    default: 5,
  },
  image: {
    type: String,
  },
  youtubeUrl: {
    type: String,
  },
  treatment: {
    type: String,
    required: true,
  },
  isActive: {
    type: Boolean,
    default: true,
  },
  isFeatured: {
    type: Boolean,
    default: false,
  },
  order: {
    type: Number,
    default: 0,
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

TestimonialSchema.pre('save', function(next) {
  this.updatedAt = new Date();
  next();
});

export default models.Testimonial || model('Testimonial', TestimonialSchema);
