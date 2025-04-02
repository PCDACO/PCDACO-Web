export interface TechnicianRecentActivityResponse {
  activities: ActivityDetail[]
}

interface ActivityDetail {
  avatarUrl: string;
  content: string;
  happenedAt: Date;
}
