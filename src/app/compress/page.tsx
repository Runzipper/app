'use client';

import { COMPRESSION_MODE, FILE_SELECT_MODE } from '@/constants';
import useCompress from '@/hooks/useZipCompress';
import type { CompressionMode, FileSelectMode } from '@/types/compress';
import { extractMetaDataFromFileList } from '@/utils/format';
import { Icon, Typography, UI } from '@runzipper/ui';
import { useState } from 'react';
import {
	buttonContainer,
	compressButtonStyle,
	containerStyle,
	dropboxContainerStyle,
	filedropStyle,
	tableContainerStyle,
	tableDescriptionStyle,
	toggleStyle,
} from './page.css';

export default function CompressPage() {
	const [fileSelectMode, setFileSelectMode] = useState<FileSelectMode>('file');
	const [compressionMode, setCompressionMode] = useState<CompressionMode>(
		COMPRESSION_MODE.zip,
	);
	const [selectedFileList, setSelectedFileList] = useState<FileList>();
	const [isCompressing, compress, error] = useCompress(compressionMode);

	const handleCompressionMode = (mode: unknown) => {
		setCompressionMode(mode as CompressionMode);
	};

	const handleFileSelectMode = (mode: unknown) => {
		setFileSelectMode(mode as FileSelectMode);
	};

	const handleFile = (files: FileList) => {
		setSelectedFileList(files);
	};

	const handleCompress = async () => {
		if (!selectedFileList) return;

		compress(selectedFileList);
	};

	const filesMetaData = selectedFileList
		? extractMetaDataFromFileList(selectedFileList)
		: [];

	return (
		<div className={containerStyle}>
			<div className={dropboxContainerStyle}>
				{error && (
					<UI.Notification
						type="warn"
						title="문제가 발생했습니다."
						description={error}
					/>
				)}
				<UI.Toggle
					value={fileSelectMode}
					option1={FILE_SELECT_MODE.file}
					option2={FILE_SELECT_MODE.directory}
					onChange={handleFileSelectMode}
					className={toggleStyle}
				/>
				<UI.FileDrop
					allowDirectory={fileSelectMode === 'directory'}
					multiple={fileSelectMode !== 'directory'}
					onDropFile={handleFile}
					className={filedropStyle}
				/>
			</div>
			{selectedFileList && (
				<div className={tableContainerStyle}>
					<Typography.Heading textType="h3" size="secondary">
						파일 미리보기
					</Typography.Heading>
					<Typography.Regular textType="p" className={tableDescriptionStyle}>
						선택된 파일들이 압축됩니다.
					</Typography.Regular>
					<UI.Table
						columns={['파일 이름', '크기', '유형']}
						rows={filesMetaData}
					/>
					<div className={buttonContainer}>
						<UI.Dropdown
							items={Object.values(COMPRESSION_MODE)}
							value={compressionMode}
							onSelect={handleCompressionMode}
						/>
						<UI.Button
							className={compressButtonStyle}
							onClick={handleCompress}
							disabled={isCompressing}
						>
							<Icon icon="IconUpload" />
							<Typography.Bold textType="span">
								{isCompressing ? '압축 중...' : '압축하기'}
							</Typography.Bold>
						</UI.Button>
					</div>
				</div>
			)}
		</div>
	);
}
