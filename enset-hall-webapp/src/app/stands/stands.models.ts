import {StatelessClub} from "../clubs/club.models";
import {AppUser} from "../authentication/models/AppUser";

export interface StatelessStand {
	id: string;
	clubId: string;
	discussions: StatelessDiscussion[];
	ended: boolean;
	organizersIds: string[];
	subject: string;
	views: number;
}

export interface StatelessDiscussion {
	content: string;
	discussedAt: number;
	discusserId: string;
	hearts: number;
	id: string;
}

export interface Discussion extends StatelessDiscussion {
	discusser: AppUser;
	hearted: boolean;
}

export interface UserStandsDiscussionsHearts {
	[standId: string]: {
		[discussionId: string]: boolean;
	}

}

export interface Stand extends StatelessStand {
	organizers: AppUser[];
	club?: StatelessClub;
	discussions: Discussion[];
}
