import jwt from 'jsonwebtoken'

export const verifyUser = async (req,res,next) => {
    const token = req.header('auth-token');
  
    if (!token) return res.status(401).json({ message: 'Access Denied!' });

    try {
        const verifiedToken = jwt.verify(token, process.env.JWT_SECRET);
        req.userId = verifiedToken.id
        next();
    } catch (err) {
        return res.status(403).json({ message: 'Token Expired' });
    }
}

