import mongoose, { Document, Schema } from 'mongoose';

export interface IUser extends Document {
  first_name?: string | null;
  last_name?: string | null;
  avatar?: Buffer | null;
  username: string;
  phone: string;
  password: string;
  createdAt: Date;
  role: 'admin' | 'user';
}

const userSchema = new Schema<IUser>({
  first_name: { type: String, required: false },
  last_name: { type: String, required: false },
  username: { type: String, required: true, unique: true },
  phone: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  avatar: { type: Buffer, required: false },
  createdAt: { type: Date, default: Date.now, immutable: true },
  role: { type: String, required: true, enum: ['admin', 'user'] },
}, { versionKey: false });


export const User = mongoose.models.User || mongoose.model<IUser>('User', userSchema);