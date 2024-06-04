import dotenv from "dotenv";
import { expressManager } from "./managers/expressManager";

dotenv.config();

const app = expressManager();

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
	console.log(`Server is running on port ${PORT}`);
});

