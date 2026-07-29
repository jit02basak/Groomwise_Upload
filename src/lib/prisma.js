// Prisma client singleton for Next.js
//
// In development, Next.js hot-reloads can create a new PrismaClient on every
// module reload, quickly exhausting the DB connection pool.
// This singleton pattern stores the instance on the global object so it
// survives hot reloads. In production, a fresh instance is created once.
//
// Usage: import { getPrismaClient } from '@/lib/prisma'
//        const prisma = getPrismaClient()

// Prisma 6: the client is generated locally at src/generated/prisma
// (set by `output = "../src/generated/prisma"` in schema.prisma)
import { PrismaClient } from '../generated/prisma/client'

const globalForPrisma = globalThis

export function getPrismaClient() {
  if (!globalForPrisma.prisma) {
    globalForPrisma.prisma = new PrismaClient({
      log: process.env.NODE_ENV === 'development' ? ['warn', 'error'] : ['error'],
    })
  }
  return globalForPrisma.prisma
}
