import connectdb from "@/lib/db";


export default function Home() {
  connectdb()
  return (
    <div>hi
      <div className="p-6">
        <h1 className="text-xl font-semibold">
          Welcome to the API Monitoring
        </h1>
      </div>
    </div>
  );
}
    </div>
  );
}