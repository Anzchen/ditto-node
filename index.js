import cors from "cors";
import mongoose, { Connection } from "mongoose";
import session from "express-session";
import UserRoutes from "./Users/routes";
import "dotenv/config";

CONNECTION_STRING =
  "mongodb+srv://ditto:dittopassword@ditto.csed6in.mongodb.net/?retryWrites=true&w=majority&appName=ditto";
//mongodb+srv://ditto:<dittopassword>@ditto.csed6in.mongodb.net/

mongoose.connect(CONNECTION_STRING);

const app = express();

const sessionOptions = {
  secret: process.env.SESSION_SECRET,
  resave: false,
  saveUninitialized: false,
};
if (process.env.NODE_ENV !== "development") {
  sessionOptions.proxy = true;
  sessionOptions.cookie = {
    sameSite: "none",
    secure: true,
    domain: process.env.HTTP_SERVER_DOMAIN,
  };
}
app.use(session(sessionOptions));
app.use(cors({ credentials: true, origin: process.env.FRONTEND_URL }));

app.use(express.json());
UserRoutes(app);

app.listen(process.env.PORT || 4000);
