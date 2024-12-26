import { database } from '@/db';
import { accounts } from '@/db/schema';
import crypto from 'crypto'
import { eq } from 'drizzle-orm';

const ITERATIONS = 10000;

export async function passwordHashing(plainTextPassword:string,salt:string){
    return new Promise<string>((resolve,reject) => {
        crypto.pbkdf2(
            plainTextPassword,
            salt,
            ITERATIONS,
            60,
            'sha512',
            (err,derivedKey) => {
                if(err) reject(err)
                resolve(derivedKey.toString("hex"))
            }
        )
    })
}

export const createAccount = async(userId:number,password:string) => {
    const salt = crypto.randomBytes(128).toString("base64");
    const hashedPassword = await passwordHashing(password,salt)
    const [createdAccount] = await database.insert(accounts).values({
        userId,
        accountType:"email",
        password: hashedPassword,
        salt
    }).returning()

    return createdAccount;
}


export const getUserAccountById = async(userId:number) => {
    const userAccount = await database.query.accounts.findFirst({
        where: eq(accounts.userId,userId)
    })

    return userAccount
}