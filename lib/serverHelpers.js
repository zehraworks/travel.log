import { sign } from "jsonwebtoken";
import { cookies } from "next-cookies";

const {JWT_SECRET} = process.env
const isProduction= process.env.NODE_ENV==='production'

if(!JWT_SECRET)
    throw new Error("Inavlid env var:JWT_SECRET");

export const generateAuthToken=(_id)=>{
    return sign({_id}, JWT_SECRET,{expiresIn:'7d'})

}    

export const setAuthCookies=(value)=>{
    cookies.set({
        name:'aurh-token',
        value:value,
        httpOnly:true,
        secure:isProduction,
        sameSite:isProduction? 'strict':'lax',
        maxAge: value ? 7 * 24 * 60 * 60 :0
    })
}