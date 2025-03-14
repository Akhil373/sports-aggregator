import NewsCardSkeleton from "./NewsCardSkeleton.jsx";
import Summary from "./Summary.jsx";

const NewsCards = ({ newsItems, loading, selectedFilter }) => {
  if (loading) {
    return (
      <div className="m-auto">
        <div className="mt-10 grid grid-cols-1 gap-10 md:grid-cols-[repeat(auto-fit,minmax(300px,1fr))]">
          {Array(4)
            .fill(0)
            .map((_, index) => (
              <NewsCardSkeleton key={index} />
            ))}
        </div>
      </div>
    );
  }

  return (
    <>
      <Summary data={newsItems} category={selectedFilter} />
      <div className="grid grid-cols-1 gap-10 md:grid-cols-[repeat(auto-fit,minmax(300px,1fr))]">
        {newsItems.slice(0, 30).map((item, index) =>
          item.urlToImage ? (
            <div
              key={index}
              className={`hover:shadow-news-theme-light lg:min-w-50 dark:shadow-news-bg-theme flex min-h-[400px] flex-col overflow-hidden rounded-2xl shadow-2xl transition-all hover:scale-[1.02] hover:shadow-2xl dark:shadow-xl ${
                (index + 1) % 5 === 0 ? "md:col-span-2" : ""
              }`}
            >
              <div className="relative h-48 md:h-56">
                <img
                  src={item.urlToImage}
                  alt={item.title}
                  className="h-full w-full object-cover"
                  loading="lazy"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                <span className="absolute bottom-4 left-4 text-sm font-medium text-white">
                  {item.source.name}
                </span>
              </div>
              <div className="flex flex-1 flex-col gap-4 p-6">
                <a
                  href={item.url}
                  className="line-clamp-3 text-lg font-semibold leading-tight hover:underline"
                  target="_blank"
                >
                  {item.title}
                </a>
                <p className="line-clamp-3 text-neutral-600 dark:text-neutral-400">
                  {item.description}
                </p>
                <div className="mt-auto flex items-center justify-between text-sm">
                  <time className="text-neutral-500">
                    {new Date(item.publishedAt).toLocaleDateString()}
                  </time>
                  <a
                    href={item.url}
                    target="_blank"
                    className="text-news-theme-light font-medium hover:text-blue-800"
                  >
                    Read more →
                  </a>
                </div>
              </div>
            </div>
          ) : null,
        )}
      </div>
    </>
  );
};

export default NewsCards;
