import connectdb from "@/lib/db";


export default function Home() {
  connectdb()
  return (
    <div>hello</div>
  );
}
