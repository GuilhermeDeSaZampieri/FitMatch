-- AlterTable
ALTER TABLE "activityParticipants" ALTER COLUMN "approved" SET DEFAULT false,
ALTER COLUMN "confirmedAt" DROP NOT NULL;
