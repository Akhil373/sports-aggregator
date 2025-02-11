import { useEffect, useState } from "react";
import { getNewsData } from "../../api/fetchNews.js";

const NewsCards = ({ selectedFilter }) => {
  const [newsItems, setNewsItems] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(true);
    getNewsData(selectedFilter)
      .then((data) => {
        const articles = Array.isArray(data) ? data : data?.news || [];
        setNewsItems(articles);
        setLoading(false);
      })
      .catch((error) => {
        console.error("Error loading news:", error);
        setLoading(false);
      });
  }, [selectedFilter]);

  if (loading) {
    return (
      <div className="flex items-center justify-center">
        <img
          src="/src/assets/Newspaper2.svg"
          alt="loading..."
          className="w-1/3 animate-pulse"
        />
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 gap-10 md:grid-cols-[repeat(auto-fit,minmax(300px,1fr))]">
      {newsItems.map((item, index) =>
        item.urlToImage ? (
          <div
            key={index}
            className={`flex min-h-[400px] flex-col overflow-hidden rounded-t-2xl transition-all hover:scale-[1.02] hover:shadow-xl hover:shadow-red-400 lg:min-w-50 ${(index + 1) % 5 === 0 ? "md:col-span-2" : ""}`}
          >
            <div className="relative h-48 md:h-56">
              <img
                src={item.urlToImage}
                alt={item.title}
                className="h-full w-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
              <span className="absolute bottom-4 left-4 text-sm font-medium text-white">
                {item.source.name}
              </span>
            </div>
            <div className="flex flex-1 flex-col gap-4 p-6">
              <h3 className="line-clamp-3 text-lg leading-tight font-semibold">
                {item.title}
              </h3>
              <p className="line-clamp-3 text-neutral-600">
                {item.description}
              </p>
              <div className="mt-auto flex items-center justify-between text-sm">
                <time className="text-neutral-500">
                  {new Date(item.publishedAt).toLocaleDateString()}
                </time>
                <a
                  href={item.url}
                  className="font-medium text-blue-600 hover:text-blue-800"
                >
                  Read more →
                </a>
              </div>
            </div>
          </div>
        ) : null,
      )}
    </div>
  );
};

export default NewsCards;
