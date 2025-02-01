import { AuthOptions } from 'next-auth';
import CredentialsProvider from 'next-auth/providers/credentials';
import { PrismaClient } from '@prisma/client';
import { compare } from 'bcrypt';
import type { RequestInternal } from 'next-auth';

const prisma = new PrismaClient();

export const authOptions: AuthOptions = {
	providers: [
		CredentialsProvider({
			name: 'credentials',
			credentials: {
				email: { label: 'Email', type: 'email' },
				password: { label: 'Password', type: 'password' }
			},
			async authorize(
				credentials: Record<"email" | "password", string> | undefined,
				req: Pick<RequestInternal, "body" | "query" | "headers" | "method">
			) {
				if (!credentials?.email || !credentials?.password) {
					return null;
				}

				const user = await prisma.user.findUnique({
					where: {
						email: credentials.email
					}
				});

				if (!user) {
					return null;
				}

				const isPasswordValid = await compare(
					credentials.password,
					user.password
				);

				if (!isPasswordValid) {
					return null;
				}

				return {
					id: user.id,
					email: user.email,
					name: user.name || 'Usuario', // Ensure name is always a string
				};
			}
		})
	],
	session: {
		strategy: 'jwt'
	},
	secret: process.env.AUTH_SECRET || process.env.NEXTAUTH_SECRET,
	pages: {
		signIn: '/login'
	},
	callbacks: {
		async jwt({ token, user }) {
			if (user) {
				return {
					...token,
					id: user.id
				};
			}
			return token;
		},
		async session({ session, token }) {
			return {
				...session,
				user: {
					...session.user,
					id: token.id
				}
			};
		}
	}
};