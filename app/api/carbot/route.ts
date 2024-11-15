import { NextRequest, NextResponse } from 'next/server';
import { MongoClient, MongoClientOptions } from 'mongodb';

const uri = process.env.MONGODB_URI || '';

const options: MongoClientOptions = {
  serverSelectionTimeoutMS: 5000, // 5 seconds
  connectTimeoutMS: 10000 // 10 seconds
};

async function getMongoClient() {
  console.log('Attempting to connect to MongoDB...');
  const client = new MongoClient(uri, options);
  await client.connect();
  console.log('Successfully connected to MongoDB');
  return client;
}

export const dynamic = 'force-dynamic';
export async function GET(request: NextRequest) {
  let client: MongoClient | null = null;

  try {
    client = await getMongoClient();
    const db = client.db('carbot'); // Specify the database name
    const carbot = await db.collection('carbots').find({}).toArray();

    console.log(`Retrieved ${carbot.length} documents from the database`);

    return NextResponse.json(
      {
        success: true,
        message: 'Data fetched Successfully',
        data: carbot
      },
      { status: 200 }
    );
  } catch (error) {
    console.error('Error in Fetching', error);

    let errorMessage = 'Error in Fetching';
    if (error instanceof Error) {
      errorMessage += ': ' + error.message;
    }

    return NextResponse.json(
      {
        success: false,
        message: errorMessage
      },
      { status: 500 }
    );
  } finally {
    if (client) {
      await client.close();
      console.log('MongoDB connection closed');
    }
  }
}
