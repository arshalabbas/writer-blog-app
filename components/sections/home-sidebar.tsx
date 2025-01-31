import React from "react";
import { ToggleGroup, ToggleGroupItem } from "../ui/toggle-group";

const HomeSidebar = () => {
  return (
    <aside>
      <ToggleGroup
        type="single"
        variant={"outline"}
        className="flex-wrap justify-start gap-2"
      >
        <ToggleGroupItem value="a">AI</ToggleGroupItem>
        <ToggleGroupItem value="b">JavaScript</ToggleGroupItem>
        <ToggleGroupItem value="c">Python</ToggleGroupItem>
        <ToggleGroupItem value="a">Next.js</ToggleGroupItem>
        <ToggleGroupItem value="b">LLM</ToggleGroupItem>
        <ToggleGroupItem value="c">LifeStyles</ToggleGroupItem>
        <ToggleGroupItem value="a">Music</ToggleGroupItem>
        <ToggleGroupItem value="b">Sports</ToggleGroupItem>
        <ToggleGroupItem value="c">Entertainment</ToggleGroupItem>
        <ToggleGroupItem value="a">Video Games</ToggleGroupItem>
        <ToggleGroupItem value="b">Elden Ring</ToggleGroupItem>
        <ToggleGroupItem value="c">Interstellar</ToggleGroupItem>
        <ToggleGroupItem value="a">Movies</ToggleGroupItem>
        <ToggleGroupItem value="b">Art</ToggleGroupItem>
        <ToggleGroupItem value="c">Coding</ToggleGroupItem>
        <ToggleGroupItem value="a">Software Developer</ToggleGroupItem>
        <ToggleGroupItem value="b">Dubai</ToggleGroupItem>
        <ToggleGroupItem value="c">DeepSeek</ToggleGroupItem>
      </ToggleGroup>
    </aside>
  );
};

export default HomeSidebar;
