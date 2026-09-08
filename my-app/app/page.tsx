import connectdb from "@/lib/db";


export default function Home() {
  connectdb()
  return (
    <div>Homepage check
      <p>This is a simple homepage.</p>
      <p>Welcome to the API Monitoring System!</p>
    </div>
  );
}
