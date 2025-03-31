type activityData = {
  title: string;
  description: string;
  typeId: string;
  userId: string;
  address: { latitude: number; longitude: number };
  confirmationCode: string;
  image: string;
  scheduledDate: Date;
  createdAt: Date;
  deletedAt: Date | null;
  completedAt: Date | null;
  private: boolean;
};
export default activityData;
