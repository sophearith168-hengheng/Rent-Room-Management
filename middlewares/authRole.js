const authRole = (...roles) => {
    return (req, res, next) => {
        const user = req.user;

        if (!user) {
            return res.status(401).json({ msg: "Unauthorized" });
        }

        if (!roles.includes(user.role)) {
            return res.status(403).json({
                msg: "Forbidden: You do not have permission"
            });
        }

        next();
    };
};

module.exports = authRole;