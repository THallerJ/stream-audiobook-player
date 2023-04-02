import useLocalStorage from "../../../hooks/useLocalStorage";
import { useApp } from "../../AppContext/AppContext";

const useBookCovers = (setLibrary, currentBook) => {
	const { axiosInstance } = useApp();
	const [overridedCovers, setOverridedCovers] = useLocalStorage(
		"overridedCovers",
		[]
	);

	const getBookCovers = async (page) => {
		if (currentBook) {
			const response = await axiosInstance.get("/google/getBookCovers", {
				params: { title: currentBook.name, page: page },
			});

			return response.data;
		}
	};

	const updateBookCover = (newCoverUrl) => {
		setLibrary((prevState) => {
			return prevState.map((obj) => {
				if (obj.id === currentBook.id)
					return { ...obj, coverImageUrl: newCoverUrl };
				else return obj;
			});
		});
	};

	return {
		overridedCovers,
		setOverridedCovers,
		getBookCovers,
		updateBookCover,
	};
};

export default useBookCovers;
