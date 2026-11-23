const nextConfig = {
  distDir: process.env.SPARKANONE_PREVIEW_BUILD === "1" ? ".next-preview" : ".next",
};

export default nextConfig;
