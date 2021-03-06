import { createTheme } from "@mui/material/styles";

const darkTheme = createTheme({
	drawer: {
		width: 240,
	},
	palette: {
		mode: "dark",
		scrollbar: {
			thumb: "#6b6b6b",
		},
		primary: {
			dark: "#2f60b2",
			main: "#448aff",
			light: "#69a1ff",
		},
		secondary: {
			dark: "#2d2d2d",
			main: "#41414",
			light: "#5d5d5d",
		},
		background: {
			default: "#434549",
			paper: "#14171c",
		},
	},
});

export default darkTheme;
