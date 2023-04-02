import { useState } from "react";
import { Divider, List, Box, useTheme } from "@mui/material";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import TreeView from "@mui/lab/TreeView";
import TreeItem from "@mui/lab/TreeItem";
import LabelListItem from "./../misc/LabelListItem";
import BaseDialog from "./BaseDialog";

const TutorialDialog = ({ open, setOpen }) => {
	const theme = useTheme();
	const [expandedNodes, setExpandedNodes] = useState(["root"]);

	const mockLibrary = {
		id: "root",
		name: "Audiobook Library",
		children: [
			{
				id: "1",
				name: "Book Title 1",
				children: [
					{ id: "2", name: "Chapter 1" },
					{ id: "3", name: "Chapter 2" },
					{ id: "4", name: "Chapter 3" },
				],
			},
			{
				id: "5",
				name: "Book Title 2",
				children: [
					{ id: "6", name: "Chapter 1" },
					{ id: "7", name: "Chapter 2" },
					{ id: "8", name: "Chapter 3" },
				],
			},
			{
				id: "9",
				name: "Book Title 3",
				children: [
					{ id: "10", name: "Chapter 1" },
					{ id: "11", name: "Chapter 2" },
					{ id: "12", name: "Chapter 3" },
				],
			},
		],
	};

	const setExpanded = (nodeId) => {
		if (expandedNodes.includes(nodeId)) {
			setExpandedNodes((prevState) =>
				prevState.filter((item) => item !== nodeId)
			);
		} else {
			setExpandedNodes((prevState) => [...prevState, nodeId]);
		}
	};

	const renderTree = (nodes) => (
		<TreeItem
			key={nodes.id}
			nodeId={nodes.id}
			label={nodes.name}
			onClick={() => {
				setExpanded(nodes.id);
			}}
		>
			{Array.isArray(nodes.children)
				? nodes.children.map((node) => renderTree(node))
				: null}
		</TreeItem>
	);

	const content = (
		<List>
			<LabelListItem
				text="Your audiobook library on Google Drive must be organized in the
				following manner:"
			/>
			<Divider sx={{ mt: theme.spacing(2), mb: theme.spacing(1) }} />
			<Box display="flex" justifyContent="center" sx={{ p: theme.spacing(1) }}>
				<TreeView
					aria-label="tree"
					defaultCollapseIcon={<ExpandMoreIcon />}
					defaultExpandIcon={<ChevronRightIcon />}
					multiSelect
					expanded={expandedNodes}
				>
					{renderTree(mockLibrary)}
				</TreeView>
			</Box>
			<Divider sx={{ mt: theme.spacing(1), mb: theme.spacing(2) }} />
			<LabelListItem
				text='The Google Drive folder containing your audiobook library must be
				accessible to "Anyone with the link".'
			/>
			<LabelListItem
				text="Audio files must be in one of the following formats: MP3, MPEG,
			OPUS, OGG, OGA, WAV, AAC, CAF, M4A, MP4, WEBA, WEBM, DOLBY, or FLAC."
			/>
			<LabelListItem
				text="Many audiobooks are in the M4B format, which is not supported.
			However, M4B files can be converted to M4A by simply renaming the
			file with the .m4a file extension."
			/>
		</List>
	);

	return (
		<BaseDialog
			title="Tutorial"
			content={content}
			open={open}
			setOpen={setOpen}
			ok={() => setOpen(false)}
		/>
	);
};

export default TutorialDialog;
