import {defineArrayMember, defineField, defineType} from "sanity";

export const locationLandingPageType = defineType({
  name: "locationLandingPage",
  title: "Location Landing Page",
  type: "document",
  fields: [
    defineField({
      name: "title",
      title: "Internal Title",
      type: "string",
      validation: rule => rule.required(),
    }),
    defineField({
      name: "slug",
      title: "Slug",
      type: "slug",
      options: {source: "fullName", maxLength: 96},
      validation: rule => rule.required(),
    }),
    defineField({
      name: "cityName",
      title: "City Name",
      type: "string",
      validation: rule => rule.required(),
    }),
    defineField({
      name: "fullName",
      title: "City + State",
      type: "string",
      validation: rule => rule.required(),
    }),
    defineField({
      name: "county",
      title: "County",
      type: "string",
      validation: rule => rule.required(),
    }),
    defineField({
      name: "office",
      title: "Primary Office",
      type: "string",
      options: {
        list: [
          {title: "North", value: "North"},
          {title: "South", value: "South"},
        ],
        layout: "radio",
      },
      validation: rule => rule.required(),
    }),
    defineField({
      name: "distance",
      title: "Distance / Response Context",
      type: "string",
      validation: rule => rule.required(),
    }),
    defineField({
      name: "zipCodes",
      title: "ZIP Codes",
      type: "array",
      of: [defineArrayMember({type: "string"})],
    }),
    defineField({
      name: "nearbyCities",
      title: "Nearby Cities",
      type: "array",
      of: [defineArrayMember({type: "string"})],
    }),
    defineField({
      name: "neighborhoods",
      title: "Neighborhoods",
      type: "array",
      of: [defineArrayMember({type: "string"})],
    }),
    defineField({
      name: "landmark",
      title: "Local Landmark",
      type: "string",
    }),
    defineField({
      name: "blurb",
      title: "Intro Blurb",
      type: "text",
      rows: 4,
      validation: rule => rule.required(),
    }),
    defineField({
      name: "coordinates",
      title: "Coordinates",
      type: "object",
      fields: [
        defineField({name: "lat", title: "Latitude", type: "number"}),
        defineField({name: "lng", title: "Longitude", type: "number"}),
      ],
    }),
    defineField({
      name: "seo",
      title: "SEO",
      type: "object",
      options: {collapsible: true, collapsed: false},
      fields: [
        defineField({name: "title", title: "Meta Title", type: "string"}),
        defineField({
          name: "description",
          title: "Meta Description",
          type: "text",
          rows: 3,
        }),
        defineField({
          name: "keywords",
          title: "Keywords",
          type: "array",
          of: [defineArrayMember({type: "string"})],
        }),
        defineField({
          name: "noIndex",
          title: "No Index",
          type: "boolean",
          initialValue: false,
        }),
        defineField({
          name: "heroImageAlt",
          title: "Hero Image Alt Text",
          type: "string",
        }),
        defineField({
          name: "ogImage",
          title: "Open Graph Image",
          type: "image",
          options: {hotspot: true},
          fields: [
            defineField({name: "alt", title: "Alt text", type: "string"}),
          ],
        }),
      ],
    }),
    defineField({
      name: "faqItems",
      title: "FAQ Items",
      type: "array",
      of: [
        defineArrayMember({
          type: "object",
          fields: [
            defineField({
              name: "question",
              title: "Question",
              type: "string",
              validation: rule => rule.required(),
            }),
            defineField({
              name: "answer",
              title: "Answer",
              type: "text",
              rows: 3,
              validation: rule => rule.required(),
            }),
          ],
          preview: {
            select: {
              title: "question",
              subtitle: "answer",
            },
          },
        }),
      ],
    }),
  ],
  preview: {
    select: {
      title: "fullName",
      subtitle: "county",
    },
  },
});