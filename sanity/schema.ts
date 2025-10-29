import { defineField, defineType } from "sanity"

export const blogPost = defineType({
  name: "blogPost",
  title: "Blog Cikkek",
  type: "document",
  fields: [
    defineField({
      name: "title",
      title: "Cím",
      type: "string",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "slug",
      title: "Slug",
      type: "slug",
      options: {
        source: "title",
        maxLength: 96,
      },
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "category",
      title: "Kategória",
      type: "string",
      options: {
        list: [
          { title: "Film", value: "Film" },
          { title: "Sorozat", value: "Sorozat" },
          { title: "Könyv", value: "Könyv" },
          { title: "Játék", value: "Játék" },
          { title: "Tech", value: "Tech" },
        ],
      },
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "excerpt",
      title: "Kivonat",
      type: "text",
      rows: 3,
      validation: (Rule) => Rule.required().max(200),
    }),
    defineField({
      name: "content",
      title: "Tartalom",
      type: "array",
      of: [
        {
          type: "block",
          styles: [
            { title: "Normal", value: "normal" },
            { title: "H2", value: "h2" },
            { title: "H3", value: "h3" },
            { title: "Quote", value: "blockquote" },
          ],
          marks: {
            decorators: [
              { title: "Strong", value: "strong" },
              { title: "Emphasis", value: "em" },
            ],
          },
        },
        {
          type: "image",
          options: {
            hotspot: true,
          },
          fields: [
            {
              name: "alt",
              type: "string",
              title: "Alt szöveg",
            },
          ],
        },
      ],
    }),
    defineField({
      name: "author",
      title: "Szerző",
      type: "string",
      initialValue: "Ubikon Szerkesztőség",
    }),
    defineField({
      name: "publishedAt",
      title: "Publikálás dátuma",
      type: "datetime",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "readTime",
      title: "Olvasási idő",
      type: "string",
      description: 'pl. "8 perc"',
    }),
    defineField({
      name: "featured",
      title: "Kiemelt cikk",
      type: "boolean",
      initialValue: false,
    }),
  ],
  preview: {
    select: {
      title: "title",
      category: "category",
      date: "publishedAt",
    },
    prepare(selection) {
      const { title, category, date } = selection
      return {
        title: title,
        subtitle: `${category} - ${new Date(date).toLocaleDateString("hu-HU")}`,
      }
    },
  },
})

export const schema = {
  types: [blogPost],
}
