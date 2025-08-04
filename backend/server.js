import express from "express";
import cors from "cors";
import customerRoutes from "./routes/customers.js";

const app = express();
app.use(cors());
app.use(express.json());

app.use("/customers", customerRoutes);

const PORT = 4000;
app.listen(PORT, () => {
  console.log(`Server is running at http://localhost:${PORT}`);
});
