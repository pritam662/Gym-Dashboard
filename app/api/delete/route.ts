import { NextRequest, NextResponse } from 'next/server';
import { MongoClient, ObjectId } from 'mongodb';

const uri = process.env.MONGODB_URI || '';

async function getMongoClient() {
  const client = new MongoClient(uri);
  await client.connect();
  return client;
}

export const dynamic = 'force-dynamic';

export async function DELETE(request: NextRequest) {
  let client: MongoClient | null = null;

  try {
    const url = new URL(request.url);
    const id = url.searchParams.get('id');
    console.log('Received ID for deletion:', id);

    if (!id) {
      return NextResponse.json(
        { success: false, message: 'Meeting ID is required.' },
        { status: 400 }
      );
    }

    client = await getMongoClient();
    const db = client.db();

    let objectId;
    try {
      objectId = new ObjectId(id);
    } catch (error) {
      console.error('Invalid ObjectId format:', id);
      return NextResponse.json(
        { success: false, message: 'Invalid meeting ID format.' },
        { status: 400 }
      );
    }

    // Delete the meeting from the collection
    const deleteResult = await db
      .collection('carbot')
      .deleteOne({ _id: objectId });

    console.log('Delete result:', deleteResult);

    if (deleteResult.deletedCount === 0) {
      return NextResponse.json(
        { success: false, message: 'Meeting not found or already deleted.' },
        { status: 404 }
      );
    }

    return NextResponse.json(
      { success: true, message: 'Meeting deleted successfully.' },
      { status: 200 }
    );
  } catch (error) {
    console.error('Error deleting meeting:', error);
    const errorMessage = error instanceof Error ? error.message : String(error);
    return NextResponse.json(
      {
        success: false,
        message: `An error occurred while deleting the meeting: ${errorMessage}`
      },
      { status: 500 }
    );
  } finally {
    if (client) {
      await client.close();
    }
  }
}

// Include your existing GET, POST, or other methods here
// For example:
// export async function GET(request: NextRequest) { ... }
// export async function POST(request: NextRequest) { ... }
