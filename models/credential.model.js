import mongoose from "mongoose";

const credentialSchema = mongoose.Schema(
  {
    email: { type: String, unique: true, required: true, trim: true },
    password: { type: String, required: true, trim: true },
    active: { type: Boolean, default: "false" },
    type: { type: String, default: "google-auth" },
  },
  {
    timestamps: true,
  }
);

export default mongoose.model("Credential", credentialSchema);
