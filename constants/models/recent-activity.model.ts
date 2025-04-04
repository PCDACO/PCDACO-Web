export interface TechnicianRecentActivityResponse {
  activities: ActivityDetail[]
}

interface ActivityDetail {
  avatarUrl: string;
  content: string;
  happenedAt: Date;
}

export interface ConsultantRecentActivityResponse {
  activities: ConsultantRecentActivityDetail[]
}

interface ConsultantRecentActivityDetail {
  avatarUrl: string;
  content: string;
  happenedAt: Date;
}
