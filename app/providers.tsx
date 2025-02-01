'use client';

import { SessionProvider } from "next-auth/react";
import { ThemeProvider } from "next-themes";

export function Providers({ children }: { children: React.ReactNode }) {
	return (
		<SessionProvider basePath="/api/auth">
			<ThemeProvider
				attribute="data-theme"
				defaultTheme="light"
				enableSystem={true}
				disableTransitionOnChange
			>
				{children}
			</ThemeProvider>
		</SessionProvider>
	);
}