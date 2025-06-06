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
    <div className="max-w-2xl mx-auto p-4 border-b-1 border-slate-700">
      <h1 className="text-xl font-bold mb-4 leading-tight text-gray-900">
        <Link to={`/post/${id}`}>{title}</Link>
      </h1>

      <div className="text-sm text-gray-500 mb-5">
        <span>
          By <strong className="text-gray-700">{author}</strong> • {date}
        </span>
      </div>

      <article className="prose prose-lg prose-neutral max-w-none">
        {content.slice(0, 200) + "..."}
      </article>
    </div>
  );
};

export default BlogPost;
