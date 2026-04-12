import { defineSchema, defineTable } from "convex/server";
import { v } from "convex/values";

export default defineSchema({
  events: defineTable({
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
  }),
  media: defineTable({
    title: v.string(),
    description: v.optional(v.string()),
    type: v.string(),
    platform: v.string(),
    embedUrl: v.string(),
    category: v.optional(v.string()),
    sortOrder: v.optional(v.number()),
  }),
  bookingRequests: defineTable({
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
  }),
});