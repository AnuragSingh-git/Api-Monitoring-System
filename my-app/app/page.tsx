import connectdb from "@/lib/db";


export default function Home() {
  connectdb()
  return (
    <div><div>hello world
    </div>
    </div>
  );
}
