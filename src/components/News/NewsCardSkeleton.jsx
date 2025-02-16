const NewsCardSkeleton = () => {
  return (
    <div className="flex min-h-[400px] animate-pulse flex-col overflow-hidden rounded-2xl shadow-2xl transition-all lg:min-w-50">
      <div className="relative h-48 bg-gray-300 md:h-56 dark:bg-gray-700">
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
        <span className="absolute bottom-4 left-4 rounded-sm bg-gray-400 px-2 py-1 text-sm font-medium text-white dark:bg-gray-600">
          Source
        </span>
      </div>
      <div className="flex flex-1 flex-col gap-4 p-6">
        <p className="mb-1 line-clamp-3 block h-4 w-full rounded-sm bg-gray-300 text-neutral-600 dark:bg-gray-700 dark:text-neutral-400"></p>
        <p className="mb-1 line-clamp-3 block h-4 w-5/6 rounded-sm bg-gray-300 text-neutral-600 dark:bg-gray-700 dark:text-neutral-400"></p>
        <div className="mt-auto flex items-center justify-between text-sm">
          <time className="block h-4 w-2/5 rounded-sm bg-gray-300 text-neutral-500 dark:bg-gray-700"></time>
          <p
            className="text-news-theme-light block h-4 w-1/4 rounded-sm bg-gray-300 font-medium hover:text-blue-800 dark:bg-gray-700"
          ></p>
        </div>
      </div>
    </div>
  );
};

export default NewsCardSkeleton;
