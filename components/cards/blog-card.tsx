import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import Image from "next/image";

interface Props {
  title: string;
  description?: string;
  image?: string;
  username: string;
  createdAt: Date;
}

const BlogCard = ({
  title,
  description,
  username,
  createdAt,
  image,
}: Props) => {
  return (
    <Card>
      <CardHeader>
        <span>{username}</span>
      </CardHeader>
      <CardContent>
        <CardTitle>{title}</CardTitle>
        <CardDescription>{description}</CardDescription>
        {image && (
          <Image src={image} width={180} height={100} alt="Blog image" />
        )}
      </CardContent>
      <CardFooter>
        <span>{createdAt.toLocaleString()}</span>
      </CardFooter>
    </Card>
  );
};

export default BlogCard;
