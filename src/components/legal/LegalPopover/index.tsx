import MarkdownRenderer from '@/components/common/MarkdownRenderer';
import {
	popoverCloseButtonStyle,
	popoverContentStyle,
	popoverStyle,
} from './legalPopover.css';

type LegalPopoverProps = {
	popoverId: string;
	markdown: string;
};

const LegalPopover = ({ popoverId, markdown }: LegalPopoverProps) => {
	return (
		<div id={popoverId} popover="auto" className={popoverStyle}>
			<button
				type="button"
				popoverTarget={popoverId}
				popoverTargetAction="hide"
				className={popoverCloseButtonStyle}
				aria-label="닫기"
			>
				&times;
			</button>
			<div className={popoverContentStyle}>
				<MarkdownRenderer content={markdown} />
			</div>
		</div>
	);
};

export default LegalPopover;
