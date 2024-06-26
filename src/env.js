import axios from "axios";

const axiosUrl = axios.create({
	// baseURL: "http://127.0.0.1:8000/api/",
	baseURL: "https://mclubapi.enugusportsclub.org/api/",
	headers: {
		Authorization: `Bearer ${localStorage.getItem("token")}`,
		accept: "application/json",
		"Access-Control-Allow-Origin": "*",
	},
});

export { axiosUrl };
