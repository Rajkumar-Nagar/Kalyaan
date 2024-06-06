import connectToMongoose from "../../../lib/db"

export async function GET(request){
    try {
        await connectToMongoose();
        console.log( "Database connected successfully")
        return new Response(JSON.stringify({ message: "Database connected successfully" }), {
            status: 200,
            headers: { 'Content-Type': 'application/json' },
        });
    } catch (error) {
        return new Response(JSON.stringify({ message: "Database connection failed", error: error.message }), {
            status: 500,
            headers: { 'Content-Type': 'application/json' },
        });
    }
}