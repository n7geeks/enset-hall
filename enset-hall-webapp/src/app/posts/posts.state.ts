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


}