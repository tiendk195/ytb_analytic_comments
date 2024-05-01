import Image from "next/image";
import Appbar from "./components/AppBar";

export default function Home() {
  return (
    <main className="ng-main-gray flex flex-col min-h-screen text-black">
      <Appbar />
      <div className="grid grid-cols-3 gap-4">
        <div className="bg-main-grey min-h-screen">
          <p className="m-4 text-[4rem] font-bold font-mono">Hello World</p>
          <p className="m-4 text-[1.5rem] font-normal font-mono">description</p>
        </div>
      </div>
    </main>
  );
}
