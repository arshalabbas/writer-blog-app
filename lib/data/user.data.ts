import prisma from "../prisma";

export async function getUserById(id: string) {
  try {
    const user = await prisma.user.findUnique({ where: { id } });
    return user;
  } catch (error) {
    console.log("Error on getting user.", error);
    return null;
  }
}
