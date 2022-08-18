import { defaultTheme } from "vuepress";

const title = "FishFish";
const description =
  "A volunteer cybersecurity project focused on providing resources and services that improve safety across Discord.";

export default {
  title,
  description,
  head: [
    ["link", { rel: "icon", href: "/logo.png" }],
    ["link", { rel: "manifest", href: "/manifest.json" }],
    ["meta", { name: "theme-color", content: "#58c3ff" }],
    ["meta", { property: "og:type", content: "website" }],
    ["meta", { property: "og:title", content: title }],
    ["meta", { property: "og:description", content: description }],
    ["meta", { property: "og:image", content: "https://fishfish.gg/thumbnail.png" },],
    ["meta", { property: "twitter:card", content: "summary_large_image" }],
    ["meta", { property: "twitter:image", content: "https://fishfish.gg/thumbnail.png", },],
    ["meta", { property: "twitter:title", content: title }],
    ["meta", { property: "twitter:description", content: description }],
  ],
  theme: defaultTheme({
    navbar: [
      { text: "Home", link: "/" },
      { text: "API", link: "/api" },
      { text: "Github", link: "https://github.com/fishfish-gg" },
    ],
    sidebar: "auto",
    logo: "logo.png",
  }),
};
