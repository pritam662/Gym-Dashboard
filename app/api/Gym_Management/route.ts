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

// Function to calculate the Total Time between time and statusTime

const calculateTotalTime = (markDate: string, statusTime: string) => {
  if (!markDate || !statusTime) return 'N/A';

  const startTime = new Date(markDate);
  const endTime = new Date(statusTime);

  // दोनों तारीखों का अंतर (milliseconds में)
  const diffMs = Math.abs(endTime.getTime() - startTime.getTime());

  // अंतर को घंटों और मिनटों में बदलना
  const hours = Math.floor(diffMs / (1000 * 60 * 60));
  const minutes = Math.floor((diffMs % (1000 * 60 * 60)) / (1000 * 60));

  return `${hours}h ${minutes}m`;
};

export const dynamic = 'force-dynamic';
export async function GET(request: NextRequest) {
  let client: MongoClient | null = null;

  try {
    client = await getMongoClient();
    const db = client.db('Gym_Management');
    const Gym_Management = await db.collection('marks').find({}).toArray();

    // Format data and calculate Total Time
    const formattedData = Gym_Management.map((doc) => {
      const totalTime = calculateTotalTime(doc.time, doc.statusTime);

      return {
        _id: doc._id,
        clientName: doc.clientName,
        clientNumber: doc.clientNumber,
        date: new Date(doc.date).toLocaleString(),
        time: doc.time,
        status: doc.status,
        markDate: new Date(doc.markDate).toLocaleString(),
        statusTime: doc.statusTime
          ? new Date(doc.statusTime).toLocaleString()
          : null,
        totalTime: totalTime, // Adding Total Time to the response
        __v: doc.__v
      };
    });

    console.log(
      `Retrieved ${formattedData.length} documents from the database`
    );

    return NextResponse.json(
      {
        success: true,
        message: 'Data fetched successfully',
        data: formattedData
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
