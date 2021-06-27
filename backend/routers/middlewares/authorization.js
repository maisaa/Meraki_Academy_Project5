const db = require('./../../db/db');


const authorization = (string) => {
    return (req, res, next) => {

        const { roleId } = req.token.roleId;
        const command = `SELECT * FROM roles WHERE role_id = ?;`;
        const data = [roleId];

        db.query(command, data, async (err, result) => {
            if (err) {
                res.status(500).json("Internal Server Error")
            } else {
                if (!result.role === string)
                    return res.status(403).json({
                        message: 'forbidden'
                    });
                next();
            }
        })
    }
}

module.exports = authorization;