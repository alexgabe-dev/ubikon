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
    // Use explicit cover image when set, otherwise fall back to first content image
    "coverUrl": coalesce(cover.asset->url, content[_type == "image"][0].asset->url),
    "coverWidth": coalesce(cover.asset->metadata.dimensions.width, content[_type == "image"][0].asset->metadata.dimensions.width),
    "coverHeight": coalesce(cover.asset->metadata.dimensions.height, content[_type == "image"][0].asset->metadata.dimensions.height)
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
    "coverUrl": coalesce(cover.asset->url, content[_type == "image"][0].asset->url),
    "coverWidth": coalesce(cover.asset->metadata.dimensions.width, content[_type == "image"][0].asset->metadata.dimensions.width),
    "coverHeight": coalesce(cover.asset->metadata.dimensions.height, content[_type == "image"][0].asset->metadata.dimensions.height)
  }
`

export const postsByCategoryQuery = groq`
  *[_type == "blogPost" && category == $category] | order(publishedAt desc) {
    _id,
    title,
    "slug": slug.current,
    category,
    excerpt,
    "date": publishedAt,
    readTime,
    featured,
    author,
    "coverUrl": coalesce(cover.asset->url, content[_type == "image"][0].asset->url),
    "coverWidth": coalesce(cover.asset->metadata.dimensions.width, content[_type == "image"][0].asset->metadata.dimensions.width),
    "coverHeight": coalesce(cover.asset->metadata.dimensions.height, content[_type == "image"][0].asset->metadata.dimensions.height)
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
