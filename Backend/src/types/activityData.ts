type activityData ={
    title: string,
    description: string,
    typeId: string,
    userId: string,
    address: {},
    confirmationCode: string,

    image: string,
    scheduledDate: string, 
    createdAt: string,
    deletedAt: string | null,
    completedAt: string | null,
    private: boolean,
}
export default activityData;