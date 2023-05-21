import { ImageResponse } from "@vercel/og";
import { NextApiRequest, NextApiResponse } from "next";

const og = (req: NextApiRequest, res: NextApiResponse) => {
  // replace with vercel prod URL
  // getting query params
  const url = new URL(req.url!, "http://localhost:3000");
  const username = url.searchParams.get("username");
  const title = url.searchParams.get("title");
  const imgSrc = url.searchParams.get("imgSrc");

  // on error
  if (!username) return res.status(400).json({ error: "username is required" });

  // returning img preview, styled with tailwind
  // P.S. use flex on parent if there are children
  const response = new ImageResponse(
    (
      <div
        style={{ fontFamily: "sans-serif" }}
        tw="relative flex flex-col p-10 w-[30rem] h-[15rem]"
      >
        <div tw="flex flex-row">
          <img
            src={imgSrc!}
            tw="w-24 h-24 rounded-full shadow-2xl mb-4 mr-6"
            style={{ objectPosition: "center", objectFit: "cover" }}
            alt=""
          />
          <div tw="flex flex-col ml-4">
            <h1 tw="text-2xl font-bold -mb-2 text-white">{username}</h1>
            <h2 tw="text-base font-medium text-gray-300">{title}</h2>
          </div>
        </div>
      </div>
    ),
    {
      width: 400,
      height: 240,

      // turn off img cache for dev
      //   headers: {
      //     'Cache-Control': 'no-cache',
      //   },
    }
  );

  return response;
};

export default og;
