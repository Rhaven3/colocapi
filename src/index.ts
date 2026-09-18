import express, {type Express} from 'express';
import roommateController from "./routes/roommates.ts";
import productController from "./routes/products.ts";
import taskController from "./routes/tasks.ts";
import reminderController from "./routes/reminders.ts";
import productCategoryController from "./routes/product-categories.ts";

const app: Express = express();
app.use(express.json());

app.use('/api/roommates', roommateController);
app.use('/api/products', productController);
app.use('/api/product-categories', productCategoryController);
app.use('/api/tasks', taskController);
app.use('/api/reminders', reminderController);

export default app;