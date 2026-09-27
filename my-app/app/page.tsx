import connectdb from "@/lib/db";


export default function Home() {
  connectdb()
  return (
    <div>hi
      <p>Welcome to the home page!</p>
      <p>button</p>
    </div>
  );
}
