import React, { useContext, useCallback, useState } from "react";
import { useApp } from "../contexts/AppContext";
import useLocalStorage from "../hooks/useLocalStorage";
import useEffectSkipFirst from "../hooks/useEffectSkipFirst";

const GoogleContext = React.createContext();

export const GoogleContextProvider = ({ children }) => {
	const {
		axiosInstance,
		googleDirectoryExists,
		setGoogleDirectoryExists,
		setAuthentication,
	} = useApp();
	const [library, setLibrary] = useLocalStorage("library", []);

	const [loadingLibrary, setLoadingLibrary] = useState(false);
	const [currentBook, setCurrentBook] = useState();
	const [playingBook, setPlayingBook] = useState();
	const [playingChapter, setPlayingChapter] = useState();
	const [rootUpdated, setRootUpdated] = useState(false);

	const getLibrary = useCallback(async () => {
		if (googleDirectoryExists) {
			setLoadingLibrary(true);
			const response = await axiosInstance.get(`/google/library`);

			response.data.forEach((book) => {
				const obj = book.queryResponse;
				var imageUrl = null;
				if (obj) {
					const objKeys = Object.keys(obj);

					const sortedKeys = objKeys.length
						? objKeys.sort((a, b) => {
								const ratingsA = obj[a].volumeInfo.ratingsCount;
								const ratingsB = obj[b].volumeInfo.ratingsCount;

								var valA =
									typeof ratingsA == "undefined" ? -Infinity : ratingsA;
								var valB =
									typeof ratingsB == "undefined" ? -Infinity : ratingsB;
								return valB - valA;
						  })
						: null;

					sortedKeys.every((elem, i) => {
						const isSameTitle =
							obj[i].volumeInfo.title.includes(book.name) ||
							book.name.includes(obj[i].volumeInfo.title);

						if (isSameTitle) {
							imageUrl = obj[i].volumeInfo.imageLinks.thumbnail;
							return false;
						} else return true;
					});
				}

				delete book["queryResponse"];
				book.coverImageUrl = imageUrl;
			});

			const sortedLibrary = response.data.sort((book1, book2) =>
				book1.name.localeCompare(book2.name)
			);

			setLoadingLibrary(false);
			setLibrary(sortedLibrary);
		}
	}, [axiosInstance, setLibrary, googleDirectoryExists]);

	const getFolders = useCallback(
		async (directory) => {
			const response = await axiosInstance.get(`/google/folders`, {
				params: {
					directory: directory ? directory : null,
				},
			});

			return response.data;
		},
		[axiosInstance]
	);

	const getBookAndChapter = useCallback(
		(bookId, chapterId) => {
			const book = library.find((element) => element.id === bookId);
			const chapterIndex = book.chapters.findIndex(
				(element) => element.id === chapterId
			);

			return {
				book: book,
				chapter: { data: book.chapters[chapterIndex], index: chapterIndex },
			};
		},
		[library]
	);

	function resetMediaPlayer() {
		setPlayingBook(null);
		setCurrentBook(null);
		setPlayingChapter(null);
	}

	async function setRootDirectory(rootId) {
		resetMediaPlayer();

		const response = await axiosInstance.post(`/player/rootDirectory`, {
			data: {
				rootId: rootId,
			},
		});

		setGoogleDirectoryExists(response.data.rootFlag);
		setRootUpdated((prevState) => !prevState);
	}

	async function logout() {
		resetMediaPlayer();

		await axiosInstance.post(`/auth/logout`);
		setLibrary(null);
		setAuthentication({ isAuthenticated: false });
	}

	useEffectSkipFirst(() => {
		getLibrary();
	}, [rootUpdated]);

	const value = {
		getFolders,
		setRootDirectory,
		library,
		getLibrary,
		logout,
		currentBook,
		setCurrentBook,
		playingBook,
		setPlayingBook,
		setPlayingChapter,
		playingChapter,
		getBookAndChapter,
		loadingLibrary,
	};

	return (
		<GoogleContext.Provider value={value}>{children}</GoogleContext.Provider>
	);
};

export const useGoogle = () => useContext(GoogleContext);
