import mongoose from 'mongoose';

const plannerDetailsSchema = new mongoose.Schema(
  {
    scope: {
      type: String,
      enum: ['full', 'partial', 'day_of'],
      required: true
    },
    estimatedGuests: {
      type: Number,
      min: 1,
      required: true
    },
    themeStyle: {
      type: String,
      trim: true
    },
    budgetRange: {
      type: String,
      required: true
    },
    deliverables: {
      type: [String],
      default: []
    },
    additionalNotes: {
      type: String,
      trim: true
    }
  },
  { _id: false }
);

const performerDetailsSchema = new mongoose.Schema(
  {
    performerType: {
      type: String,
      required: true,
      trim: true
    },
    performanceDurationHours: {
      type: Number,
      min: 0.5,
      required: true
    },
    genres: {
      type: [String],
      default: []
    },
    soundEquipment: {
      type: String,
      enum: ['venue_provided', 'performer_provided', 'hybrid', 'need_recommendation'],
      required: true
    },
    stageDetails: {
      type: String,
      trim: true
    },
    techRiderRequirements: {
      type: String,
      trim: true
    },
    budgetRange: {
      type: String,
      required: true
    },
    specialRequests: {
      type: String,
      trim: true
    }
  },
  { _id: false }
);

const crewRoleItemSchema = new mongoose.Schema(
  {
    roleName: {
      type: String,
      required: true
    },
    count: {
      type: Number,
      min: 1,
      default: 1
    },
    callTime: {
      type: String,
      required: true
    },
    shiftHours: {
      type: Number,
      min: 1,
      required: true
    }
  },
  { _id: false }
);

const crewDetailsSchema = new mongoose.Schema(
  {
    roles: {
      type: [crewRoleItemSchema],
      validate: {
        validator: function (v) {
          return Array.isArray(v) && v.length > 0;
        },
        message: 'At least one crew role must be specified'
      }
    },
    requiredCertifications: {
      type: [String],
      default: []
    },
    equipmentHandling: {
      type: [String],
      default: []
    },
    dressCode: {
      type: String,
      enum: ['all_black', 'smart_casual', 'formal', 'branded_tshirt', 'custom'],
      default: 'all_black'
    },
    payRateType: {
      type: String,
      enum: ['hourly', 'flat_daily'],
      default: 'hourly'
    },
    budgetPerCrew: {
      type: Number,
      min: 0,
      required: true
    },
    additionalNotes: {
      type: String,
      trim: true
    }
  },
  { _id: false }
);

const requirementSchema = new mongoose.Schema(
  {
    referenceId: {
      type: String,
      unique: true,
      index: true
    },
    eventName: {
      type: String,
      required: [true, 'Event name is required'],
      trim: true
    },
    eventType: {
      type: String,
      required: [true, 'Event type is required'],
      trim: true
    },
    dateMode: {
      type: String,
      enum: ['single', 'range'],
      default: 'single'
    },
    startDate: {
      type: Date,
      required: [true, 'Start date is required']
    },
    endDate: {
      type: Date
    },
    location: {
      type: String,
      required: [true, 'Location is required'],
      trim: true
    },
    venue: {
      type: String,
      trim: true,
      default: ''
    },
    category: {
      type: String,
      enum: ['planner', 'performer', 'crew'],
      required: [true, 'Requirement category is required'],
      index: true
    },
    plannerDetails: {
      type: plannerDetailsSchema,
      required: function () {
        return this.category === 'planner';
      }
    },
    performerDetails: {
      type: performerDetailsSchema,
      required: function () {
        return this.category === 'performer';
      }
    },
    crewDetails: {
      type: crewDetailsSchema,
      required: function () {
        return this.category === 'crew';
      }
    },
    status: {
      type: String,
      enum: ['submitted', 'in_review', 'matched', 'closed'],
      default: 'submitted'
    }
  },
  {
    timestamps: true
  }
);

requirementSchema.pre('save', function (next) {
  if (!this.referenceId) {
    const prefix = this.category ? this.category.toUpperCase().slice(0, 3) : 'REQ';
    const datePart = new Date().toISOString().slice(0, 10).replace(/-/g, '');
    const randomPart = Math.random().toString(36).substring(2, 7).toUpperCase();
    this.referenceId = `${prefix}-${datePart}-${randomPart}`;
  }
  next();
});

export const Requirement = mongoose.model('Requirement', requirementSchema);
