import { getServerSession } from "next-auth";

import { authOptions } from "@/lib/auth";
import { updateUserName } from "@/models/userModel";

export async function PATCH(request) {
  const session = await getServerSession(authOptions);

  if (!session) {
    return Response.json(
      { success: false, message: "Unauthorized" },
      { status: 401 }
    );
  }

  const body = await request.json();
  const name = body.name?.trim();

  if (!name) {
    return Response.json(
      { success: false, message: "Display name is required" },
      { status: 400 }
    );
  }

  const user = await updateUserName(
    session.user.id,
    name
  );

  return Response.json({
    success: true,
    message: "Settings saved",
    user,
  });
}