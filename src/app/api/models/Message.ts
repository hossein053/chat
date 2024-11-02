import mongoose, { Document, Model, Schema } from 'mongoose';
import { IUser } from './User';

export interface IMessage extends Document {
    sender: IUser['_id'];
    receiver: IUser['_id'];
    message: string;
    createdAt: Date;
}

const MessageSchema: Schema<IMessage> = new mongoose.Schema({
    sender: { type: Schema.Types.ObjectId, ref: 'User', required: true },
    receiver: { type: Schema.Types.ObjectId, ref: 'User', required: true },
    message: { type: String, required: true },
    createdAt: { type: Date, default: Date.now },
});

const Message: Model<IMessage> = mongoose.models.Message || mongoose.model<IMessage>('Message', MessageSchema);

export default Message;

