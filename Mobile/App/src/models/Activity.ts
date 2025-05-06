export interface  Activity {
    id: string,
    title: string,
    description: string,
    typeId: string,
    image: string,
    confirmationCode: string,
    participantCount: number,
    scheduledDate: string,
    createdAt: string,
    completedAt: null,
    private: boolean,
    address: {latitude: number, longitude: number},
    creator: {id: string, name: string, avatar: string}
}

export interface ActivityListProps {
    data: Activity[];
    loading?: boolean;
    refreshing?: boolean;
  }
  export interface ActivityType {
    id: string;
    name: string;
    description: string;
    image: string;
  }
  