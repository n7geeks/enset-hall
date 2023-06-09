export interface StatelessAnnouncement {
	id: string;
	clubId: string;
	posterUrl: string;
	expiresAt: number;
	viewersCount: number;
	likesCount: number;
}

export interface AnnouncementState {
	seen: boolean;
	liked: boolean;
}

export interface UserAnnouncements {
	[announcementId: string]: AnnouncementState | undefined;
}
export interface Announcement extends StatelessAnnouncement, AnnouncementState {}
