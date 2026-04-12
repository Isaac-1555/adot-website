import { query, mutation } from "./_generated/server";
import { v } from "convex/values";

export const getEvents = query({
  args: {},
  handler: async (ctx) => {
    const events = await ctx.db.query("events").collect();
    return events.sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime());
  },
});

export const createEvent = mutation({
  args: {
    title: v.string(),
    date: v.string(),
    startTime: v.optional(v.string()),
    endTime: v.optional(v.string()),
    venue: v.string(),
    city: v.string(),
    eventType: v.string(),
    status: v.string(),
    visibility: v.boolean(),
    externalUrl: v.optional(v.string()),
  },
  handler: async (ctx, args) => {
    return await ctx.db.insert("events", args);
  },
});

export const updateEvent = mutation({
  args: {
    id: v.id("events"),
    title: v.optional(v.string()),
    date: v.optional(v.string()),
    startTime: v.optional(v.string()),
    endTime: v.optional(v.string()),
    venue: v.optional(v.string()),
    city: v.optional(v.string()),
    eventType: v.optional(v.string()),
    status: v.optional(v.string()),
    visibility: v.optional(v.boolean()),
    externalUrl: v.optional(v.string()),
  },
  handler: async (ctx, args) => {
    const { id, ...updates } = args;
    return await ctx.db.patch(id, updates);
  },
});

export const deleteEvent = mutation({
  args: { id: v.id("events") },
  handler: async (ctx, args) => {
    return await ctx.db.delete(args.id);
  },
});

export const getMedia = query({
  args: {},
  handler: async (ctx) => {
    return await ctx.db.query("media").collect();
  },
});

export const createMedia = mutation({
  args: {
    title: v.string(),
    description: v.optional(v.string()),
    type: v.string(),
    platform: v.string(),
    embedUrl: v.string(),
    category: v.optional(v.string()),
    sortOrder: v.optional(v.number()),
  },
  handler: async (ctx, args) => {
    return await ctx.db.insert("media", args);
  },
});

export const updateMedia = mutation({
  args: {
    id: v.id("media"),
    title: v.optional(v.string()),
    description: v.optional(v.string()),
    type: v.optional(v.string()),
    platform: v.optional(v.string()),
    embedUrl: v.optional(v.string()),
    category: v.optional(v.string()),
    sortOrder: v.optional(v.number()),
  },
  handler: async (ctx, args) => {
    const { id, ...updates } = args;
    return await ctx.db.patch(id, updates);
  },
});

export const deleteMedia = mutation({
  args: { id: v.id("media") },
  handler: async (ctx, args) => {
    return await ctx.db.delete(args.id);
  },
});

export const getBookingRequests = query({
  args: {},
  handler: async (ctx) => {
    const requests = await ctx.db.query("bookingRequests").collect();
    return requests.sort((a, b) => b._creationTime - a._creationTime);
  },
});

export const createBookingRequest = mutation({
  args: {
    name: v.string(),
    email: v.string(),
    phone: v.optional(v.string()),
    eventType: v.string(),
    eventDate: v.string(),
    startTime: v.optional(v.string()),
    endTime: v.optional(v.string()),
    venue: v.optional(v.string()),
    city: v.optional(v.string()),
    guestCount: v.optional(v.number()),
    budgetRange: v.optional(v.string()),
    musicStyle: v.optional(v.string()),
    mustPlay: v.optional(v.string()),
    doNotPlay: v.optional(v.string()),
    additionalDetails: v.optional(v.string()),
  },
  handler: async (ctx, args) => {
    return await ctx.db.insert("bookingRequests", args);
  },
});