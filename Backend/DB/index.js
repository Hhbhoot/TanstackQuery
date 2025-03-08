import mongoose from 'mongoose';

export async function ConnectDB() {
  try {
    const { connection } = await mongoose.connect(
      process.env.MONGO_URL || 'mongodb://0.0.0.0/TanstackQuery',
      {
        maxPoolSize: 10,
      },
    );

    if (connection.readyState === 1) {
      console.log('Connected to DB successfully');
    } else {
      console.log('Error connecting to DB');
    }
  } catch (error) {
    console.log(error);
    process.exit(1);
  }
}
