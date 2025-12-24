import { Schema,model, Types, HydratedDocument } from 'mongoose';
import bcrypt from 'bcryptjs';

interface IUser {
    fullname: string;
    email: string;
    password: string;
}

const userSchema = new Schema<IUser>({
    fullname: {
        type: String,
        required: true,
        trim: true,
    },
    email: {
        type: String,
        unique: true,
        lowercase:true,
        required: true,
    },
    password: {
        type: String,
        required: true,
        minLength: 6,
    }
}, { timestamps: true});

 userSchema.pre('save', async function ( this: HydratedDocument<IUser>) {
  if (!this.isModified('password')) return ;

  this.password = await bcrypt.hash(this.password, 10);
});



export const User = model<IUser>('User', userSchema);