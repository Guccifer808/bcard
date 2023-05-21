import Head from "next/head";
import { useRouter } from "next/router";
import { FC } from "react";
import BusinessCard from "~/components/BusinessCard/BusinessCard";
import { api } from "~/utils/api";

const Slug: FC = () => {
  const router = useRouter();
  const { slug } = router.query;

  if (typeof slug !== "string") return null;

  const { data: card } = api.card.getCard.useQuery({ slug });
  return (
    <div className="bg absolute inset-0 grid place-items-center bg-gradient-to-b from-[#2e026d] to-[#15162c]">
      <Head>
        <title>
          {card?.name} | {card?.title}
        </title>
      </Head>
      <BusinessCard card={card} />
    </div>
  );
};

export default Slug;
