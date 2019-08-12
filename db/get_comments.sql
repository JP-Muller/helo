SELECT
    posts.id AS postid,
    users.id AS userId,
    username,
    content,
    title,
    posts.img,
    profile_pic AS profilePic,
    comment,
    date_posted
    FROM 
    comments
    INNER JOIN users ON users.id = comments.author_id
    INNER JOIN posts ON posts.id = comments.post_id

    ORDER BY comments.id DESC;