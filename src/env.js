import axios from "axios";

const axiosUrl = axios.create({
	baseURL: "https://api.abasports.manageclub247.com/api/",
	// baseURL: "http://127.0.0.1:8000/api/",
	headers: {
		Authorization: `Bearer ${localStorage.getItem("token")}`,
		accept: "application/json",
		"Access-Control-Allow-Origin": "*",
	},
});

export { axiosUrl };
