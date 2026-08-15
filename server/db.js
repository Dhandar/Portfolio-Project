import mongoose from "mongoose";

const submissionSchema = new mongoose.Schema({
  name: { type: String, required: true, maxlength: 200 },
  email: { type: String, required: true, maxlength: 200 },
  subject: { type: String, required: true, maxlength: 300 },
  message: { type: String, required: true, maxlength: 5000 },
  ip: String,
  receivedAt: { type: Date, default: Date.now },
});

export const Submission = mongoose.model("Submission", submissionSchema);

export async function connectDB(uri) {
  if (!uri) return false;
  await mongoose.connect(uri);
  return true;
}

mongoose.model("Submission", submissionSchema) ;
