import { FaUserAlt } from "react-icons/fa";

const Quote = () => {
  return (
    <div className="bg-[#0d1117] h-screen flex items-start justify-center flex-col pl-15 pr-10">
      <img
        src={"/images/commas.svg"}
        alt="double_inverted_commas"
        className="w-10 h-10 rotate-180 text-white invert"
      />
      <span className="font-extralight text-4xl text-white font-winky tracking-tighter">
        Writing is the painting of the voice. Share your story with the world,
        one post at a time.
      </span>
      <div className="flex items-center justify-center gap-2 mt-4">
        <FaUserAlt className="h-8 w-8 text-white bg-gray-500 p-1 rounded-full" />
        <div className="flex flex-col">
          <span className="font-bold font-mono tracking-tight text-xl text-orange-400">Alex Carter</span>
          <span className="font-extralight text-sm font-winky text-green-400/50">
            Blogger & Content Creator
          </span>
        </div>
      </div>

    </div>
  );
};

export default Quote;
