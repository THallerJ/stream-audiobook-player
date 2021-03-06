import React, { Suspense } from "react";
import Book from "./Book";
import { Grid, Box } from "@mui/material";
import { useTheme } from "@mui/material/styles";
import { useGoogle } from "../../contexts/GoogleContext";

const EmptyLibrary = React.lazy(() => import("./EmptyLibrary"));

const BookList = () => {
	const theme = useTheme();
	const { library } = useGoogle();

	return (
		<Box sx={{ padding: theme.spacing(2), height: "100%" }}>
			<Grid item container spacing={theme.spacing(3)} justifyContent="center">
				{library && library.length > 0 ? (
					library.map((book) => (
						<Grid item key={`${book.id}`}>
							<Book book={book} />
						</Grid>
					))
				) : (
					<Suspense fallback={null}>
						<EmptyLibrary />
					</Suspense>
				)}
			</Grid>
		</Box>
	);
};

export default BookList;
