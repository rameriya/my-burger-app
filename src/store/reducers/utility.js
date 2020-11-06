const updateState = (state, updatedProps) => {
	return {
		...state,
		...updatedProps
	};
};

export default updateState;