export const LANDING_PAGE_BY_SLUG_QUERY = `
  *[_type == "landingPage" && slug.current == $slug][0]{
    slug,
    title,
    excerpt,
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
    seo {
      title,
      description,
      keywords,
      noIndex,
      ogImage {
        alt,
        asset->{
          _id,
          url,
          metadata {
            dimensions,
            lqip
          }
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

export const LOCATION_LANDING_PAGE_BY_SLUG_QUERY = `
  *[_type == "locationLandingPage" && slug.current == $slug][0]{
    title,
    slug,
    cityName,
    fullName,
    county,
    office,
    distance,
    zipCodes,
    nearbyCities,
    neighborhoods,
    landmark,
    blurb,
    coordinates {
      lat,
      lng
    },
    seo {
      title,
      description,
      keywords,
      noIndex,
      heroImageAlt,
      ogImage {
        alt,
        asset->{
          _id,
          url,
          metadata {
            dimensions,
            lqip
          }
        }
      }
    },
    faqItems[] {
      _key,
      question,
      answer
    }
  }
`;

export const getLocationLandingPageQueryParams = (slug) => ({ slug });
