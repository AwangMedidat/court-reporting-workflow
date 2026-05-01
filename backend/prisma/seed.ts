import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

const reporterCities = ['Jakarta', 'Bandung', 'Surabaya', 'Medan', 'Bali', 'Yogyakarta', 'Semarang', 'Makassar', 'Palembang', 'Remote']

async function createUniqueReporter(baseLocation: string) {
  const existingCount = await prisma.reporter.count({
    where: {
      location: baseLocation,
    },
  })

  const reporterName =
    existingCount === 0
      ? `Reporter ${baseLocation}`
      : `Reporter ${baseLocation} ${existingCount + 1}`

  await prisma.reporter.create({
    data: {
      name: reporterName,
      location: baseLocation,
      availability: true,
    },
  })

  console.log(`Added ${reporterName}`)
}

async function createUniqueEditor() {
  const existingCount = await prisma.editor.count()

  let editorName = ''

  if (existingCount === 0) {
    editorName = 'Editor A'
  } else if (existingCount === 1) {
    editorName = 'Editor B'
  } else if (existingCount === 2) {
    editorName = 'Senior Editor'
  } else {
    editorName = `Editor ${existingCount + 1}`
  }

  await prisma.editor.create({
    data: {
      name: editorName,
      availability: true,
    },
  })

  console.log(`Added ${editorName}`)
}

async function seedReporters(total: number = 100) {
  for (let i = 0; i < total; i++) {
    const city = reporterCities[i % reporterCities.length]
    await createUniqueReporter(city)
  }
}

async function seedEditors(total: number = 100) {
  for (let i = 0; i < total; i++) {
    await createUniqueEditor()
  }
}

async function main() {
  console.log('Starting large-scale dynamic seed...')

  await seedReporters(100)
  await seedEditors(100)

  console.log('100 reporters and 100 editors seeded successfully.')
}

main()
  .catch((error) => {
    console.error('Seed failed:', error)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  })