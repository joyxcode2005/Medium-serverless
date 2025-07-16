

const Quote = () => {
  return (
    <div className="bg-slate-200 h-screen flex items-start justify-center flex-col pl-15 pr-10">
      <img src={"/images/commas.svg"} alt="double_inverted_commas" className="w-10 h-10 rotate-180" />
      <span className="font-semibold text-3xl">Writing is the painting of the voice. Share your story with the world, one post at a time.</span>
      <span className="font-bold text-lg mt-2">Alex Carter</span>
      <span className="font-semibold text-sm text-gray-500">Blogger & Content Creator</span>
    </div>
  )
}

export default Quote