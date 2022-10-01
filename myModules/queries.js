


exports.getUserId = (client, username) => {
    return new Promise((resolve, reject) => {
        client.query('SELECT id FROM users WHERE username = $1', [username], (err, res) => {
        if(err){
            reject(err);
        } else {
            resolve(res.rows[0].id);
        }
        });
    });
}