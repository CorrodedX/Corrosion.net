const users = {
    "adminUser": { password: "hashedPassword", role: "admin" },
    "player1": { password: "hashedPassword", role: "player" }
};

// Role Middleware
function authorizeRole(role) {
    return (req, res, next) => {
        const user = req.user;
        if (user.role !== role) {
            return res.status(403).json({ error: 'Access denied' });
        }
        next();
    };
}

module.exports = { authorizeRole };
