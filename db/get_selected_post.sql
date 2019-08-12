SELECT
    posts.id AS post_id,
    users.id,
    username,
    content,
    title,
    img,
    profile_pic AS profilePic
    FROM 
    posts
    INNER JOIN users ON users.id = posts.author_id
    WHERE posts.id = $1;
