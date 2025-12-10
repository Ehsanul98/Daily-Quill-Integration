import { Firestore } from '@google-cloud/firestore';

export const firestore = new Firestore({
	projectId: process.env.GCP_PROJECT_ID,
	credentials: {
		client_email: process.env.GCP_CLIENT_EMAIL,
		private_key: process.env.GCP_PRIVATE_KEY?.replace(/\\n/g, '\n'),
	},
});
