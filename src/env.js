import axios from "axios";

const loginAxios = axios.create({
	baseURL: "https://api.schoolxie.com/public/api/",
	headers: {
		Authorization: `Bearer ${localStorage.getItem("token")}`,
		accept: "application/json",
		"Access-Control-Allow-Origin": "*",
	},
});

export { loginAxios };
