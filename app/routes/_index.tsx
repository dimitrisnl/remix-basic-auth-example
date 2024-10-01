import {
  HeadersFunction,
  json,
  type LoaderFunction,
  type MetaFunction,
} from "@remix-run/node";
import { useLoaderData } from "@remix-run/react";
import { authenticateUser } from "~/utils/auth.server";

export const loader: LoaderFunction = async ({ request }) => {
  await authenticateUser(request);

  return json({ data: "My data" });
};

export const meta: MetaFunction = () => {
  return [
    { title: "Protected page example" },
    { name: "description", content: "Protected page example" },
  ];
};

export default function Index() {
  const { data } = useLoaderData<typeof loader>();

  return <div>{data}</div>;
}

// Move this to `root` if you want to protect all routes
export const headers: HeadersFunction = () => ({
  "WWW-Authenticate": "Basic",
});
