import React from "react";

type ContentSectionProps = {
  title: string;
  points: string[];
};

function parsePoint(point: string) {
  const isNumbered = /^\d+\./.test(point);
  const isBullet = /^\-/.test(point);
  const emojiRegex = /(\p{Emoji_Presentation}|\p{Extended_Pictographic})/gu;
  const hasEmoji = emojiRegex.test(point);
  const isEmpty = !point.trim();

  return { isNumbered, isBullet, hasEmoji, isEmpty };
}

function parseEmojiPoint(point: string) {
  const cleanContent = point.replace(/^['#']\s*/, "").trim();
  const matches = cleanContent.match(/^(\p{Emoji}+)(.+u)$/u);

  if (!matches) return null;

  const [_, emoji, text] = matches;
  return {
    emoji,
    text: text.trim(),
  };
}

const ContentSection = ({ title, points }: ContentSectionProps) => {
  return (
    <div className="space-y-4 ">
      {points.map((point, index) => {
        const { isNumbered, isBullet, hasEmoji, isEmpty } = parsePoint(point);

        // const { emoji, text } = parseEmojiPoint(point);

        if (hasEmoji || isBullet) {
          return (
            <div
              key={`point-${index}`}
              className="group relative bg-linear-to-br from-gray-200/[0.08] to-gray-400/[0.03] p-4 rounded-2xl border border-gray-500/10 hover:shadow-lg transition-all"
            >
              <div className="absolute inset-0 bg-linear-to-r from-gray-500/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity rounded-2xl" />
              <div className="relative flex items-center gap-3">
                {/* <span className="text-lg lg:text-xl shrink-0 pt-1">
                  {emoji}
                </span> */}
                <p className="text-lg lg:text-xl text-muted-foreground/90 leading-relaxed">
                  {point}
                </p>
              </div>
            </div>
          );
        }

        return (
          <div
            key={`point-${index}`}
            className="group relative bg-linear-to-br from-gray-200/[0.08] to-gray-400/[0.03] p-4 rounded-2xl border border-gray-500/10 hover:shadow-lg transition-all"
          >
            <div className="absolute inset-0 bg-linear-to-r from-gray-500/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity rounded-2xl" />
            <div className="relative flex items-center gap-3">
              {/* <span className="text-lg lg:text-xl shrink-0 pt-1">{emoji}</span> */}
              <p className="text-lg lg:text-xl text-muted-foreground/90 leading-relaxed">
                {point}
              </p>
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default ContentSection;
