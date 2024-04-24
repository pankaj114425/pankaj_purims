import { fetchUser } from "@/utils/mongo";
import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
const bcrypt = require("bcryptjs");

export const { handlers: { GET, POST }, auth, signIn, signOut } = NextAuth({
    secret: process.env.NEXT_AUTH_SECRET,
    session: {
        strategy: "jwt",
    },
    pages: {
        signIn: "/login",
        signOut: "/signout"
    },
    providers: [
        CredentialsProvider({
            id: "credential",
            async authorize(credential) {
                const {email,password}=credential;
                if(email && password){
                    const result=await fetchUser(email);
                    if(result){
                        if(result.verified){
                            if(result.role==="Author"){
                                if(result.scopusID){
                                    const isMatch=await bcrypt.compareSync(password,result.password);
                                    if(isMatch){
                                        const user={email,password,role: result.role,scopusID: result.scopusID};
                                        return user;
                                    }else{
                                        return null;
                                    }
                                }else{
                                    return null;
                                }
                            }else{
                                const isMatch=await bcrypt.compareSync(password,result.password);
                                if(isMatch){
                                    const user={email,password,role: result.role12};
                                    return user;
                                }else{
                                    return null;
                                }
                            }
                        }else{
                            return null;
                        }
                    }else{
                        return null;
                    }
                }else{
                    return null;
                }
            },
        }),
    ],
    callbacks: {
        async jwt({token,user}){
            const isSigned=user?true:false;
            if(isSigned){
                token.role=user.role;
                if(user.scopusID){
                    token.scopusID=user.scopusID;
                }
            }
            return Promise.resolve(token);
        },
        async session({session,token}){
            session.role=token.role;
            if(token.scopusID){
                session.scopusID=token.scopusID;
            }
            return Promise.resolve(session);
        }
    }
});