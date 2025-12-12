import 'github-markdown-css/github-markdown.css';
import Markdown from 'react-markdown';
import remarkGfm from 'remark-gfm';

interface MarkdownRendererProps {
	content: string;
}

const MarkdownRenderer = ({ content }: MarkdownRendererProps) => {
	return (
		<div className="markdown-body">
			<Markdown remarkPlugins={[remarkGfm]}>{content}</Markdown>
		</div>
	);
};

export default MarkdownRenderer;
