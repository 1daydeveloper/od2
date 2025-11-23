// models/Email.js
import mongoose from 'mongoose';

const emailSchema = new mongoose.Schema({
  attachments: [mongoose.Schema.Types.Mixed],  // store attachments if needed
  html: String,
  text: String,
  textAsHtml: String,
  subject: String,
  to: {
    value: [
      {
        address: String,
        name: String,
      },
    ],
    html: String,
    text: String,
  },
  from: {
    value: [
      {
        address: String,
        name: String,
      },
    ],
    html: String,
    text: String,
  },
  messageId: String,
  date: { type: Date, default: Date.now }, // Email receive date
}, { timestamps: true });

// Add TTL index to auto-delete emails after 12 hours (43200 seconds)
// This ensures emails are automatically removed from MongoDB after 12 hours from creation
emailSchema.index({ "createdAt": 1 }, { expireAfterSeconds: 43200 });

const emailFeedbackSchema = new mongoose.Schema({
  emailId: { type: mongoose.Schema.Types.ObjectId, ref: 'Email' },
  isSpam: {
    type: String,
    enum: ['spam', 'not spam'],
  },
  feedback: {
    type: String,
    enum: ['Good', 'Bad'],
    default: 'Good',
    required: true,
  },
  description: { type: String },
}, { timestamps: true });


const emailHistorySchema = new mongoose.Schema({
  email: { type: String, required: true, unique: true },
  history: [
    {
      subject: String,
      from: String,
      receivedAt: { type: Date, default: Date.now },
    },
  ],
  count: { type: Number, default: 0 },
}, { timestamps: true });

// Middleware to handle history updates on email save
emailSchema.pre('save', async function (next) {
  const { to, from, subject, text } = this;

  // Ensure "from" field contains at least one address
  if (!from?.value?.[0]?.address) {
    console.error('Email "from" address is missing.');
    return;
  }
  if (!to?.value?.[0]?.address) {
    console.error('Email "To" address is missing.');
    return;
  }

  const fromEmailAddress = from.value[0].address;
  const toEmailAddress = to.value[0].address;

  try {
    const emailHistory = await mongoose.models.EmailHistory.findOne({ email: toEmailAddress });

    if (emailHistory) {
      // Update existing history
      emailHistory.history.push({ subject, from: fromEmailAddress });
      emailHistory.count = emailHistory.history.length;
      await emailHistory.save();
    } else {
      // Create new history
      const newEmailHistory = new mongoose.models.EmailHistory({
        email: toEmailAddress,
        history: [{ subject, from: fromEmailAddress, receivedAt: new Date() }],
        count: 1,
      });
      await newEmailHistory.save();
    }
    console.log(`History updated for email: ${toEmailAddress}`);
  } catch (error) {
    console.error('Error updating email history:', error);
  }
  next(); // Ensure the save continues after the middleware
});

// Ensure the models are only created once
const Email = mongoose.models.Email || mongoose.model('Email', emailSchema);
const EmailHistory = mongoose.models.EmailHistory || mongoose.model('EmailHistory', emailHistorySchema);
const EmailFeedback = mongoose.models.EmailFeedback || mongoose.model('EmailFeedback', emailFeedbackSchema);

export { Email, EmailHistory, EmailFeedback };
