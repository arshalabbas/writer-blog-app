import Image from "next/image";
import Link from "next/link";
import Redirect from "../misc/redirect";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import IconButton from "../ui/icon-button";

interface Props {
  slug: string;
  title: string;
  description?: string;
  image?: string;
  createdAt: Date;
  author: { username: string; image: string | null };
}

const BlogCard = ({
  slug,
  title,
  description,
  author,
  createdAt,
  image,
}: Props) => {
  return (
    <Link
      href={`/blog/${slug}`}
      className="border-b border-secondary p-1 hover:bg-primary-foreground"
    >
      {/* Header */}
      <div>
        <Redirect
          href={"/profile"}
          className="group mb-2 flex w-fit items-center gap-2"
        >
          <Avatar className="size-6">
            <AvatarImage
              src={author.image ?? undefined}
              alt={`avatar-of-${author.username}`}
            />
            <AvatarFallback className="text-xs">
              {author.username[0].toUpperCase()}
            </AvatarFallback>
          </Avatar>
          <span className="text-sm group-hover:underline">
            @{author.username}
          </span>
        </Redirect>
      </div>
      <div>
        {/* Card Body */}
        <div className="flex flex-col gap-2 md:flex-row">
          <div className="h-full flex-1">
            <h4 className="mb-2 line-clamp-2 text-xl font-bold md:line-clamp-none md:text-2xl">
              {title}
            </h4>
            <p className="line-clamp-2">{description}</p>
          </div>
          {image && (
            <div className="aspect-video w-full md:h-28 md:w-48">
              <Image
                src={image}
                width={180}
                height={80}
                alt="Blog image"
                className="h-full w-full rounded object-cover"
              />
            </div>
          )}
        </div>
      </div>
      {/* Card Footer */}
      <div className="flex items-end justify-between py-4">
        <span className="text-sm text-muted-foreground">
          {new Date(createdAt).toLocaleString()}
        </span>
        {/* Actions */}
        <div className="flex items-center gap-4">
          <IconButton icon="heart" label="10.3k" />
          <IconButton icon="message" label="2.2k" />
        </div>
      </div>
    </Link>
  );
};

export default BlogCard;
