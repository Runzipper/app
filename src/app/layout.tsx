import '@/styles/globals.css';
import '@/styles/index.css';

export default async function RootLayout({ children }: LayoutProps<'/'>) {
	return <>{children}</>;
}
