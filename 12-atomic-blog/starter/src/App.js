import { createContext, memo, useContext, useEffect, useState } from "react";
import { faker } from "@faker-js/faker";
import { PostProvider, usePosts } from "./PostContext";
import Test from "./Test";

function createRandomPost() {
  return {
    title: `${faker.hacker.adjective()} ${faker.hacker.noun()}`,
    body: faker.hacker.phrase(),
  };
}

// Topic: Creating and Providing a Context
// 1) CREATE A CONTEXT 🔥
// Variable needs to be uppercase
// const PostContext = createContext(); // Move to PostContext.js 🍀

function App() {
  const [isFakeDark, setIsFakeDark] = useState(false);
  // Move render logic to PostContext.js 🍀

  // Whenever `isFakeDark` changes, we toggle the `fake-dark-mode` class on the HTML element (see in "Elements" dev tool).
  useEffect(
    function () {
      document.documentElement.classList.toggle("fake-dark-mode");
    },
    [isFakeDark]
  );

  return (
    <section>
      <button
        onClick={() => setIsFakeDark((isFakeDark) => !isFakeDark)}
        className="btn-fake-dark-mode"
      >
        {isFakeDark ? "☀️" : "🌙"}
      </button>

      {/* Move Provider to PostContext.js -> call as component instead 🍀 */}
      <PostProvider>
        {/* Remove Props */}
        <Header />
        <Main />
        <Archive />
        <Footer />
      </PostProvider>
    </section>
  );
}

function Header() {
  // Topic: Consuming the Context 🦊
  // 3) CONSUMING CONTEXT VALUE 🔥
  const { onClearPosts } = usePosts(); // 🍀

  return (
    <header>
      <h1>
        <span>⚛️</span>The Atomic Blog
      </h1>
      <div>
        {/* Remove props 🦊 */}
        <Results />
        <SearchPosts />
        <button onClick={onClearPosts}>Clear posts</button>
      </div>
    </header>
  );
}

function SearchPosts() {
  const { searchQuery, setSearchQuery } = usePosts();

  return (
    <input
      value={searchQuery}
      onChange={(e) => setSearchQuery(e.target.value)}
      placeholder="Search posts..."
    />
  );
}

function Results() {
  const { posts } = usePosts();

  return <p>🚀 {posts.length} atomic posts found</p>;
}

// Topic: Optimizing Context Re-Renders (2)
const Main = memo(function Main() {
  return (
    <main>
      <FormAddPost />
      <Posts />
    </main>
  );
});

function Posts() {
  return (
    <section>
      <List />
    </section>
  );
}

function FormAddPost() {
  const { onAddPost } = usePosts();
  const [title, setTitle] = useState("");
  const [body, setBody] = useState("");

  const handleSubmit = function (e) {
    e.preventDefault();
    if (!body || !title) return;
    onAddPost({ title, body });
    setTitle("");
    setBody("");
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        placeholder="Post title"
      />
      <textarea
        value={body}
        onChange={(e) => setBody(e.target.value)}
        placeholder="Post body"
      />
      <button>Add post</button>
    </form>
  );
}

function List() {
  const { posts } = usePosts();

  return (
    <>
      <ul>
        {posts.map((post, i) => (
          <li key={i}>
            <h3>{post.title}</h3>
            <p>{post.body}</p>
          </li>
        ))}
      </ul>

      {/* Topic: A Surprising Optimization Trick With children (1) */}
      {/* <Test /> */}
    </>
  );
}

function Archive() {
  // Here we don't need the setter function. We're only using state to store these posts because the callback function passed into useState (which generates the posts) is only called once, on the initial render. So we use this trick as an optimization technique, because if we just used a regular variable, these posts would be re-created on every render. We could also move the posts outside the components, but I wanted to show you this trick 😉
  const [posts] = useState(() =>
    // 💥 WARNING: This might make your computer slow! Try a smaller `length` first
    Array.from({ length: 10000 }, () => createRandomPost())
  );

  const [showArchive, setShowArchive] = useState(false);
  const { onAddPost } = usePosts();

  return (
    <aside>
      <h2>Post archive</h2>
      <button onClick={() => setShowArchive((s) => !s)}>
        {showArchive ? "Hide archive posts" : "Show archive posts"}
      </button>

      {showArchive && (
        <ul>
          {posts.map((post, i) => (
            <li key={i}>
              <p>
                <strong>{post.title}:</strong> {post.body}
              </p>
              <button onClick={() => onAddPost(post)}>Add as new post</button>
            </li>
          ))}
        </ul>
      )}
    </aside>
  );
}

function Footer() {
  return <footer>&copy; by The Atomic Blog ✌️</footer>;
}

export default App;

// Topic: What is the Context API?
// In slide

// Topic: Thinking In React: Advanced State Management
// In slide

///////////////////////////

// Topic: Performance Optimization and Wasted Renders
// In slide
