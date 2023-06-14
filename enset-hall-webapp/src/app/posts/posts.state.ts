import {Action, State, StateContext} from "@ngxs/store";
import {Post, PostComment, StatelessComment, StatelessPost, UserComment, UserPost} from "./posts.models";
import {Injectable} from "@angular/core";
import {PostsActions} from "./posts.actions";
import {AngularFirestore} from "@angular/fire/compat/firestore";
import {StatelessClub} from "../clubs/club.models";
import {AngularFireAuth} from "@angular/fire/compat/auth";
import {combineLatest, map, tap} from "rxjs";
import {AppUser} from "../authentication/models/AppUser";

@State<Post[]>({
	name: "posts",
	defaults: []
})
@Injectable()
export class PostsState {
	constructor(private afs: AngularFirestore, private auth: AngularFireAuth) {}
	@Action(PostsActions.FetchPosts)
	async fetchPosts(ctx: StateContext<Post[]>, action: PostsActions.FetchPosts) {
		const user = await this.auth.currentUser;
		if (!user) {
			return;
		}
		const userId = user.uid;
		const clubs$ = this.afs
			.collection<StatelessClub>("clubs")
			.valueChanges({idField: "id"});
		const posts$ = this.afs
			.collection<StatelessPost>("posts")
			.valueChanges({idField: "id"});
		const userPosts$ = this.afs
			.collection("user-posts")
			.doc<{ [postId: string]: UserPost }>(userId)
			.valueChanges();
		const comments$ = this.afs
			.collection<StatelessComment>("post-comments")
			.valueChanges({idField: "id"});
		const userComments$ = this.afs
			.collection("user-post-comments")
			.doc<{ [postId: string]: UserComment }>(userId)
			.valueChanges();
		const users$ = this.afs
			.collection<AppUser>("users")
			.valueChanges({idField: "id"});

		return combineLatest([clubs$, posts$, userPosts$, comments$, userComments$, users$])
			.pipe(map(([
				           clubs,
				           posts,
				           userPosts,
				           comments,
				           userComments,
				           users]) => {
					return posts.map((post) => {
						if (!post) {
							throw new Error("Post not found");
						}
						let poster: AppUser | undefined;
						let club: StatelessClub | undefined;
						if (post.isClub) {
							club = clubs.find((c) => c.id === post.posterId);
						} else {
							poster = users.find((u) => u.id === post.posterId);
						}
						const postComments = post.commentIds.map((commentId) => {
							const comment = comments.find((c) => c.id === commentId);
							if (!comment) {
								throw new Error("Comment not found");
							}
							return {
								...comment,
								commenter: users.find((u) => u.id === comment.commenterId),
								hearted: userComments ? userComments[comment.id].hearted : false
							} as PostComment;
						});
						if (userPosts && !userPosts[post.id]) {
							userPosts[post.id] = {
								hearted: false,
								seen: false
							};
						}
						return {
							...post,
							comments: postComments,
							poster,
							club,
							hearted: userPosts ? userPosts[post.id].hearted : false,
							seen: userPosts ? userPosts[post.id].seen : false
						} as Post;
					});

				}
			)).pipe(tap((posts) => {
				ctx.dispatch(new PostsActions.SetPosts(posts));
			}));
	}

	@Action(PostsActions.SetPosts)
	setPosts(ctx: StateContext<Post[]>, action: PostsActions.SetPosts) {
		ctx.setState(action.posts);
	}

	@Action(PostsActions.ToggleHeartPost)
	async toggleHeartPost(ctx: StateContext<Post[]>, action: PostsActions.ToggleHeartPost) {
		const user = await this.auth.currentUser;
		if (!user) {
			return;
		}
		const userId = user.uid;
		const { post } = action;
		const heartsNumber = post.hearted ? post.heartsNumber - 1 : post.heartsNumber + 1;
		await this.afs
			.collection("posts")
			.doc(post.id)
			.update({
				hearted: !post.hearted,
				heartsNumber
			});

		await this.afs
			.collection("user-posts")
			.doc<UserPost>(userId)
			.update({
				[post.id]: {
					hearted: !post.hearted,
					seen: post.seen
				}
			});

	}

	@Action(PostsActions.ToggleHeartComment)
	async toggleHeartComment(ctx: StateContext<Post[]>, action: PostsActions.ToggleHeartComment) {
		const user = await this.auth.currentUser;
		if (!user) {
			return;
		}
		const userId = user.uid;
		const { comment } = action;
		const heartsNumber = comment.hearted ? comment.heartsNumber - 1 : comment.heartsNumber + 1;
		await this.afs
			.collection("post-comments")
			.doc(comment.id)
			.update({
				heartsNumber
			});

		await this.afs
			.collection("user-post-comments")
			.doc<UserComment>(userId)
			.update({
				[comment.id]: {
					hearted: !comment.hearted
				}
			});

	}

	@Action(PostsActions.SubmitComment)
	async submitComment(ctx: StateContext<Post[]>, action: PostsActions.SubmitComment) {
		const user = await this.auth.currentUser;
		if (!user) {
			return;
		}
		const userId = user.uid;
		const { comment, postId } = action;
		const commentId = this.afs.createId();
		const commentData = {
			commenterId: userId,
			postId: postId,
			heartsNumber: 0,
			createdAt: (new Date()).getTime(),
			content: comment,
		} as StatelessComment;

		const post = await this.afs
			.collection<StatelessPost>("posts")
			.doc(postId)
			.ref.get();
		const comments = post.data()?.commentIds;
		if (!comments) {
			throw new Error("Comments not found");
		}

		await this.afs
			.collection("user-post-comments")
			.doc<UserComment>(userId)
			.update({
				[commentId]: {
					hearted: false
				}
			});

		await this.afs
			.collection("post-comments")
			.doc(commentId)
			.set(commentData);

		await this.afs
			.collection("posts")
			.doc<StatelessPost>(postId)
			.update({
				commentIds: [...comments, commentId],
				commentsNumber: comments.length + 1
			});

	}


}