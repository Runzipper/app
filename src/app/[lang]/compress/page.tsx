'use client';

import { COMPRESSION_MODE, FILE_SELECT_MODE } from '@/constants';
import { useDictionary } from '@/context/dictionary';
import useCompress from '@/hooks/useCompress';
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
	const [fileSelectMode, setFileSelectMode] = useState<FileSelectMode>(
		FILE_SELECT_MODE.file.value,
	);
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

	const fileSelectModeOptions = [
		{
			label: dictionary.compress.file,
			value: FILE_SELECT_MODE.file.value,
		},
		{
			label: dictionary.compress.directory,
			value: FILE_SELECT_MODE.directory.value,
		},
	] as const;

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
					options={fileSelectModeOptions}
					onChange={handleFileSelectMode}
					className={toggleStyle}
				/>
				<UI.FileDrop
					allowDirectory={fileSelectMode === FILE_SELECT_MODE.directory.value}
					multiple={fileSelectMode !== FILE_SELECT_MODE.directory.value}
					onDropFile={handleFile}
					className={filedropStyle}
					title={dictionary.compress.fileDrop.title}
					description={dictionary.compress.fileDrop.description}
					buttonText={dictionary.compress.fileDrop.button}
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
