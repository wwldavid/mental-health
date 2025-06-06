import OpenaiSuggest from "@/components/OpenaiSuggest";

export default function Home() {
  return (
    <div className="flex flex-col items-center justify-center p-6 bg-gradient-to-b from-sky-100 to-white">
      <OpenaiSuggest />
    </div>
  );
}
