import React from "react";
import FormAddPost from "./FormAddPost";
import Posts from "./Posts";

const Main: React.FC = () => {
  return (
    <main>
      <FormAddPost />
      <Posts />
    </main>
  );
};

export default Main;
