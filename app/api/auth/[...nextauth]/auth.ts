import { NextAuthOptions } from 'next-auth';
import CredentialsProvider from 'next-auth/providers/credentials';

export const authOptions: NextAuthOptions = {
	providers: [
		CredentialsProvider({
			name: 'credentials',
			credentials: {
				username: { label: 'Usuario', type: 'text' },
				password: { label: 'Contraseña', type: 'password' }
			},
			async authorize(credentials, req) {
				if (!credentials?.username || !credentials?.password) {
					return null;
				}

				// Check against environment variables
				const validUsername = process.env.AUTH_USERNAME;
				const validPassword = process.env.AUTH_PASSWORD;

				if (
					credentials.username === validUsername &&
					credentials.password === validPassword
				) {
					return {
						id: '1',
						name: 'Admin',
						email: 'admin@repuestosoyarce.cl',
					};
				}

				return null;
			}
		})
	],
	pages: {
		signIn: '/login',
	},
	session: {
		strategy: 'jwt',
		maxAge: 30 * 24 * 60 * 60, // 30 days
	},
	callbacks: {
		async jwt({ token, user }) {
			return token;
		},
		async session({ session, token }) {
			return session;
		}
	}
};