import { PrismaClient } from '@prisma/client'
const prisma = new PrismaClient() // Ativa os logs
async function main() {
  await prisma.activityTypes.upsert({
    where:{
        name: "Esporte",
    },
    create:{
        name: "Esporte",
        description: "AMO ESPORTE",
        image: "Imagens"
    },
    update:{
        name: "Esporte",
        description: "AMO ESPORTE",
        image: "Imagens"
    }
  })



  await prisma.achievements.upsert({
    where:{
        name: "first-checkin",
    },
    create:{
        name: "first-checkin",
        criterion: "confirm attendance at an activity for the first time",
    },
    update:{
      name: "first-checkin",
      criterion: "confirm attendance at an activity for the first time",
    }
  })

  await prisma.achievements.upsert({
    where:{
        name: "create-activity",
    },
    create:{
        name: "create-activity",
        criterion: "create-activity-first-time",
    },
    update:{
      name: "create-activity",
      criterion: "create-activity-first-time",
    }
  })

  await prisma.achievements.upsert({
    where:{
        name: "level-up",
    },
    create:{
        name: "level-up",
        criterion: "every time the user levels up",
    },
    update:{
      name: "level-up",
      criterion: "every time the user levels up",
    }
  })

  

}
main()
  .then(async () => {
    await prisma.$disconnect()
  })
  .catch(async (e) => {
    console.error(e)
    await prisma.$disconnect()
    process.exit(1)
  })