import connectdb from "@/lib/db";


export default function Home() {
  connectdb()
  return (
    <div>hi
      <div className="p-6">
        <h1 className="text-xl font-semibold">
          Welcome to the API Monitoring
        </h1>
        <p className="mt-2 text-gray-500">
          This is a simple API monitoring system built with Next.js and Tailwind CSS.
        </p>
      </div>
    </div>
  );
}
    </div>
  );
}