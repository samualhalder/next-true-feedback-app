import dbConect from "@/lib/dbConnection";
import User from "@/models/user.model";
import bcrypt from "bcrypt";
import { verificationEmail } from "../../../helper/verificationEmail";

export async function POST(request: Request) {
  await dbConect();
  try {
    const { username, email, passsword } = await request.json();
    const findUserByUsername = await User.findOne({
      username,
      isVarified: true,
    });
    if (findUserByUsername) {
      return Response.json(
        {
          success: false,
          message: "username is already taken.",
        },
        { status: 400 }
      );
    }

    const userByEmail = await User.findOne({ email });
    const verificationCode = Math.floor(Math.random() * 900000).toString();
    const hashedPassword = bcrypt.hashSync(passsword, 10);
    const expyreDate = new Date();
    expyreDate.setHours(expyreDate.getHours() + 1);
    if (userByEmail) {
      if (userByEmail.isVarified) {
        return Response.json(
          {
            success: false,
            message: "email is already exits.",
          },
          { status: 400 }
        );
      } else {
        userByEmail.username = username;
        userByEmail.password = hashedPassword;
        userByEmail.verificatonCode = verificationCode;
        userByEmail.verificationCodeExpire = new Date(Date.now() + 3600000);
        await userByEmail.save();
      }
    } else {
      const newUser = new User({
        email,
        username,
        password: hashedPassword,
        isVarified: false,
        verificationCode,
        verificationCodeExpire: expyreDate,
        isReciving: true,
        message: [],
      });
      await newUser.save();
    }
    const emailResponse = await verificationEmail({
      username,
      email,
      verifyCode: verificationCode,
    });
    if (!emailResponse?.success) {
      return Response.json(
        {
          success: false,
          message: "email send failed.",
        },
        { status: 400 }
      );
    }
    return Response.json(
      {
        success: true,
        message: "email send successfully. pls see your inbox.",
      },
      { status: 200 }
    );
  } catch (error) {
    return Response.json(
      { message: "fail to register user", success: false },
      { status: 400 }
    );
  }
}
