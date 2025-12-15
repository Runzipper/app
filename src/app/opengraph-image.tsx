import { ImageResponse } from 'next/og';

export const alt = 'Runzipper - Browser-based file compression tool';
export const size = {
	width: 1200,
	height: 630,
};

export const contentType = 'image/png';

export default async function Image() {
	return new ImageResponse(
		<div
			style={{
				width: '100%',
				height: '100%',
				display: 'flex',
				flexDirection: 'column',
				justifyContent: 'center',
				alignItems: 'center',
				backgroundColor: 'rgb(37, 99, 235)',
				color: 'rgb(255, 255, 255)',
			}}
		>
			<div
				style={{
					display: 'flex',
					flexDirection: 'column',
					alignItems: 'flex-start',
					gap: '24px',
					width: '100%',
					paddingLeft: '96px',
					paddingRight: '96px',
				}}
			>
				<div
					style={{
						display: 'flex',
						alignItems: 'center',
						gap: '16px',
					}}
				>
					<div
						style={{
							display: 'flex',
							padding: '16px',
							borderRadius: '12px',
							backgroundColor: 'rgba(255, 255, 255, 0.10)',
							border: '1px solid rgba(255, 255, 255, 0.20)',
						}}
					>
						<img
							alt="Runzipper Logo"
							style={{
								width: '48px',
								height: '48px',
								display: 'block',
							}}
							src="data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMTgiIGhlaWdodD0iMjIiIHZpZXdCb3g9IjAgMCAxOCAyMiIgZmlsbD0ibm9uZSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KPHBhdGggZD0iTTEyIDExVjkuNUgxMy41VjExSDEyWk0xMiAxMi41SDEwLjVWMTFIMTJWMTIuNVpNMTIgMTRWMTIuNUgxMy41VjE0SDEyWk04LjM4MTI1IDhMNi44ODEyNSA2LjVIM1YxNS41SDEwLjVWMTRIMTJWMTUuNUgxNVY4SDEyVjkuNUgxMC41VjhIOC4zODEyNVpNMyAxN0MyLjU4NzUgMTcgMi4yMzQzOCAxNi44NTMxIDEuOTQwNjMgMTYuNTU5NEMxLjY0Njg3IDE2LjI2NTYgMS41IDE1LjkxMjUgMS41IDE1LjVWNi41QzEuNSA2LjA4NzUgMS42NDY4NyA1LjczNDM4IDEuOTQwNjMgNS40NDA2MkMyLjIzNDM4IDUuMTQ2ODcgMi41ODc1IDUgMyA1SDcuNUw5IDYuNUgxNUMxNS40MTI1IDYuNSAxNS43NjU2IDYuNjQ2ODcgMTYuMDU5NCA2Ljk0MDYyQzE2LjM1MzEgNy4yMzQzOCAxNi41IDcuNTg3NSAxNi41IDhWMTUuNUMxNi41IDE1LjkxMjUgMTYuMzUzMSAxNi4yNjU2IDE2LjA1OTQgMTYuNTU5NEMxNS43NjU2IDE2Ljg1MzEgMTUuNDEyNSAxNyAxNSAxN0gzWk0zIDE1LjVWOFY2LjVWMTUuNVoiIGZpbGw9IndoaXRlIi8+Cjwvc3ZnPgo="
						/>
					</div>

					<span
						style={{
							fontSize: '24px',
							fontWeight: 700,
							letterSpacing: '0.08em',
							textTransform: 'uppercase',
							opacity: 0.8,
						}}
					>
						RunZipper
					</span>
				</div>

				<h1
					style={{
						fontSize: '96px',
						fontWeight: 900,
						letterSpacing: '-0.02em',
						lineHeight: 1.05,
						margin: 0,
					}}
				>
					RunZipper
				</h1>

				<p
					style={{
						fontSize: '36px',
						fontWeight: 500,
						maxWidth: '896px',
						lineHeight: 1.35,
						color: 'rgb(203, 213, 225)',
						margin: 0,
					}}
				>
					In browser, secure, and free online file compression and archive tools.
				</p>

				<div
					style={{
						marginTop: '48px',
						display: 'flex',
						alignItems: 'center',
						gap: '12px',
					}}
				>
					<div
						style={{
							display: 'flex',
							height: '4px',
							width: '80px',
							borderRadius: '9999px',
							backgroundColor: 'rgb(255, 255, 255)',
						}}
					/>
					<span
						style={{
							fontSize: '24px',
							fontWeight: 600,
							opacity: 0.75,
							textTransform: 'uppercase',
							letterSpacing: '0.12em',
						}}
					>
						runzipper.app
					</span>
				</div>
			</div>
		</div>,
	);
}
