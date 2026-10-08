import connectdb from "@/lib/db";

export default function Home() {
  connectdb();

  return (
    <div>
      hi
      <div className="p-6">
      </div>
    </div>
  );
}