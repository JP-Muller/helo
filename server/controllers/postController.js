module.exports = {
    async addPost(req, res) {
        let { title, imageUrl, content } = req.body
        const db = req.app.get('db')
        let posts = await db.create_post([title, imageUrl, content, req.session.user.id])
        console.log('hit Add Post!')
        res.send(posts)
    },
    async getPosts(req, res) {
        const db = req.app.get('db')
        let posts = await db.get_posts()
        console.log('GOT ALL POSTS');
        res.send(posts)
    },
    async getSelected(req, res) {
        let { postId } = req.params
        const db = req.app.get('db')
        let post = await db.get_selected_post(postId)
        res.send(post)
    },
    async editPost(req, res) {
        let { postId } = req.params
        let { newTitle, newImage, newContent } = req.body
        const db = req.app.get('db')
        let posts = await db.edit_post([
            postId,
            newTitle,
            newImage,
            newContent,
        ])
        res.send(posts)
    },
    async addComment(req, res) {
        let { postId, newComment, date } = req.body
        const db = req.app.get('db')
        let comments = await db.add_comment([
            newComment,
            postId,
            req.session.user.id,
            date

        ]).catch(err => console.log('ERROR YO!!!!', err))
        res.send(comments)
    },
    async getComments(req, res) {
        const db = req.app.get('db')
        let comments = await db.get_comments()
        res.send(comments)
    }
}