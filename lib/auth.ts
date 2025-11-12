import jwt from "jsonwebtoken"
import crypto from "crypto"

const JWT_SECRET = process.env.JWT_SECRET || "your-secret-key"

export function hashPassword(password: string): string {
  return crypto.createHash("sha256").update(password).digest("hex")
}

export function generateOrganizationId(): string {
  return `org_${crypto.randomBytes(12).toString("hex")}`
}

export function generateToken(organizationId: string, userId?: string) {
  return jwt.sign({ organizationId, userId, iat: Math.floor(Date.now() / 1000) }, JWT_SECRET, { expiresIn: "7d" })
}

export function verifyToken(token: string) {
  try {
    return jwt.verify(token, JWT_SECRET) as {
      organizationId: string
      userId?: string
    }
  } catch (error) {
    return null
  }
}
