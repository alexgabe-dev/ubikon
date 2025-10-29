import { groq } from "next-sanity"

export const allPostsQuery = groq`
  *[_type == "blogPost"] | order(publishedAt desc) {
    _id,
    title,
    "slug": slug.current,
    category,
    excerpt,
    "date": publishedAt,
    readTime,
    featured,
    author,
    // first image in content as cover
    "coverUrl": content[_type == "image"][0].asset->url,
    "coverWidth": content[_type == "image"][0].asset->metadata.dimensions.width,
    "coverHeight": content[_type == "image"][0].asset->metadata.dimensions.height
  }
`

export const featuredPostsQuery = groq`
  *[_type == "blogPost" && featured == true] | order(publishedAt desc)[0...3] {
    _id,
    title,
    "slug": slug.current,
    category,
    excerpt,
    "date": publishedAt,
    readTime,
    "coverUrl": content[_type == "image"][0].asset->url,
    "coverWidth": content[_type == "image"][0].asset->metadata.dimensions.width,
    "coverHeight": content[_type == "image"][0].asset->metadata.dimensions.height
  }
`

export const postBySlugQuery = groq`
  *[_type == "blogPost" && slug.current == $slug][0] {
    _id,
    title,
    "slug": slug.current,
    category,
    excerpt,
    content[]{
      ...,
      _type == "image" => {
        ...,
        "url": asset->url,
        "width": asset->metadata.dimensions.width,
        "height": asset->metadata.dimensions.height
      }
    },
    "date": publishedAt,
    readTime,
    author
  }
`
