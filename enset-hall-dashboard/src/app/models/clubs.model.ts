import { ClubOfficeMember, User } from "./users.model";

export interface Club {
  id: string;
  name: string;
  handle: string;
  logo: string;
  banner: string;
  isAdeClub: boolean;
  catchphrase: string;
  about: string;
  isOpen: boolean;
  godfather: User;
  chapters: ClubChapter[];
}

export interface ClubChapter {
  year: number;
  officeMembers: ClubOfficeMember[];
  members: User[];
  activities: ClubActivity[];
}

export interface ClubActivity {
  id: string;
  type: string;
  title: string;
  description: string;
  startDate: string;
  endDate: string;
}
