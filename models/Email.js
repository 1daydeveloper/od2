// models/Email.js
import mongoose from 'mongoose';

const emailSchema = new mongoose.Schema({
  attachments: [mongoose.Schema.Types.Mixed],  // store attachments if needed
  headers: String,
  headerLines: [
    {
      key: String,
      line: String,
    },
  ],
  html: String,
  text: String,
  textAsHtml: String,
  subject: String,
  date: { type: Date, default: Date.now},
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
  raw: String,
  dkim: {
    headerFrom: [String],
    envelopeFrom: String,
    results: [
      {
        status: {
          result: String,
          comment: String,
        },
        info: String,
      },
    ],
  },
  spf: {
    domain: String,
    clientIp: String,
    helo: String,
    envelopeFrom: String,
    rr: String,
    status: {
      result: String,
      comment: String,
    },
  },
});

export default mongoose.models.Email || mongoose.model('Email', emailSchema);
