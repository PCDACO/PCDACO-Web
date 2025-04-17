export interface TechnicianRecentActivityResponse {
  activities: ActivityDetail[]
}

interface ActivityDetail {
  name: string;
  avatarUrl: string;
  content: string;
  happenedAt: Date;
}

export interface ConsultantRecentActivityResponse {
  activities: ConsultantRecentActivityDetail[]
}

interface ConsultantRecentActivityDetail {
  name: string;
  avatarUrl: string;
  content: string;
  happenedAt: Date;
}
