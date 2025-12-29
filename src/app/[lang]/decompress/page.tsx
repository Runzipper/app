'use client';

import { FILE_SELECT_MODE } from '@/constants';
import { useDictionary } from '@/context/dictionary';
import useDecompress from '@/hooks/useDecompress';
import { extractMetaDataFromFileList } from '@/utils/decompress';
import { formatFileSize } from '@/utils/format';
import { Icon, Typography, UI } from '@runzipper/ui';
import mime from 'mime-types';
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

export default function DecompressPage() {
	const dictionary = useDictionary();
	const [selectedFileList, setSelectedFileList] = useState<FileList>();
	const [filesMetaData, setFilesMetaData] = useState<string[][]>([]);
	const [isDecompressing, decompress, error] = useDecompress();

	const handleFile = async (files: FileList) => {
		setSelectedFileList(files);

		const metaData = await extractMetaDataFromFileList(files);
		setFilesMetaData(
			metaData.map((data) => [
				data.name,
				formatFileSize(data.originalSize),
				mime.lookup(data.name) || '',
			]),
		);
	};

	const handleDecompress = async () => {
		if (!selectedFileList) return;

		decompress(selectedFileList);
	};

	const fileSelectModeOptions = [
		{
			label: dictionary.decompress.file,
			value: FILE_SELECT_MODE.file.value,
		},
	] as const;

	if (!dictionary) return null;

	return (
		<div className={containerStyle}>
			<div className={dropboxContainerStyle}>
				{error && (
					<UI.Notification
						type="warn"
						title={dictionary.decompress.warning.title}
						description={error}
					/>
				)}
				<UI.Toggle
					value={FILE_SELECT_MODE.file.value}
					options={fileSelectModeOptions}
					onChange={() => {}}
					className={toggleStyle}
				/>
				<UI.FileDrop
					allowDirectory={false}
					multiple={false}
					onDropFile={handleFile}
					className={filedropStyle}
					title={dictionary.decompress.fileDrop.title}
					description={dictionary.decompress.fileDrop.description}
					buttonText={dictionary.decompress.fileDrop.button}
					accept=".zip,.tar,.gz"
				/>
			</div>
			{selectedFileList && (
				<div className={tableContainerStyle}>
					<Typography.Heading textType="h3" size="secondary">
						{dictionary.decompress.preview.title}
					</Typography.Heading>
					<Typography.Regular textType="p" className={tableDescriptionStyle}>
						{dictionary.decompress.preview.description}
					</Typography.Regular>
					<UI.Table
						columns={dictionary.decompress.preview.tableColumn}
						rows={filesMetaData}
					/>
					<div className={buttonContainer}>
						<UI.Button
							className={compressButtonStyle}
							onClick={handleDecompress}
							disabled={isDecompressing}
						>
							<Icon icon="IconUpload" />
							<Typography.Bold textType="span">
								{isDecompressing
									? dictionary.decompress.submit.active
									: dictionary.decompress.submit.idle}
							</Typography.Bold>
						</UI.Button>
					</div>
				</div>
			)}
		</div>
	);
}
