import Appbar from "../components/Appbar"
import BlogPost from "../components/BlogPost"


const Posts = () => {
  return (
    <div className="w-screen h-full">
      <Appbar/>
      <BlogPost
      title="How is a single person like levelsio is producing products which the tech giants are taking a team of 50 devs to produce?"
      content="A single developer like Levelsio (Pieter Levels) is able to produce impactful products at the pace of large teams by leveraging simplicity, focus, and modern tools. Unlike big tech companies that often have complex processes, layers of approval, and teams split across roles, solo builders can move fast without bureaucratic friction. Levelsio builds for niche markets with immediate feedback loops, uses no-code or low-code tools when needed, automates repetitive tasks, and focuses on launching a minimum viable product (MVP) quickly rather than perfecting every feature. This lean, iterative approach, combined with his experience, community understanding, and discipline, allows him to outpace teams that may be bogged down by overengineering and internal politics."
      author="Joy Sengupta"
      date="26/05/2025"
      />
    </div>
  )
}

export default Posts