import {Announcement, StatelessAnnouncement} from "./announcements.models";

export namespace AnnouncementsActions {
	export class FetchAnnouncements {
		static readonly type = "[Announcements] Fetch Announcements";
		constructor() {}
	}
	export class SetAnnouncements {
		static readonly type = "[Announcements] Set Announcements";
		constructor(public announcements: Announcement[]) {}
	}
	export class SetAnnouncementSeen {
		static readonly type = "[Announcements] Set Announcement Seen";
		constructor(public announcementId: string) {}
	}
	export class SetAnnouncementLiked {
		static readonly type = "[Announcements] Set Announcement Liked";
		constructor(public announcementId: string) {}
	}
	export class SetAnnouncementUnliked {
		static readonly type = "[Announcements] Set Announcement Disliked";
		constructor(public announcementId: string) {}
	}
	export class AddAnnouncement {
		static readonly type = "[Announcements] Add Announcement";
		constructor(public announcement: Partial<StatelessAnnouncement>) {}
	}
}
