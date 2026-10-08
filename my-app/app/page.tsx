import connectdb from "@/lib/db";

export default function Home() {
  connectdb();

  return (
    <div>
      hi
      <div className="p-6">
        <h1 className="text-3xl font-bold">
          Welcome to the API Monitoring Dashboard
        </h1>
        <p className="mt-1 text-gray-500">
          Monitor your APIs and track their performance.
        </p>
      </div>
    </div>
  );
}