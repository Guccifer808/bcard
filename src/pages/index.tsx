import { type NextPage } from "next";
import { useState } from "react";
import { signIn, signOut, useSession } from "next-auth/react";
import Head from "next/head";
import BusinessCard from "~/components/BusinessCard/BusinessCard";
import { api } from "../utils/api";
import { useRouter } from "next/router";

const Home: NextPage = () => {
  const router = useRouter();
  const { data: sessionData } = useSession();
  //state for inputs
  const [inputs, setInputs] = useState({
    title: "",
    website: "",
    name: "",
    companyName: "",
  });

  //publishing card to db
  const { mutate } = api.card.publishCard.useMutation({
    onSuccess: (card) => {
      console.log("published");
      void router.push(`/c/${card.slug}`);
    },
  });

  const publish = () => {
    void mutate(inputs);
  };
  return (
    <>
      <Head>
        <title>Business Card Generator</title>
        <meta
          name="description"
          content="Generate a Business Card with your Google Account"
        />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <div className="flex h-[calc(100vh-4rem)] flex-col items-center justify-center bg-gradient-to-b from-[#2e026d] to-[#15162c]">
        {!sessionData && (
          <button
            className="rounded-full bg-black px-10 py-3 font-semibold text-white no-underline transition hover:bg-black/20"
            onClick={
              sessionData
                ? async () => {
                    await signOut();
                  }
                : () => {
                    void signIn("google");
                  }
            }
          >
            Sign In
          </button>
        )}

        {/* Inputs */}
        {sessionData && (
          <>
            <div className="mx-auto max-w-7xl">
              <h2 className="mb-6 text-center text-3xl font-semibold text-white">
                Fill up information about yourself
              </h2>
              <div className="mb-12 grid grid-cols-2 gap-8">
                {/* Input 1 */}
                <div>
                  <label
                    htmlFor="title"
                    className="block text-sm font-medium text-white"
                  >
                    Title
                  </label>
                  <div className="mt-1">
                    <input
                      value={inputs.title}
                      onChange={(e) =>
                        setInputs((prev) => ({
                          ...prev,
                          title: e.target.value,
                        }))
                      }
                      type="text"
                      name="title"
                      className="block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                      placeholder="Tech Lead"
                    />
                  </div>
                </div>

                {/* Input 2 */}
                <div>
                  <label
                    htmlFor="website"
                    className="block text-sm font-medium text-white"
                  >
                    Website
                  </label>
                  <div className="mt-1">
                    <input
                      value={inputs.website}
                      onChange={(e) =>
                        setInputs((prev) => ({
                          ...prev,
                          website: e.target.value,
                        }))
                      }
                      type="text"
                      name="website"
                      className="block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                      placeholder="yoursite.com"
                    />
                  </div>
                </div>

                {/* Input 3 */}
                <div>
                  <label
                    htmlFor="name"
                    className="block text-sm font-medium text-white"
                  >
                    Your Name
                  </label>
                  <div className="mt-1">
                    <input
                      value={inputs.name}
                      onChange={(e) =>
                        setInputs((prev) => ({
                          ...prev,
                          name: e.target.value,
                        }))
                      }
                      type="text"
                      name="name"
                      className="block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                      placeholder="Your Name"
                    />
                  </div>
                </div>

                {/* Input 4 */}
                <div>
                  <label
                    htmlFor="company"
                    className="block text-sm font-medium text-white"
                  >
                    Company Name
                  </label>
                  <div className="mt-1">
                    <input
                      value={inputs.companyName}
                      onChange={(e) =>
                        setInputs((prev) => ({
                          ...prev,
                          companyName: e.target.value,
                        }))
                      }
                      type="text"
                      name="companyName"
                      className="block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                      placeholder="Your Company"
                    />
                  </div>
                </div>
              </div>
            </div>

            {/* BusinessCard */}
            <div className="flex flex-col items-center justify-center">
              <BusinessCard inputs={inputs} />
            </div>

            {/* Publish Button */}
            <div className="mt-12 flex justify-center">
              <button
                type="button"
                onClick={publish}
                className="rounded-full bg-black px-10 py-3 font-semibold text-white no-underline transition hover:bg-black/20"
              >
                Publish
              </button>
            </div>
          </>
        )}
      </div>
    </>
  );
};
export default Home;
