import { Role } from "@/lib/generated/prisma";
import { prisma } from "@/db/prisma";
import { hashSync } from "bcrypt-ts-edge";
import {
  users,
  departments,
  bannerImages,
  appSettings,
  workingDays,
  doctorProfiles,
} from "./dummydata2";

//const prisma = new PrismaClient();

async function main() {
  console.log("Start seeding ...");

  // Clear existing data (optional, but good for idempotency)
  await prisma.doctorProfile.deleteMany({});
  await prisma.doctorLeave.deleteMany({});
  await prisma.appointment.deleteMany({});
  await prisma.user.deleteMany({});
  await prisma.department.deleteMany({});
  await prisma.bannerImage.deleteMany({});
  console.log("Existing data cleared.");

  // Seed Users and capture IDs for doctors
  const createdUsers = [];
  for (const user of users) {
    const createdUser = await prisma.user.create({
      data: {
        ...user,
        password: user.password ? hashSync(user.password, 10) : null,
      },
    });
    createdUsers.push(createdUser);
  }
  console.log("Users seeded.");

  // Seed Doctor Profiles
  // Map our created doctor users to their profiles
  const doctorUsers = createdUsers.filter(u => u.role === Role.DOCTOR);
  for (let i = 0; i < doctorUsers.length; i++) {
    const doctor = doctorUsers[i];
    // Find the matching profile from dummydata (assuming order matches or mapping by specialty)
    const profileData = doctorProfiles[i]; 
    if (profileData) {
      await prisma.doctorProfile.create({
        data: {
          ...profileData,
          userId: doctor.id, // Use the real ID
        },
      });
    }
  }
  console.log("Doctor profiles seeded.");

  // Seed Departments
  await prisma.department.createMany({
    data: departments,
  });
  console.log("Departments seeded.");

  // Seed Banner Images
  await prisma.bannerImage.createMany({
    data: bannerImages,
  });
  console.log("Banner images seeded.");

  // Seed App Settings
  await prisma.appSettings.upsert({
    where: { id: "global" },
    update: appSettings,
    create: appSettings,
  });
  console.log("App settings seeded.");

  // Seed Working Days
  for (const day of workingDays) {
    await prisma.workingDay.upsert({
      where: { dayOfWeek: day.dayOfWeek },
      update: { isWorkingDay: day.isWorkingDay },
      create: day,
    });
  }
  console.log("Working days seeded.");

  console.log("Seeding finished.");
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
