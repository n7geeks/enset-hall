import {Action, State, StateContext} from "@ngxs/store";
import {Injectable} from "@angular/core";
import { AnnouncementsActions } from "./announcements.actions";
import {AngularFirestore} from "@angular/fire/compat/firestore";
import {AngularFireAuth} from "@angular/fire/compat/auth";
import {Announcement, StatelessAnnouncement, UserAnnouncements} from "./announcements.models";

@State({
	name: "announcements",
	defaults: []
})
@Injectable()
export class AnnouncementsState {
	constructor(private afs: AngularFirestore, private auth: AngularFireAuth) {}

	@Action(AnnouncementsActions.SetAnnouncements)
	setAnnouncements(ctx: StateContext<Announcement[]>, action: AnnouncementsActions.SetAnnouncements) {
		ctx.setState(action.announcements);
	}

	@Action(AnnouncementsActions.SetAnnouncementLiked)
	async setAnnouncementLiked(ctx: StateContext<Announcement[]>, action: AnnouncementsActions.SetAnnouncementLiked) {
		const user = await this.auth.currentUser;
		if (!user) {
			return;
		}
		const userId = user.uid;
		await this.afs.collection("user-announcements")
			.doc(userId)
			.set({
				[action.announcementId]: {
					liked: true
				}
			}, {merge: true})
		const state = ctx.getState();
		const previousLikesCount = state.find(announcement => announcement.id === action.announcementId)?.likesCount || 0;
		await this.afs.collection("announcements")
			.doc(action.announcementId)
			.set({
				likesCount: previousLikesCount + 1
			}, {merge: true});
	}

	@Action(AnnouncementsActions.SetAnnouncementUnliked)
	async setAnnouncementUnliked(ctx: StateContext<Announcement[]>, action: AnnouncementsActions.SetAnnouncementUnliked) {
		const user = await this.auth.currentUser;
		if (!user) {
			return;
		}
		const userId = user.uid;
		await this.afs.collection("user-announcements")
			.doc(userId)
			.set({
				[action.announcementId]: {
					liked: false
				}
			}, {merge: true})
		const state = ctx.getState();
		const previousLikesCount = state.find(announcement => announcement.id === action.announcementId)?.likesCount || 0;
		await this.afs.collection("announcements")
			.doc(action.announcementId)
			.set({
				likesCount: previousLikesCount - 1
			}, {merge: true});
	}

	@Action(AnnouncementsActions.SetAnnouncementSeen)
	async setAnnouncementSeen(ctx: StateContext<Announcement[]>, action: AnnouncementsActions.SetAnnouncementSeen) {
		const user = await this.auth.currentUser;
		if (!user) {
			return;
		}
		const userId = user.uid;
		await this.afs.collection("user-announcements")
			.doc(userId)
			.set({
				[action.announcementId]: {
					seen: true
				}
			}, {merge: true})
		const previousSeenCount = ctx.getState().find(announcement => announcement.id === action.announcementId)?.viewersCount || 0;
		await this.afs.collection("announcements")
			.doc(action.announcementId)
			.set({
				viewersCount: previousSeenCount + 1
			}, {merge: true});
	}

	@Action(AnnouncementsActions.FetchAnnouncements)
	async fetchAnnouncements(ctx: StateContext<Announcement[]>) {
		const user = await this.auth.currentUser;
		if (!user) {
			return;
		}
		const userId = user.uid;
		this.afs
			.collection<StatelessAnnouncement>("announcements",
				ref =>
					ref.where("expiresAt", ">", Date.now()))
			.valueChanges({idField: "id"})
			.subscribe(announcements => {
				this.afs.collection("user-announcements")
					.doc<UserAnnouncements>(userId)
					.valueChanges()
					.subscribe(userAnnouncements => {
						const announcementsWithState = announcements.map(announcement => {
							if (!userAnnouncements) {
								return {
									...announcement,
									seen: false,
									liked: false
								} as Announcement;
							}
							const state = userAnnouncements[announcement.id];
							if (!state) {
								this.afs.collection("user-announcements")
									.doc(userId)
									.set({
										[announcement.id]: {
											seen: false,
											liked: false
										}
									}, {merge: true});
								return {
									...announcement,
									seen: false,
									liked: false
								} as Announcement;
							}
							return {
								...announcement,
								seen: state.seen,
								liked: state.liked
							} as Announcement;
						});
						ctx.dispatch(new AnnouncementsActions.SetAnnouncements(announcementsWithState));
					});
			});
	}

	@Action(AnnouncementsActions.AddAnnouncement)
	async addAnnouncement(ctx: StateContext<Announcement[]>, action: AnnouncementsActions.AddAnnouncement) {
		await this.afs.collection("announcements")
			.add(action.announcement);
	}

}
