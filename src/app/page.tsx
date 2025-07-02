import Image from "next/image";
import Carousel from "@/components/Carousel";
export default function Home() {
  return (
    <div className=" items-center justify-items-center min-h-screen p-8 pb-20  sm:p-20 font-[family-name:var(--font-geist-sans)]">
      <main className="">
      <Carousel />
    </main>
    </div>
  );
}
