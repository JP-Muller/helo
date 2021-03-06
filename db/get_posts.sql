SELECT
    posts.id,
    users.id AS userId,
    username,
    content,
    title,
    posts.img,
    profile_pic AS profilePic
    FROM 
    posts
    INNER JOIN users ON users.id = posts.author_id

    ORDER BY posts.id DESC;