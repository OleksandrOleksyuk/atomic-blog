import { createContext, useContext, useState, ReactNode } from "react";
import { faker } from "@faker-js/faker";
import { Post, PostContextType } from "./model/context.type";

function createRandomPost() {
  return {
    title: `${faker.hacker.adjective()} ${faker.hacker.noun()}`,
    body: faker.hacker.phrase(),
  };
}

// Creazione del contesto
const PostContext = createContext<PostContextType | undefined>(undefined);

// Componente provider
function PostProvider({ children }: { children: ReactNode }) {
  const [posts, setPosts] = useState<Post[]>(() =>
    Array.from({ length: 30 }, () => createRandomPost())
  );

  const [searchQuery, setSearchQuery] = useState<string>("");

  const searchedPosts =
    searchQuery.length > 0
      ? posts.filter((post) =>
          `${post.title} ${post.body}`
            .toLowerCase()
            .includes(searchQuery.toLowerCase())
        )
      : posts;

  function handleAddPost(post: Post) {
    setPosts((prevPosts) => [post, ...prevPosts]);
  }

  function handleClearPosts() {
    setPosts([]);
  }

  return (
    <PostContext.Provider
      value={{
        posts: searchedPosts,
        onAddPost: handleAddPost,
        onClearPosts: handleClearPosts,
        searchQuery,
        setSearchQuery,
      }}
    >
      {children}
    </PostContext.Provider>
  );
}

// Hook per utilizzare il contesto
function usePosts() {
  const context = useContext(PostContext);
  if (!context) {
    throw new Error("usePosts must be used within a PostProvider");
  }
  return context;
}

export { PostProvider, usePosts };
