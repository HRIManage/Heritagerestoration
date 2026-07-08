export const LANDING_PAGE_BY_SLUG_QUERY = `
  *[_type == "landingPage" && slug.current == $slug][0]{
    title,
    "heroImage": heroImage{
      alt,
      asset->{
        _id,
        url,
        metadata {
          dimensions,
          lqip
        }
      }
    },
    bodyText,
    features[]{
      _key,
      title,
      bodyText,
      icon
    }
  }
`;

export const getLandingPageQueryParams = (slug) => ({ slug });
