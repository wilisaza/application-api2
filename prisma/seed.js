import { PrismaClient } from '@prisma/client'
import bcrypt from 'bcrypt'

const prisma = new PrismaClient()

async function main() {
  // Crear compañía inicial
  const company = await prisma.platCompany.upsert({
    where: { id: '83a6b75a-a911-4c69-960d-240975fda605' },
    update: {},
    create: {
      id: '83a6b75a-a911-4c69-960d-240975fda605',
      name: 'Soluciones de Información',
      isEnabled: true,
      isDeleted: false,
      createdAt: new Date(),
      updatedAt: new Date(),
    },
  })

  // Crear usuario admin inicial
  const passwordHash = await bcrypt.hash('admin123', 10)
  await prisma.platUser.upsert({
    where: { id: '83a6b75a-a911-4c69-960d-240975fda606' },
    update: {},
    create: {
      id: '83a6b75a-a911-4c69-960d-240975fda606',
      username: 'admin',
      fullName: 'Administrador',
      email: 'admin@soluciones.com',
      password: passwordHash,
      authProvider: 'local',
      isEnabled: true,
      isDeleted: false,
      createdAt: new Date(),
      updatedAt: new Date(),
    },
  })

  console.log('Seed data created')
}

main()
  .catch((e) => {
    console.error(e)
    process.exit(1)
  })
  .finally(() => prisma.$disconnect())
