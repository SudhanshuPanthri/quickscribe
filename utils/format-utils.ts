export function formatFileNameAsTitle(fileName: string): string {
  if (!fileName || typeof fileName !== "string") {
    throw new Error("Invalid file name");
  }

  const nameWithoutExtension = fileName.replace(/\.[^/.]+$/, "");

  const formattedName = nameWithoutExtension.replace(/[_-]+/g, " ").trim();

  return formattedName
    .split(" ")
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(" ");
}
