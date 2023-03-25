import { useApp } from "../../AppContext/AppContext";
import useEffectSkipFirst from "../../../hooks/useEffectSkipFirst";
import useApiProgress from "../../../hooks/useApiProgress";
import { useCallback } from "react";

const useFetchLibrary = (library, setLibrary, overridedCovers) => {
	const { axiosInstance, googleDirectoryExists, rootUpdatedAt } = useApp();

	const fetchLibrary = useCallback(async () => {
		if (googleDirectoryExists) {
			const response = await axiosInstance.get(`/google/library`);
			const sortedLibrary = response.data.sort((book1, book2) => {
				overridedCovers.forEach((cover) => {
					if (cover.id === book1.id) {
						book1.coverImageUrl = cover.coverImageUrl;
					} else if (cover.id === book2.id) {
						book2.coverImageUrl = cover.coverImageUrl;
					}
				});

				return book1.name.localeCompare(book2.name);
			});

			setLibrary(sortedLibrary);
		}
	}, [axiosInstance, setLibrary, googleDirectoryExists, library]);

	const [isLoadingLibrary, loadLibrary] = useApiProgress(fetchLibrary);
	const [isRefreshingLibrary, refreshLibrary] = useApiProgress(fetchLibrary);

	useEffectSkipFirst(() => {
		loadLibrary();
	}, [rootUpdatedAt]);

	return {
		isLoadingLibrary,
		loadLibrary,
		isRefreshingLibrary,
		refreshLibrary,
	};
};

export default useFetchLibrary;
