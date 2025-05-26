import Carousel from "@/components/carousel/carousel";
import OpenaiSuggest from "@/components/OpenaiSuggest";

export default function Home() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-6 bg-gradient-to-b from-sky-100 to-white">
      <OpenaiSuggest />
      <Carousel />
    </div>
  );
}
