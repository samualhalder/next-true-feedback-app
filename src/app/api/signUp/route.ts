import dbConect from "@/lib/dbConnection";
import exp from "constants";

export async function POST(request: Request) {
  await dbConect();
  try {
    const { username, email, passsword } = await request.json();
  } catch (error) {
    return Response.json(
      { message: "fail to register user", success: false },
      { status: 400 }
    );
  }
}
