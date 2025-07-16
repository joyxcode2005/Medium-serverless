import { Link } from "react-router-dom";

interface BlogPostProps {
  id: string;
  title: string;
  author: string;
  date: string;
  content: string;
}

const BlogPost = ({ id, title, author, date, content }: BlogPostProps) => {
  return (
    <div className="max-w-[77vw] mx-auto p-4 border-b-1 dark:border-white border-slate-700">
      <Link to={`/post/${id}`}>
        <h1 className="text-4xl font-bold mb-4 leading-tight dark:text-slate-300 text-gray-900">
          {title}
        </h1>

        <div className="text-sm text-gray-500 mb-5">
          <span>
            By{" "}
            <strong className="dark:text-blue-400 text-gray-700">
              {author}
            </strong>{" "}
            • <span className="dark:text-yellow-500">{date}</span>
          </span>
        </div>

        <article className="prose prose-lg prose-neutral max-w-none dark:text-white">
          {content.slice(0, 200) + "..."}
        </article>
      </Link>
    </div>
  );
};

export default BlogPost;
