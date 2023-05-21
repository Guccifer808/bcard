import { TRPCError } from "@trpc/server";
import { z, string } from "zod";
import slug from 'slug';

import {
  createTRPCRouter,
  publicProcedure,
  protectedProcedure,
} from "~/server/api/trpc";

export const cardRouter = createTRPCRouter({
  publishCard: protectedProcedure.input(z.object({website: z.string(), title: z.string(), name: z.string(), companyName: z.string()})).mutation(async ({ctx, input}) => {
    const {email, image, name} = ctx.session.user
    const {title, website, companyName} = input

    if(!email || !image || !name) throw new TRPCError({code: 'UNAUTHORIZED'})

const card = await ctx.prisma.businessCard.upsert({
  create: {
    title,
    website,
    email,
    imgSrc: image,
    name,
    companyName,
    slug: slug(name)
  },
  update: {
    title,
    website,
    email,
    imgSrc: image,
    name,
    companyName,
    slug: slug(name)
  },
  where: {
    slug: slug(name)
  }
})

return card
  }),

  getCard: publicProcedure.input(z.object({slug: z.string()})).query(async ({ctx, input}) => {
    const {slug} = input
    const card = await ctx.prisma.businessCard.findUnique({
      where: {
        slug
      }
    })
    return card
  })
})
