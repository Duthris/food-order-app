-- AlterTable
ALTER TABLE "categories" ADD COLUMN     "photo" TEXT DEFAULT 'https://www.gravatar.com/avatar/{{email}}?d=identicon';
