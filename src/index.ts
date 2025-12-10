import express, { Request, Response } from 'express';
import 'dotenv/config';
import webhookRoutes from './routes/webhook.routes';

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());
app.use('/webhook', webhookRoutes);

app.get('/health', (req: Request, res: Response) => {
	res.send('Daily Quill Integration is running!');
});

app.listen(PORT, () => {
	console.log(`🚀 Server running on port ${PORT}`);
});
