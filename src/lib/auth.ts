import crypto from 'crypto'
import { encodeBase32LowerCaseNoPadding, encodeHexLowerCase} from '@oslojs/encoding'
import { Session, sessions, users, User } from '@/db/schema';
import { sha256 } from '@oslojs/crypto/sha2' 
import { database } from '@/db';
import { eq } from 'drizzle-orm';
import { getSessionToken } from './session';

const SESSION_REFRESH_INTERVAL_MS = 1000 * 60 * 60 * 24 * 15;
const SESSION_MAX_DURATION_MS = SESSION_REFRESH_INTERVAL_MS * 2;

export const generateSessionToken = ():string => {
    const bytes = new Uint8Array(20);
    crypto.getRandomValues(bytes)
    const token = encodeBase32LowerCaseNoPadding(bytes)
    return token
}

export const createSession = async(userId:number,token:string):Promise<Session> => {

    const sessionId = encodeHexLowerCase(sha256(new TextEncoder().encode(token)))
    const session:Session = {
        id: sessionId,
        userId,
        expired_at: new Date(Date.now() + SESSION_MAX_DURATION_MS)
    }
    await database.insert(sessions).values(session)

    return session
} 


export const validateRequest = async():Promise<SessionValidationResult> => {
    const token = await getSessionToken()
    if(!token) return {session:null,user:null}
    return validateSessionToken(token) 
}

export async function validateSessionToken(
    token: string
  ): Promise<SessionValidationResult> {
    const sessionId = encodeHexLowerCase(sha256(new TextEncoder().encode(token)));
    const sessionInDb = await database.query.sessions.findFirst({
      where: eq(sessions.id, sessionId),
    });
    if (!sessionInDb) {
      return { session: null, user: null };
    }
    if (Date.now() >= sessionInDb.expired_at.getTime()) {
      await database.delete(sessions).where(eq(sessions.id, sessionInDb.id));
      return { session: null, user: null };
    }
    const sessionUser = sessionInDb.userId ? await database.query.users.findFirst({
        where: eq(users.id,sessionInDb.userId)
    }) : null
  
    if (!sessionUser) {
      await database.delete(sessions).where(eq(sessions.id, sessionInDb.id));
      return { session: null, user: null };
    }
  
    if (
      Date.now() >=
      sessionInDb.expired_at.getTime() - SESSION_REFRESH_INTERVAL_MS
    ) {
      sessionInDb.expired_at = new Date(Date.now() + SESSION_MAX_DURATION_MS);
      await database
        .update(sessions)
        .set({
            expired_at: sessionInDb.expired_at,
        })
        .where(eq(sessions.id, sessionInDb.id));
    }
    return { session: sessionInDb, user:sessionUser };
  }

  export async function invalidateSession(sessionId: string): Promise<void> {
    await database.delete(sessions).where(eq(sessions.id, sessionId));
  }
  
  export async function invalidateUserSessions(userId: number): Promise<void> {
    await database.delete(sessions).where(eq(users.id, userId));
  }

export type SessionValidationResult = 
    {session: Session, user: User} |
    {session: null, user: null}