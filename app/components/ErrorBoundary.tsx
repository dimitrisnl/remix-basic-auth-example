import { isRouteErrorResponse, useRouteError } from "@remix-run/react";

const Container = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-950 space-y-2">
      {children}
    </div>
  );
};

const Title = ({ children }: { children: React.ReactNode }) => {
  return <h1 className="text-4xl text-gray-100">{children}</h1>;
};

const Subtitle = ({ children }: { children: React.ReactNode }) => {
  return <h2 className="text-2xl text-gray-400">{children}</h2>;
};

export function ErrorBoundary() {
  const error = useRouteError();

  if (isRouteErrorResponse(error)) {
    return (
      <Container>
        <Title>
          {error.status} {error.statusText}
        </Title>
        <Subtitle>{error.data}</Subtitle>
      </Container>
    );
  } else if (error instanceof Error) {
    return (
      <Container>
        <Title>Error</Title>
        <Subtitle>{error.message}</Subtitle>
      </Container>
    );
  } else {
    return (
      <Container>
        <Title>Unknown Error</Title>
        <Subtitle>An unknown error occurred</Subtitle>
      </Container>
    );
  }
}
