import React, { useState, useEffect } from "react";
import {
	Button,
	Dialog,
	DialogContent,
	DialogTitle,
	DialogActions,
	Typography,
	Divider,
} from "@mui/material";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import TreeView from "@mui/lab/TreeView";
import TreeItem from "@mui/lab/TreeItem";
import { useTheme } from "@mui/material/styles";

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

	useEffect(() => {
		console.log(expandedNodes);
	}, [expandedNodes]);

	function setExpanded(nodeId) {
		if (expandedNodes.includes(nodeId)) {
			setExpandedNodes((prevState) =>
				prevState.filter((item) => item !== nodeId)
			);
		} else {
			setExpandedNodes((prevState) => [...prevState, nodeId]);
		}
	}

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

	return (
		<Dialog open={open} onBackdropClick={() => setOpen(false)}>
			<DialogTitle>
				<div>
					<Typography align="center" variant="h6">
						Tutorial
					</Typography>
				</div>
				<Divider />
			</DialogTitle>
			<DialogContent>
				<Typography>
					Your audiobook library on Google Drive must be organized in the
					following manner:
				</Typography>
				<Divider sx={{ mt: theme.spacing(2), mb: theme.spacing(1) }} />
				<TreeView
					aria-label="controlled"
					defaultCollapseIcon={<ExpandMoreIcon />}
					defaultExpandIcon={<ChevronRightIcon />}
					multiSelect
					expanded={expandedNodes}
				>
					{renderTree(mockLibrary)}
				</TreeView>
				<Divider sx={{ mt: theme.spacing(1), mb: theme.spacing(2) }} />
				<Typography>
					The Google Drive folder containing your audiobook library must also be
					accessible to "Anyone with the link".
				</Typography>
			</DialogContent>
			<DialogActions>
				<Button onClick={() => setOpen(false)}>Ok</Button>
			</DialogActions>
		</Dialog>
	);
};

export default TutorialDialog;