import { createContext, useContext, useMemo, useState } from "react";
import { faker } from "@faker-js/faker";

// Topic: Advanced Pattern: A Custom Provider and Hook 🍀

function createRandomPost() {
  return {
    title: `${faker.hacker.adjective()} ${faker.hacker.noun()}`,
    body: faker.hacker.phrase(),
  };
}

// 1) CREATE A CONTEXT 🔥
// Variable needs to be uppercase
const PostContext = createContext();

function PostProvider({ children }) {
  const [posts, setPosts] = useState(() =>
    Array.from({ length: 30 }, () => createRandomPost())
  );
  const [searchQuery, setSearchQuery] = useState("");

  // Derived state. These are the posts that will actually be displayed
  const searchedPosts =
    searchQuery.length > 0
      ? posts.filter((post) =>
          `${post.title} ${post.body}`
            .toLowerCase()
            .includes(searchQuery.toLowerCase())
        )
      : posts;

  function handleAddPost(post) {
    setPosts((posts) => [post, ...posts]);
  }

  function handleClearPosts() {
    setPosts([]);
  }

  // Topic: Optimizing Context Re-Renders (1)
  // Optimize context when these 3 conditions are true at the same time
  // 1) The state in the context needs to change all the time.
  // 2) The context has many consumers
  // 3) The app is actually slow and lag.
  const value = useMemo(() => {
    return {
      posts: searchedPosts,
      onAddPost: handleAddPost,
      onClearPosts: handleClearPosts,
      searchQuery,
      setSearchQuery,
    };
  }, [searchedPosts, searchQuery]);

  return (
    // 2) PROVIDE VALUE TO CHILD COMPONENTS 🔥
    <PostContext.Provider
      value={value}
      // value={{
      //   posts: searchedPosts,
      //   onAddPost: handleAddPost,
      //   onClearPosts: handleClearPosts,
      //   searchQuery,
      //   setSearchQuery,
      // }}
    >
      {children}
    </PostContext.Provider>
  );
}

// Placing Provider Component
function usePosts() {
  const context = useContext(PostContext);
  if (context === undefined)
    throw new Error("PostContext was used outside of the PostProvider"); // IMPT
  return context;
}

export { PostProvider, usePosts };
