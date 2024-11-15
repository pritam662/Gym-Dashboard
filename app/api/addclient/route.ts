import { NextRequest, NextResponse } from 'next/server';
import { MongoClient, MongoClientOptions } from 'mongodb';

// MongoDB connection URI
const uri = process.env.MONGODB_URI || '';
const options: MongoClientOptions = {
  serverSelectionTimeoutMS: 5000,
  connectTimeoutMS: 10000
};

// Function to get MongoDB client
async function getMongoClient() {
  const client = new MongoClient(uri, options);
  await client.connect();
  return client;
}

// POST request to add new client data
export async function POST(request: NextRequest) {
  let client: MongoClient | null = null;

  try {
    client = await getMongoClient();
    const db = client.db('Gym_Management');
    const collection = db.collection('clients');

    // Extract data from request
    const { clientName, clientNumber, role } = await request.json();

    // Basic validation
    if (!clientName || !clientNumber || !role) {
      return NextResponse.json(
        { success: false, message: 'All fields are required' },
        { status: 400 }
      );
    }

    // Create new client object
    const newClient = { clientName, clientNumber, role };

    // Insert data into MongoDB
    const result = await collection.insertOne(newClient);

    return NextResponse.json(
      {
        success: true,
        message: 'Client added successfully',
        data: { _id: result.insertedId, ...newClient }
      },
      { status: 201 }
    );
  } catch (error) {
    console.error('Error adding client:', error);
    return NextResponse.json(
      { success: false, message: 'Error adding client' },
      { status: 500 }
    );
  } finally {
    if (client) {
      await client.close();
    }
  }
}
