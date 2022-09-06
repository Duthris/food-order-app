import { PrismaClient, User } from "@prisma/client";
import Chance from "chance";
import { hashPassword } from '../src/utils/password';

const client = new PrismaClient();
var chance = new Chance();

async function seed() {
    
}

seed();