import React from "react";
import { ToggleGroup, ToggleGroupItem } from "../ui/toggle-group";

const HomeSidebar = () => {
  return (
    <aside>
      <h1 className="mb-3 text-lg font-medium">Popular Topics</h1>
      <ToggleGroup
        type="single"
        variant={"outline"}
        className="flex-wrap justify-start gap-2"
      >
        <ToggleGroupItem value="a">AI</ToggleGroupItem>
        <ToggleGroupItem value="b">JavaScript</ToggleGroupItem>
        <ToggleGroupItem value="c">Python</ToggleGroupItem>
        <ToggleGroupItem value="d">Next.js</ToggleGroupItem>
        <ToggleGroupItem value="e">LLM</ToggleGroupItem>
        <ToggleGroupItem value="f">LifeStyles</ToggleGroupItem>
        <ToggleGroupItem value="g">Music</ToggleGroupItem>
        <ToggleGroupItem value="h">Sports</ToggleGroupItem>
        <ToggleGroupItem value="i">Entertainment</ToggleGroupItem>
        <ToggleGroupItem value="j">Video Games</ToggleGroupItem>
        <ToggleGroupItem value="k">Elden Ring</ToggleGroupItem>
        <ToggleGroupItem value="l">Interstellar</ToggleGroupItem>
        <ToggleGroupItem value="m">Movies</ToggleGroupItem>
        <ToggleGroupItem value="n">Art</ToggleGroupItem>
        <ToggleGroupItem value="o">Coding</ToggleGroupItem>
        <ToggleGroupItem value="p">Software Developer</ToggleGroupItem>
        <ToggleGroupItem value="q">Dubai</ToggleGroupItem>
        <ToggleGroupItem value="r">DeepSeek</ToggleGroupItem>
      </ToggleGroup>
    </aside>
  );
};

export default HomeSidebar;
