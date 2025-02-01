import CommentCard from "@/components/cards/comment-card";
import ProfileCard from "@/components/cards/profile-card";
import CommentForm from "@/components/forms/comment-form";
import { Button } from "@/components/ui/button";
import IconButton from "@/components/ui/icon-button";
import { Separator } from "@/components/ui/separator";
import { getBlogBySlug } from "@/lib/actions/blog.actions";
import { auth } from "@/lib/auth";
import { generateSlug } from "@/lib/utils";
import { LogIn, PackageOpen, Share } from "lucide-react";
import { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";

const BlogPage = async ({ params }: { params: Promise<{ slug: string }> }) => {
  const slug = (await params).slug;
  const blog = await getBlogBySlug(slug);
  const session = await auth();

  if (!blog) return null;

  const {
    id,
    title,
    description,
    author,
    createdAt,
    image,
    sections,
    comments,
  } = blog;

  return (
    <div className="flex w-full flex-col items-center">
      <div className="flex w-full max-w-[800px] flex-col gap-5">
        <h1 className="blog-title mb-5">{title}</h1>
        <ProfileCard
          username={author.username}
          image={author.image || ""}
          bio="Experienced React Developer"
          footer={new Date(createdAt).toLocaleString()}
        />

        <Separator />

        <div className="flex items-center justify-between">
          <div className="flex items-center gap-4">
            <IconButton icon="heart" label="10.k" />
            <IconButton icon="message" label="10.k" />
          </div>

          <div>
            <Button variant={"ghost"} size={"icon"}>
              <Share />
            </Button>
          </div>
        </div>

        {image && (
          <Image
            src={image}
            alt={`${slug}-image`}
            width={800}
            height={400}
            className="aspect-video w-full object-cover"
          />
        )}

        <h5 className="blog-description">{description}</h5>

        <div className="flex flex-col gap-10">
          {sections.map((section) => (
            <section key={section.id}>
              <Link href={`/blog/${slug}#${generateSlug(section.title)}`}>
                <h2
                  className="blog-subtle mb-2"
                  id={generateSlug(section.title)}
                >
                  {section.title}
                </h2>
              </Link>
              <p className="blog-description">{section.content}</p>
            </section>
          ))}
        </div>
      </div>

      {/* Comments */}
      <div className="mt-10 w-full max-w-[800px]">
        <div className="text-lg font-semibold">Comments</div>
        {session ? (
          <CommentForm
            blogId={id}
            slug={slug}
            avatar={session.user.image}
            username={session.user.username}
          />
        ) : (
          <div className="mb-10 flex w-full items-center justify-center gap-2 bg-primary-foreground p-10">
            You need an account to comment.
            <Button asChild>
              <Link href={"/login"}>
                <LogIn />
                Login
              </Link>
            </Button>
          </div>
        )}
        {comments.length <= 0 && (
          <div className="flex w-full items-center justify-center gap-2 py-20 text-2xl text-muted-foreground">
            <PackageOpen size={30} /> No comments
          </div>
        )}
        <div className="flex flex-col gap-4 pb-10">
          {comments.map((comment) => (
            <CommentCard
              id={comment.id}
              userId={session?.user?.id || ""}
              key={comment.id}
              author={comment.author}
              content={comment.content}
              createdAt={comment.createdAt}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default BlogPage;

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const slug = (await params).slug;
  const blog = await getBlogBySlug(slug);

  if (!blog) return {};

  const { title, description, image, thumbnail } = blog;

  return {
    title,
    description,
    openGraph: {
      url: `https://writers.com/blog/${slug}`,
      title,
      description,
      images: [
        {
          url: thumbnail || image || "",
          width: 1200,
          height: 630,
        },
      ],
      type: "article",
      siteName: "Writers",
    },
  };
}
