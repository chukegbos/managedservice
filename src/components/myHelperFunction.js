import moment from "moment";
import Swal from "sweetalert2";

export const formatDate = (value) => {
	if (!isNaN(new Date(value)))
		return moment(value).format("MMMM Do YYYY");
		// return moment(value).format("dddd, MMMM Do YYYY, h:mm:ss a");
	else return "N/A";
};

export const formatPrice = (value) => {
	let val = (value/1).toFixed(2).replace(',', '.')
	return val.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")
  };

export const swalErrorHandle = (error) => {
	// console.log(error);
	if (error?.response?.status === 401) {
		localStorage.clear();
		window.location.href = "/login";
	} else {
		let text = "";
		if (error.code == "ERR_NETWORK") {
			text = error.message;
		} else if (typeof error.response.data.message == "string") {
			text = error.response.data.message;
		} else {
			text = "Check Internet Connection";
		}
		let icon = "error";
		let color = "#F27474";

		let title = "Error!!!";
		Swal.fire({
			title: title,
			text: text,
			icon: icon,
			confirmButtonColor: color,
			confirmButtonText: "Ok!",
			allowOutsideClick: false,
			allowEscapeKey: false,
			allowEnterKey: false,
		});
	}
};
