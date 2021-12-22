import React, { useEffect, useState } from "react";
import {
	Typography,
	Card,
	CardMedia,
	Box,
	Grid,
	IconButton,
	Slider,
	Chip,
} from "@mui/material";
import { styled } from "@mui/material/styles";
import PlayIcon from "@mui/icons-material/PlayCircleFilledWhite";
import PauseIcon from "@mui/icons-material/PauseCircleOutline";
import NextIcon from "@mui/icons-material/SkipNext";
import PreviousIcon from "@mui/icons-material/SkipPrevious";
import Forward5Icon from "@mui/icons-material/Forward5";
import Replay5Icon from "@mui/icons-material/Replay5";
import AddIcon from "@mui/icons-material/Add";
import RemoveIcon from "@mui/icons-material/Remove";
import ArrowBackIosIcon from "@mui/icons-material/ArrowBackIos";
import { useDashboard } from "../contexts/DashboardContext";
import { useGoogle } from "../contexts/GoogleContext";
import { useMediaPlayer } from "../contexts/MediaPlayerContext";
import tinyColor from "tinycolor2";

const TrackInfo = () => {
	const { setShowTrackInfo } = useDashboard();
	const [brightness, setBrightness] = useState();
	const { playingBook, playingChapter } = useGoogle();
	const {
		isPlaying,
		duration,
		togglePlay,
		increaseRate,
		decreaseRate,
		handleSeek,
		formatTime,
		rate,
		progress,
		seekBackward,
	} = useMediaPlayer();

	useEffect(() => {
		const brightness1 = tinyColor(playingBook.imageColors[0]).getBrightness();
		const brightness2 = tinyColor(playingBook.imageColors[1]).getBrightness();

		setBrightness([brightness1, brightness2]);
	}, [playingBook]);

	return (
		<Box
			sx={{
				height: "100%",
				background: `linear-gradient(to top, ${playingBook.imageColors[0]}, 50%, ${playingBook.imageColors[1]})`,
				overflow: "hidden",
			}}
		>
			<TrackInfoContainer bright={brightness}>
				<Grid container>
					<Grid item xs={12} sx={{ display: "flex" }}>
						<Grid item xs={6} align="start">
							<IconButton
								onClick={() => setShowTrackInfo((prevState) => !prevState)}
							>
								<ArrowBackIosIcon className="topIcon" />
							</IconButton>
						</Grid>
						<Grid
							item
							xs={6}
							align="end"
							sx={{
								justifyContent: "center",
								alignItems: "center",
								flexWrap: "wrap",
							}}
						>
							<IconButton onClick={decreaseRate}>
								<RemoveIcon className="topIcon" fontSize="small" />
							</IconButton>
							<Chip
								variant="filled"
								label={`${rate.toFixed(2)}x`}
								sx={{ backgroundColor: "white" }}
							/>
							<IconButton onClick={increaseRate}>
								<AddIcon className="topIcon" fontSize="small" />
							</IconButton>
						</Grid>
					</Grid>
				</Grid>
				<Box className="cardWrapper">
					<Card>
						<CardMedia
							component="img"
							image={playingBook ? playingBook.coverImageUrl : null}
						/>
					</Card>
				</Box>
				<Grid container justify="center" alignItems="center">
					<Grid className="textColor" item xs={12}>
						<Typography noWrap variant="subtitle1">
							{playingBook.name}
						</Typography>
					</Grid>
					<Grid className="textColor" item>
						<Typography noWrap variant="subtitle1">
							{playingChapter.name}
						</Typography>
					</Grid>
					<Grid item xs={12}>
						<Slider
							max={duration ? duration : 100}
							value={progress}
							onChangeCommitted={(e, v) => handleSeek(v)}
						/>
					</Grid>
					<Grid
						item
						container
						xs={12}
						sx={{ display: "flex", justifyContent: "space-between" }}
					>
						<Typography className="textColor" variant="caption">
							{formatTime(progress)}
						</Typography>
						<Typography className="textColor" variant="caption">
							{duration ? formatTime(duration) : "00:00"}
						</Typography>
					</Grid>
					<Grid item xs={12} align="center">
						<IconButton>
							<PreviousIcon className="bottomIcon" sx={{ fontSize: "35px" }} />
						</IconButton>
						<IconButton onClick={seekBackward}>
							<Replay5Icon className="bottomIcon" sx={{ fontSize: "35px" }} />
						</IconButton>
						<IconButton onClick={() => togglePlay()}>
							{isPlaying ? (
								<PauseIcon className="bottomIcon" sx={{ fontSize: "50px" }} />
							) : (
								<PlayIcon className="bottomIcon" sx={{ fontSize: "50px" }} />
							)}
						</IconButton>
						<IconButton>
							<Forward5Icon className="bottomIcon" sx={{ fontSize: "35px" }} />
						</IconButton>
						<IconButton>
							<NextIcon className="bottomIcon" sx={{ fontSize: "35px" }} />
						</IconButton>
					</Grid>
				</Grid>
			</TrackInfoContainer>
		</Box>
	);
};

export default TrackInfo;

// Styled Components
const TrackInfoContainer = styled(Box)(({ theme, bright }) => ({
	display: "flex",
	height: "100%",
	flexDirection: "column",
	padding: theme.spacing(2),
	alignItems: "center",

	".MuiSlider-root": {
		padding: 0,
		background: theme.palette.primary.main,
	},

	".MuiSlider-track": {
		backgroundColor: "white",
	},

	".MuiSlider-thumb": {
		height: 0,
		width: 0,
		backgroundColor: "white",
	},

	".MuiSlider-thumb.Mui-focusVisible, .MuiSlider-thumb:hover, .Mui-active	": {
		boxShadow: "none",
		height: 15,
		width: 15,
	},

	".MuiCardMedia-root": {
		width: 225,
	},

	".cardWrapper": {
		height: "60%",
		width: 225,
		overflow: "hidden",
		display: "flex",
		alignItems: "center",
		justifyContent: "center",
		padding: theme.spacing(1),
	},

	".bottomIcon": {
		fill: bright && bright[0] > 70 ? null : "#efefef",
	},

	".topIcon": {
		fill: bright && bright[1] > 70 ? null : "#efefef",
	},

	".textColor": {
		color: bright && bright[0] > 70 ? "black" : "#efefef",
	},
}));
