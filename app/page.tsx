import { getProfile, getPosts } from "@/lib/api";

export default async function HomePage() {
  const profile = await getProfile();
  const posts = await getPosts();

  return (
    <div className="max-w-2xl mx-auto px-4 py-16">
      <header className="mb-16 text-center">
        {profile?.avatarUrl && (
          <img
            src={profile.avatarUrl}
            alt={profile.displayName}
            className="w-20 h-20 rounded-full mx-auto mb-4 object-cover"
          />
        )}
        <h1 className="font-display text-4xl font-semibold mb-3">
          {profile?.displayName || process.env.NEXT_PUBLIC_USERNAME}
        </h1>
        {profile?.bio && (
          <p className="text-zinc-500 text-base max-w-md mx-auto">{profile.bio}</p>
        )}
        {profile?.tags && profile.tags.length > 0 && (
          <div className="flex flex-wrap justify-center gap-2 mt-4">
            {profile.tags.map((tag) => (
              <span
                key={tag}
                className="px-2.5 py-0.5 bg-zinc-100 text-zinc-600 text-xs rounded-full"
              >
                {tag}
              </span>
            ))}
          </div>
        )}
      </header>

      {posts.length === 0 ? (
        <p className="text-center text-zinc-400">还没有文章</p>
      ) : (
        <div className="space-y-10">
          {posts.map((post) => (
            <article key={post.id}>
              <a
                href={`/${post.id}`}
                className="block group"
              >
                <h2 className="font-display text-2xl font-semibold mb-2 group-hover:text-zinc-600 transition-colors">
                  {post.title}
                </h2>
                <time className="text-sm text-zinc-400">
                  {new Date(post.createdAt).toLocaleDateString("zh-CN", {
                    year: "numeric",
                    month: "long",
                    day: "numeric",
                  })}
                </time>
                {post.tags.length > 0 && (
                  <div className="flex flex-wrap gap-2 mt-2">
                    {post.tags.map((tag) => (
                      <span
                        key={tag}
                        className="text-xs text-zinc-400"
                      >
                        #{tag}
                      </span>
                    ))}
                  </div>
                )}
              </a>
            </article>
          ))}
        </div>
      )}
    </div>
  );
}
