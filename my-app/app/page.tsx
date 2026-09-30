import connectdb from "@/lib/db";


export default function Home() {
  connectdb()
  return (
    <div>hi
      <p>Welcome to the home page!</p>
      <h1 className="text-3xl font-bold">
      </h1>
    </div>
  );
}
