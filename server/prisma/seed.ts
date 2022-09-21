import { PrismaClient, User } from "@prisma/client";
import Chance from "chance";
import { hashPassword } from '../src/utils/password';

const client = new PrismaClient();
var chance = new Chance();

async function seed() {
    for (let i = 3; i < 55; i++) {
            await client.adminUser.create({
            data: {
                id: i,
                email: chance.email(),
                password: await hashPassword(chance.string({ length: 10 })),
            },
        });
    }
}

seed();