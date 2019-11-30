import moment from 'moment';

export const formatPosts = (posts, parent, userId, likes) => {
    var formattedPosts = posts.filter(post => post.parent === parent);
    console.log(formattedPosts);

    formattedPosts = formattedPosts.map(post => {
        const childPosts = formatPosts(posts, post.postId, userId, likes);
        const canDelete = userId === post.userId;
        const liked = !!likes.find(x => x.postId === post.postId);
        return {
            ...post, 
            posts: childPosts, 
            canDelete,
            liked
        }
    })

    return formattedPosts;
}

export const newestComparator = (order) => (a, b) => {
    const aDate = moment(a.time);
    const bDate = moment(b.time);

    if (aDate > bDate) {
        return order ? -1 : 1;
    } else if (bDate > aDate) {
        return order ? 1 : -1;
    }
    return 0;
}

export const sortPosts = (posts, sortFn) => {
    if (!posts) return [];
    var newPosts = posts.sort(sortFn);
    newPosts.map(post => ({
        ...post,
        posts: sortPosts([...post.posts], sortFn)
    }));
    console.log(newPosts);
    return newPosts;
}