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