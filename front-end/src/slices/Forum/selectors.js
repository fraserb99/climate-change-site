

export const formatPosts = (posts, parent, userId) => {
    var formattedPosts = posts.filter(post => post.parent === parent);
    console.log(formattedPosts);

    formattedPosts = formattedPosts.map(post => {
        const childPosts = formatPosts(posts, post.postId, userId);
        const canDelete = userId === post.userId;
        return {...post, posts: childPosts, canDelete}
    })

    return formattedPosts;
}