import jwt from 'jsonwebtoken';
import { setCookie } from 'nookies';

export const setTokenCookie=(userId,res)=>{

    const payload={
        _id:userId
    }

    const token =jwt.sign(payload,process.env.NEXTAUTH_SECRET,{
        expiresIn: '14 days',
    });

    const cookieOptions = {
        httpOnly: true,
        signed: true,
        maxAge: 14 * 24 * 60 * 60 * 1000, // 14 days
    };

    if (process.env.NODE_ENV === 'production') {
        cookieOptions.secure = true;
        cookieOptions.sameSite = 'none';
    }

    setCookie({ res }, 'token', token, cookieOptions);
};

