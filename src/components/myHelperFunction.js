import moment from "moment";

export const formatDate = (value) => {
	if (!isNaN(new Date(value)))
		return moment(value).format("dddd, MMMM Do YYYY, h:mm:ss a");
	else return "N/A";
};
