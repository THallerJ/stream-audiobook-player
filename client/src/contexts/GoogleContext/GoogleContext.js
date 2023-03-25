import React, { useContext, useState } from "react";
import { useApp } from "../AppContext/AppContext";
import useLocalStorageRef from "../../hooks/useLocalStorageRef";
import useFetchLibrary from "./hooks/useFetchLibrary";
import useBookCovers from "./hooks/useBookCovers";
import useLibrary from "./hooks/useLibrary";
import useManageUser from "./hooks/useManageUser";

const GoogleContext = React.createContext();

export const GoogleContextProvider = ({ children }) => {
	const { setGoogleDirectoryExists, setAuthentication, setRootUpdatedAt } =
		useApp();

	const [library, setLibrary, libraryRef] = useLocalStorageRef("library", []);
	const [currentBook, setCurrentBook] = useState();
	const [playingBook, setPlayingBook] = useState();
	const [playingChapter, setPlayingChapter] = useState();

	const {
		overridedCovers,
		setOverridedCovers,
		getBookCovers,
		updateBookCover,
	} = useBookCovers(setLibrary, currentBook);

	const { isLoadingLibrary, loadLibrary, isRefreshingLibrary, refreshLibrary } =
		useFetchLibrary(library, setLibrary, overridedCovers);

	const { getFolders, getBookAndChapter } = useLibrary(library, libraryRef);

	const { setRootDirectory, logout } = useManageUser(
		setPlayingBook,
		setCurrentBook,
		setPlayingChapter,
		setGoogleDirectoryExists,
		setRootUpdatedAt,
		setAuthentication
	);

	const value = {
		getFolders,
		setRootDirectory,
		library,
		refreshLibrary,
		loadLibrary,
		logout,
		currentBook,
		setCurrentBook,
		playingBook,
		setPlayingBook,
		setPlayingChapter,
		playingChapter,
		getBookAndChapter,
		getBookCovers,
		updateBookCover,
		setOverridedCovers,
		isLoadingLibrary,
		isRefreshingLibrary,
	};

	return (
		<GoogleContext.Provider value={value}>{children}</GoogleContext.Provider>
	);
};

export const useGoogle = () => useContext(GoogleContext);
