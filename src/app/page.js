import Carousel from "@/components/carousel/carousel";

export default function Home() {
  return (
    <div>
      <main className="flex flex-grow items-center justify-center h-96">
        <h1 className="text-4xl font-bold text-blue-500">
          Hello, Mental Health App!
        </h1>
      </main>

      <Carousel />
    </div>
  );
}
