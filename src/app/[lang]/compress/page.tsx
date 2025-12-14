'use client';

import { COMPRESSION_MODE, FILE_SELECT_MODE } from '@/constants';
import { useDictionary } from '@/context/dictionary';
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
	const dictionary = useDictionary();
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

	if (!dictionary) return null;

	return (
		<div className={containerStyle}>
			<div className={dropboxContainerStyle}>
				{error && (
					<UI.Notification
						type="warn"
						title={dictionary.compress.warning.title}
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
						{dictionary.compress.preview.title}
					</Typography.Heading>
					<Typography.Regular textType="p" className={tableDescriptionStyle}>
						{dictionary.compress.preview.description}
					</Typography.Regular>
					<UI.Table
						columns={dictionary.compress.preview.tableColumn}
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
								{isCompressing
									? dictionary.compress.submit.active
									: dictionary.compress.submit.idle}
							</Typography.Bold>
						</UI.Button>
					</div>
				</div>
			)}
		</div>
	);
}
