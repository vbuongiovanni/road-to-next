import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '../ui/card';

type TCardCompact = {
  title: string;
  description: string;
  className?: string;
  content: React.ReactNode;
  footer?: React.ReactNode;
};

export const CardCompact = (props: TCardCompact) => {
  const { title, description, className, content, footer } = props;
  return (
    <Card className={className}>
      <CardHeader>
        <CardTitle>{title}</CardTitle>
        <CardDescription>{description}</CardDescription>
      </CardHeader>
      <CardContent>{content}</CardContent>
      {footer && <CardFooter>{footer}</CardFooter>}
    </Card>
  );
};
