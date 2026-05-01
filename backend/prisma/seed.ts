import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

async function main() {
  console.log('Seeding reporters...')

  await prisma.reporter.createMany({
    data: [
      {
        name: 'Reporter Jakarta',
        location: 'Jakarta',
        availability: true,
      },
      {
        name: 'Reporter Bandung',
        location: 'Bandung',
        availability: true,
      },
      {
        name: 'Reporter Surabaya',
        location: 'Surabaya',
        availability: true,
      },
      {
        name: 'Remote Reporter',
        location: 'Remote',
        availability: true,
      },
    ],
    skipDuplicates: true,
  })

  console.log('Seeding editors...')

  await prisma.editor.createMany({
    data: [
      {
        name: 'Editor A',
        availability: true,
      },
      {
        name: 'Editor B',
        availability: true,
      },
      {
        name: 'Senior Editor',
        availability: true,
      },
    ],
    skipDuplicates: true,
  })

  console.log('Seed completed successfully.')
}

main()
  .catch((error) => {
    console.error('Seed failed:', error)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  })