import {DefaultSession} from 'next-auth'
import { Stringifier } from 'postcss'

declare module 'next-auth' {
    interface Session {
        user: {
            role: string,
            id: String,
        } & DefaultSession['user'];
    }

    interface User {
        role: string
    }
}